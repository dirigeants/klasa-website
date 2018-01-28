<template>
  <section>
    <div @click="toggle" class="button is-white is-hidden-tablet"><b-icon icon="bars" /></div>
    <b-tabs v-model="activeTab">
      <b-tab-item label="Docs">
        <aside class="menu">
          <div class="is-pulled-right" @click="togglePrivate">
            <b-icon :icon="showPrivate ? 'eye' : 'eye-slash'" :title="showPrivate ? 'Hide private' : 'Show private'" size="is-small" />
          </div>
          <p class="menu-label">
            Classes
          </p>
          <ul class="menu-list">
            <li v-for="clarse in docs.classes" v-if="showPrivate || clarse.access !== 'private'" class="animated-list-item">
              <router-link exact :to="{ name: 'docs-class', params: { class: clarse.name } }" :class="`${active === clarse.name ? 'is-active' : ''}`">
                {{ clarse.name }}
              </router-link>
            </li>
          </ul>
          <p class="menu-label">
            Typedefs
          </p>
          <ul class="menu-list">
              <li v-for="typedef in docs.typedefs" v-if="showPrivate || typedef.access !== 'private'" class="animated-list-item">
                <router-link exact :to="{ name: 'docs-typedef', params: { typedef: typedef.name } }" :class="`${active === typedef.name ? 'is-active' : ''}`">
                  {{ typedef.name }}
                </router-link>
              </li>
          </ul>
        </aside>
      </b-tab-item>
      <b-tab-item label="Guide">
        <aside class="menu">
          <div v-for="(category, categoryID) in docs.custom" v-if="category.name !== 'General'">
            <p class="menu-label">
              {{ category.name }}
            </p>
            <ul class="menu-list">
              <li v-for="(file, fileID) in category.files"  class="animated-list-item">
                <router-link :to="{ name: 'docs-file', params: { category: categoryID, file: fileID } }" :class="`${active === fileID ? 'is-active' : ''}`">
                  {{ file.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </aside>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
  export default {
    name: 'docs-sidebar',
    props: ['docs'],

    data() {
      return {
        showPrivate: false,
        active: this.$route.params.class || this.$route.params.typedef || this.$route.params.file,
      };
    },

    methods: {
      toggle() {
        this.$parent.visible = !this.$parent.visible;
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
        if (this.$parent.visible) this.$parent.visible = false;
        if (!to.query.scrollTo && (window.pageYOffset || document.documentElement.scrollTop) > 300) {
          window.scrollTo(0, 90);
        }
        this.active = this.$route.params.class || this.$route.params.typedef || this.$route.params.file;
      },
    },
  };
</script>

