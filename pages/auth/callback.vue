<template>
  <p>Autorisation en cours</p>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGithubUser } from "~/composables/useGithubUser.js";

const route = useRoute();
const router = useRouter();
const code = route.query.code;
const { setUser, getUser, logout, checkAuthenticated } = useGithubUser();

onMounted(async () => {
  if (code) {
    try {
      const response = await fetch('/api/github/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      })

      const data = await response.json();
      if (data.access_token) {
        await setUser(data.access_token);
        router.push('/repositories')
      }
    } catch (err) {
      console.error('Erreur:', err);
    }
  }
});
</script>
