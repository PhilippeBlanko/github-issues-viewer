<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Lien de retour -->
    <AppLink to="/repositories" back class="mb-6">
      Liste des répertoires GitHub
    </AppLink>

    <PageTitle>
      {{ $t('listeDesIssuesGitHub', { repoName: repositorySlug }) }}
    </PageTitle>

    <div v-if="fetchState !== 'idle'" class="space-y-4">
      <!-- Loading State -->
      <p v-if="fetchState === 'pending'" class="text-gray-600 animate-pulse">
        Chargement...
      </p>

      <!-- Success State with Data -->
      <ul v-if="fetchState === 'succeeded' && issues.length"
          class="space-y-3 mb-6">
        <ItemCard v-for="issue in issues" :key="issue.id">
          <AppLink :to="`/repositories/${repositorySlug}/issues/${issue.number}`">
            {{ issue.title }}
          </AppLink>
        </ItemCard>
      </ul>

      <!-- Empty State -->
      <p v-if="fetchState === 'succeeded' && issues.length === 0"
         class="text-center py-8 text-gray-600">
        Aucune issue trouvée.
      </p>

      <!-- Error State -->
      <p v-if="fetchState === 'failed' && error"
         class="p-4 bg-red-50 text-red-600 rounded-lg">
        {{ error }}
      </p>
    </div>

    <!-- Bouton Créer une issue -->
    <AppLink
        :to="`/repositories/${repositorySlug}/issues/create`"
        class="mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Créer une issue GitHub ({{ repositorySlug }})
    </AppLink>
  </div>
</template>

<script setup>
import {onMounted, watch} from "vue";
import { useRoute } from "vue-router";
import { useGithubIssues } from "~/composables/useGithubIssues";
import { useSharedIssuesStore } from "~/stores/sharedIssues.js";

const route = useRoute();
const repositorySlug = route.params.repository;
const { issues, fetchState, error, fetchIssues } = useGithubIssues();
const sharedIssuesStore = useSharedIssuesStore();

// État pour éviter la double mise à jour des issues
const isInitialFetchDone = ref(false);

onMounted(() => {
  sharedIssuesStore.loadSharedIssues();

  // Utilisé données partagées optimistes avec Pinia, sinon, faire la requête de l'API
  if (sharedIssuesStore.sharedIssues && sharedIssuesStore.sharedIssues.length > 0) {
    issues.value = sharedIssuesStore.sharedIssues;
    fetchState.value = "succeeded";
    isInitialFetchDone.value = true;
  } else {
    // Sinon, on charge les données via l'API
    fetchIssues(repositorySlug);
  }
});

watch(fetchState, (newState) => {
  if (newState === 'succeeded' && !isInitialFetchDone.value) {
    sharedIssuesStore.removeAllSharedIssues();
    issues.value.forEach(issue => sharedIssuesStore.addSharedIssue(issue));
    isInitialFetchDone.value = true;
  }
});
</script>
