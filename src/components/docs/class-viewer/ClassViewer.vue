<template>
  <div v-if="clarse" id="class-viewer" class="docs-page">
    <source-button :meta="clarse.meta" :docs="docs" />

    <h1>{{ clarse.name }}</h1>
    <p class="class-name-extra">
      <span v-if="clarse.extends">extends <type-link :type="clarse.extends" :docs="docs" /></span>
      <span v-if="clarse.implements">implements <type-link :type="clarse.implements" :docs="docs" /></span>
    </p>
    <span v-if="clarse.abstract" class="badge class-badge" title="This class is abstract, and may not be instantiated itself.">Abstract</span>
    <span v-if="clarse.deprecated" class="badge class-badge warn" title="This class is deprecated, and may be removed in a future version.">Deprecated</span>
    <span v-if="clarse.access === 'private'" class="badge class-badge warn" title="This class is private, and may change or be removed at any time.">Private</span>

    <p class="class-desc" v-html="description" v-if="clarse.description"></p>
    <see v-if="clarse.see" :see="clarse.see" :docs="docs" />

    <div id="class-constructor" v-if="clarse.construct && (showPrivate || clarse.construct.access !== 'private')">
      <h2>Constructor</h2>
      <pre v-highlightjs><code class="js">new {{ docs.global }}.{{ clarse.name }}(<span class="constructor-param" v-for="param in constructorParams">{{ param.name }}</span>);</code></pre>
      <param-table :params="clarse.construct.params" :docs="docs" />
    </div>
    <br>
    <overview :properties="properties" :methods="methods" :events="clarse.events" />

    <h2 class="title is-3" v-if="properties && properties.length">Properties</h2>
    <property v-for="prop in properties" :prop="prop" :docs="docs" :key="prop" />

    <h2 class="title is-3" v-if="methods && methods.length">Methods</h2>
    <method v-for="method in methods" :method="method" :docs="docs" :key="method" />

    <h2 class="title is-3" v-if="clarse.events && clarse.events.length">Events</h2>
    <event v-for="event in clarse.events" :event="event" :docs="docs" :key="event" />
  </div>
  <unknown-page v-else class="docs-page" />
</template>

<script>
  import Vue from 'vue';
  import TypeLink from '../TypeLink.vue';
  import ParamTable from './ParamTable.vue';
  import Overview from './Overview';
  import Property from './Property';
  import Method from './Method';
  import Event from './Event';
  import SourceButton from '../SourceButton.vue';
  import See from '../See';
  import { convertLinks } from '../../../util';

  export default {
    name: 'class-viewer',
    props: ['docs', 'showPrivate'],
    components: {
      TypeLink,
      ParamTable,
      Overview,
      Property,
      Method,
      Event,
      SourceButton,
      See,
    },

    data() {
      return {
        clarse: this.docs.classes.find(c => c.name === this.$route.params.class),
      };
    },

    computed: {
      constructorParams() {
        if (!this.clarse.construct || !this.clarse.construct.params) return null;
        return this.clarse.construct.params.filter(p => !p.name.includes('.'));
      },

      properties() {
        if (!this.clarse.props) return null;
        let props;
        if (this.showPrivate) props = this.clarse.props;
        else props = this.clarse.props.filter(p => p.access !== 'private');
        return props.sort((a, b) =>
          `${a.scope === 'static' ? 'ZZZ' : ''}${a.name}`.localeCompare(`${b.scope === 'static' ? 'ZZZ' : ''}${b.name}`)
        );
      },

      methods() {
        if (!this.clarse.methods) return null;
        let methods;
        if (this.showPrivate) methods = this.clarse.methods;
        else methods = this.clarse.methods.filter(p => p.access !== 'private');
        return methods.sort((a, b) =>
          `${a.scope === 'static' ? 'ZZZ' : ''}${a.name}`.localeCompare(`${b.scope === 'static' ? 'ZZZ' : ''}${b.name}`)
        );
      },

      description() {
        return Vue.filter('marked')(convertLinks(this.clarse.description, this.docs, this.$router, this.$route));
      },
    },
  };
</script>