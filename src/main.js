// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';

fontawesome.library.add(solid, regular, brands);

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueHighlightJS);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // eslint-disable-next-line
  render: function(el) {
    return el(App);
  }
});
