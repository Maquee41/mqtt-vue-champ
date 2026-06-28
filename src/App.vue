<script setup lang="ts">
import Clock from "./components/Clock.vue";
import Environment from "./components/Environment.vue";
import Test from "./components/modes/Test.vue";
import ModeSwitch from "./components/ModeSwitch.vue";
import { useMqtt } from "./composables/useMqtt";

const { isOnline } = useMqtt();
</script>

<template>
    <Clock />
    <div class="controller">
        <p>Wiren Board 8</p>
        <div class="status-round" :class="{ green: isOnline }"></div>
    </div>
    <ModeSwitch />
    <Environment />
    <Test />
</template>

<style>
.controller {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 15px;
}

.relay {
    display: flex;
    column-gap: 5px;
}

.status-round {
    background-color: red;
    width: 15px;
    aspect-ratio: 1;
    border-radius: 50%;
    transition: background-color 0.5s ease-in-out;
}

.status-round.green {
    background-color: green;
}
</style>
