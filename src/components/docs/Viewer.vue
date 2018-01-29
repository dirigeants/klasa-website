<template>
  <div class="columns is-gapless">
    <div :class="`column is-one-fifth ${visible ? '' : 'is-hidden-mobile'}`" >
      <sidebar :docs="docs" @showPrivate="setShowPrivate" />
    </div>
    <div class="column">
      <div @click="toggle" :class="`button is-white ${visible ? 'is-hidden-mobile' : 'is-hidden-tablet'}`"><b-icon icon="bars" /></div>
      <section class="section">
        <transition name="fade-slide" mode="out-in" appear>
          <router-view :docs="docs" :key="key" :showPrivate="showPrivate" />
        </transition>

        <div class="content has-text-right">
          <p>
            Documentation built at {{ new Date(docs.meta.date).toUTCString() }}.<br />
            Generator: v{{ docs.meta.generator }} &nbsp; Format: {{ docs.meta.format }}
          </p>
        </div>
      </section>
      <button id="scroll-top" class="button is-info is-rounded" title="Scroll to top" @click="scrollTop"><b-icon icon="arrow-up" /></button>
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
        visible: false,
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
      toggle() {
        this.visible = !this.visible;
      },
      setShowPrivate(show) {
        this.showPrivate = show;
      },

      scrollTop() {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
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

<style lang="scss">
  #scroll-top {
    position: fixed;
    bottom: 20px;
    right: 20px;

    transition: opacity 0.5s, background 0.3s;
    display: none;
    opacity: 0;

    &:hover {
      background: lighten(#2196F3, 18%);
    }
  }
</style>