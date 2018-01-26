<template>
  <div v-if="clarse">
    <heading :clarse="clarse" :docs="docs" />

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
  import TypeLink from '../TypeLink.vue';
  import ParamTable from './ParamTable.vue';
  import Heading from './Heading';
  import Overview from './Overview';
  import Property from './Property';
  import Method from './Method';
  import Event from './Event';
  import SourceButton from '../SourceButton.vue';
  import See from '../See';

  export default {
    name: 'class-viewer',
    props: ['docs', 'showPrivate'],
    components: {
      TypeLink,
      ParamTable,
      Heading,
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

    },
  };
</script>