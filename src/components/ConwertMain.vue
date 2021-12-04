<template>
  <div>
    <h2 class="main-name">Обменник</h2>
    <form class="form-main" @submit.prevent="convert">
      <div>
        <!-- <label>from currency</label> -->
        <select class="slt" v-model="fromCurrency">
          <option
            v-for="currency of fromCurrencies"
            :key="currency.value"
            :value="currency"
          >
            {{ currency.name }}
          </option>
        </select>

        <!-- <label>value</label> -->
        <input type="number" class="input-main" v-model.number="inputAmount" />

        <!-- <button type="button" @click="s"></button> -->
        <!-- <label>value</label> -->
      </div>
      <div>
        <select class="slt" v-model="toCurrency">
          <option
            v-for="currency of toCurrencies"
            :key="currency.value"
            :value="currency"
          >
            {{ currency.name }}
          </option>
        </select>
        <!-- <label>to currency</label> -->
        <input type="number" class="input-main" v-model="result" />
      </div>
      <button type="submit">Укажите сумму</button>
      <!-- <div>
        {{ inputAmount }} {{ fromCurrency.name }} is {{ result }}
        {{ toCurrency.name }}
      </div> -->
    </form>
  </div>
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
.main-name {
  color: rgb(60, 60, 245);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.form-main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 600px;
  margin-left: auto;
  margin-right: auto;

}
.slt {
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid rgb(60, 60, 245);
  background-color: transparent;
  color: inherit;
  outline: none;
}
.input-main {
  padding: 10px;
  border: none;
  border-bottom: 1px solid rgb(60, 60, 245);
  background-color: transparent;
  color: inherit;
  outline: none;
}
</style>
