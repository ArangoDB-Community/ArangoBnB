<template>
<div>
    <md-button>
        <strong v-on:click="showHide">
        Filter Results
        </strong>
    </md-button>
        <md-card class="md-layout-item md-size-100 md-small-size-100" v-if="showFilters">
            <md-card-content>
            <h3>Room Types</h3>
            <md-checkbox 
            v-for="room in roomTypes" 
            :key="room" 
            v-model="filters.roomType" 
            v-bind:value="room" 
            @change="updateFilters"> 
            {{room}}
            </md-checkbox>
            </md-card-content>
    <md-card-content>
        <h3>Amenities</h3>
        <div>
            <md-checkbox  
            v-for="amenity in currentAmenities.slice(0,10)" 
            :key="amenity" 
            v-model="filters.amenities" 
            v-bind:value="amenity"
            @change="updateFilters">
            {{amenity}}
            </md-checkbox>
        </div>
    </md-card-content>
    <md-card-content>
        <h3>Pricing</h3>
        <div>
            <label for="fname">$0</label>
            <input 
            type="range" 
            min="0" 
            max="1000" 
            step="1"
            class="priceBar" 
            v-model.number="maxPrice"
            @change="updateFilters"> 
            ${{ maxPrice }}
        </div>
    </md-card-content>
    </md-card>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
name: "Filters",
data: () => ({
showFilters: false,
filters: {"roomType":[], "amenities": [], "priceRange": []},
roomTypes: [
  "Entire home/apt",
  "Private room",
  "Shared room",
  "Hotel room"
],
maxPrice: 1000
}),
computed:
mapState({
    currentAmenities: state => state.map.currentAmenities,
}),
methods: {
showHide: function() {
    this.showFilters = !this.showFilters;
    },
updateFilters: function() {
    this.filters.priceRange = [0, this.maxPrice]    
    this.$store.dispatch("map/setFilters", this.filters);
}
}
}
</script>

<style lang="scss" scoped>
  .md-checkbox {
    display: inline-flex;
  }
  .priceBar {
  width: 80%;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}
.priceBar:hover {
  opacity: 1;
  cursor: pointer;
}

</style>