<template>
  <NuxtLink v-bind:to="`/repositories/${repositorySlug}/issues`">Liste des issues GitHub ({{ repositorySlug }})</NuxtLink>
  <div v-if="fetchState !== 'idle'">
    <p v-if="fetchState === 'pending'">Chargement...</p>
    <div v-if="fetchState === 'succeeded'">
      <h1>Nom : {{ issue.title }}</h1>
      <p>Date de création: {{ formatDate(issue.created_at) }}</p>
      <p>Description : {{ issue.body }}</p>
      <NuxtLink v-bind:to="`/repositories/${repositorySlug}/issues/${issue.number}/edit`">Modifier l'issue GitHub ({{ repositorySlug }})</NuxtLink>
    </div>
    <p v-if="fetchState === 'failed' && error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGithubIssue } from "~/composables/useGithubIssue";
import { useSharedIssue } from "~/composables/useSharedIssue.js";
import { formatDate } from '~/utils/date';

const route = useRoute();
const repositorySlug = route.params.repository;
const issueSlug = route.params.issue;
const { issue, fetchState, error, fetchIssue } = useGithubIssue();
const { sharedIssue } = useSharedIssue();

onMounted(() => {
  // Utilisé données partagées optimistes, sinon, faire la requête de l'API
  if (sharedIssue.value && sharedIssue.value.number === parseInt(issueSlug, 10)) {
    issue.value = sharedIssue.value;
    fetchState.value = "succeeded";
  } else {
    fetchIssue(repositorySlug, issueSlug);
  }
})
</script>

