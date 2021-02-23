<template>
  <div class="md-layout-item md-scrollbar resultCards">
    <md-button>
        <strong v-on:click="showHide">
        {{ showEvents ? "Hide" : "Show" }} log events:
        </strong>
      </md-button>
    <transition name="fade" v-if=showEvents>
      <pre>{{moveEvents.join('\n')}}</pre>
    </transition>
    <md-card v-for="listing in listings" :key="listing._key" md-with-hover>
      <md-card-area>
        <md-card-media>
          <img :src="listing.picture_url" alt="listing_image" />
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ listing.name }}</div>
          <div class="md-subhead">{{ listing.property_type }}</div>
        </md-card-header>
      </md-card-area>

      <md-card-actions md-alignment="left">
        <md-button class="priceBtn">${{ listing.price }} / night</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "ResultsInfo",
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
  mounted () {
    this.$store.dispatch('map/getResults');
  }
};
</script>

<style lang="scss" scoped>
.resultCards {
  overflow: auto;
  max-height: 70vh;
}
.md-card {
  width: 90%;
  margin-bottom: 8px;
  margin-top: 8px;
  display: inline-block;
  background: whitesmoke;
  border-radius: 25px;
}
.md-card-media img {
  margin-top: 8px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 25px;
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
