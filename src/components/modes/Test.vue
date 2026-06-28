<script setup lang="ts">
import Toggle from "../Toggle.vue";
</script>

<template>
    <div class="relays">
        <Toggle name="Relay 1" topic="/devices/wb-mr6c_163/controls/K1" />
        <Toggle name="Relay 2" topic="/devices/wb-mr6c_163/controls/K2" />
        <Toggle name="Relay 3" topic="/devices/wb-mr6c_163/controls/K3" />
        <Toggle name="Relay 4" topic="/devices/wb-mr6c_163/controls/K4" />
        <Toggle name="Relay 5" topic="/devices/wb-mr6c_163/controls/K5" />
        <Toggle name="Relay 6" topic="/devices/wb-mr6c_163/controls/K6" />
    </div>
</template>

<style scoped>
.relays {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
}
</style>
