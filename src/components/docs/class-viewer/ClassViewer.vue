<template>
  <div v-if="clarse">
    <heading :clarse="clarse" :docs="docs" />

    <overview :properties="properties" :methods="methods" :events="clarse.events" />

    <h5 class="title is-4" v-if="properties && properties.length">Properties</h5>
    <property v-for="prop in properties" :prop="prop" :docs="docs" :key="prop" />

    <h5 class="title is-4" v-if="methods && methods.length">Methods</h5>
    <method v-for="method in methods" :method="method" :docs="docs" :key="method" />

    <h5 class="title is-4" v-if="clarse.events && clarse.events.length">Events</h5>
    <event v-for="event in clarse.events" :event="event" :docs="docs" :key="event" />
  </div>
  <unknown-page v-else class="docs-page" />
</template>

<script>
  import Heading from './Heading';
  import Overview from './Overview';
  import Property from './Property';
  import Method from './Method';
  import Event from './Event';

  export default {
    name: 'class-viewer',
    props: ['docs', 'showPrivate'],
    components: {
      Heading,
      Overview,
      Property,
      Method,
      Event,
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