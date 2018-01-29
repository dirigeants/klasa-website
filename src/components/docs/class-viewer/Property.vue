<template>
  <div class="card" :id="`doc-for-${scrollTo}`">
    <header class="card-header">
      <nav class="card-header-title level is-marginless">
        <div class="level-left">
          <div class="level-item has-text-left">
            <span v-if="prop.scope === 'static'"><span class="tag is-primary" title="This property is on the class constructor function, not instances.">Static</span>&nbsp;</span>
            <span v-if="prop.readonly"><span class="tag is-success" title="This property cannot be modified.">Read-only</span>&nbsp;</span>
            <span v-if="prop.deprecated"><span class="tag is-danger"  title="This property is deprecated, and may be removed in a future version.">Deprecated</span>&nbsp;</span>
            <span v-if="prop.access === 'private'"><span class="tag is-warning" title="This property is private, and may change or be removed at any time.">Private</span>&nbsp;</span>
          </div>
          <span class="level-item has-text-left is-marginless">
            <router-link :to="{ name: 'docs-class', query: { scrollTo } }">.{{ prop.name }}</router-link>
          </span>
        </div>
      </nav>
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

