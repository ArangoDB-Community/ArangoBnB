<template>
  <div class="md-layout-item md-size-70" id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { mapState } from "vuex";
import mapMarker from "../assets/ArangoMapMarker.png";
import mapMarkerShadow from "../assets/ArangoMapMarker_shadow.png";
import listingsCard from './listingsCard';
import Vue from 'vue'

// const mymap = L.map("mapContainer");

export default {
  name: "Map",
  components: {    
  },
  data: () => ({
    showEvents: true,
    mymap: {},
    markersKeys: [],
    markerLayer: L.layerGroup(),
    maxMarkers: 200
  }),
  computed:
  mapState({
    listings: state => state.map.listings,
    mapPosition: state => state.map.mapPosition,
    clearMarkers: state => state.map.clearMarkers
  }),
  watch: {
    mapPosition: function() {
      this.mymap.setView([this.mapPosition.y, this.mapPosition.x], 16);
      },
    clearMarkers: function() {
      if(this.clearMarkers == true) {
        this.updateMarkers();
      }
    }
  },
  methods: {
    updateMarkers: function() {
      this.addMarkers(this.listings)
      this.$store.commit("map/setClearMarkers", false); 
    },
    showHide: function () {
      this.showEvents = !this.showEvents;
    },
    logEvent: function (type, text) {
      // Logs move events that the Log Event component relies on
      // leaving for use in tech component
      // TODO: Add tech component
      this.$store.commit("map/setEvents", { type, text }); 
    },
    getCardinalDirectionsFromBounds: function (bounds) {
      return [
        bounds.getNorth(),
        bounds.getEast(),
        bounds.getSouth(),
        bounds.getWest(),
      ].map(v => Math.round(v * 10000) / 10000) // up to 4 decimal places
    },
    getResults: async function (e) {
      let mapArea = this.getCardinalDirectionsFromBounds(e.target.getBounds());
      await this.$store.dispatch("map/getResults", { mapArea });
    },
    addMarkers: function (listings) {
      const iconX = 36;
      const iconY = 36;
      const mapIcon = L.Icon.extend({
        options: {
          shadowUrl: mapMarkerShadow,
          iconSize:     [iconX, iconY], // size of the icon
          shadowSize:   [iconX, iconY], // size of the shadow
          iconAnchor:   [iconX, iconY], // point of the icon which will correspond to marker's location
          shadowAnchor: [iconX, iconY], // the same for the shadow
          popupAnchor:  [-15, -iconY] , // point from which the popup should open relative to the iconAnchor
        },
      });
        const arangoIcon = new mapIcon({ iconUrl: mapMarker });

        // Check to see if markers need cleared due to either:
        // Too many on screen or
        // Filters potentially invalidate the current markers (this.clearMarkers)
        if (this.markersKeys.length >= this.maxMarkers || this.clearMarkers == true) {
          this.markerLayer.clearLayers(); 
          this.markersKeys = [];
        }
        
        listings.map((listing) => {
          if (!this.markersKeys.includes(listing._key)) {
            this.markersKeys.push(listing._key)

            const popup = L.popup({
            "className": "popupClass",
            "maxWidth": 200,
            "maxHeight": 300,
            "autoPan": true
            })
            .setLatLng([listing.latitude, listing.longitude])
            .setContent(new Vue({
              ...listingsCard,
              parent: this,
              propsData: {listing: listing}
            }).$mount().$el.outerHTML);

            L.marker([listing.latitude, listing.longitude], { icon: arangoIcon })
              .bindPopup(popup)
              .addTo(this.markerLayer);         
          }
        })
        this.markerLayer.addTo(this.mymap);
      },
    setupLeafletMap: function () {
      let mymap = this.mymap

      mymap.on("load", async (e) => {
        await this.getResults(e);
        this.addMarkers(this.listings);
      });

      mymap.setView([52.5163120794449, 13.380521317397218], 16); // Brandenburg Gate

      const baseLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 3,
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        useCache: true,
      })
      mymap.addLayer(baseLayer)

      mymap.on("zoomend", (e) => {
        this.logEvent(e.type, e.target.getZoom());
      });

      mymap.on("movestart", (e) => {
        const bounds = e.target.getBounds();

        const boundsString = [
          bounds.getNorth(),
          bounds.getEast(),
          bounds.getSouth(),
          bounds.getWest(),
        ]
          .map((n) => n.toFixed(3))
          .join(", ");
        this.logEvent(e.type, boundsString);
      });

      mymap.on("moveend", async (e) => {
        await this.getResults(e);
        await this.addMarkers(this.listings);
      });
    },
  },
  mounted() {
    this.mymap = L.map("mapContainer")
    this.setupLeafletMap();
  },
};
</script>

<style lang="scss" scoped>
/deep/ .md-title {
  font-size: 15px;
  line-height: 15px;
  word-wrap: break-word  
}

/deep/ .popupClass img {
  max-width: 170px; //px due to leaflet px restriction
  max-height: 120px; //px due to leaflet px restriction
  margin-left: 15px;
}

#mapContainer {
  height: 64vh;
  width: 60vw;
  z-index: 0;
  margin-top: 1vw;
  margin-right: 1vw;
  border-radius: 25px;
}
</style>
