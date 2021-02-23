<template>
    <div class="md-layout-item md-size-70" id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { mapState } from 'vuex'
import mapMarker from "../assets/ArangoMapMarker.png"
import mapMarkerShadow from "../assets/ArangoMapMarker_shadow.png"

export default {
  name: "Map",
  data: () => ({
    showEvents: true,
    mymap: {}
  }),
  computed: mapState({
    markers: state => state.map.markers
  }),
  methods: {
    showHide: function() {
      this.showEvents = !this.showEvents;
    },
    logEvent: function(type, text) {
      this.$store.commit('map/setEvents', {type, text});
      
    },
    getPolygonFromBounds: function (latLngBounds) {
      let center = latLngBounds.getCenter();
      let latlngs = [];

      latlngs.push([latLngBounds.getSouthWest().lng, latLngBounds.getSouthWest().lat]);//bottom left
      latlngs.push([ center.lng, latLngBounds.getSouth() ]);//bottom center
      latlngs.push([latLngBounds.getSouthEast().lng, latLngBounds.getSouthEast().lat]);//bottom right
      latlngs.push([latLngBounds.getEast(), center.lat]);// center right
      latlngs.push([latLngBounds.getNorthEast().lng, latLngBounds.getNorthEast().lat]);//top right
      latlngs.push([center.lng, latLngBounds.getNorth() ]);//top center
      latlngs.push([latLngBounds.getNorthWest().lng, latLngBounds.getNorthWest().lat]);//top left
      latlngs.push([latLngBounds.getWest(), center.lat]);//center left
      latlngs.push([latLngBounds.getSouthWest().lng, latLngBounds.getSouthWest().lat]);//bottom left

      return latlngs;
    },
    getResults: function (e) {
      let mapArea = this.getPolygonFromBounds(e.target.getBounds());
      this.$store.dispatch('map/getResults', {mapArea});
    },
    setupLeafletMap: function() {
      const iconX = 30;
      const iconY = 32;
      const mapIcon = L.Icon.extend({
        options: {
          shadowUrl: mapMarkerShadow,
          iconSize:     [iconX, iconY], // size of the icon
          shadowSize:   [iconX, iconY], // size of the shadow
          iconAnchor:   [iconX, iconY], // point of the icon which will correspond to marker's location
          shadowAnchor: [iconX, iconY],  // the same for the shadow
          popupAnchor:  [-15, -iconY] // point from which the popup should open relative to the iconAnchor
        }
      });


      let mymap = L.map("mapContainer").setView([52.53454, 13.40256], 13);
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 3,
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        //noWrap: true,
        useCache: true,
      }).addTo(mymap);
      mymap.on("zoom", (e) => {
        this.getResults(e);
        this.logEvent(e.type, e.target.getZoom(), e);

        // TODO: Handle this in another function
        const markers = this.markers;
        const arangoIcon = new mapIcon({iconUrl: mapMarker});
        let m;
        for(m in markers) {
          L.marker([markers[m][0], markers[m][1]], {icon: arangoIcon}).bindPopup("I am an icon").addTo(mymap);        
        }
      });
        mymap.on('moveend', e => {
          const bounds = e.target.getBounds();

          const boundsString = [
            bounds.getNorth(),
            bounds.getEast(),
            bounds.getSouth(),
            bounds.getWest(),
          ].map(n => n.toFixed(3)).join(', ');
          this.logEvent(e.type, boundsString);
          this.getResults(e);

          // TODO: Handle this in another function
          const markers = this.markers;
          const arangoIcon = new mapIcon({iconUrl: mapMarker});
          let m;
          for(m in markers) {
            L.marker([markers[m][0], markers[m][1]], {icon: arangoIcon}).bindPopup("I am an icon").addTo(mymap);        
          }
      });
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style lang="scss" scoped>

#mapContainer {
  height: 64vh;
  width: 60vw;
  z-index: 0;
  margin-top: 1vw;
  margin-right: 1vw;
  border-radius: 25px;
}
</style>
