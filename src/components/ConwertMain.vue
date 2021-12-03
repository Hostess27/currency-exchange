<template>
  <form @submit.prevent="convert">
    <div>
      <label>value</label>
      <input v-model.number="inputAmount" />
    </div>
    <div>
      <label>from currency</label>
      <select v-model="fromCurrency">
        <option
          v-for="currency of fromCurrencies"
          :key="currency.value"
          :value="currency"
        >
          {{ currency.name }}
        </option>
      </select>
    </div>
    <button @click="selected" type="button"></button>
    <div>
      <label>value</label>
      <input v-model="result" />
    </div>
    <div>
      <label>to currency</label>
      <select v-model="toCurrency">
        <option
          v-for="currency of toCurrencies"
          :key="currency.value"
          :value="currency"
        >
          {{ currency.name }}
        </option>
      </select>
    </div>
    <button type="submit">convert</button>
    <div>
      {{ inputAmount }} {{ fromCurrency.name }} is {{ result }}
      {{ toCurrency.name }}
    </div>
  </form>
</template>

<script>
import { CURRENCIES } from "@/utils/currency.const.js";

export default {
  name: "App",
  data() {
    return {
      inputAmount: 0,
      fromCurrency: "",
      toCurrency: "",
      result: 0,
    };
  },
  computed: {
    fromCurrencies() {
      return CURRENCIES.filter(
        (currency) => currency.value !== this.toCurrency.value
      );
    },
    toCurrencies() {
      return CURRENCIES.filter(
        (currency) => currency.value !== this.fromCurrency.value
      );
    },
    formValid() {
      return +this.inputAmount > 0 && this.fromCurrency && this.toCurrency;
    },
  },
  methods: {
    async convert() {
      if (!this.formValid) return;

      const res = await fetch(
        `https://api.kuna.io:443/v3/exchange-rates/${this.fromCurrency.value}`
      );
      const rates = await res.json();
      this.result = this.inputAmount * rates[this.toCurrency.value];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
