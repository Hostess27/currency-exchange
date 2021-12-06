<template>
  <header class="header-color">
    <div class="header header-flex">
      <router-link class="logo" to="/">
        <h1>DLExchanger</h1>
      </router-link>
      <div class="check">Check ID</div>
    </div>
  </header>
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
  text-decoration: none;
}
.header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.check {
  color: white;
}
</style>
