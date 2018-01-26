<template>
  <section class="section">
    <source-button :meta="clarse.meta" :docs="docs" />

    <p class="title">
      <span class="tag is-info" v-if="clarse.abstract" title="This class is abstract, and may not be instantiated itself.">Abstract</span>
      <span class="tag is-danger" v-if="clarse.deprecated" title="This class is deprecated, and may be removed in a future version.">Deprecated</span>
      <span class="tag is-warning" v-if="clarse.access === 'private'" title="This class is private, and may change or be removed at any time.">Private</span>
      {{ clarse.name }}
      <span class="subtitle" v-if="clarse.extends || clarse.implements">
        <span v-if="clarse.extends">extends <type-link :type="clarse.extends" :docs="docs" /></span>
        <span v-if="clarse.implements">implements <type-link :type="clarse.implements" :docs="docs" /></span>
      </span>
    </p>

    <h4 class="subtitle" v-html="description" v-if="clarse.description"></h4>

    <see v-if="clarse.see" :see="clarse.see" :docs="docs" />

    <div v-if="clarse.construct && (showPrivate || clarse.construct.access !== 'private')">
      <strong>Constructor:</strong>
      <pre v-highlightjs><code class="js">new {{ docs.global }}.{{ clarse.name }}({{ constructorParams }});</code></pre>
      <param-table :params="clarse.construct.params" :docs="docs" />
    </div>

	</section>
</template>

<script>
  import Vue from 'vue';
  import { convertLinks } from '../../../util';
  import TypeLink from '../TypeLink.vue';
  import ParamTable from './ParamTable.vue';
  import SourceButton from '../SourceButton.vue';
  import See from '../See';


  export default {
    name: 'class-heading',
    props: ['clarse', 'docs'],
    components: {
      TypeLink,
      ParamTable,
      SourceButton,
      See,
    },
    computed: {
      constructorParams() {
        if (!this.clarse.construct || !this.clarse.construct.params) return null;
        return this.clarse.construct.params.filter(p => !p.name.includes('.')).map(p => p.name).join(', ');
      },
      description() {
        return Vue.filter('marked')(convertLinks(this.clarse.description, this.docs, this.$router, this.$route));
      },
    }
  };
</script>