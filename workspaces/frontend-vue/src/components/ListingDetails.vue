<template>
  <div class="md-layout md-gutter detailsContainer">
      <div class="md-layout-item leftPane" >
        <md-button v-on:click="returnToMap">
          <strong>
          Return to the map
          </strong>
        </md-button>
        <div class="resultCard">
        <ListingCard v-bind:listing=clickedListing />
        </div>
      </div>

      <div class="md-layout-item md-size-70">
      <md-content class="rightPaneBackground">
        <div v-for="item, x in clickedListing" :key="x"></div>
        {{x}}
        </md-content>
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
.rightPane {
  padding-right: 20px !important;
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

.detailsContainer {
  z-index: 0;
  border-radius: 25px;
  border-radius: 25px;
  max-height: 65vh;
  overflow: hidden;
}

</style>