<template>
<div class="md-layout">
    <ResultsInfo v-bind:listings=listings />
    <Map />
</div>
</template>

<script>
import ResultsInfo from "../components/ResultsInfo";
import Map from "../components/Map";

  export default {
    name: 'Home',
    components: {
        ResultsInfo,
        Map
    },
    props: {
    listings: Array,
    mapEvent: Array
    },
    data: () => ({

    })
  };
</script>

<style lang="scss" scoped>

</style>