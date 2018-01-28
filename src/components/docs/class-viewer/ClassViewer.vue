<template>
  <div v-if="clarse">
    <heading :clarse="clarse" :docs="docs" />

    <overview :properties="properties" :methods="methods" :events="clarse.events" />

    <h5 class="title is-4" v-if="properties && properties.length">Properties</h5>
    <div v-for="prop in properties" :key="prop">
      <property :prop="prop" :docs="docs" />
      <br />
    </div>

    <h5 class="title is-4" v-if="methods && methods.length">Methods</h5>
    <div v-for="method in methods" :key="method">
      <method :method="method" :docs="docs" />
      <br />
    </div>

    <h5 class="title is-4" v-if="clarse.events && clarse.events.length">Events</h5>
    <div v-for="event in clarse.events" :key="event">
      <event :event="event" :docs="docs" />
      <br />
    </div>
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