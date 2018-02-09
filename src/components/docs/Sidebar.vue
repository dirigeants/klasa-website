<template>
	<div>
		<!-- eslint-disable vue/require-v-for-key -->
		<div @click="toggle" class="button is-white is-hidden-tablet"><b-icon icon="bars" /></div>
		<b-tabs v-model="activeTab">
			<b-tab-item label="Guide">
				<aside class="menu">
					<div v-for="(category, categoryID) in docs.custom" v-if="category.name !== 'General'">
						<p class="menu-label">
							{{ category.name }}
						</p>
						<ul class="menu-list">
							<li v-for="(file, fileID) in category.files" class="animated-list-item">
								<router-link :to="{ name: 'docs-file', params: { category: categoryID, file: fileID } }" :class="`${$route.params.file === fileID ? 'is-active' : ''}`">
									{{ file.name }}
								</router-link>
							</li>
						</ul>
						<br >
					</div>
				</aside>
			</b-tab-item>
			<b-tab-item label="Classes">
				<aside class="menu">
					<div class="is-pulled-right" @click="togglePrivate">
						<b-icon :icon="showPrivate ? 'eye' : 'eye-slash'" :title="showPrivate ? 'Hide private' : 'Show private'" size="is-small" />
					</div>
					<p class="menu-label">
						Classes
					</p>
					<ul class="menu-list">
						<li v-for="clarse in docs.classes" v-if="showPrivate || clarse.access !== 'private'" class="animated-list-item">
							<router-link exact :to="{ name: 'docs-class', params: { class: clarse.name } }" :class="`${$route.params.class === clarse.name ? 'is-active' : ''}`">
								{{ clarse.name }}
							</router-link>
						</li>
					</ul>
				</aside>
			</b-tab-item>
			<b-tab-item label="Types">
				<aside class="menu">
					<div class="is-pulled-right" @click="togglePrivate">
						<b-icon :icon="showPrivate ? 'eye' : 'eye-slash'" :title="showPrivate ? 'Hide private' : 'Show private'" size="is-small" />
					</div>
					<p class="menu-label">
						Typedefs
					</p>
					<ul class="menu-list">
						<li v-for="typedef in docs.typedefs" v-if="showPrivate || typedef.access !== 'private'" class="animated-list-item">
							<router-link exact :to="{ name: 'docs-typedef', params: { typedef: typedef.name } }" :class="`${$route.params.typedef === typedef.name ? 'is-active' : ''}`">
								{{ typedef.name }}
							</router-link>
						</li>
					</ul>
				</aside>
			</b-tab-item>
		</b-tabs>
		<!-- eslint-enable vue/require-v-for-key -->
	</div>
</template>

<script>
export default {
	name: 'DocsSidebar',
	props: ['docs'],

	data() {
		return {
			showPrivate: false,
			activeTab: this.$route.params.file ? 0 : this.$route.params.class ? 1 : 2
		};
	},

	watch: {
		showPrivate(to) {
			this.$emit('showPrivate', to);
		},

		$route(to) {
			if (this.$parent.visible) this.$parent.visible = false;
			if (!to.query.scrollTo && (window.pageYOffset || document.documentElement.scrollTop) > 300) {
				window.scrollTo(0, 90);
			}
			this.activeTab = this.$route.params.file ? 0 : this.$route.params.class ? 1 : 2;
		}
	},

	methods: {
		toggle() {
			this.$parent.visible = !this.$parent.visible;
		},
		togglePrivate() {
			this.showPrivate = !this.showPrivate;
		}
	}
};
</script>

