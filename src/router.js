import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/pages/Home.vue';
import DocumentationPage from './components/pages/Documentation.vue';
import UnknownRoutePage from './components/pages/UnknownRoute.vue';
import DocsLoader from './components/docs/Loader.vue';
import DocsViewer from './components/docs/Viewer.vue';
import FileViewer from './components/docs/FileViewer.vue';
import ClassViewer from './components/docs/class-viewer/ClassViewer.vue';
import TypedefViewer from './components/docs/TypedefViewer.vue';
import DocsSearch from './components/docs/Search.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{ path: '/', name: 'home', component: HomePage },
		{
			path: '/docs', name: 'docs', component: DocumentationPage, children: [
				{
					path: ':source', name: 'docs-source', component: DocsLoader, children: [
						{
							path: ':tag', name: 'docs-tag', component: DocsViewer, children: [
								{ path: 'search', name: 'docs-search', component: DocsSearch },
								{ path: 'class/:class', name: 'docs-class', component: ClassViewer },
								{ path: 'typedef/:typedef', name: 'docs-typedef', component: TypedefViewer },
								{ path: ':category/:file', name: 'docs-file', component: FileViewer }
							]
						}
					]
				}
			]
		},
		// Catch-all
		{ path: '*', component: UnknownRoutePage }
	]
});
