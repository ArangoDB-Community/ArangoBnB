<template>
  <div class="md-layout-item md-scrollbar resultsContainer">
    <Filters />
    <listingsCard class="resultCard" v-for="listing in listings" :key="listing._key" v-bind:listing=listing />
  </div>

</template>

<script>
import { mapState } from 'vuex'
import listingsCard from './listingsCard'
import Filters from './Filters'

export default {
  name: "ResultsInfo",
  components: {
    listingsCard,
    Filters
  },
  data: () => ({
    showEvents: true,
  }),
  computed: mapState({
    moveEvents: state => state.map.moveEvents,
    listings: state => state.map.listings
  }),
  methods: {
    showHide: function() {
      this.showEvents = !this.showEvents;
    }
  },
};
</script>

<style lang="scss" scoped>
.resultsContainer {
  overflow: auto;
  max-height: 70vh;
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

.priceBtn {
  border-radius: 25px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
