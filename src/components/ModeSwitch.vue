<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useMqtt } from "../composables/useMqtt";

const modeTopic = "/devices/farm/controls/mode";
const selected = ref<string>("");

let offMessage: null | (() => void) = null;
const { subscribe, onMessage, unsubscribe, publish } = useMqtt();

const modeSync = () => publish(modeTopic + "/on", selected.value);

onMounted(() => {
    subscribe(modeTopic);

    offMessage = onMessage((topic, payload) => {
        if (modeTopic === topic) {
            selected.value = payload;
            console.log(payload);
        }
    });
});

onUnmounted(() => {
    if (offMessage) offMessage();
    unsubscribe(modeTopic);
});
</script>

<template>
    <select v-model="selected" @change="modeSync">
        <option value="1">Auto</option>
        <option value="2">Dosage</option>
        <option value="3">Check</option>
    </select>
</template>
