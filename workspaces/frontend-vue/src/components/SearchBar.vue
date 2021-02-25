<template>
<div class="search-root">
  <div class="md-layout md-elevation-15 searchBar">
    <SearchBarInput class="md-layout-item" />
    <SearchBarDatePicker class="md-layout-item"/>
    <SearchBarGuests class="md-layout-item" />
  </div>
  <div>
</div>
</div>
</template>

<script>
import SearchBarDatePicker from './SearchBarDatePicker'
import SearchBarInput from './SearchBarInput'
import SearchBarGuests from './SearchBarGuests'

export default {
    name: 'SearchBar',
    components: {
      SearchBarDatePicker,
      SearchBarInput,
      SearchBarGuests,
    },
    data: () => ({}),
}
</script>

<style>
  .searchBar {
  margin: 0;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  border-radius: 25px;
  background-color: whitesmoke;
}

</style>