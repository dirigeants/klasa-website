<template>
	<div class="is-pulled-right">
		<a :href="`${meta ? sourceURL(meta.path, meta.file, meta.line) : sourceURL(path)}`" title="Source">
			<b-icon icon="code" size="is-small" />
		</a>
	</div>
</template>

<script>
import { sourceURL } from '../../util';

export default {
	name: 'SourceButton',
	props: ['meta', 'path', 'docs'],

	methods: {
		sourceURL(path, file, line) {
			return sourceURL(this.docs.source, this.docs.tag, path, file, line);
		}
	}
};
</script>

