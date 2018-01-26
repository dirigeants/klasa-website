<template>
  <section class="section">

    <p>
      <h1 class="title">
        <span class="tag is-info" v-if="clarse.abstract" title="This class is abstract, and may not be instantiated itself.">Abstract</span>
        <span class="tag is-danger" v-if="clarse.deprecated" title="This class is deprecated, and may be removed in a future version.">Deprecated</span>
        <span class="tag is-warning" v-if="clarse.access === 'private'" title="This class is private, and may change or be removed at any time.">Private</span>
        {{ clarse.name }}
      </h1>
      <h6 v-if="clarse.extends || clarse.implements" class="is-6">
        <span v-if="clarse.extends">extends <type-link :type="clarse.extends" :docs="docs" /></span>
        <span v-if="clarse.implements">implements <type-link :type="clarse.implements" :docs="docs" /></span>
      </h6>
    </p>

    <h2 class="subtitle" v-html="description" v-if="clarse.description"></h2>
    <see v-if="clarse.see" :see="clarse.see" :docs="docs" />

    <section class="section" v-if="clarse.construct && (showPrivate || clarse.construct.access !== 'private')">
      <strong>Constructor:</strong>
      <pre v-highlightjs>
        <code class="js">new {{ docs.global }}.{{ clarse.name }}(<span v-for="param in constructorParams">{{ param.name }}</span>);</code>
      </pre>
      <param-table :params="clarse.construct.params" :docs="docs" />
    </section>

	</section>
</template>

<script>
  import Vue from 'vue';
  import { convertLinks } from '../../../util';

  export default {
    name: 'class-heading',
    props: ['clarse', 'docs'],
    computed: {
      constructorParams() {
        if (!this.clarse.construct || !this.clarse.construct.params) return null;
        return this.clarse.construct.params.filter(p => !p.name.includes('.'));
      },
      description() {
        return Vue.filter('marked')(convertLinks(this.clarse.description, this.docs, this.$router, this.$route));
      },
    }
  };
</script>