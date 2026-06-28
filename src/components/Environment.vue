<script setup lang="ts">
import Sensor from "./Sensor.vue";
</script>

<template>
    <Sensor
        name="Temperature"
        topic="/devices/wb-msw-v4_238/controls/Temperature"
        unit="&deg;C"
    />
    <Sensor
        name="Humidity"
        topic="/devices/wb-msw-v4_238/controls/Humidity"
        unit="%"
    />
    <Sensor name="CO2" topic="/devices/wb-msw-v4_238/controls/CO2" unit="ppm" />
</template>

<style scoped></style>
