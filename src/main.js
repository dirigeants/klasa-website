// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import marked from 'marked';
import VueHighlightJS from 'vue-highlightjs';

import Buefy from 'buefy';

import App from './App';
import router from './router';
import renderer from './renderer.js';

import UnknownPageComponent from './components/UnknownPage.vue';
Vue.config.productionTip = false;

// Register all global components
Vue.component('unknown-page', UnknownPageComponent);

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

// Tell Vue.js to use buefy
Vue.use(Buefy, { defaultIconPack: 'fa' });

// Set the renderer to marked.
marked.setOptions({ renderer });

Vue.filter('marked', text => {
	if (!text) text = '**Documentation missing.**';
	else text = text.replace(/<(info|warning|danger)>([\s\S]+)<\/\1>/gi, '<div class="notification is-$1">$2</div>');
	return marked(text);
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render(el) {
		return el(App);
	}
});
