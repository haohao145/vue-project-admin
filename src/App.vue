<template>
  <div
    id="app"
    class=""
  >
    <!-- <div id="nav"> -->
    <!-- <router-link to="/prize">抽奖</router-link> -->
    <!-- <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
/*===== SCSS =====*/

#app {
  font-family: "Avenir", "Helvetica", "Arial", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
