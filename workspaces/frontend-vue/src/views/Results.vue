<template>
<div class="md-layout">
    <ResultsInfo v-show="!listingClicked" v-bind:listings=listings />
    <Map v-show="!listingClicked"/>
    <ListingDetails v-if="listingClicked"/>
</div>
</template>

<script>
import ResultsInfo from "../components/ResultsInfo";
import Map from "../components/Map";
import ListingDetails from "../components/ListingDetails";
import { mapState } from 'vuex'


  export default {
    name: 'Home',
    data: () => ({
    }),
    components: {
      ResultsInfo,
      Map,
      ListingDetails
    },
    computed:
      mapState({
        listings: state => state.map.listings,
        listingClicked: (state) => {
          return Object.keys(state.map.clickedListing).length > 0 ? true : false
        }
      })
  };
</script>

<style lang="scss" scoped>

</style>