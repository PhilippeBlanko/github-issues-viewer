<template>
  <h1>Liste des issues GitHub</h1>
  <div v-if="error">{{ error }}</div>
  <ul v-if="issues.length">
    <li v-for="issue in issues" v-bind:key="issue.id">
      <strong>{{ issue.title }}</strong>
      <p>Statut : {{ issue.state }}</p>
      <p>Créé par : {{ issue.user.login }}</p>
    </li>
  </ul>
  <p v-else>Aucune issue trouvée.</p>
</template>

<script setup>
import { ref, onMounted } from "vue";

const issues = ref([]);
const error = ref(null);

const config = useRuntimeConfig();

const fetchIssues = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/philippeblanko/github-issues-viewer/issues')

    if (!response.ok) {
      throw new Error(`Erreur : ${response.statusText}`);
    }

    issues.value = await response.json();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  fetchIssues();
})
</script>
