<template>
	<div>
		<p class="title">
			<span :title="showScores ? 'Hide scores' : 'Show scores'" class="subtitle is-5" @click="toggleScores"><b-icon icon="chart-bar" size="is-small" /></span> Search
		</p>
		<b-field>
			<b-input v-model.trim="search" placeholder="Search..."
				type="search"
				icon="search"/>
		</b-field>

		<b-field grouped group-multiline>
			<b-checkbox-button v-model="toggles" :type="tagColor('Class')" native-value="classes">
				Classes
			</b-checkbox-button>
			<b-checkbox-button v-model="toggles" :type="tagColor('Property')" native-value="props">
				Properties
			</b-checkbox-button>
			<b-checkbox-button v-model="toggles" :type="tagColor('Method')" native-value="methods">
				Methods
			</b-checkbox-button>
			<b-checkbox-button v-model="toggles" :type="tagColor('Event')" native-value="events">
				Events
			</b-checkbox-button>
			<b-checkbox-button v-model="toggles" :type="tagColor('Typedef')" native-value="typedefs">
				Typedefs
			</b-checkbox-button>
		</b-field>

		<transition name="fade" mode="out-in">
			<div v-if="search && search.length > 2">
				<h2 v-if="search && search.length > 2" class="subtitle" >Results for "{{ search }}"</h2>

				<transition name="fade" mode="out-in">
					<transition-group v-if="results.length > 0" key="results" name="animated-list" tag="ul">
						<li v-for="result in results" :key="`${result.key || result.name}`" class="animated-list-item">
							<span v-if="showScores" class="score">{{ Math.round(result.score * 100) }}%</span>
							<router-link :to="result.route">
								<span :class="`tag ${tagColor(result.badge)}`" :title="result.badge">{{ result.badge[0] }}</span>
								{{ result.name }}{{ result.badge === 'Method' ? '()' : '' }}
							</router-link>
						</li>
					</transition-group>

					<h2 v-else key="empty" class="subtitle">No results.</h2>
				</transition>
			</div>

			<h2 v-else key="short" class="subtitle">Your search query must be at least three characters.</h2>
		</transition>
	</div>
</template>

<script>
import levenshtein from 'js-levenshtein';
import { sort } from 'timsort';

export default {
	name: 'DocsSearch',
	props: ['docs', 'showPrivate'],

	data() {
		return {
			search: this.$route.query.q,
			toggles: ['classes', 'props', 'methods', 'events', 'typedefs'],
			colors: {
				Class: 'is-info',
				Property: 'is-success',
				Method: 'is-warning',
				Event: 'is-danger',
				Typedef: 'is-primary'
			},
			showScores: false
		};
	},

	computed: {
		results() {
			const query = this.search.toLowerCase();
			const results = [];

			for (const clarse of this.docs.classes) {
				if (!this.showPrivate && clarse.access === 'private') continue;

				let cScore = 0;
				if (this.toggles.includes('classes')) {
					cScore = searchScore(query, clarse.name.toLowerCase(), null, 1) * 1.05;
					if (cScore >= scoreThreshold) {
						results.push({
							score: cScore,
							name: clarse.name,
							route: { name: 'docs-class', params: { class: clarse.name } },
							badge: 'Class'
						});
					}
				}

				for (const [group, groupName] of [['props', 'Property'], ['methods', 'Method'], ['events', 'Event']]) {
					if (!clarse[group] || !this.toggles.includes(group)) continue;
					for (const item of clarse[group]) {
						if (!this.showPrivate && item.access === 'private') continue;
						const name = fullName(item, clarse, group);
						const score = searchScore(query, item.name.toLowerCase(), cScore <= 0.9 ? name.toLowerCase() : null);
						if (score < scoreThreshold) continue;
						results.push({
							score,
							name,
							route: { name: 'docs-class', params: { class: clarse.name }, query: { scrollTo: this.scopedName(item) } },
							badge: groupName,
							key: group === 'events' ? `e-${name}` : null
						});
					}
				}
			}

			if (this.toggles.includes('typedefs')) {
				for (const typedef of this.docs.typedefs) {
					if (!this.showPrivate && typedef.access === 'private') continue;
					const tScore = searchScore(query, typedef.name.toLowerCase(), null, 1) * 1.05;
					if (tScore < scoreThreshold) continue;
					results.push({
						score: tScore,
						name: typedef.name,
						route: { name: 'docs-typedef', params: { typedef: typedef.name } },
						badge: 'Typedef'
					});
				}
			}

			sort(results, (a, b) => b.score - a.score);
			return results;
		}
	},

	watch: {
		$route(to) {
			this.search = to.query.q;
		},

		/* eslint-disable id-length */
		search(q) {
			if (this.$route.query.q === q) return;
			if (this.$route.query.q) this.$router.replace({ name: 'docs-search', query: { q } });
			else this.$router.push({ name: 'docs-search', query: { q } });
		}
		/* eslint-enable id-length */
	},

	methods: {
		tagColor(type) {
			return this.colors[type];
		},

		toggleScores() {
			this.showScores = !this.showScores;
		},

		scopedName(item) {
			return `${item.scope === 'static' ? 's-' : ''}${item.name}`;
		}
	}
};

const scoreThreshold = 0.45;

function searchScore(query, shortName, longName, identicalWeight) {
	if (query === shortName || query === longName) return 1 + (identicalWeight === undefined ? 0.5 : identicalWeight);

	const name = longName || shortName;
	let shorter = query, longer = name;
	if (query.length > name.length) {
		longer = query;
		shorter = name;
	}
	if (longer.length === 0) return 1;
	const score = (longer.length - levenshtein(longer, shorter)) / longer.length;

	return shortName.includes(query) ? Math.max(score, scoreThreshold) : score;
}

function fullName(child, parent) {
	return `${parent.name + (child.scope === 'static' ? '.' : '#')}${child.name}`;
}
</script>

