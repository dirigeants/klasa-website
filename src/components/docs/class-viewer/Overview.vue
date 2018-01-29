<template>
  <div>
    <div class="columns is-8">
      <div class="column is-4" v-if="properties && properties.length">
        <aside class="menu">
          <p class="menu-label">Properties</p>
          <ul class="menu-list">
            <li v-for="property in properties" :key="scopedName(property)" @click="scroll(scopedName(property))" class="animated-list-item">
              <router-link :to="{ name: 'docs-class', query: { scrollTo: scopedName(property) } }">
                {{ property.name }}
                <span v-if="property.scope === 'static'"><span class="tag is-primary is-pulled-right">S</span>&nbsp;</span>
                <span v-if="property.readonly"><span class="tag is-success is-pulled-right">R</span>&nbsp;</span>
                <span v-if="property.abstract"><span class="tag is-info is-pulled-right">A</span>&nbsp;</span>
                <span v-if="property.deprecated"><span class="tag is-danger is-pulled-right">D</span>&nbsp;</span>
                <span v-if="property.access === 'private'"><span class="tag is-warning is-pulled-right">P</span>&nbsp;</span>
              </router-link>
            </li>
          </ul>
        </aside>
      </div>

      <div class="column is-4" v-if="methods && methods.length">
        <aside class="menu">
          <p class="menu-label">Methods</p>
          <ul class="menu-list">
            <li v-for="method in methods" :key="scopedName(method)" @click="scroll(scopedName(method))" class="animated-list-item">
              <router-link :to="{ name: 'docs-class', query: { scrollTo: scopedName(method) } }">
                {{ method.name }}
                <span v-if="method.scope === 'static'"><span class="tag is-primary is-pulled-right">S</span>&nbsp;</span>
                <span v-if="method.abstract"><span class="tag is-info is-pulled-right">A</span>&nbsp;</span>
                <span v-if="method.deprecated"><span class="tag is-danger is-pulled-right">D</span>&nbsp;</span>
                <span v-if="method.access === 'private'"><span class="tag is-warning is-pulled-right">P</span>&nbsp;</span>
              </router-link>
            </li>
          </ul>
        </aside>
      </div>

      <div class="column is-4" v-if="events && events.length">
        <aside class="menu">
          <p class="menu-label">Events</p>
          <ul class="menu-list">
            <li v-for="event in events" :key="scopedName(event)" @click="scroll(event.name)" class="animated-list-item">
              <router-link :to="{ name: 'docs-class', query: { scrollTo: event.name } }">
                {{ event.name }}
                <span v-if="event.deprecated"><span class="tag is-danger is-pulled-right">D</span>&nbsp;</span>
              </router-link>
            </li>
          </ul>
        </aside>
      </div>
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

