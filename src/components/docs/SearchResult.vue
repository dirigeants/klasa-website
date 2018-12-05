<template>
	<li class="animated-list-item">
		<span v-if="scores" class="score">
			{{ Math.round(result.score * 100) }}%
		</span>
		<router-link :to="result.route">
			<span :class="`tag ${color}`" :title="result.badge">
				{{ result.badge[0] }}
			</span>
			<span v-html="highlightedName" />
		</router-link>
	</li>
</template>

<script>
export default {
	name: 'SearchResult',
	props: ['search', 'result', 'scores', 'color'],

	computed: {
		highlightedName() {
			return `${this.result.name.replace(new RegExp(this.search.split(' ').join('|'), 'ig'), match => `<strong>${match}</strong>`)}${this.result.badge === 'Method' ? '()' : ''}`;
		}
	}
};
</script>
