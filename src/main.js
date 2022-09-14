// src/main.js

// Polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";
require("es6-promise").polyfill();

import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import IdleVue from "idle-vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

import router from "./router/router";
import store from "./store/index";

Vue.use(VueRouter);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const eventsHub = new Vue();

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: process.env.VUE_APP_TIMEOUT || 1200000, // in miliseconds
  startAtIdle: false,
});

new Vue({
  store: store,
  router: router,
  render: (h) => h(App),
}).$mount("#app");
