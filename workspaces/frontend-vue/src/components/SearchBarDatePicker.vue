<template>
    <md-button>
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

<style scoped>
.datePicker {
background-color: whitesmoke;
}
</style>