<template>
  <NuxtLink v-bind:to="`/repositories/${repositorySlug}/issues`">Liste des issues GitHub ({{ repositorySlug }})</NuxtLink>
  <div v-if="fetchState !== 'idle'">
    <p v-if="fetchState === 'pending'">Chargement...</p>
    <div v-if="fetchState === 'succeeded'">
      <h1>Nom : {{ issue.title }}</h1>
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

const route = useRoute();
const repositorySlug = route.params.repository;
const issueSlug = route.params.issue;
const { issue, fetchState, error, fetchIssue } = useGithubIssue();

onMounted(() => {
  fetchIssue(repositorySlug, issueSlug);
})
</script>

