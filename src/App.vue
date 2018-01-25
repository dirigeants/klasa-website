<template>
  <div id="app">
    <app-navbar :showNav="showNav" />
    <router-view />
    <app-footer />
  </div>
</template>

<script>
  import Vue from 'vue';
  import AppNavbar from './components/AppNavbar.vue';
  import AppFooter from './components/AppFooter.vue';
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

  Vue.component('font-awesome-icon', FontAwesomeIcon);

  export default {
    name: 'app',
    data() {
      return { showNav: false };
    },
    components: {
      AppNavbar,
      AppFooter
    }
  };

</script>
