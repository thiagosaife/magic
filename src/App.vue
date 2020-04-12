<template>
  <b-container id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </b-container>
</template>

<script>
export default {
  created() {
    const favIcons = ['B', 'C', 'G', 'M', 'R', 'U', 'W'];
    const id = Math.floor(Math.random() * favIcons.length) + 1;
    const favicon = document.getElementById('favicon');
    const image = `./${favIcons[id]}.ico`;
    favicon.setAttribute('href', image || `./${favIcons[0]}.ico`);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #99cc99;
    }
  }
}
</style>
