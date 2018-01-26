<template>
  <div class="columns">
    <div class="column" v-if="properties && properties.length">
      <div class="title">Properties</div>
      <transition-group name="animated-list" tag="ul">
        <li v-for="property in properties" :key="scopedName(property)" @click="scroll(scopedName(property))" class="animated-list-item">
          <router-link :to="{ name: 'docs-class', query: { scrollTo: scopedName(property) } }">
            {{ property.name }}
            <span class="tag is-primary is-pulled-right" v-if="property.scope === 'static'">S</span>
            <span class="tag is-info is-pulled-right" v-if="property.abstract">A</span>
            <span class="tag is-danger is-pulled-right" v-if="property.deprecated">D</span>
            <span class="tag is-warning is-pulled-right" v-if="property.access === 'private'">P</span>
          </router-link>
        </li>
      </transition-group>
    </div>

    <div class="column" v-if="methods && methods.length > 0">
      <div class="title">Methods</div>
      <transition-group name="animated-list" tag="ul">
        <li v-for="method in methods" :key="scopedName(method)" @click="scroll(scopedName(method))" class="animated-list-item">
          <router-link :to="{ name: 'docs-class', query: { scrollTo: scopedName(method) } }">
            {{ method.name }}
            <span class="tag is-primary is-pulled-right" v-if="method.scope === 'static'">S</span>
            <span class="tag is-info is-pulled-right" v-if="method.abstract">A</span>
            <span class="tag is-danger is-pulled-right" v-if="method.deprecated">D</span>
            <span class="tag is-warning is-pulled-right" v-if="method.access === 'private'">P</span>
          </router-link>
        </li>
      </transition-group>
    </div>

    <div class="column" v-if="events && events.length > 0">
      <div class="title">Events</div>
      <transition-group name="animated-list" tag="ul">
        <li v-for="event in events" :key="scopedName(event)" @click="scroll(event.name)">
          <router-link :to="{ name: 'docs-class', query: { scrollTo: event.name } }">
            {{ event.name }}
            <span class="tag is-danger is-pulled-right" v-if="event.deprecated">D</span>
          </router-link>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'class-overview',
    props: ['properties', 'methods', 'events'],

    methods: {
      scopedName(item) {
        return `${item.scope === 'static' ? 's-' : ''}${item.name}`;
      },

      scroll(to) {
        const el = document.getElementById(`doc-for-${to}`);
        el.setAttribute('data-scrolled', true);
        setTimeout(() => el.setAttribute('data-scrolled', false), 1000);
        el.scrollIntoView(true);
        window.scrollBy(0, -50);
      },
    },
  };
</script>

