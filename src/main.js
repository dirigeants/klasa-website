// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import marked from 'marked';
import VueHighlightJS from 'vue-highlightjs';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

// Tell Vue.js to use buefy
Vue.use(Buefy, {
  defaultIconPack: 'fa'
});

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
