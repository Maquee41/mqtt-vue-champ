<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useMqtt } from "../composables/useMqtt";
import { SearchAlert } from "lucide-vue-next";

const props = defineProps<{
    name: string;
    topic: string;
    unit: string;
}>();

const value = ref<number>(0);
const critical = ref<boolean>(false);

const { subscribe, unsubscribe, onMessage } = useMqtt();

let offMessage: null | (() => void) = null;

onMounted(() => {
    subscribe(props.topic);

    offMessage = onMessage((topic, payload) => {
        if (topic === props.topic) {
            value.value = Number(payload);
        }
    });
});

onUnmounted(() => {
    if (offMessage) offMessage();
    unsubscribe(props.topic);
});
</script>

<template>
    <div class="block">
        <p>
            {{ name }}: <span>{{ value }} {{ props.unit }}</span>
        </p>
        <SearchAlert v-if="critical" class="critical" />
    </div>
</template>

<style scoped>
.block {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
}

.critical {
    color: crimson;
}
</style>
