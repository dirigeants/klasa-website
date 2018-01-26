<template>
  <section>
    <b-tabs v-model="activeTab">
        <b-tab-item label="Docs">
          <aside class="menu">
            <div class="is-pulled-right" @click="togglePrivate">
              <b-icon :icon="showPrivate ? 'eye' : 'eye-slash'" :title="showPrivate ? 'Hide private' : 'Show private'" />
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
        </b-tab-item>
        <b-tab-item label="Guide">
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

