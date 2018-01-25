<template>
  <nav class="navbar is-info">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://klasa.js.org">
        <img src="../assets/logo.png" alt="Klasa">
      </a>
    </div>
    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="https://klasa.js.org">
          Home
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link class="navbar-link" to="/docs"> Docs </router-link>
          <div class="navbar-dropdown is-boxed">
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
            <router-link class="navbar-link" to="/tutorials"> Tutorials </router-link>
          <div class="navbar-dropdown is-boxed">
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <a href="https://github.com/dirigeants/klasa" class="navbar-item">
        <font-awesome-icon :icon="['fab', 'github']" />&nbsp;Github
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar'
  };
</script>

