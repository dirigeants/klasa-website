<template>
  <div class="container">
    <div class="has-text-centered">
      <p> Install klasa </p>
      <pre v-highlightjs><code class="bash">npm install klasa</code></pre>
      <p> Klasa master </p>
      <pre v-highlightjs><code class="bash">npm install dirigeants/klasa</code></pre>
    </div>
    <br>
    <br>
    <pre v-highlightjs><code class="javascript">const klasa = { awesome: true, powerful: true, advanced: true }; </code></pre>
  </div>
</template>

<script>
  export default {
    name: 'home',
  };
</script>
