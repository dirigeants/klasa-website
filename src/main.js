// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import marked, { Renderer } from 'marked';
import VueHighlightJS from 'vue-highlightjs';
import highlightjs from 'highlight.js';
import Buefy from 'buefy';

import App from './App';
import router from './router';

import SlideComponent from './components/Slide.vue';
import LoadingComponent from './components/Loading.vue';
import UnknownPageComponent from './components/UnknownPage.vue';
Vue.config.productionTip = false;

// Register all global components
Vue.component('slide', SlideComponent);
Vue.component('loading', LoadingComponent);
Vue.component('unknown-page', UnknownPageComponent);

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

// Tell Vue.js to use buefy
Vue.use(Buefy, {
  defaultIconPack: 'fa'
});

// Create your custom renderer.
const renderer = new Renderer();
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && highlightjs.getLanguage(language));
  // Highlight only if the language is valid.
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

// Set the renderer to marked.
marked.setOptions({ renderer });

Vue.filter('marked', text => {
  if (!text) text = '**Documentation missing.**';
  text = text.replace(/<(info|warn)>([\s\S]+)<\/\1>/gi, '<div class="$1">$2</div>');
  return marked(text);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // eslint-disable-next-line
  render(el) {
    return el(App);
  }
});
