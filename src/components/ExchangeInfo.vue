<template>
  <ul class="exchange-info">
    <li>
      <div>Курс</div>
      <div>{{ rateText }}</div>
    </li>
    <li>
      <div>Резерв</div>
      <div>{{ reserveText }}</div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { RESERVE } from "@/utils/reserve.const";

export default {
  name: "ExchangeInfo",
  computed: {
    ...mapGetters(["currentRate", "fromCurrency", "toCurrency"]),
    rateText() {
      const rate = this.currentRate[this.toCurrency.value];
      return `1 ${this.fromCurrency.name} = ${rate} ${this.toCurrency.name}`;
    },
    reserveText() {
      return `${RESERVE[this.toCurrency.value]} ${this.toCurrency.name}`;
    },
  },
};
</script>

<style scoped>
.exchange-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--dark-gray);
  text-align: center;
}
</style>
