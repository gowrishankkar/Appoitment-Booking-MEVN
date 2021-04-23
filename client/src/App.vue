<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">Book Event</router-link> |
      <router-link to="/events">Show Events</router-link>
    </div>
    <router-view />
  </v-app>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #1976d2;
}
</style>
