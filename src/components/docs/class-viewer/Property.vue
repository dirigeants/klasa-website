<template>
  <section class="section" :id="`doc-for-${scrollTo}`">
    <source-button :meta="prop.meta" :docs="docs" />

    <h5 class="title is-5">
      <span class="tag is-primary" v-if="prop.scope === 'static'" title="This property is on the class constructor function, not instances.">Static</span>
      <span class="tag is-success" v-if="prop.readonly" title="This property cannot be modified.">Read-only</span>
      <span class="tag is-danger"  v-if="prop.deprecated" title="This property is deprecated, and may be removed in a future version.">Deprecated</span>
      <span class="tag is-warning" v-if="prop.access === 'private'" title="This property is private, and may change or be removed at any time.">Private</span>
      <router-link :to="{ name: 'docs-class', query: { scrollTo } }">.{{ prop.name }}</router-link>
    </h5>
    
    <h6 class="subtitle is-6" v-html="description"></h6>

    <param-table :params="prop.props" :docs="docs" v-if="prop.props && prop.props.length" />

    <strong>Type:</strong>
    <types v-for="type in prop.type" :names="type" :nullable="prop.nullable" :docs="docs" :key="type" />

    <div v-if="prop.default">
      <strong>Default:</strong> <code>{{ prop.default }}</code>
    </div>
    <see v-if="prop.see" :see="prop.see" :docs="docs" />
  </section>
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

