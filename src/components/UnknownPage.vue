<template>
  <div>
    <h1>Unknown {{ type || 'page' }}</h1>
    <p>This page doesn't actually exist. <b-icon icon="frown" /></p>
  </div>
</template>

<script>
  export default {
    name: 'unknown-page',
    props: ['type'],
  };
</script>

