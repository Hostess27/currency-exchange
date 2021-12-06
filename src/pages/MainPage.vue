<template>
  <div>
    <ConvertMain />
    <RateCurrent />
    <StockpileConwert />
  </div>
</template>

<script>
import ConvertMain from "@/components/ConvertMain.vue";
import RateCurrent from "@/components/RateCurrent.vue";
import StockpileConwert from "@/components/StockpileConwert.vue";

export default {
  name: "MainPage",
  components: { ConvertMain, RateCurrent, StockpileConwert },
};
</script>
