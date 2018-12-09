<template>
	<div :id="`doc-for-${event.name}`" class="card">
		<header class="card-header">
			<nav class="card-header-title level is-marginless">
				<div class="level-left">
					<div class="level-item has-text-left">
						<span v-if="event.deprecated">
							<span class="tag is-danger" title="This event is deprecated, and may be removed in a future version.">
								Deprecated
							</span>&nbsp;
						</span>
					</div>
					<span class="level-item has-text-left is-marginless">
						<router-link :to="{ name: 'docs-class', query: { scrollTo: event.name } }">
							{{ event.name }}
						</router-link>
					</span>
				</div>
			</nav>
			<source-button :meta="event.meta" :docs="docs" class="card-header-icon" />
		</header>
		<div class="card-content">
			<div class="content" v-html="description" />
			<param-table v-if="event.params && event.params.length" :params="params" :docs="docs" />
		</div>
		<footer class="card-footer">
			<p v-if="event.see" class="card-footer-item">
				<see :see="event.see" :docs="docs" />
			</p>
			<p v-if="event.since" class="card-footer-item">
				<span>
					<strong>Since:</strong>{{ event.since }}
				</span>
			</p>
		</footer>
	</div>
</template>

<script>
import Vue from 'vue';
import ParamTable from './ParamTable.vue';
import SourceButton from '../SourceButton.vue';
import See from '../See.vue';
import { convertLinks } from '../../../util';

export default {
	name: 'ClassEvent',

	components: {
		ParamTable,
		SourceButton,
		See
	},

	props: ['event', 'docs'],

	computed: {
		description() {
			return Vue.filter('marked')(convertLinks(this.event.description, this.docs, this.$router, this.$route));
		},
		params() {
			const params = [];
			if (!this.event.params) return [];
			for (const param of this.event.params) {
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
