<template>
<div :class=listing._key ref='clickHook' >

    <md-card md-with-hover>
      <md-card-area>
        <div v-on:click="listingClicked">
        <md-card-media>
          <img :src="listing.picture_url" alt="listing_image" />
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ listing.name }}</div>
          <div class="md-subhead">{{ listing.property_type }}</div>
        </md-card-header>
          <table class="detailsTable">
            <tr>
            <th>
            </th>
            <th>
              <strong class="amenitiesHeader">Amenities</strong> 
            </th>
            </tr>
            <tr>
              <td>
              <md-button class="priceBtn">${{ listing.price }} / night</md-button>
              </td>
              <td>
                <span 
                class="amenitiesList" 
                v-for="amenity in listing.amenities.slice(0,3)" 
                :key="amenity">
                {{amenity}}, 
                </span>...
              </td>
            </tr>
          </table>
        </div>
      </md-card-area>

    </md-card>
</div>
</template>

<script>
export default {
    props: {
        listing: Object
    },
    methods: {
      listingClicked: function() {
        this.$store.dispatch("map/listingClicked", this.listing)
      }
    }
}
</script>

<style lang="scss" scoped>
th, td {
  text-align: left;
  padding: 0px;
  margin-top: 0px;
}
.priceBtn {
  width: 10%;
  font-size: 1.2vh;
  font-weight: bold;
  margin: 0;
  margin-left: 5px;
  border-radius: 15px;
}
.md-title {
  display: inline;
}
.amenitiesList {
  font-weight: normal;
}
@media only screen and (max-height: 750px) {
.priceBtn {
  width: 10%;
  font-size: 10px;
}
}
</style>