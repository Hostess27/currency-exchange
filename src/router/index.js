import Vue from "vue";
import Router from "vue-router";

import MainPage from '@/pages/MainPage.vue'
import SuccessPage from '@/pages/SuccessPage.vue'


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/success",
      name: "success",
      component: SuccessPage,
    },
  ],
});
