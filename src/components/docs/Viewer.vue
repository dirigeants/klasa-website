<template>
    <div class="columns">
      <div class="column is-one-fifth is-hidden-mobile">
        <sidebar :docs="docs" @showPrivate="setShowPrivate" />
      </div>
      <div class="column">
        <transition name="fade-slide" mode="out-in">
          <router-view :docs="docs" :key="key" :showPrivate="showPrivate" />
        </transition>
        <section class="section">
          <div class="container">
            <div class="content has-text-right">
              <p>
                Documentation built at {{ new Date(docs.meta.date).toUTCString() }}.<br />
                Generator: v{{ docs.meta.generator }} &nbsp; Format: {{ docs.meta.format }}
              </p>
            </div>
          </div>
        </section>
        <button class="button is-info" title="Scroll to top" @click="scrollTop"><b-icon icon="arrow-up" /></button>
      </div>
    </div>  
</template>

<script>
  import Sidebar from './Sidebar.vue';

  export default {
    name: 'docs-viewer',
    props: ['docs'],
    components: {
      Sidebar,
    },

    data() {
      return {
        showPrivate: false,
      };
    },

    computed: {
      key() {
        const params = this.$route.params;
        if (params.file) return `${params.category}/${params.file}`;
        if (params.search) return 'search';
        return params.class || params.typedef;
      },
    },

    methods: {
      setShowPrivate(show) {
        this.showPrivate = show;
      },

      scrollTop() {
        window.scrollTo(0, 0);
      },
    }
  };
</script>
