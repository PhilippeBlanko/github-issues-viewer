<template>
  <NuxtLink v-bind:to="'/repositories'">Liste des répertoires GitHub</NuxtLink>
  <h1>Liste des issues GitHub ({{ repositorySlug }})</h1>
  <div v-if="fetchState !== 'idle'">
    <p v-if="fetchState === 'pending'">Chargement...</p>
    <ul v-if="fetchState === 'succeeded' && issues.length">
      <li v-for="issue in issues" v-bind:key="issue.id">
        <NuxtLink v-bind:to="`/repositories/${repositorySlug}/issues/${issue.number}`">{{ issue.title }}</NuxtLink>
      </li>
    </ul>
    <p v-if="fetchState === 'succeeded' && issues.length === 0">Aucune issue trouvée.</p>
    <p v-if="fetchState === 'failed' && error">{{ error }}</p>
  </div>
  <NuxtLink v-bind:to="`/repositories/${repositorySlug}/issues/create`">Créer une issue GitHub ({{ repositorySlug }})</NuxtLink>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGithubIssues } from "~/composables/useGithubIssues";

const route = useRoute();
const repositorySlug = route.params.repository;
const { issues, fetchState, error, fetchIssues } = useGithubIssues();

onMounted(() => {
  fetchIssues(repositorySlug);
});
</script>
