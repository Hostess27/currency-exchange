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
      <div>
        <button class="submit-btn" type="submit" :disabled="!isFormValid">
          {{ buttonText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getRatesFromApi } from "@/services/rate-api.services";
import { RESERVE } from "@/utils/reserve.const";
import { CURRENCIES } from "@/utils/currency.const";

let rates = [];

export default {
  name: "convert-main",
  data() {
    return {
      inputAmount: 0,
      outputAmount: 0,
    };
  },
  computed: {
    ...mapGetters(["currentRate"]),

    fromCurrency: {
      get() {
        return this.$store.getters["fromCurrency"];
      },

      set(value) {
        this.$store.commit("setFromCurrency", value);
      },
    },
    toCurrency: {
      get() {
        return this.$store.getters["toCurrency"];
      },

      set(value) {
        this.$store.commit("setToCurrency", value);
      },
    },
    fromCurrencies() {
      return CURRENCIES.filter(
        (currency) => currency.value !== this.toCurrency.value
      );
    },
    toCurrencies() {
      return CURRENCIES.filter(
        (currency) =>
          currency.value !== this.fromCurrency.value &&
          this.currentRate[currency.value]
      );
    },
    isFormValid() {
      return (
        +this.inputAmount > 0 &&
        this.fromCurrency &&
        this.toCurrency &&
        !this.isLowReserve
      );
    },
    isLowReserve() {
      return +this.outputAmount > RESERVE[this.toCurrency.value];
    },
    buttonText() {
      return this.isLowReserve
        ? "Не хватает денег в резерве"
        : this.isFormValid
        ? "Обменять"
        : "Укажите сумму";
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
    ...mapMutations(["setCurrentRate", "setResult"]),

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
      if (!this.isFormValid || this.isLowReserve) return;

      this.setResult({
        inputAmount: this.inputAmount,
        fromCurrency: this.fromCurrency.name,
        outputAmount: this.outputAmount,
        toCurrency: this.toCurrency.name,
      });
      this.$router.push({ name: "success" });
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
  padding-bottom: 20px;
}
.form-main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.slt {
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid var(--primary-color);
}
.input-main {
  padding: 10px;
  border: none;
  border-bottom: 1px solid var(--primary-color);
}
.btn-arrow {
  background-color: inherit;
  border: none;
  fill: var(--primary-color);
  cursor: pointer;
}
.submit-btn {
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
