<template>
  <div id="home">
    <h1><b-icon icon="home" /> Home!</h1>
    <pre v-highlightjs><code class="javascript">const test = "Hi";</code></pre>
    <b-notification type="is-success">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
    </b-notification>
    <b-icon icon="user" />
  </div>
</template>

<script>
  export default {
    name: 'home'
  };
</script>
