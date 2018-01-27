<template>
  <div id="app">
    <div class="container">
      <app-navbar />
      <router-view />
      <app-footer />
    </div>
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

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

  pre {
    padding: 0px;
    background-color: #282c34;
  }
  .hljs {
    padding: 1em;
  }
</style>