<template>
	<span>
		{{ nullable ? '?' : '' }}{{ variable ? '...' : '' }}<!--
		--><type-link v-for="type in names" :type="type" :docs="docs" :key="typeKey(type)" />
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
