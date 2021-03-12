<template>
<div class="searchInput">
  <md-button>
    <md-field>
      <label>Where to?</label>
      <md-input v-model="query"></md-input>
      <span class="md-helper-text">Search destination</span>
      <md-tooltip>Ex: "Museum Island"</md-tooltip>
    </md-field>
</md-button>
<div class="destinationResults" v-if="query">
<md-list>
<md-list-item class="destinationAutoComplete" v-for="destination in destinations.slice(0,5)" :key="destination.raw.place_id">
  <span v-on:click="setDestination({x: destination.x, y: destination.y})"> {{destination.label}} </span>
</md-list-item>
</md-list>
</div>
</div>
</template>

<script>
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import _ from "lodash"


// setup
const provider = new OpenStreetMapProvider();
export default {

    name: "SearchBarDestination",
    data() {
      return {
      query: '',
      showAutoComplete: false,
      destinations: []
      }
    },
    watch: {
      query: async function() {
        this.getDestinations()
      }
    },
    methods: {
      getDestinations: _.debounce(async function() {
        this.destinations = await provider.search({ query: this.query});
      }, 500),
      setDestination: function(destination) {
        this.query = '';
        this.showAutoComplete = false;
        this.$store.dispatch("map/setDestination", { destination });        
      }
    }
}
</script>


<style lang="scss" scoped>
.searchInput {
  position: relative;
}
.md-list {
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  width: 50vw;
  margin-top: -25px;
  position: fixed;
  overflow: hidden;
  background: whitesmoke !important;
}
.destinationResults {
  padding-top: 20px;
}
.md-list-item:hover {
  cursor: pointer;
  background-color: rgb(216, 216, 216);
} 

</style>