<template>
    <md-button>
        <md-datepicker v-model="selectedDate" md-immediately>
            <label>When's the trip?</label>
        </md-datepicker>
    </md-button>
</template>

<script>
export default {
    name: 'SearchBarDatePicker',
}
</script>

<style>

</style>