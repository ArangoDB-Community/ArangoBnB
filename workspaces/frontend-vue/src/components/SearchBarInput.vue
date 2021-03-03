<template>
  <md-button>
    <md-field>
      <label>Where to?</label>
      <md-input v-model="type"></md-input>
      <span class="md-helper-text">Search destination</span>
    </md-field>
</md-button>
</template>

<script>
export default {
    name: "SearchBarInput"
}
</script>


<style>

</style>