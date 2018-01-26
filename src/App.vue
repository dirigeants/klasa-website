<template>
  <div id="app">
    <app-navbar />
    <router-view />
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
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  $notification-radius: 0 !default;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>