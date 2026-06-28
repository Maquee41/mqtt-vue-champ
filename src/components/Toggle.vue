<script setup lang="ts">
import { Power } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import { useMqtt } from "../composables/useMqtt";

const props = defineProps<{
    name: string;
    topic: string;
}>();
const isActive = ref(false);

const toggle = () => publish(props.topic + "/on", isActive.value ? "0" : "1");

const { publish, subscribe, unsubscribe, onMessage } = useMqtt();

let offMessage: null | (() => void) = null;

onMounted(() => {
    subscribe(props.topic);

    offMessage = onMessage((topic, payload) => {
        if (topic === props.topic) {
            isActive.value = payload == "1";
        }
    });
});

onUnmounted(() => {
    if (offMessage) offMessage();
    unsubscribe(props.topic);
});
</script>

<template>
    <button
        class="relay-button"
        :class="{ active: isActive }"
        type="button"
        @click="toggle"
    >
        {{ name }}
        <Power :size="18" />
    </button>
</template>

<style>
.relay-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    transition: background-color 0.5s ease-in-out;
}

.relay-button.active {
    background-color: #5d3fd3;
}
</style>
