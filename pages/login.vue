<template>
  <h1 class="bg-red-500">Connexion à GitHub</h1>
  <button @click="githubAuthUrl">Connexion avec GitHub</button>
  <button @click="triggerNotification">Notification</button>
  <button @click="changeBackground" v-hover-bg="'red'" class="test" v-merge-class="'test-2'">Changer le fond</button>
  <Notification ref="notification" :message="'Notification réussie!'" :type="'success'" @beforeShow="beforeShowNotification"/>
</template>

<script setup>
import { useRuntimeConfig } from "#app";
import Notification from "~/components/Notification.vue";

const config = useRuntimeConfig();
const notification = ref(null);

const changeBackground = useNuxtApp().$changeBackground;

const githubAuthUrl = () => {
  const clientId = config.public.githubClientId;
  const redirectUri = encodeURIComponent('http://localhost:3001/auth/callback');
  const scope = encodeURIComponent('repo read:user');

  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
};

const triggerNotification = () => {
  notification.value.show();
};

const beforeShowNotification = () => {
  console.log('Avant de show notification');
};
</script>
