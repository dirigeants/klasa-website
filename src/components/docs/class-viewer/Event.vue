<template>
  <div class="card" :id="`doc-for-${event.name}`">
    <header class="card-header">
      <nav class="card-header-title level is-marginless">
        <div class="level-left">
          <div class="level-item has-text-left">
            <span v-if="event.deprecated" ><span class="tag is-danger" title="This event is deprecated, and may be removed in a future version.">Deprecated</span>&nbsp;</span>
          </div>
          <span class="level-item has-text-left is-marginless">
            <router-link :to="{ name: 'docs-class', query: { scrollTo: event.name } }">{{ event.name }}</router-link>
          </span>
        </div>
      </nav>
      <source-button class="card-header-icon" :meta="event.meta" :docs="docs" />
    </header>
    <div class="card-content">
      <div class="content" v-html="description"></div>
      <param-table :params="event.params" :docs="docs" v-if="event.params && event.params.length" />
    </div>
    <footer class="card-footer">
      <p v-if="event.see" class="card-footer-item">
        <see :see="event.see" :docs="docs" />
      </p>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue';
  import ParamTable from './ParamTable.vue';
  import SourceButton from '../SourceButton.vue';
  import See from '../See';
  import { convertLinks } from '../../../util';

  export default {
    name: 'class-event',
    props: ['event', 'docs'],
    components: {
      ParamTable,
      SourceButton,
      See,
    },

    computed: {
      description() {
        return Vue.filter('marked')(convertLinks(this.event.description, this.docs, this.$router, this.$route));
      },
    },
  };
</script>
