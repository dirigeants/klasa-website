<template>
  <div class="notification is-light is-marginless is-paddingless">
    <nav class="level is-mobile">
      <!-- Left side -->
      <div class="level-left">
        <p class="level-item">
          <strong>Viewing:</strong>
        </p>
        <div class="level-item">
            <b-field type="is-light">
                <b-select v-model="sourceChoice" :placeholder="sourceChoice">
                    <option v-for="source in sources" :key="source" :value="source.id">{{ source.name }}</option>
                </b-select>
            </b-field>
        </div>
        <div class="level-item">
            <b-field type="is-light">
                <b-select v-if="tags" v-model="tagChoice" :placeholder="tagChoice">
                    <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
                </b-select>
                <loading v-else />
            </b-field>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item is-hidden-mobile">
          <b-field type="is-light">
            <b-input v-model="search" placeholder="Search" type="search" icon="search"></b-input>
          </b-field>
        </div>
        <div @click="startSearch" class="level-item is-hidden-desktop">
          <b-icon icon="search" />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'docs-navbar',
    props: ['sources', 'source'],

    data() {
      return {
        sourceChoice: this.source.id,
        tagChoice: null,
        tags: null,
        search: this.$route.query.q,
      };
    },

    methods: {
      loadTags() {
        this.tags = this.source.tags;
        if (!this.tags) {
          const startSource = this.source;
          this.source.fetchTags().then(tags => {
            if (this.source.id === startSource.id) this.tags = tags;
          });
        }
      },

      updateTagChoice() {
        if (this.tags) this.tagChoice = this.$route.params.tag || this.source.recentTag || this.source.defaultTag;
      },

      startSearch() {
        this.$router.push({ name: 'docs-search', query: { q: '' } });
      }
    },

    watch: {
      sourceChoice(src) {
        if (this.$route.params.source !== src) this.$router.push({ name: 'docs-source', params: { source: src } });
      },

      tagChoice(tag) {
        if (tag && this.$route.params.tag !== tag) {
          this.$router.push({ name: this.$route.name, params: Object.assign(this.$route.params, { tag: tag }) });
        }
      },

      source(source) {
        this.sourceChoice = source.id;
        this.tagChoice = null;
        this.loadTags();
      },

      search(q) {
        if (this.$route.query.q) this.$router.replace({ name: 'docs-search', query: { q } });
        else this.$router.push({ name: 'docs-search', query: { q } });
      },

      $route(to) {
        if (this.tagChoice && to.params.tag && this.tagChoice !== to.params.tag) this.tagChoice = to.params.tag;
      },
    },

    created() {
      this.loadTags();
    },

    mounted() {
      this.updateTagChoice();
    },
  };
</script>

