<template>
  <div>
    <h2 class="main-name">Обменник</h2>
    <form class="form-main" novalidate @submit.prevent="onSubmit">
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
        <input
          v-model.number="inputAmount"
          class="input-main"
          type="number"
          min="0"
          @input="onChangeInputAmount"
        />
      </div>
      <button class="btn-arrow" type="button" @click="onClickSwapCurrencies">
        <svg class="arrow" width="20" height="20">
          <use href="@/assets/arrow.svg#loop" />
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
        <input
          v-model="outputAmount"
          class="input-main"
          type="number"
          min="0"
          @input="onChangeOutputAmount"
        />
      </div>

      <button class="btnCurrent" type="submit" :disabled="!isFormValid">
        {{ isFormValid ? "Обменять" : "Укажите сумму" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getRatesFromApi } from "@/services/rate-api.services";
import { CURRENCIES } from "@/utils/currency.const";
import { RESERVE } from "@/utils/reserve.const";

let rates = [];

export default {
  name: "convert-main",
  data() {
    return {
      inputAmount: 0,
      fromCurrency: CURRENCIES[0],
      toCurrency: CURRENCIES[1],
      outputAmount: 0,
    };
  },
  computed: {
    ...mapGetters(["currentRate"]),

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
    isFormValid() {
      return +this.inputAmount > 0 && this.fromCurrency && this.toCurrency;
    },
  },
  watch: {
    fromCurrency(newValue) {
      const rate = rates.find((rate) => rate.currency === newValue.value);

      this.setCurrentRate(rate);
    },
  },
  async mounted() {
    rates = await getRatesFromApi();

    const rate = rates.find(
      (rate) => rate.currency === this.fromCurrency.value
    );

    this.setCurrentRate(rate);
  },
  methods: {
    ...mapMutations(["setCurrentRate"]),

    onSetCurrentRate() {},

    onChangeInputAmount() {
      this.outputAmount =
        this.inputAmount * this.currentRate[this.toCurrency.value];
    },

    onChangeOutputAmount() {
      this.inputAmount =
        this.outputAmount / this.currentRate[this.toCurrency.value];
    },

    onSubmit() {
      if (!this.isFormValid) return;

      if (+this.outputAmount <= RESERVE[this.toCurrency.value]) {
        this.$router.push({ name: "success" });
      }
    },
    onClickSwapCurrencies() {
      [
        this.fromCurrency,
        this.toCurrency,
        this.inputAmount,
        this.outputAmount,
      ] = [
        this.toCurrency,
        this.fromCurrency,
        this.outputAmount,
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
}
</style>
