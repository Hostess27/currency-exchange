import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentRate: {},
  },
  mutations: {
    setCurrentRate(state, rate) {
      state.currentRate = rate;
    },
  },
  getters: {
    currentRate(state) {
      return state.currentRate;
    },
  },
});
