<template>
  <div id="docs-viewer">
    <div class="container">
      <sidebar :docs="docs" @showPrivate="setShowPrivate" />
      <transition name="fade-slide" mode="out-in">
        <router-view :docs="docs" :key="key" :showPrivate="showPrivate" />
      </transition>
    </div>

    <div id="docs-meta">
      <p>
        Documentation built at {{ new Date(docs.meta.date).toUTCString() }}.<br />
        Generator: v{{ docs.meta.generator }} &nbsp; Format: {{ docs.meta.format }}
      </p>
    </div>

    <div id="scroll-top" title="Scroll to top" @click="scrollTop"><em class="fa fa-arrow-up"></em></div>
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
    },

    mounted() {
      this.$nextTick(() => {
        const scroller = document.getElementById('scroll-top');
        let hideTimeout;
        let showTimeout;

        const showListener = () => {
          if ((window.pageYOffset || document.documentElement.scrollTop) > 300) {
            clearTimeout(hideTimeout);
            clearTimeout(showTimeout);
            scroller.style.display = 'block';
            showTimeout = setTimeout(() => { scroller.style.opacity = '1'; }, 20);
            window.removeEventListener('scroll', showListener);
            window.addEventListener('scroll', hideListener);
          }
        };

        const hideListener = () => {
          if ((window.pageYOffset || document.documentElement.scrollTop) < 300) {
            clearTimeout(hideTimeout);
            clearTimeout(showTimeout);
            scroller.style.opacity = '0';
            hideTimeout = setTimeout(() => { scroller.style.display = 'none'; }, 1000);
            window.removeEventListener('scroll', hideListener);
            window.addEventListener('scroll', showListener);
          }
        };

        window.addEventListener('scroll', showListener);
      });
    },
  };
</script>

