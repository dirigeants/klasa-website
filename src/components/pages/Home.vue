<template>
  <div id="home">
    <br>
    <br>
    <div class="container">
      <div class="has-text-centered">
        <p> Install klasa </p>
        <code class="bash" v-highlightjs> npm install klasa </code>
        <p> Klasa master </p>
        <code class="bash" v-highlightjs> npm install klasa </code>
      </div>
      <br>
      <br>
      <pre v-highlightjs><code class="javascript">const klasa = { awesome: true, powerful: true, advanced: true }; </code></pre>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home'
  };
</script>
