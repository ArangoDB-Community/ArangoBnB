<template>
  <div id="app">
    <Home msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import store from './store'
import Home from './views/Home.vue'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


export default {
  name: 'App',
  store,
  components: {
    Home
  }
}
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  background-color: whitesmoke;
}
</style>
