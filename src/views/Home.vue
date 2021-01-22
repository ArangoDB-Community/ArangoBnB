<template>
<div>
  <div class="page-container md-layout-column" :style="{backgroundImage: `url(${backgroundURL})`}">
    <Navbar />
    <SearchBar />
  </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import SearchBar from '../components/SearchBar.vue'

  export default {
    name: 'Home',
    components: {
      Navbar,
      SearchBar
    },
    data: () => ({
      showNavigation: false,
      showSidepanel: false,
      backgroundURL: "https://images.unsplash.com/photo-1534528770941-33118ceae543?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2158&q=80",
    })
  }

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
  }
</style>