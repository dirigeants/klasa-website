<template>
  <div id="home">
    <h1><font-awesome-icon icon="home" /> <font-awesome-icon icon="github" /> Home!</h1>
    <pre v-highlightjs><code class="javascript">const test = "Hi";</code></pre>
  </div>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
    name: 'home',
    components: { FontAwesomeIcon }
  };
</script>
