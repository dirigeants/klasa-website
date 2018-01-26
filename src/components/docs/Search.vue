<template>
  <div id="docs-search" class="docs-page">
    <em id="show-scores" :class="`fa fa-bar-chart ${!showScores ? 'disabled' : ''}`" :title="showScores ? 'Hide scores' : 'Show scores'" @click="toggleScores"></em>

    <h1>Search</h1>
    <input v-model.trim="search" type="search" />

    <div id="toggles">
      <label><input type="checkbox" v-model="toggles['classes']" /> Classes</label>
      <label><input type="checkbox" v-model="toggles['props']" /> Properties</label>
      <label><input type="checkbox" v-model="toggles['methods']" /> Methods</label>
      <label><input type="checkbox" v-model="toggles['events']" /> Events</label>
      <label><input type="checkbox" v-model="toggles['typedefs']" /> Typedefs</label>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="search && search.length > 2">
        <h2 v-if="search && search.length > 2">Results for "{{ search }}"</h2>

        <transition name="fade" mode="out-in">
          <transition-group name="animated-list" tag="ul" v-if="results.length > 0" key="results">
            <li v-for="result in results" :key="`${result.key || result.name}`" class="animated-list-item">
              <span v-if="showScores" class="score">{{ Math.round(result.score * 100) }}%</span>
              <router-link :to="result.route">
                <span class="badge" :title="result.badge">{{ result.badge[0] }}</span>
                {{ result.name }}{{ result.badge === 'Method' ? '()' : '' }}
              </router-link>
            </li>
          </transition-group>

          <p v-else key="empty">No results.</p>
        </transition>
      </div>

      <p v-else key="short">Your search query must be at least three characters.</p>
    </transition>
  </div>
</template>

<script>
  import levenshtein from 'js-levenshtein';
  import { sort } from 'timsort';

  export default {
    name: 'docs-search',
    props: ['docs', 'showPrivate'],

    data() {
      return {
        search: this.$route.query.q,
        toggles: { classes: true, props: true, methods: true, events: true, typedefs: true },
        showScores: false,
      };
    },

    computed: {
      results() {
        const q = this.search.toLowerCase();
        const results = [];

        for (const clarse of this.docs.classes) {
          if (!this.showPrivate && clarse.access === 'private') continue;

          let cScore = 0;
          if (this.toggles.classes) {
            cScore = searchScore(q, clarse.name.toLowerCase(), null, 1) * 1.05;
            if (cScore >= scoreThreshold) {
              results.push({
                score: cScore,
                name: clarse.name,
                route: { name: 'docs-class', params: { class: clarse.name } },
                badge: 'Class',
              });
            }
          }

          for (const [group, groupName] of [['props', 'Property'], ['methods', 'Method'], ['events', 'Event']]) {
            if (!clarse[group] || !this.toggles[group]) continue;
            for (const item of clarse[group]) {
              if (!this.showPrivate && item.access === 'private') continue;
              const name = fullName(item, clarse, group);
              const score = searchScore(q, item.name.toLowerCase(), cScore <= 0.9 ? name.toLowerCase() : null);
              if (score < scoreThreshold) continue;
              results.push({
                score,
                name,
                route: { name: 'docs-class', params: { class: clarse.name }, query: { scrollTo: this.scopedName(item) } },
                badge: groupName,
                key: group === 'events' ? `e-${name}` : null,
              });
            }
          }
        }

        if (this.toggles.typedefs) {
          for (const typedef of this.docs.typedefs) {
            if (!this.showPrivate && typedef.access === 'private') continue;
            const tScore = searchScore(q, typedef.name.toLowerCase(), null, 1) * 1.05;
            if (tScore < scoreThreshold) continue;
            results.push({
              score: tScore,
              name: typedef.name,
              route: { name: 'docs-typedef', params: { typedef: typedef.name } },
              badge: 'Typedef',
            });
          }
        }

        sort(results, (a, b) => b.score - a.score);
        return results;
      },
    },

    methods: {
      toggleScores() {
        this.showScores = !this.showScores;
      },

      scopedName(item) {
        return `${item.scope === 'static' ? 's-' : ''}${item.name}`;
      },
    },

    watch: {
      $route(to) {
        this.search = to.query.q;
      },

      search(q) {
        if (this.$route.query.q === q) return;
        if (this.$route.query.q) this.$router.replace({ name: 'docs-search', query: { q } });
        else this.$router.push({ name: 'docs-search', query: { q } });
      },
    },
  };

  const scoreThreshold = 0.45;

  function searchScore(q, shortName, longName, identicalWeight) {
    if (q === shortName || q === longName) return 1 + (identicalWeight === undefined ? 0.5 : identicalWeight);

    const name = longName || shortName;
    let shorter = q, longer = name;
    if (q.length > name.length) {
      longer = q;
      shorter = name;
    }
    if (longer.length === 0) return 1;
    const score = (longer.length - levenshtein(longer, shorter)) / longer.length;

    return shortName.includes(q) ? Math.max(score, scoreThreshold) : score;
  }

  function fullName(child, parent) {
    return `${parent.name + (child.scope === 'static' ? '.' : '#')}${child.name}`;
  }
</script>
