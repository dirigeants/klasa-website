<template>
  <div id="docs-sidebar">





    <div id="open-btn" @click="toggle"><em class="fa fa-bars"></em></div>

    <div id="docs-sidebar-content" :class="visible ? 'open' : 'closed'">
      <div id="close-btn" @click="toggle">
        <em class="fa fa-arrow-left" aria-hidden="true"></em>
      </div>

      <em id="docs-visibility" class="fa" :class="showPrivate ? 'fa-eye' : 'fa-eye-slash'" :title="showPrivate ? 'Hide private' : 'Show private'" @click="togglePrivate"></em>

      <aside class="menu">
        <div v-for="(category, categoryID) in docs.custom">
          <p class="menu-label">
            {{ category.name }}
          </p>
          <ul class="menu-list">
            <li v-for="(file, fileID) in category.files">
              <router-link :to="{ name: 'docs-file', params: { category: categoryID, file: fileID } }">
                {{ file.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <p class="menu-label">
          Classes
        </p>
        <ul class="menu-list">
          <li v-for="clarse in docs.classes" v-if="showPrivate || clarse.access !== 'private'" :key="clarse.name" class="animated-list-item">
            <router-link exact :to="{ name: 'docs-class', params: { class: clarse.name } }">
              {{ clarse.name }}
            </router-link>
          </li>
        </ul>
        <p class="menu-label">
          Typedefs
        </p>
        <ul class="menu-list">
            <li v-for="typedef in docs.typedefs" v-if="showPrivate || typedef.access !== 'private'">
              <router-link exact :to="{ name: 'docs-typedef', params: { typedef: typedef.name } }">
                {{ typedef.name }}
              </router-link>
            </li>
        </ul>
      </aside>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'docs-sidebar',
    props: ['docs'],

    data() {
      return {
        visible: false,
        showPrivate: false,
      };
    },

    methods: {
      toggle() {
        this.visible = !this.visible;
      },

      togglePrivate() {
        this.showPrivate = !this.showPrivate;
      },
    },

    watch: {
      showPrivate(to) {
        this.$emit('showPrivate', to);
      },

      $route(to) {
        if (this.visible) this.visible = false;
        if (!to.query.scrollTo && (window.pageYOffset || document.documentElement.scrollTop) > 300) {
          window.scrollTo(0, 90);
        }
      },
    },
  };
</script>

