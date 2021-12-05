<template>
  <div id="app">
    <CurrencyHeader />
    <div><router-view></router-view></div>
  </div>
</template>

<script>
import CurrencyHeader from "@/components/CurrencyHeader.vue";

export default {
  name: "App",
  components: { CurrencyHeader },
};
</script>

<style>
</style>
