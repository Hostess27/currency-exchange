<template>
  <div class="rate-position">
    <p class="rate-text">Курс</p>
  </div>

  <!-- v-for="rate in this.$store.state.rate" -->
</template>

<script>
import {  mapGetters } from "vuex";
import "@/style/variables.css";
export default {
  name: "RateCurrent",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["RATE"]),
  },

};
</script>
<style scoped>
.rate-position{
  position: absolute;
  top: 50%;
  left: 50px;
}
.rate-text{
  color: var(--dark-gray);
}
</style>
