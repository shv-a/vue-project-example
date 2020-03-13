import Vue from 'vue';
import App from './App.vue';
import store from './store';
import axios from './plugins/axios';
import router from "./router/router";
import i18n from './plugins/i18n';
import serverError from "@/assets/js/mixins/ServerError";
import modals from "@/assets/js/mixins/Modals";
import '@/assets/sass/app.scss';

const axiosPlugin = Plugin.install = function (Vue) {
  window.axios = axios;
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return axios;
      }
    },
    axios: {
      get() {
        return axios;
      }
    },
    $axios: {
      get() {
        return axios;
      }
    },
  });
};

Vue.config.productionTip = false;
Vue.use(axiosPlugin);

Vue.mixin(serverError);
Vue.mixin(modals);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login')
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/')
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');