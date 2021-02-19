<template>
  <div class="md-layout">
    <div class="md-layout-item md-scrollbar resultCards">
    <md-card v-for="listing in listings" :key="listing._key" md-with-hover>
      <md-card-area>
        <md-card-media>
          <img :src=listing.picture_url alt="listing_image">
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{listing.name}}</div>
          <div class="md-subhead">{{listing.property_type}}</div>
        </md-card-header>
      </md-card-area>

      <md-card-actions md-alignment="left">
        <md-button class="priceBtn">${{listing.price}} / night</md-button>
      </md-card-actions>
    </md-card>
    <strong>Events:</strong>
    <pre>{{events.join('\n')}}</pre>
    </div>
    <div class="md-layout-item md-size-70" id="mapContainer"></div>
</div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
    name: "Results",
    data: () => ({
      MAPBOX_KEY: process.env.VUE_APP_MAPBOX_KEY, // place your own in .env.local
      events: [],
    }),
    props: {
      listings: Array
    },
    methods: {
        logEvent: function (type, text) {
          if (this.events.length > 25) {
            this.events = this.events.slice(0, 25);
          }
          this.events.unshift(`${type}: ${text}`);
        },
        setupLeafletMap: function () {
          let mymap = L.map('mapContainer').setView([52.53454,13.40256], 13);
          /*
          L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: this.MAPBOX_KEY
          }).addTo(mymap);
          */
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 3,
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            //noWrap: true,
            useCache: true,
        }).addTo(mymap);
        mymap.on('zoom', e => {
          this.logEvent(e.type, e.target.getZoom());
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
        })
      },
    },
    mounted() {
      this.setupLeafletMap();
      this.getResults();
    }

}
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
  .md-card-media img{
    margin-top: 8px;
    padding-right: 8px;
    padding-left: 8px;
    border-radius: 25px;

  }
  .priceBtn {
  border-radius: 25px;

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