import Vue from "vue";
import Vuex from "vuex";
import { CURRENCIES } from "@/utils/currency.const";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentRate: {},
    fromCurrency: CURRENCIES[0],
    toCurrency: CURRENCIES[1],
    result: ''
  },
  mutations: {
    setCurrentRate(state, rate) {
      state.currentRate = rate;
    },
    setFromCurrency(state, currency) {
      state.fromCurrency = currency;
    },
    setToCurrency(state, currency) {
      state.toCurrency = currency;
    },
    setResult(state, payload) {
      state.result = `Вы успешно обменяли ${payload.inputAmount} ${payload.fromCurrency} на ${payload.outputAmount} ${payload.toCurrency}`;
    },
  },
  getters: {
    currentRate(state) {
      return state.currentRate;
    },
    fromCurrency(state) {
      return state.fromCurrency;
    },
    toCurrency(state) {
      return state.toCurrency;
    },
    result(state) {
      return state.result;
    },
  },
});
