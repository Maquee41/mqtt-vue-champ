<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const timeOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

const currentTime = ref(new Date())
let updateInterval: ReturnType<typeof setInterval> | null = null

const updateTime = () => {
  currentTime.value = new Date()
}

onMounted(() => {
  updateInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<template>
  <div class="time">
    <p>{{ currentTime.toLocaleString("ru-RU", timeOptions) }}</p>
  </div>
</template>
