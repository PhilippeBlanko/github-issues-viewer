<template>
  <NuxtLink v-bind:to="`/repositories/${repositorySlug}/issues`">Liste des issues GitHub ({{ repositorySlug }})</NuxtLink>
  <div v-if="fetchIssueState !== 'idle'">
    <p v-if="fetchIssueState === 'pending'">Chargement...</p>
    <div v-if="fetchIssueState === 'succeeded'">
      <h1>Modifier une issue GitHub</h1>
      <form @submit.prevent="updateIssue">
        <label>Nom de l'issue <input v-model="title" /></label><br>
        <label>Description de l'issue <textarea v-model="body" /></label><br>
        <button type="submit" v-bind:disabled="fetchUpdateState === 'pending'">Mettre à jour</button>
      </form>
      <button @click="closeIssue" v-bind:disabled="fetchCloseState === 'pending'">Fermer l'issue</button>
      <p v-if="fetchUpdateState === 'pending' || fetchCloseState === 'pending'">Chargement...</p>
      <p v-if="fetchUpdateState === 'failed' && updateError">{{ updateError }}</p>
      <p v-if="fetchCloseState === 'failed' && closeError">{{ closeError }}</p>
    </div>
    <p v-if="fetchIssueState === 'failed' && issueError">{{ issueError }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGithubIssue } from "~/composables/useGithubIssue";
import { useUpdateGithubIssue } from "~/composables/useUpdateGithubIssue.js";
import { useCloseGithubIssue } from "~/composables/useCloseGithubIssue.js";
import { useSharedIssue } from "~/composables/useSharedIssue.js";

const route = useRoute();
const router = useRouter();
const repositorySlug = route.params.repository;
const issueSlug = route.params.issue;
const { issue, fetchState: fetchIssueState, error: issueError, fetchIssue } = useGithubIssue();
const { updatedIssue, fetchState: fetchUpdateState, error: updateError, fetchUpdateIssue } = useUpdateGithubIssue();
const { closedIssue, fetchState: fetchCloseState, error: closeError, fetchCloseIssue } = useCloseGithubIssue();
const { setSharedIssue } = useSharedIssue();
const title = ref('');
const body = ref('');
const originalIssue = ref(null);

onMounted(() => {
  fetchIssue(repositorySlug, issueSlug);
})

watch(fetchIssueState, (newState) => {
  if (newState === 'succeeded') {
    title.value = issue.value.title;
    body.value = issue.value.body || '';
  }
});

const updateIssue = async () => {
  const issueData = {
    title: title.value,
    ...(body.value && { body: body.value }),
  };

  // Mise à jour optimiste
  setSharedIssue({
    ...issue.value,
    title: title.value,
    ...(body.value && { body: body.value }),
  })

  await fetchUpdateIssue(repositorySlug, issueSlug, issueData);

  if (fetchUpdateState.value === 'succeeded') {
    router.push(`/repositories/${repositorySlug}/issues/${issueSlug}`);
  }
}

const closeIssue = async () => {
  await fetchCloseIssue(repositorySlug, issueSlug);

  if (fetchCloseState.value === 'succeeded') {
    router.push(`/repositories/${repositorySlug}/issues`);
  }
}
</script>
