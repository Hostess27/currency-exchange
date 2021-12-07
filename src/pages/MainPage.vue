<template>
  <section class="container">
    <ConvertMain />
    <ExchangeInfo />
  </section>
</template>

<script>
import ConvertMain from "@/components/ConvertMain.vue";
import ExchangeInfo from "@/components/ExchangeInfo.vue";

export default {
  name: "MainPage",
  components: { ConvertMain, ExchangeInfo },
};
</script>
