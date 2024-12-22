<template>
  <NuxtLink v-bind:to="'/list'">Liste des issues GitHub</NuxtLink>
  <div v-if="fetchState !== 'idle'">
    <p v-if="fetchState === 'pending'">Chargement...</p>
    <div v-if="fetchState === 'succeeded'">
      <h1>Nom : {{ issue.title }}</h1>
      <p>Description : {{ issue.body }}</p>
      <NuxtLink v-bind:to="`/edit/${issue.number}`">Modifier l'issue GitHub</NuxtLink>
    </div>
    <p v-if="fetchState === 'failed' && error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGitHubIssue } from "~/composables/useGithubIssue";

const route = useRoute();
const issueNumber = route.params.number;
const { issue, fetchState, error, fetchIssue } = useGitHubIssue();

onMounted(() => {
  fetchIssue(issueNumber);
})
</script>
