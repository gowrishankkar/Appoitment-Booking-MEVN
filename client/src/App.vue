<template>
  <v-app id="app">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>
      <div id="nav">
        <router-link to="/">Book</router-link> |
        <router-link to="/events">All Events</router-link>
      </div>
    </v-toolbar>

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
  text-decoration: none;
  color:  #ac745a;
}

#nav a.router-link-exact-active {
  color: #fcfdfd;
}
</style>
