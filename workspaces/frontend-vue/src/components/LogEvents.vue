<template>
<div>
    <md-button>
        <strong v-on:click="showHide">
        {{ showEvents ? "Hide" : "Show" }} log events:
        </strong>
    </md-button>
    <transition name="fade" v-if=showEvents>
        <pre>{{moveEvents.join('\n')}}</pre>
    </transition>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>