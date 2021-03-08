<template>
  <div class="md-layout md-elevation-15 searchBar">
    <SearchBarDestination class="md-layout-item md-medium-size-100 searchBarItem" />
    <SearchBarDatePicker class="md-layout-item md-medium-size-100 searchBarItem"/>
    <SearchBarGuests class="md-layout-item md-medium-size-100 searchBarItem" />
</div>
</template>

<script>
import SearchBarDatePicker from './SearchBarDatePicker'
import SearchBarDestination from './SearchBarDestination'
import SearchBarGuests from './SearchBarGuests'

export default {
    name: 'SearchBar',
    components: {
      SearchBarDatePicker,
      SearchBarDestination,
      SearchBarGuests,
    },
    data: () => ({}),
}
</script>

<style lang="scss" scoped>
.searchBar {
  margin: 0;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  border-radius: 25px;
  background-color: whitesmoke;
  z-index: 3;
}

</style>