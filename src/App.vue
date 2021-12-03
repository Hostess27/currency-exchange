<template>
  <div id="app">
   <CurrencyHeader />
   <ConwertMain />
   <ButtonConwert />
   <RateCurrent />
   <StockpileConwert />
  </div>
</template>

<script>
import CurrencyHeader from './components/CurrencyHeader.vue'
import ConwertMain from './components/ConwertMain.vue'
import ButtonConwert from './components/ButtonConwrt.vue'
import RateCurrent from './components/RateCurrent.vue'
import StockpileConwert from './components/StockpileConwert.vue'


export default {
  name: 'App',
  components: {
   CurrencyHeader, ConwertMain, ButtonConwert, RateCurrent, StockpileConwert
  }
}
</script>

<style>

</style>
