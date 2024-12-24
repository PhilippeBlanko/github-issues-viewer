<template>
  <div v-if="isVisible" class="notification" v-bind:class="type" @click="close">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
  }
})

const emit = defineEmits(['beforeShow', 'afterShow']);

const isVisible = ref(false);

const show = () => {
  emit('beforeShow');
  isVisible.value = true;
  setTimeout(() => {
    close();
  }, 3000);
  emit('afterShow');
}

const close = () => {
  isVisible.value = false;
}

defineExpose({
  show
});
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  z-index: 9999;
  cursor: pointer;
  transition: opacity 0.5s;
}

.notification.info {
  background-color: blue;
}

.notification.success {
  background-color: green;
}

.notification.error {
  background-color: red;
}

.notification p {
  margin: 0;
}
</style>
