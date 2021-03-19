<template>
  <div class="detailsContainer">
      <div class="leftPanel">
        <md-button v-on:click="returnToMap">
          <strong>
          Return to the map
          </strong>
        </md-button>
        <ListingCard class="resultCard" v-bind:listing=clickedListing />
      </div>

      <div class="rightPanel">
      {{clickedListing}}
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListingCard from './listingsCard'

export default {
    name: "ListingDetails",
    components: {
      ListingCard
    },
  data: () => ({
    showEvents: true,
  }),
    computed: mapState({
    clickedListing: state => state.map.clickedListing
  }),
  methods: {
    returnToMap: function() {
      this.$store.dispatch("map/listingClicked", {})
    }
  }
}
</script>

<style scoped lang="scss">
.leftPanel {
  overflow: hidden;
  width: 30%;
  float: left;
  max-height: 90%;
}
.resultCard {
  width: 90%;
  margin-bottom: 8px;
  margin-top: 8px;
  display: inline-block;
  background: whitesmoke;
  border-radius: 25px;
}
/deep/ .md-card-media img{
  margin-top: 8px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 25px;
  min-height: 25vh;
  max-height: 35vh;
}
.rightPanel {
  width: 65%;
  float: right;
  max-height: 90%;
  overflow: hidden;
}
.detailsContainer {
  z-index: 0;
  border-radius: 25px;
  padding: 20px;
  display: inline-block;
  border-radius: 25px;
  max-height: 70vh;
  overflow: hidden;
}

</style>