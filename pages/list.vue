<template>
  <h1>Liste des issues GitHub</h1>
  <div v-if="fetchState !== 'idle'">
    <p v-if="fetchState === 'pending'">Chargement...</p>
    <ul v-if="fetchState === 'succeeded' && issues.length">
      <li v-for="issue in issues" v-bind:key="issue.id">
        <NuxtLink v-bind:to="`/detail/${issue.number}`">{{ issue.title }}</NuxtLink>
      </li>
    </ul>
    <p v-if="fetchState === 'succeeded' && issues.length === 0">Aucune issue trouvée.</p>
    <p v-if="fetchState === 'failed' && error">{{ error }}</p>
  </div>
  <NuxtLink v-bind:to="'/create'">Créer une issue GitHub</NuxtLink>
</template>

<script setup>
import { onMounted } from "vue";
import { useGitHubIssues } from "~/composables/useGithubIssues";

const { issues, fetchState, error, fetchIssues } = useGitHubIssues();

onMounted(() => {
  fetchIssues();
});
</script>
