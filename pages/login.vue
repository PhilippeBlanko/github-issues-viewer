<template>
  <h1>Connexion à GitHub</h1>
  <button @click="githubAuthUrl">Connexion avec GitHub</button>
</template>

<script setup>
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();

const githubAuthUrl = () => {
  const clientId = config.public.githubClientId;
  const redirectUri = encodeURIComponent('http://localhost:3001/auth/callback');
  const scope = encodeURIComponent('repo read:user');

  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
}
</script>
