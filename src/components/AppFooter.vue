<template>
  <footer class="footer">
    <div class="container">
    <div class="content has-text-centered">
      <p>
        <strong>Let's stop reinventing the wheel, and start coding the bots of our dreams!</strong>
      </p>
      <div class="columns">
        <div class="column is-two-fifths is-hidden-tablet"></div>
        <div class="column">
          <a href="https://discord.gg/FpEFSyY" class="button is-info">
            <span>Have questions?</span>
            <span class="icon"><i class="fab fa-discord"></i></span>
          </a>
        </div>
        <div class="column">
          <a href="https://www.npmjs.com/package/klasa" class="button is-info">
            <span>Published using:</span>
            <span class="icon"><i class="fab fa-npm"></i></span>
          </a>
        </div>
        <div class="column is-two-fifths is-hidden-tablet"></div>
      </div>
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
