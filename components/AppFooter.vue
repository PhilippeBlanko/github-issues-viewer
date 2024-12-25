<template>
  <footer class="bg-white w-full p-4">
    <client-only>
      <Vue3Lottie
          animationLink="https://assets10.lottiefiles.com/packages/lf20_soCRuE.json"
          :height="200"
          :width="200"
          :pauseOnHover="true"
      />
    </client-only>
  </footer>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
</script>
