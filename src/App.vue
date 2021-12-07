<template>
  <div id="app">
    <CurrencyHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import CurrencyHeader from "@/components/CurrencyHeader.vue";
export default {
  name: "App",
  components: { CurrencyHeader },
};
</script>

<style></style>
