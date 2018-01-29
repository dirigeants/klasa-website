<template>
  <div class="site">
      <app-navbar />
      <router-view class="site-content" />
      <app-footer />
  </div>
</template>

<script>
  import AppNavbar from './components/AppNavbar.vue';
  import AppFooter from './components/AppFooter.vue';

  export default {
    name: 'app',
    components: {
      AppNavbar,
      AppFooter
    }
  };

</script>

<style lang="scss">

  $light: #d3d3d3;
  $menu-item-hover-background-color: #d3d3d3;
  $footer-background-color: #d3d3d3;
  $menu-item-active-background-color: hsl(204, 86%, 53%);

  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  .site {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .site-content {
    flex: 1;
  }

  .footer {
    padding: 1.5rem 1.5rem 1.5rem;
  }

  .level-left {
    .has-text-left {
      justify-content: left;
    }
  }

  .card-footer-item {
    justify-content: left;
  }

  pre {
    padding: 0px !important;
  }
  .hljs {
    border-radius: $radius-large;
    padding: 1em !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-resize-enter-active, .fade-resize-leave-active {
    transition: opacity 0.3s, transform 0.3s;
    transform-origin: top;
  }
  .fade-resize-enter, .fade-resize-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }

  .fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.15s, transform 0.15s;
  }
  .fade-slide-enter, .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .animated-list-item {
    transition: all 0.3s;
  }
  .animated-list-enter, .animated-list-leave-to {
    opacity: 0;
    transform: scale(0.4);
  }
  .animated-list-leave-active {
    position: absolute;

    .tag {
      display: none;
    }
  }

</style>