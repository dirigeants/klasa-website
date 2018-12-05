<template>
	<span>
		{{ nullable ? '?' : '' }}{{ variable ? '...' : '' }}<!--
		--><type-link v-for="type in names" :key="typeKey(type)" :type="type" :docs="docs" />
	</span>
</template>

<script>
import TypeLink from './TypeLink.vue';

export default {
	name: 'Types',

	components: { TypeLink },

	props: ['names', 'variable', 'nullable', 'docs'],

	methods: {
		typeKey(type) {
			return typeof type === 'string' ? type : type.join('-');
		}
	}
};
</script>
