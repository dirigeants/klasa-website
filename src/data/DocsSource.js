const json = res => res.json();

export default class DocsSource {

	constructor(options) {
		this.id = options.id;
		this.name = options.name;
		this.global = options.global;
		this.repo = options.repo;
		this.defaultTag = options.defaultTag || 'master';
		this.defaultFile = options.defaultFile || { category: 'Getting Started', id: 'GettingStarted' };
		this.source = options.source || `https://github.com/${this.repo}/blob/`;
		this.branchFilter = options.branchFilter || (branch => branch !== 'master');
		this.tagFilter = options.tagFilter || (() => true);
		this.tags = null;
		this.recentTag = null;
	}

	async fetchTags() {
		if (this.tags) return this.tags;
		try {
			const [branches, tags] = await Promise.all([
				fetch(`https://api.github.com/repos/${this.repo}/branches`).then(json),
				fetch(`https://api.github.com/repos/${this.repo}/tags`).then(json)
			]);

			this.tags = [this.defaultTag];
			localStorage[`source-${this.id}`] = JSON.stringify({ branches, tags });

			for (const branch of branches) {
				if (branch.name !== this.defaultTag && this.branchFilter(branch.name)) this.tags.push(branch.name);
			}
			for (const tag of tags) {
				if (tag.name !== this.defaultTag && this.tagFilter(tag.name)) this.tags.push(tag.name);
			}

			return this.tags.filter(tag => tag === 'v0.5.0' || tag === 'settings');
		} catch (err) {
			if (localStorage[`source-${this.id}`]) {
				console.error(err);
				const cache = JSON.parse(localStorage[`source-${this.id}`]);
				return [cache.branches, cache.tags];
			}
			throw err;
		}
	}

	fetchDocs(tag) {
		return fetch(`https://raw.githubusercontent.com/${this.repo}/docs/${tag}.json`).then(json);
	}

}
