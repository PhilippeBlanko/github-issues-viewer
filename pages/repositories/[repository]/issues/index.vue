<template>
  <NuxtLink v-bind:to="'/repositories'">Liste des répertoires GitHub</NuxtLink>
  <h1>{{ $t('listeDesIssuesGitHub', { repoName: repositorySlug }) }}</h1>
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
import {onMounted, watch} from "vue";
import { useRoute } from "vue-router";
import { useGithubIssues } from "~/composables/useGithubIssues";
import { useSharedIssues } from "~/composables/useSharedIssues.js";

const route = useRoute();
const repositorySlug = route.params.repository;
const { issues, fetchState, error, fetchIssues } = useGithubIssues();
const { sharedIssues, addSharedIssue, removeAllSharedIssues } = useSharedIssues();

// État pour éviter la double mise à jour des issues
const isInitialFetchDone = ref(false);

onMounted(() => {
  // Utilisé données partagées optimistes, sinon, faire la requête de l'API
  if (sharedIssues.value && sharedIssues.value.length > 0) {
    issues.value = sharedIssues.value;
    fetchState.value = "succeeded";
    isInitialFetchDone.value = true;
  } else {
    // Sinon, on charge les données via l'API
    fetchIssues(repositorySlug);
  }
});

watch(fetchState, (newState) => {
  if (newState === 'succeeded' && !isInitialFetchDone.value) {
    removeAllSharedIssues();
    issues.value.forEach(issue => addSharedIssue(issue));
    isInitialFetchDone.value = true;
  }
});
</script>
