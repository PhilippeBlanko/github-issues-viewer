<template>
  <NuxtLink v-bind:to="`/repositories/${repositorySlug}/issues`">Liste des issues GitHub ({{ repositorySlug }})</NuxtLink>
  <h1>Créer une issue GitHub</h1>
  <form @submit.prevent="createIssue">
    <label>Nom de l'issue <input v-model="title" /></label><br>
    <label>Description de l'issue <textarea v-model="body" /></label><br>
    <button type="submit" v-bind:disabled="fetchState === 'pending'">Créer</button>
  </form>
  <p v-if="fetchState === 'pending'">Chargement...</p>
  <p v-if="fetchState === 'failed' && error">{{ error }}</p>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCreateGithubIssue } from "~/composables/useCreateGithubIssue.js";

const route = useRoute();
const router = useRouter();
const repositorySlug = route.params.repository;
const { createdIssue, fetchState, error, fetchCreateIssue } = useCreateGithubIssue();
const title = ref('');
const body = ref('');

const createIssue = async () => {
  const issueData = {
    title: title.value,
    ...(body.value && { body: body.value }),
  };

  await fetchCreateIssue(repositorySlug, issueData);

  if (fetchState.value === 'succeeded') {
    router.push(`/repositories/${repositorySlug}/issues`);
  }
}
</script>
