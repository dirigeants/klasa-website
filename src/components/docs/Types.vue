<template>
  <span class="docs-type">
    {{ nullable ? '?' : ''}}{{ variable ? '...' : '' }}<!--
    --><type-link v-for="type in names" :type="type" :docs="docs" :key="typeKey(type)" />
  </span>
</template>

<script>
  import TypeLink from './TypeLink.vue';
  import { typeKey } from '../../util';
  export default {
    name: 'types',
    props: ['names', 'variable', 'nullable', 'docs'],
    components: {
      TypeLink,
    },
    methods: {
      typeKey(type) {
        return typeof type === 'string' ? type : type.join('-');
      },
    },
  };
</script>