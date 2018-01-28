<template>

  <div class="card" :id="`doc-for-${event.name}`">
    <header class="card-header">
      <p class="card-header-title">
        <span class="tag is-danger" v-if="event.deprecated" title="This event is deprecated, and may be removed in a future version.">Deprecated</span>
        <router-link :to="{ name: 'docs-class', query: { scrollTo: event.name } }">{{ event.name }}</router-link>
      </p>
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

<!--
  <section class="section" :id="`doc-for-${event.name}`">
    <source-button :meta="event.meta" :docs="docs" />

    <h5 class="title is-5">
      <span class="tag is-danger" v-if="event.deprecated" title="This event is deprecated, and may be removed in a future version.">Deprecated</span>
      <router-link :to="{ name: 'docs-class', query: { scrollTo: event.name } }">{{ event.name }}</router-link>
    </h5>

    <h6 class="subtitle is-6"  v-html="description"></h6>

    <param-table :params="event.params" :docs="docs" v-if="event.params && event.params.length > 0" />
    <see v-if="event.see" :see="event.see" :docs="docs" />
  </section>
-->
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
