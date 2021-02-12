<template>
  <div>
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
        <md-button>${{listing.price}} / night</md-button>
      </md-card-actions>
    </md-card>

</div>
</template>

<script>
export default {
    name: "Results",
    data: () => ({
    }),
    props: {
        listings: Array
    },
    methods: {
        getImg: function() {

        }
    }

}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 8px;
    display: inline-block;
    vertical-align: top;
    background: whitesmoke;
  }
  .md-card-media img{
      width: 320px;
      height: 215px;
  }
</style>