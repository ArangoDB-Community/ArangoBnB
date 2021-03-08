<template>
    <md-button class="dateButton">
        <div class="datePicker">
        <md-datepicker v-model="selectedDate" md-immediately>
            <label>When's the trip?</label>
        </md-datepicker>
        </div>
    </md-button>
</template>

<script>
export default {
    name: 'SearchBarDatePicker',
}
</script>

<style lang="scss" scoped>
.datePicker {
background-color: whitesmoke;
}
.dateButton {
  z-index: 3;
}
</style>