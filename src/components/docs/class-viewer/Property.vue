<template>
  <div class="card" :id="`doc-for-${scrollTo}`">
    <header class="card-header">
      <p class="card-header-title">
        <span class="tag is-primary" v-if="prop.scope === 'static'" title="This property is on the class constructor function, not instances.">Static</span>
        <span class="tag is-success" v-if="prop.readonly" title="This property cannot be modified.">Read-only</span>
        <span class="tag is-danger"  v-if="prop.deprecated" title="This property is deprecated, and may be removed in a future version.">Deprecated</span>
        <span class="tag is-warning" v-if="prop.access === 'private'" title="This property is private, and may change or be removed at any time.">Private</span>
        <router-link :to="{ name: 'docs-class', query: { scrollTo } }">.{{ prop.name }}</router-link>
      </p>
      <source-button class="card-header-icon" :meta="prop.meta" :docs="docs" />
    </header>
    <div class="card-content">
      <div class="content" v-html="description"></div>
      <param-table :params="prop.props" :docs="docs" v-if="prop.props && prop.props.length" />
    </div>
    <footer class="card-footer">
      <p class="card-footer-item">
        <span>
          <strong>Type:</strong>
          <span v-for="(type, index) of prop.type" :key="type">
            <types :names="type" :nullable="prop.nullable" :docs="docs" />
            <span v-if="index < prop.type.length - 1"> | </span>
          </span>
        </span>
      </p>
      <p v-if="prop.default" class="card-footer-item">
        <span>
          <strong>Default:</strong> <code>{{ prop.default }}</code>
        </span>
      </p>
      <p v-if="prop.see" class="card-footer-item">
        <see :see="prop.see" :docs="docs" />
      </p>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Types from '../Types.vue';
  import ParamTable from './ParamTable.vue';
  import SourceButton from '../SourceButton.vue';
  import See from '../See.vue';
  import { convertLinks } from '../../../util';

  export default {
    name: 'class-property',
    props: ['prop', 'docs'],
    components: {
      Types,
      ParamTable,
      SourceButton,
      See,
    },

    computed: {
      description() {
        return Vue.filter('marked')(convertLinks(this.prop.description, this.docs, this.$router, this.$route));
      },

      scrollTo() {
        return `${this.prop.scope === 'static' ? 's-' : ''}${this.prop.name}`;
      },
    },
  };
</script>

