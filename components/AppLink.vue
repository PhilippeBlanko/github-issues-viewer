<template>
  <NuxtLink
      :to="to"
      class="inline-flex items-center text-blue-600 hover:text-blue-800"
  >
    <span v-if="back" class="mr-2">←</span>
    <slot />
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },
  back: {
    type: Boolean,
    default: false
  }
});
</script>
