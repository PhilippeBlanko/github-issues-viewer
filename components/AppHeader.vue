<template>
  <header class="bg-white border-b border-gray-100 shadow-sm">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo/Title -->
        <NuxtLink
            to="/"
            class="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Github Issues Viewer
        </NuxtLink>

        <!-- Auth Section -->
        <div class="flex items-center space-x-4">
          <!-- Avatar and Name (shown when logged in) -->
            <img v-if="isAuthenticated"
                :src="userAvatar"
                class="w-8 h-8 rounded-full border-2 border-gray-200"
            />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useGithubUser } from '~/composables/useGithubUser';

const { getUser, checkAuthenticated } = useGithubUser();

const isAuthenticated = ref(checkAuthenticated());
const userInfo = ref(getUser());

const userAvatar = computed(() => userInfo.value?.avatar_url || '');
</script>
