<template>
  <section class="section">
    <p class="title">
      <span class="subtitle is-5" @click="toggleScores" :title="showScores ? 'Hide scores' : 'Show scores'"><b-icon icon="chart-bar" size="is-small" /></span> Search
    </p>
    <b-field>
      <b-input v-model.trim="search" placeholder="Search..."
          type="search"
          icon="search">
      </b-input>
    </b-field>

    <b-field>
        <b-checkbox-button v-model="toggles" native-value="classes" :type="tagColor('Class')">
          Classes
        </b-checkbox-button>
        <b-checkbox-button v-model="toggles" native-value="props" :type="tagColor('Property')">
          Properties
        </b-checkbox-button>
        <b-checkbox-button v-model="toggles" native-value="methods" :type="tagColor('Method')">
          Methods
        </b-checkbox-button>
        <b-checkbox-button v-model="toggles" native-value="events" :type="tagColor('Event')">
          Events
        </b-checkbox-button>
        <b-checkbox-button v-model="toggles" native-value="typedefs" :type="tagColor('Typedef')">
          Typedefs
        </b-checkbox-button>
    </b-field>

    <transition name="fade" mode="out-in">
      <div v-if="search && search.length > 2">
        <h2 class="subtitle" v-if="search && search.length > 2">Results for "{{ search }}"</h2>

        <transition name="fade" mode="out-in">
          <transition-group name="animated-list" tag="ul" v-if="results.length > 0" key="results">
            <li v-for="result in results" :key="`${result.key || result.name}`" class="animated-list-item">
              <span v-if="showScores" class="score">{{ Math.round(result.score * 100) }}%</span>
              <router-link :to="result.route">
                <span :class="`tag ${tagColor(result.badge)}`" :title="result.badge">{{ result.badge[0] }}</span>
                {{ result.name }}{{ result.badge === 'Method' ? '()' : '' }}
              </router-link>
            </li>
          </transition-group>

          <h2 class="subtitle" v-else key="empty">No results.</h2>
        </transition>
      </div>

      <h2 class="subtitle" v-else key="short">Your search query must be at least three characters.</h2>
    </transition>
  </section>
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
        toggles: ['classes', 'props', 'methods', 'events', 'typedefs'],
        colors: {
          Class: 'is-info',
          Property: 'is-success',
          Method: 'is-warning',
          Event: 'is-danger',
          Typedef: 'is-primary',
        },
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
          if (this.toggles.includes('classes')) {
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
            if (!clarse[group] || !this.toggles.includes(group)) continue;
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

        if (this.toggles.includes('typedefs')) {
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
      tagColor(type) {
        return this.colors[type];
      },

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

