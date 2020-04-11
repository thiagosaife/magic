import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/style/custom.scss';

const EventBus = new Vue();

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return {
      EventBus,
    };
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
