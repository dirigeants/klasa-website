<template>
	<div :id="`doc-for-${scrollTo}`" class="card">
		<header class="card-header">
			<nav class="card-header-title level is-marginless">
				<div class="level-left">
					<div class="level-item has-text-left">
						<span v-if="method.access === 'private'"><span class="tag is-warning" title="This method is private, and may change or be removed at any time.">Private</span>&nbsp;</span>
						<span v-if="method.scope === 'static'"><span class="tag is-primary" title="This method is on the class constructor function, not instances.">Static</span>&nbsp;</span>
						<span v-if="method.async"><span class="tag is-success" title="This method is async, and returns a promise.">Async</span>&nbsp;</span>
						<span v-if="method.abstract"><span class="tag is-info" title="This method is abstract, and should be implimented in child classes.">Abstract</span>&nbsp;</span>
						<span v-if="method.deprecated"><span class="tag is-danger" title="This method is deprecated, and may be removed in a future version.">Deprecated</span>&nbsp;</span>
						<span v-if="method.generator"><span class="tag is-dark" title="This method returns a generator function.">Generator</span>&nbsp;</span>
					</div>
					<span class="level-item has-text-left is-marginless">
						<router-link :to="{ name: 'docs-class', query: { scrollTo } }">.{{ method.name }}({{ params }})</router-link>
					</span>
				</div>
			</nav>
			<source-button :meta="method.meta" :docs="docs" class="card-header-icon" />
		</header>
		<div class="card-content">
			<div class="content" v-html="description"/>

			<div v-if="method.params">
				<param-table :params="methodParams" :docs="docs" />
				<br >
			</div>

			<div v-if="emits">
				<strong>Emits:</strong>
				<ul v-if="emits.length > 1">
					<li v-for="event in emits" :key="event">
						<router-link :to="event.link">{{ event.text }}</router-link>
					</li>
				</ul>
				<router-link v-else :to="emits[0].link">{{ emits[0].text }}</router-link>
			</div>

			<div v-if="method.examples">
				<strong>Examples:</strong>
				<pre v-highlightjs v-for="example in method.examples" :key="example"><code class="javascript">{{ example }}</code></pre>
			</div>
		</div>
		<footer class="card-footer">
			<p v-if="method.yields" class="card-footer-item">
				<span>
					<strong>Yields:</strong>
					<span v-if="method.yields">
						<span v-for="(rtrn, index) of method.yields.types || method.yields" :key="rtrn">
							<types :names="rtrn" :variable="method.yields.variable" :nullable="method.yields.nullable" :docs="docs" />
							<span v-if="index < (method.yields.types || method.yields).length - 1"> | </span>
						</span>
					</span>
					<type-link v-else :type="['void']" :docs="docs" />
				</span>
			</p>
			<p v-if="!method.yields || method.returns" class="card-footer-item">
				<span>
					<strong>Returns:</strong>
					<span v-if="method.returns">
						<span v-for="(rtrn, index) of method.returns.types || method.returns" :key="rtrn">
							<types :names="rtrn" :variable="method.returns.variable" :nullable="method.returns.nullable" :docs="docs" />
							<span v-if="index < (method.returns.types || method.returns).length - 1"> | </span>
						</span>
					</span>
					<type-link v-else :type="['void']" :docs="docs" />
				</span>
			</p>
			<p v-if="method.throws" class="card-footer-item">
				<span>
					<strong>Throws:</strong>
					<span v-for="(thrw, index) of method.throws" :key="thrw">
						<types :names="thrw" :docs="docs" />
						<span v-if="index < method.throws.length - 1"> | </span>
					</span>
				</span>
			</p>
			<p v-if="method.see" class="card-footer-item">
				<see :see="method.see" :docs="docs" />
			</p>
			<p v-if="method.since" class="card-footer-item">
				<span>
					<strong>Since:</strong> {{ method.since }}
				</span>
			</p>
		</footer>
	</div>
</template>

<script>
import Vue from 'vue';
import Types from '../Types.vue';
import TypeLink from '../TypeLink.vue';
import ParamTable from './ParamTable.vue';
import SourceButton from '../SourceButton.vue';
import See from '../See.vue';
import { convertLinks, parseLink, paramListing } from '../../../util';

export default {
	name: 'ClassMethod',

	components: {
		Types,
		TypeLink,
		ParamTable,
		SourceButton,
		See
	},

	props: ['method', 'docs'],


	computed: {
		params() {
			if (!this.method.params) return null;
			return paramListing(this.method.params.filter(par => !par.name.includes('.')));
		},

		description() {
			return Vue.filter('marked')(convertLinks(this.method.description, this.docs, this.$router, this.$route));
		},

		emits() {
			if (!this.method.emits) return null;
			return this.method.emits.map(emit => parseLink(emit.replace(/:event/i, ''), this.docs));
		},

		scrollTo() {
			return `${this.method.scope === 'static' ? 's-' : ''}${this.method.name}`;
		},

		methodParams() {
			const params = [];
			if (!this.method.params) return params;
			for (const param of this.method.params) {
				params.push(param);
				if (param.type[0][0][0]) params.push(...this.findTypeDefs(param.type[0][0][0], param.name));
			}
			return params;
		}
	},

	methods: {
		findTypeDefs(name, prefix) {
			const props = [];
			const typedef = this.docs.typedefs.find(typ => typ.name === name);
			if (!typedef || !typedef.props) return props;
			props.push(...typedef.props.map(prop => ({ ...prop, name: `${prefix}.${prop.name}` })));
			if (typedef.type[0][0][0]) props.push(...this.findTypeDefs(typedef.type[0][0][0], prefix));
			return props;
		}
	}
};
</script>

