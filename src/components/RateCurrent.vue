<template>
  <div>
    <p>Курс</p>
  </div>

  <!-- v-for="rate in this.$store.state.rate" -->
</template>

<script>
import {  mapGetters } from "vuex";
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
