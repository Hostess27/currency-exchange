<template>
  <div class="header-color">
    <cuur-header class="header-flex"
      ><h1 class="logo">DLExchanger</h1>
      <a href="#" class="check">Check ID</a></cuur-header
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
.header-color {
  background-color: rgb(60, 60, 245);
  border-radius: 4px;
  padding: 20px;
}
.logo {
  color: white;

}
.header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.check{
  color: white;
  text-decoration: none;
}
</style>



