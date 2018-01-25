<template>
  <span class="docs-type">
    {{ nullable ? '?' : ''}}{{ variable ? '...' : '' }}<!--
    --><type-link v-for="type in names" :type="type" :docs="docs" :key="type" />
  </span>
</template>

<script>
  import TypeLink from './TypeLink.vue';

  export default {
    name: 'types',
    props: ['names', 'variable', 'nullable', 'docs'],
    components: {
      TypeLink,
    },
  };
</script>

