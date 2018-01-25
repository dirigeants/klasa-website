<template>
  <div id="class-overview">
    <div class="col" v-if="properties && properties.length > 0">
      <div class="title">Properties</div>
      <transition-group name="animated-list" tag="ul">
        <li v-for="property in properties" :key="scopedName(property)" @click="scroll(scopedName(property))" class="animated-list-item">
          <router-link :to="{ name: 'docs-class', query: { scrollTo: scopedName(property) } }">
            {{ property.name }}
            <span v-if="property.scope === 'static'" class="small-badge">S</span>
            <span v-if="property.abstract" class="small-badge">A</span>
            <span v-if="property.deprecated" class="small-badge warn">D</span>
            <span v-if="property.access === 'private'" class="small-badge warn">P</span>
          </router-link>
        </li>
      </transition-group>
    </div>

    <div class="col" v-if="methods && methods.length > 0">
      <div class="title">Methods</div>
      <transition-group name="animated-list" tag="ul">
        <li v-for="method in methods" :key="scopedName(method)" @click="scroll(scopedName(method))" class="animated-list-item">
          <router-link :to="{ name: 'docs-class', query: { scrollTo: scopedName(method) } }">
            {{ method.name }}
            <span v-if="method.scope === 'static'" class="small-badge">S</span>
            <span v-if="method.abstract" class="small-badge">A</span>
            <span v-if="method.deprecated" class="small-badge warn">D</span>
            <span v-if="method.access === 'private'" class="small-badge warn">P</span>
          </router-link>
        </li>
      </transition-group>
    </div>

    <div class="col" v-if="events && events.length > 0">
      <div class="title">Events</div>
      <ul>
        <li v-for="event in events" @click="scroll(event.name)">
          <router-link :to="{ name: 'docs-class', query: { scrollTo: event.name } }">
            {{ event.name }}
            <span v-if="event.deprecated" class="small-badge warn">D</span>
          </router-link>
        </li>
      </ul>
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

