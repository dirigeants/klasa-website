<template>
  <div id="app">
    <app-navbar/>
    <router-view/>
  </div>
</template>

<script>
  import AppNavbar from './components/AppNavbar.vue';
  export default {
    name: 'app',
    components: {
      AppNavbar,
    },
  };

</script>
