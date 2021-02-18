<template>
<div>
    <Navbar />
  <div class="page-container " :style="{backgroundImage: `url(${backgroundURL})`}">
  </div>
    <SearchBar />
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import SearchBar from '../components/SearchBar.vue'
import Vue from 'vue'
import VueMaterial from 'vue-material'

  export default {
    name: 'Home',
    components: {
      Navbar,
      SearchBar,
    },
    data: () => ({
      showNavigation: false,
      showSidepanel: false,
      backgroundURL: "https://upload.wikimedia.org/wikipedia/commons/8/84/Berlin_aerial_view_%2840858786523%29.jpg",
    })
  }

  Vue.use(VueMaterial)
</script>

<style lang="scss" scoped>
  .page-container {
    height: 90vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: whitesmoke;
  }
  
</style>