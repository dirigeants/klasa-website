<template>
  <nav class="navbar is-info">
    <div class="navbar-brand">
      <router-link class="navbar-item title is-4 is-marginless" to="/">
        <img src="../assets/logo_white-bg.png" class="" alt="Klasa">&nbsp;&nbsp;Klasa
      </router-link>
      <router-link to="/docs" class="navbar-item is-hidden-desktop">
        <b-icon icon="book" />&nbsp;Docs
      </router-link>
      <a href="https://github.com/dirigeants/klasa" class="navbar-item is-hidden-desktop">
        <i class="fab fa-github"></i>&nbsp;Github
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link class="navbar-item" to="/docs">
          <b-icon icon="book" />&nbsp;Docs
        </router-link>
        <a href="https://github.com/dirigeants/klasa" class="navbar-item">
          <i class="fab fa-github"></i>&nbsp;Github
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  export default { name: 'AppNavbar' };
</script>
