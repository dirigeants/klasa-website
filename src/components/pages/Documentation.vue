<template>
	<div>
		<docs-navbar :sources="sources" :source="source" />
		<router-view :source="source" :tag="tag" />
	</div>
</template>

<script>
import MainSource from '../../data/MainSource';
import DashboardHooksSource from '../../data/DashboardHooksSource';
import DocsNavbar from '../docs/Navbar.vue';

export default {
	name: 'Documentation',
	components: { DocsNavbar },

	data() {
		return {
			sources: {
				[MainSource.id]: MainSource,
				[DashboardHooksSource.id]: DashboardHooksSource
			},
			source: MainSource,
			tag: MainSource.defaultTag
		};
	},

	watch: {
		$route(to) {
			this.handleRoute(to);
		}
	},

	created() {
		this.handleRoute(this.$route);
	},

	methods: {
		setSource(id) {
			this.source = this.sources[id];
		},

		setTag(tag) {
			this.tag = tag;
			this.source.recentTag = tag;
		},

		handleRoute(route) {
			// Set the source, or redirect to a default route
			if (route.params.source && this.sources[route.params.source]) {
				this.setSource(route.params.source);
			} else {
				this.$router.replace({
					name: 'docs-file', params: {
						source: MainSource.id,
						tag: MainSource.defaultTag,
						category: MainSource.defaultFile.category,
						file: MainSource.defaultFile.id
					}
				});
				return;
			}

			// Set the tag, or redirect to a default route
			if (route.params.tag) {
				this.setTag(route.params.tag);
			} else {
				this.$router.replace({
					name: 'docs-file', params: {
						source: this.source.id,
						tag: this.source.recentTag || this.source.defaultTag,
						category: this.source.defaultFile.category,
						file: this.source.defaultFile.id
					}
				});
				return;
			}

			// Redirect to a default route
			if (!route.params.file && !route.params.class && !route.params.typedef && route.name !== 'docs-search') {
				this.$router.replace({
					name: 'docs-file', params: {
						source: this.source.id,
						tag: this.tag,
						category: this.source.defaultFile.category,
						file: this.source.defaultFile.id
					}
				});
			}
		}
	}

};
</script>
