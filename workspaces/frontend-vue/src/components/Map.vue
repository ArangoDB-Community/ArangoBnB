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
  }),
  computed: mapState({
    markers: (state) => {
      console.log('computing')
      return state.map.markers
    }
  })
  ,
  methods: {
    showHide: function() {
      console.log("showHide")
      this.showEvents = !this.showEvents;
    },
    logEvent: function(type, text) {
      this.$store.commit('map/setEvents', {type, text});
      
    },
    getPolygonFromBounds: async function (latLngBounds) {
      let center = latLngBounds.getCenter();
      let latlngs = [];

      await latlngs.push([latLngBounds.getSouthWest().lng, latLngBounds.getSouthWest().lat]);//bottom left
      await latlngs.push([ center.lng, latLngBounds.getSouth() ]);//bottom center
      await latlngs.push([latLngBounds.getSouthEast().lng, latLngBounds.getSouthEast().lat]);//bottom right
      await latlngs.push([latLngBounds.getEast(), center.lat]);// center right
      await latlngs.push([latLngBounds.getNorthEast().lng, latLngBounds.getNorthEast().lat]);//top right
      await latlngs.push([center.lng, latLngBounds.getNorth() ]);//top center
      await latlngs.push([latLngBounds.getNorthWest().lng, latLngBounds.getNorthWest().lat]);//top left
      await latlngs.push([latLngBounds.getWest(), center.lat]);//center left
      await latlngs.push([latLngBounds.getSouthWest().lng, latLngBounds.getSouthWest().lat]);//bottom left

      return latlngs;
    },
    getResults: async function (e) {
      let mapArea = await this.getPolygonFromBounds(e.target.getBounds());
      await this.$store.dispatch('map/getResults', {mapArea});  
      
    },
    setupLeafletMap: function() {
      const iconX = 36;
      const iconY = 36;
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

      let mymap = L.map("mapContainer");

      function addMarkers(markers) {
        console.log(markers)
        const arangoIcon = new mapIcon({iconUrl: mapMarker});
        let m;
        for(m in markers) {
          L.marker([markers[m][0], markers[m][1]], {icon: arangoIcon}).bindPopup(` ${markers[m][0]} ${markers[m][1]} `).addTo(mymap);        
        }
      }

      mymap.on("load",async  (e) => {
        await this.getResults(e);
        addMarkers(this.markers);
      });

      mymap.setView([52.5163120794449, 13.380521317397218], 16); // Brandenburg Gate
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 3,
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        useCache: true,
      }).addTo(mymap);

      mymap.on("zoomend",  (e) => {
        this.logEvent(e.type, e.target.getZoom());
      });

      mymap.on('movestart',  (e) => {
        const bounds = e.target.getBounds();

        const boundsString = [
          bounds.getNorth(),
          bounds.getEast(),
          bounds.getSouth(),
          bounds.getWest(),
        ].map(n => n.toFixed(3)).join(', ');
        this.logEvent(e.type, boundsString);
    });
    
    mymap.on('moveend',  async (e) => {
      await this.getResults(e)
      await addMarkers(this.markers);
    })
      
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
