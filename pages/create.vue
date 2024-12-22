<template>
  <NuxtLink v-bind:to="'/list'">Liste des issues GitHub</NuxtLink>
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
import { useRouter } from "vue-router";
import { useCreateGithubIssue } from "~/composables/useCreateGithubIssue.js";

const router = useRouter();
const { createdIssue, fetchState, error, fetchCreateIssue } = useCreateGithubIssue();
const title = ref('');
const body = ref('');

const createIssue = async () => {
  const issueData = {
    title: title.value,
    ...(body.value && { body: body.value }),
  };

  await fetchCreateIssue(issueData);

  if (fetchState.value === 'succeeded') {
    router.push('/list');
  }
}
</script>
