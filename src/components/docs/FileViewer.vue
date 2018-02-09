<template>
	<div v-if="file">
		<source-button :path="file.path" :docs="docs" />
		<div class="content" v-html="html"/>
		<br >
	</div>
	<unknown-page v-else />
</template>

<script>
import Vue from 'vue';
import { convertLinks } from '../../util';
import SourceButton from './SourceButton.vue';

export default {
	name: 'FileViewer',

	components: { SourceButton },

	props: ['docs'],

	data() {
		if (!this.docs.custom[this.$route.params.category]) return { file: null };
		return { file: this.docs.custom[this.$route.params.category].files[this.$route.params.file] };
	},

	computed: {
		html() {
			let content;
			// eslint-disable-next-line prefer-destructuring
			if (this.file.type === 'md') content = this.file.content;
			else content = `# ${this.file.name}\n\`\`\`${this.file.type}\n${this.file.content}\n\`\`\``;
			content = convertLinks(content, this.docs, this.$router, this.$route);
			return Vue.filter('marked')(content);
		}
	}
};
</script>

