<template>
	<div v-if="clarse">
		<heading :clarse="clarse" :docs="docs" />
		<br >

		<overview :properties="properties" :methods="methods" :events="clarse.events" />
		<br >

		<h5 v-if="properties && properties.length" class="title is-4">Properties</h5>
		<div v-for="prop in properties" :key="prop">
			<property :prop="prop" :docs="docs" />
			<br >
		</div>

		<h5 v-if="methods && methods.length" class="title is-4">Methods</h5>
		<div v-for="method in methods" :key="method">
			<method :method="method" :docs="docs" />
			<br >
		</div>

		<h5 v-if="clarse.events && clarse.events.length" class="title is-4">Events</h5>
		<div v-for="event in clarse.events" :key="event">
			<event :event="event" :docs="docs" />
			<br >
		</div>

	</div>
	<unknown-page v-else />
</template>

<script>
import Heading from './Heading';
import Overview from './Overview';
import Property from './Property';
import Method from './Method';
import Event from './Event';

export default {
	name: 'ClassViewer',

	components: {
		Heading,
		Overview,
		Property,
		Method,
		Event
	},

	props: ['docs', 'showPrivate'],

	data() {
		return { clarse: this.docs.classes.find(cl => cl.name === this.$route.params.class) };
	},

	computed: {

		properties() {
			if (!this.clarse.props) return null;
			let props;
			// eslint-disable-next-line prefer-destructuring
			if (this.showPrivate) props = this.clarse.props;
			else props = this.clarse.props.filter(pro => pro.access !== 'private');
			return props.sort((aa, bb) =>
				`${aa.scope === 'static' ? 'ZZZ' : ''}${aa.name}`.localeCompare(`${bb.scope === 'static' ? 'ZZZ' : ''}${bb.name}`)
			);
		},

		methods() {
			if (!this.clarse.methods) return null;
			let methods;
			// eslint-disable-next-line prefer-destructuring
			if (this.showPrivate) methods = this.clarse.methods;
			else methods = this.clarse.methods.filter(met => met.access !== 'private');
			return methods.sort((aa, bb) =>
				`${aa.scope === 'static' ? 'ZZZ' : ''}${aa.name}`.localeCompare(`${bb.scope === 'static' ? 'ZZZ' : ''}${bb.name}`)
			);
		}

	}
};
</script>
