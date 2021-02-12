<template>
<div class="search-root">
  <div v-on:click="getResults" class="md-layout md-elevation-15 searchBar">
    <SearchBarInput class="md-layout-item" />
    <SearchBarDatePicker class="md-layout-item"/>
    <SearchBarGuests class="md-layout-item" />
  </div>
      <Results class="results" v-bind:listings=listings />
</div>
</template>

<script>
import SearchBarDatePicker from './SearchBarDatePicker'
import SearchBarInput from './SearchBarInput'
import SearchBarGuests from './SearchBarGuests'
import Results from './Results'
import axios from 'axios'

export default {
    name: 'SearchBar',
    components: {
      SearchBarDatePicker,
      SearchBarInput,
      SearchBarGuests,
      Results
    },
    data: () => ({
      results: {"test": 1},
      listings: []
    }),
    methods: {
      getResults: function() {
        let config = {
          method: 'get',
          url: 'http://localhost:5000/',
          headers: { }
        };
        axios(config)
        .then((response) => {
          console.log(response); 
              this.listings = response.data
              console.log(this.listings)
              })
    }
},
}
</script>

<style>
  .searchBar {
  margin: 0;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  border-radius: 25px;
  background-color: whitesmoke;
  }

  .results {
    position: absolute;
    top: 30%;
    width: 75%;
    left: 12.5%
  }

</style>