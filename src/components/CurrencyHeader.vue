<template>
  <div class="header-container">
    <header class="header-color">
      <div class="header header-flex container">
        <router-link class="logo" to="/">
          <h1>DLExchanger</h1>
        </router-link>
        <div class="check">Check ID</div>
      </div>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style>
.header-container {
  padding-bottom: 30px;
}
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
