<template>
  <section class="container">
    <p>{{ result }}</p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SuccessPage",
  computed: {
    ...mapGetters(["result"]),
  },
};
</script>
