import semver from 'semver';
import DocsSource from './DocsSource';

const branchBlacklist = new Set(['gh-pages', 'gh-pages-dev', 'docs', 'webpack', 'indev-old', 'v8']);
export default new DocsSource({
  id: 'main',
  name: 'Main library',
  global: 'Klasa',
  repo: 'dirigeants/klasa',
  defaultTag: 'stable',
  branchFilter: branch => !branchBlacklist.has(branch),
  tagFilter: tag => semver.gte(tag.replace(/^v/, ''), '0.4.0'),
});
