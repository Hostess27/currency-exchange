<template>
  <div>
    <h2 class="main-name">Обменник</h2>
    <form class="form-main" @submit.prevent="convert">
      <div>
        <select class="slt" v-model="fromCurrency">
          <option
            v-for="currency of fromCurrencies"
            :key="currency.value"
            :value="currency"
          >
            {{ currency.name }}
          </option>
        </select>
        <input type="number" class="input-main" v-model.number="inputAmount" />
      </div>
      <button class="btn-arrow" @click="onClick" type="button">
        <svg class="arrow" width="20" height="20">
          <use href="@/assets/arrow.svg#loop"></use>
        </svg>
      </button>
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
    onClick() {
      [this.fromCurrency, this.toCurrency, this.inputAmount, this.result] = [
        this.toCurrency,
        this.fromCurrency,
        this.result,
        this.inputAmount,
      ];
    },
  },
};
</script>

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

.btn-arrow {
  background-color: inherit;
  border: none;
  outline: none;
}
.arrow {
  fill: rgb(60, 60, 245);
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
