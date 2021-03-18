<template>
    <md-card md-with-hover>
      <md-card-area>
        <md-card-media>
          <img :src="listing.picture_url" alt="listing_image" />
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ listing.name }}</div>
          <div class="md-subhead">{{ listing.property_type }}</div>
        </md-card-header>
        <strong>Amenities: </strong> <span v-for="amenity in listing.amenities.slice(0,5)" :key="amenity">{{amenity}}, </span>...
      </md-card-area>

      <md-card-actions md-alignment="left">
        <md-button class="priceBtn">${{ listing.price }} / night</md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
export default {
    props: {
        listing: Object
    }
}
</script>

<style scoped>

</style>