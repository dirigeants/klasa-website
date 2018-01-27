<template>
  <section class="section" v-if="typedef">
      <source-button :meta="typedef.meta" :docs="docs" />
      
      <div v-if="typedef.deprecated" class="tag is-danger is-pulled-right" title="This typedef is deprecated, and may be removed in a future version.">Deprecated</div>
      <p class="title">{{ typedef.name }}</p>
      
      <p class="subtitle" v-html="description" v-if="typedef.description"></p>
      <see v-if="typedef.see" :see="typedef.see" :docs="docs" />

      <strong>Types:</strong>
      <ul>
        <li v-for="type in typedef.type" :key="type"><types :names="type" :docs="docs" /></li>
      </ul>

      <br />

      <div v-if="typedef.props && typedef.props.length">
        <strong>Properties:</strong>
        <param-table :params="typedef.props" :docs="docs" />
      </div>
  </section>
  <unknown-page v-else />
</template>

<script>
  import Vue from 'vue';
  import { convertLinks } from '../../util';
  import Types from './Types.vue';
  import ParamTable from './class-viewer/ParamTable.vue';
  import SourceButton from './SourceButton.vue';
  import See from './See.vue';

  export default {
    name: 'typedef-viewer',
    props: ['docs'],
    components: {
      Types,
      ParamTable,
      SourceButton,
      See,
    },

    data() {
      return {
        typedef: this.docs.typedefs.find(t => t.name === this.$route.params.typedef),
      };
    },

    computed: {
      description() {
        return Vue.filter('marked')(convertLinks(this.typedef.description, this.docs, this.$router, this.$route));
      },
    },
  };
</script>

