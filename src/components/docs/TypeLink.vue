<template>
	<span>
		<span v-if="!link" :title="type[0] === '*' ? 'Any type' : null">
			{{ typeName }}
		</span>
		<router-link v-else-if="typeof link === 'object'" :to="link">
			{{ typeName }}
		</router-link>
		<a v-else :href="link">
			{{ typeName }}
		</a>
		<span v-if="type[1]">
			{{ type[1] }}
		</span>
	</span>
</template>

<script>
export default {
	name: 'TypeLink',
	props: ['docs', 'type'],
	computed: {
		typeName() {
			if (this.type[0] === 'function') return 'Function';
			if (this.type[0].startsWith('external:')) return this.type[0].slice(9);
			return this.type[0];
		},
		link() {
			if (this.docs.links[this.type[0]]) return this.docs.links[this.type[0]];
			return null;
		}
	}
};
</script>
