<template>
  <section class="container">
    <div id="app">
      <CurrencyHeader />
      <div><router-view></router-view></div>
    </div>
  </section>
</template>

<script>
import CurrencyHeader from "@/components/CurrencyHeader.vue";
import './style/index.css'
import './style/utill.css'
export default {
  name: "App",
  components: { CurrencyHeader },
};
</script>

<style>
</style>
