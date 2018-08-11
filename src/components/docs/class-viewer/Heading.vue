<template>
	<div class="card">
		<header class="card-header">
			<nav class="card-header-title level is-marginless">
				<div class="level-left">
					<div class="level-item has-text-left">
						<span v-if="clarse.interface"><span class="tag is-primary" title="This class an interface, and is applied to other classes.">Interface</span>&nbsp;</span>
						<span v-if="clarse.abstract"><span class="tag is-info" title="This class is abstract, and may not be instantiated itself.">Abstract</span>&nbsp;</span>
						<span v-if="clarse.deprecated"><span class="tag is-danger" title="This class is deprecated, and may be removed in a future version.">Deprecated</span>&nbsp;</span>
						<span v-if="clarse.access === 'private'"><span class="tag is-warning" title="This class is private, and may change or be removed at any time.">Private</span>&nbsp;</span>
					</div>
					<span class="level-item has-text-left is-size-4 is-marginless">
						{{ clarse.name }}&nbsp;
					</span>
					<span v-if="clarse.extends" class="level-item has-text-left is-size-6 is-marginless">
						extends&nbsp;<type-link :type="clarse.extends" :docs="docs" />&nbsp;
					</span>
					<span v-if="clarse.implements" class="level-item has-text-left is-size-6 is-marginless">
						implements&nbsp;<type-link :type="clarse.implements" :docs="docs" />&nbsp;
					</span>
				</div>
			</nav>
			<source-button :meta="clarse.meta" :docs="docs" class="card-header-icon" />
		</header>
		<div v-if="description || (clarse.construct && (showPrivate || clarse.construct.access !== 'private'))" class="card-content">
			<p v-if="clarse.description" class="subtitle" v-html="description" />
			<div v-if="clarse.construct && (showPrivate || clarse.construct.access !== 'private')">
				<strong>Constructor:</strong>
				<pre v-highlightjs><code class="js">new {{ docs.global }}.{{ clarse.name }}({{ constructorParams }});</code></pre>
				<param-table :params="clarse.construct.params" :docs="docs" />
			</div>
		</div>
		<footer class="card-footer">
			<p v-if="clarse.see" class="card-footer-item">
				<see :see="clarse.see" :docs="docs" />
			</p>
		</footer>
	</div>
</template>

<script>
import Vue from 'vue';
import { convertLinks, paramListing } from '../../../util';
import TypeLink from '../TypeLink.vue';
import ParamTable from './ParamTable.vue';
import SourceButton from '../SourceButton.vue';
import See from '../See';


export default {
	name: 'ClassHeading',

	components: {
		TypeLink,
		ParamTable,
		SourceButton,
		See
	},

	props: ['clarse', 'docs'],

	computed: {
		constructorParams() {
			if (!this.clarse.construct || !this.clarse.construct.params) return null;
			return paramListing(this.clarse.construct.params.filter(par => !par.name.includes('.')));
		},
		description() {
			return Vue.filter('marked')(convertLinks(this.clarse.description, this.docs, this.$router, this.$route));
		}
	}
};
</script>
