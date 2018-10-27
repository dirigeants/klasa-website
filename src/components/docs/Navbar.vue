<template>
	<div class="notification is-light is-radiusless is-paddingless">
		<div class="container">
			<nav class="level is-mobile docs-nav">

				<div class="level-left">
					<p class="level-item is-hidden-mobile">
						<strong>Viewing:</strong>
					</p>
					<div class="level-item">
						<b-field type="is-light">
							<b-select v-model="sourceChoice" :placeholder="sourceChoice">
								<option v-for="source in sources" :key="source" :value="source.id">{{ source.name }}</option>
							</b-select>
						</b-field>
					</div>
					<div class="level-item">
						<b-field type="is-light">
							<b-select v-model="tagChoice" :placeholder="tagChoice" :loading="!tags">
								<option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
							</b-select>
						</b-field>
					</div>
				</div>

				<div class="level-right">
					<div class="level-item is-hidden-mobile">
						<b-field type="is-light">
							<b-input v-model="search" placeholder="Search" type="search" icon="search" @keyup.enter.native="startSearch" />
						</b-field>
					</div>
					<div class="level-item is-hidden-tablet" @click="startSearch">
						<b-icon icon="search" />
					</div>
				</div>
			</nav>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DocsNavbar',
	props: ['sources', 'source'],

	data() {
		return {
			sourceChoice: this.source.id,
			tagChoice: this.$route.params.tag,
			tags: null,
			search: this.$route.query.q
		};
	},

	watch: {
		sourceChoice(source) {
			if (this.$route.params.source !== source) this.$router.push({ name: 'docs-source', params: { source } });
		},

		tagChoice(tag) {
			if (tag && this.$route.params.tag !== tag) {
				this.$router.push({ name: this.$route.name, params: { ...this.$route.params, tag }, query: this.$route.query });
			}
		},

		source(source) {
			this.sourceChoice = source.id;
			this.tagChoice = null;
			this.loadTags();
		},

		/* eslint-disable id-length */
		search(q) {
			if (this.$route.query.q) this.$router.replace({ name: 'docs-search', query: { q } });
			else this.$router.push({ name: 'docs-search', query: { q } });
		},
		/* eslint-enable id-length */

		$route(to) {
			if (this.$route.query.q) this.search = to.query.q;
			if (to.params.tag && this.tagChoice !== to.params.tag) this.tagChoice = to.params.tag;
		}
	},

	created() {
		this.loadTags();
	},

	mounted() {
		this.updateTagChoice();
	},


	methods: {
		loadTags() {
			this.tags = this.source.tags;
			if (!this.tags) {
				const startSource = this.source;
				this.source.fetchTags().then(tags => {
					if (this.source.id === startSource.id) this.tags = tags;
				});
			}
		},

		updateTagChoice() {
			if (this.tags) this.tagChoice = this.$route.params.tag || this.source.recentTag || this.source.defaultTag;
		},

		startSearch() {
			// eslint-disable-next-line id-length
			if (this.$route.name !== 'docs-search') this.$router.replace({ name: 'docs-search', query: { q: this.search } });
		}
	}
};
</script>

