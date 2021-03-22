<template>
  <div class="md-layout md-gutter detailsContainer">
      <div class="md-layout-item leftPane" >
        <md-button class="returnToMapBtn" v-on:click="returnToMap">
          <strong>
          Return to the map
          </strong>
        </md-button>
        <div class="resultCard">
        <ListingCard v-bind:listing=clickedListing />
        </div>
      </div>

      <div class="md-layout-item md-size-70 rightPane">       
      <div class="md-display-1">{{clickedListing.name}}</div>
        <div class="md-layout md-gutter innerRightPane" >
          <md-card class="md-layout-item md-size-33 leftCard">
            <md-content class="md-scrollbar">

              <div class="md-subheading headings"><strong>Property Information:</strong></div>
            <md-card-content class="description" v-html="descriptionHTML">
              {{descriptionHTML}}
            </md-card-content>
            </md-content>
          </md-card>
          <md-card class="md-layout-item md-size-33 middleCard">
            <md-content class="md-scrollbar">
            <div v-if="clickedListing.accommodates" class="md-subheading headings"><strong> Accommodates:  </strong><span>{{clickedListing.accommodates}}</span></div>
            <div v-if="clickedListing.beds" class="md-subheading headings"><strong> Beds:  </strong><span>{{clickedListing.beds}}</span></div>
            <div v-if="clickedListing.bedrooms" class="md-subheading headings"><strong> Bedrooms:  </strong><span>{{clickedListing.bedrooms}}</span></div>
            <div v-if="clickedListing.bathrooms_text" class="md-subheading headings"><strong> Bathrooms:  </strong><span>{{clickedListing.bathrooms_text}}</span></div>
              <div class="md-subheading headings"><strong>Amenities:  </strong>
              <span v-for="amenity,x in clickedListing.amenities" :key="x">               
                {{amenity}},
              </span>
              </div>
            </md-content>
          </md-card>
          <md-card class="md-layout-item md-size-33 rightCard">
            <md-content class="md-scrollbar">
            <md-card-content class="Host">
              <md-card-media v-if="clickedListing.host_picture_url">
                <img :src="clickedListing.host_picture_url" alt="host_image" />
              </md-card-media>
              <div v-if="clickedListing.host_name" class="md-subheading headings"><strong> Host:  </strong><span>{{clickedListing.host_name}}</span></div>
              <div v-if="clickedListing.host_response_rate" class="md-subheading headings"><strong> Host Response Rate:  </strong><span>{{clickedListing.host_response_rate}}</span></div>
              <div v-if="clickedListing.host_verifications" class="md-subheading headings"><strong>Host Verifications:  </strong>
                <span v-for="verification,x in clickedListing.host_verifications" :key="x">               
                  {{verification}},
                </span>
              </div>
              <div v-if="clickedListing.has_availability" class="md-subheading headings"><strong> Has Availability:  
                </strong><span>{{clickedListing.has_availability}}</span></div>
            </md-card-content>
            </md-content>
          </md-card>
          
        </div> 
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
    showEvents: true
  }),
    computed: mapState({
    clickedListing: state => state.map.clickedListing,
    descriptionHTML: (state) => {
      return state.map.clickedListing.description.concat('<br /> <br /> <strong> Neighborhood Overview </strong> <br />', state.map.clickedListing.neighborhood_overview)
    },
    neighborhoodHTML: (state) => {
      return state.map.clickedListing.neighborhood_overview
    }
  }),
  methods: {
    returnToMap: function() {
      this.$store.dispatch("map/listingClicked", {})
    }
  }
}
</script>

<style scoped lang="scss">
.md-content {
  max-height: 55vh;
  margin-top: 10px;
  overflow: auto;
}
.md-card {
  max-height: 58vh;
}
.leftCard {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.rightCard {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.detailsContainer {
  z-index: 0;
  padding-right: 20px;
  padding-top: 20px;
  overflow: hidden;
}
.leftPane {
  height: 65vh;
}
.rightPane {
  z-index: 0;
  height: 60vh;
  margin-right: 20px;
  padding-top: 20px;
}
.md-display-1 {
  margin-bottom: 20px;
  margin-top: -25px;
}
.headings {
  text-align: left;
  margin-top: 10px;
}
.resultCard {
  width: 90%;
  margin-bottom: 8px;
  margin-top: 8px;
  display: inline-block;
  background: whitesmoke;
  border-radius: 25px;
}
 .md-card-media img{
   max-width: 200px;
   height: auto;
 }
/deep/ .md-card-media img{
  margin-top: 8px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 25px;
  min-height: 25vh;
  max-height: 35vh;
}


</style>