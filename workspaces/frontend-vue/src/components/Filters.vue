<template>
<div>
    <md-button v-on:click="showHide">
        <strong>
        {{ showFilters ? "Hide" : "Show"}} Filters
        </strong>
    </md-button>
    <transition name="slide-fade">
        <md-card class="md-layout-item filtersContainer md-size-100 md-small-size-100" v-if="showFilters">
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
          v-for="amenity in currentAmenities.slice(0,nextPosition)" 
          :key="amenity" 
          v-model="filters.amenities" 
          v-bind:value="amenity"
          @change="updateFilters">
          {{amenity}}
          </md-checkbox>
          <md-button>
            <strong v-on:click="incrementPosition">
            More...
            </strong>
          </md-button>            
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
    <md-button>
      <strong v-on:click="clearFilters">
      Clear Filters
      </strong>
  </md-button>
  </md-card>
</transition>
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
maxPrice: 1000,
position: 0
}),
computed:
mapState({
    currentAmenities: state => state.map.currentAmenities,
    nextPosition: function() {
      this.position = this.position + 10
      return this.position
    }
}),
methods: {
showHide: function() {
    this.showFilters = !this.showFilters;
    },
updateFilters: function() {
    this.filters.priceRange = [0, this.maxPrice]    
    this.$store.dispatch("map/setFilters", this.filters);
},
clearFilters: function() {
    this.filters.priceRange = [];
    this.filters.roomType = [];
    this.filters.amenities = [];
    this.filters.priceRange = [];
    this.position = 0;
    this.maxPrice = 1000;
    this.$store.dispatch("map/setFilters", this.filters);
  },
  incrementPosition: function() {
    this.position += 10;
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
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
.filtersContainer {
  border-radius: 25px;
  -webkit-mask-image: -webkit-gradient(linear, center top, center bottom, 
  color-stop(0.00,  rgba(0,0,0,0)),
  color-stop(0.025,  rgba(0,0,0,1)));
}

</style>