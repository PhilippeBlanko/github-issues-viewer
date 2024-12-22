<template>
  <h1>Liste des répertoires GitHub</h1>
  <div v-if="fetchState !== 'idle'">
    <p v-if="fetchState === 'pending'">Chargement...</p>
    <ul v-if="fetchState === 'succeeded' && repositories.length">
      <li v-for="repository in repositories" v-bind:key="repository.id">
        <span>{{ repository.full_name }}</span><span v-if="repository.open_issues_count > 0"> : <NuxtLink v-bind:to="`/repositories/${repository.name}/issues`">Issues GitHub ({{ repository.open_issues_count }})</NuxtLink></span>
      </li>
    </ul>
    <p v-if="fetchState === 'succeeded' && repositories.length === 0">Aucun répertoire trouvé.</p>
    <p v-if="fetchState === 'failed' && error">{{ error }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useGithubRepositories } from "~/composables/useGithubRepositories";

const { repositories, fetchState, error, fetchRepositories } = useGithubRepositories();

onMounted(() => {
  fetchRepositories();
});
</script>
