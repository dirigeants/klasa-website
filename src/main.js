// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueHighlightJS);

Vue.use(Buefy, {
  defaultIconPack: 'fa'
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
