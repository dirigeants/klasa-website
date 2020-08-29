import DocsSource from './DocsSource';
import semver from 'semver';

const branchBlacklist = new Set(['gh-pages', 'gh-pages-dev', 'docs', 'webpack', 'indev-old', 'v8']);
export default new DocsSource({
	id: 'klasa',
	name: 'Main library',
	global: 'Klasa',
	repo: 'dirigeants/klasa',
	defaultTag: 'v0.5.0',
	branchFilter: branch => !branchBlacklist.has(branch) && !branch.startsWith('dependabot'),
	tagFilter: tag => semver.gte(tag, '0.5.0')
});
