<template>
	<div :id="`doc-for-${scrollTo}`" class="card">
		<header class="card-header">
			<nav class="card-header-title level is-marginless">
				<div class="level-left">
					<div class="level-item has-text-left">
						<span v-if="prop.scope === 'static'"><span class="tag is-primary" title="This property is on the class constructor function, not instances.">Static</span>&nbsp;</span>
						<span v-if="prop.readonly"><span class="tag is-success" title="This property cannot be modified.">Read-only</span>&nbsp;</span>
						<span v-if="prop.deprecated"><span class="tag is-danger"	title="This property is deprecated, and may be removed in a future version.">Deprecated</span>&nbsp;</span>
						<span v-if="prop.access === 'private'"><span class="tag is-warning" title="This property is private, and may change or be removed at any time.">Private</span>&nbsp;</span>
					</div>
					<span class="level-item has-text-left is-marginless">
						<router-link :to="{ name: 'docs-class', query: { scrollTo } }">.{{ prop.name }}</router-link>
					</span>
				</div>
			</nav>
			<source-button :meta="prop.meta" :docs="docs" class="card-header-icon" />
		</header>
		<div class="card-content">
			<div class="content" v-html="description"/>
			<param-table v-if="prop.props && prop.props.length" :params="props" :docs="docs" />
		</div>
		<footer class="card-footer">
			<p class="card-footer-item">
				<span>
					<strong>Type:</strong>
					<span v-for="(type, index) of prop.type" :key="type">
						<types :names="type" :nullable="prop.nullable" :docs="docs" />
						<span v-if="index < prop.type.length - 1"> | </span>
					</span>
				</span>
			</p>
			<p v-if="prop.default" class="card-footer-item">
				<span>
					<strong>Default:</strong> <code>{{ prop.default }}</code>
				</span>
			</p>
			<p v-if="prop.see" class="card-footer-item">
				<see :see="prop.see" :docs="docs" />
			</p>
			<p v-if="prop.since" class="card-footer-item">
				<span>
					<strong>Since:</strong> {{ prop.since }}
				</span>
			</p>
		</footer>
	</div>
</template>

<script>
import Vue from 'vue';
import Types from '../Types.vue';
import ParamTable from './ParamTable.vue';
import SourceButton from '../SourceButton.vue';
import See from '../See.vue';
import { convertLinks } from '../../../util';

export default {
	name: 'ClassProperty',

	components: {
		Types,
		ParamTable,
		SourceButton,
		See
	},

	props: ['prop', 'docs'],

	computed: {
		description() {
			return Vue.filter('marked')(convertLinks(this.prop.description, this.docs, this.$router, this.$route));
		},

		scrollTo() {
			return `${this.prop.scope === 'static' ? 's-' : ''}${this.prop.name}`;
		},

		props() {
			const props = [];
			if (!this.prop.props) return props;
			for (const prop of this.prop.props) {
				props.push(prop);
				if (prop.type[0][0][0]) props.push(...this.findTypeDefs(prop.type[0][0][0], prop.name));
			}
			return props;
		}
	},

	methods: {
		findTypeDefs(name, prefix) {
			const props = [];
			const typedef = this.docs.typedefs.find(typ => typ.name === name);
			if (!typedef) return props;
			props.push(...typedef.props.map(prop => ({ ...prop, name: `${prefix}.${prop.name}` })));
			if (typedef.type[0][0][0]) props.push(...this.findTypeDefs(typedef.type[0][0][0], prefix));
			return props;
		}
	}
};
</script>

