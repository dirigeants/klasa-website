<template>
  <div v-if="typedef" >
    <div class="card">
      <header class="card-header">
        <nav class="card-header-title level is-marginless">
          <div class="level-left">
            <div class="level-item">
              <span v-if="typedef.deprecated"><span class="tag is-danger" title="This typedef is deprecated, and may be removed in a future version.">Deprecated</span>&nbsp;</span>
            </div>
            <span class="level-item is-size-3 is-marginless">
              {{ typedef.name }}&nbsp;
            </span>
          </div>
        </nav>
        <source-button class="card-header-icon" :meta="typedef.meta" :docs="docs" />
      </header>
      <div class="card-content" v-if="typedef.description || (typedef.props && typedef.props.length)">
        <p class="subtitle" v-html="description" v-if="typedef.description"></p>
        <div v-if="typedef.props && typedef.props.length">
          <strong>Properties:</strong>
          <param-table :params="typedef.props" :docs="docs" />
        </div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            <strong>Type:</strong>
            <span v-for="(type, index) of typedef.type" :key="type">
              <types :names="type" :nullable="typedef.nullable" :docs="docs" />
              <span v-if="index < typedef.type.length - 1"> | </span>
            </span>
          </span>
        </p>
      </footer>
    </div>
    <br />
  </div>
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

