<template>
  <div id="home">
    <br>
    <br>
    <div class="container">
      <div class="has-text-centered">
        <p> Install klasa </p>
        <pre><code class="bash hljs">npm install klasa</code></pre>
        <p> Klasa master </p>
        <pre><code class="bash hljs">npm install dirigeants/klasa</code></pre>
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
