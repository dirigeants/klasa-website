<template>
<footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
        <h3> Klasa </h3>
        <p> <strong> The most feature complete discord.js framework </strong> </p>
        <stats />
    </div>
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
