<template>
  <footer class="footer">
    <div class="content has-text-centered">
        <h3> Klasa </h3>
        <p> <strong> The most feature complete discord.js bot framework </strong> </p>
        <stats />
    </div>
  </footer>
</template>

<script>
  import Stats from './Stats.vue';

  export default {
    name: 'AppFooter',
    components: {
      Stats,
    },
  };
</script>
