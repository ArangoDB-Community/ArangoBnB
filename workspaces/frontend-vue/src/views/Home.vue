<template>
<div>
    <Navbar />
    <div class="background " :style="{backgroundImage: `url(${backgroundURL})`}"></div>
    <SearchBar />
    <Results class="results" />
    
</div>
</template>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'

import Navbar from '../components/Navbar.vue'
import SearchBar from '../components/SearchBar.vue'
import Results from './Results.vue'

  export default {
    name: 'Home',
    components: {
      Navbar,
      SearchBar,
      Results
    },
      data: () => ({
      showNavigation: false,
      showSidepanel: false,
      backgroundURL: "https://upload.wikimedia.org/wikipedia/commons/8/84/Berlin_aerial_view_%2840858786523%29.jpg",
    }), 
    mounted () {
      this.$store.dispatch('map/getResults');
    }
  }

  Vue.use(VueMaterial)
</script>

<style lang="scss" scoped>
  .background {
    height: 90vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: whitesmoke;
  }

  .results {
  position: absolute;
  top: 30%;
  left: 2.5vw;
  width: 95vw;
  background-color: rgba(245, 245, 245, 0.75);
  border-radius: 25px;
  backdrop-filter: blur(15px);
  }

</style>