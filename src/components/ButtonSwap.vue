<template>
  <button class="btn-arrow" @click="selected" type="button">
    <svg class="arrow" width="20" height="20">
      <use href="@/assets/arrow.svg#loop"></use>
    </svg>
  </button>
</template>

<script>
export default {};
</script>

<style>
.btn-arrow {
  background-color: inherit;
  border: none;
  outline: none;
}
.arrow {
  fill: rgb(60, 60, 245);
}
</style>