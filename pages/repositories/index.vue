<template>
  <AppHeader />

  <div class="max-w-4xl mx-auto p-6">
    <PageTitle>{{ $t('listeDesRepertoireGithub') }}</PageTitle>

    <div v-if="fetchState !== 'idle'" class="space-y-4">
      <!-- Loading State -->
      <p v-if="fetchState === 'pending'" class="text-gray-600 animate-pulse">
        Chargement...
      </p>

      <!-- Success State with Data -->
      <ul v-if="fetchState === 'succeeded' && repositories.length"
          class="space-y-3">
        <ItemCard v-for="repository in repositories" :key="repository.id">
          <span class="font-medium text-gray-800">{{ repository.full_name }}</span>
          <span v-if="repository.open_issues_count > 0">
            :
            <AppLink :to="`/repositories/${repository.name}/issues`">
              Issues GitHub
              <span class="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                {{ repository.open_issues_count }}
              </span>
            </AppLink>
          </span>
        </ItemCard>
      </ul>

      <!-- Empty State -->
      <p v-if="fetchState === 'succeeded' && repositories.length === 0"
         class="text-center py-8 text-gray-600">
        Aucun répertoire trouvé.
      </p>

      <!-- Error State -->
      <p v-if="fetchState === 'failed' && error"
         class="p-4 bg-red-50 text-red-600 rounded-lg">
        {{ error }}
      </p>
    </div>
  </div>
  <AppFooter/>
</template>

<script setup>
import { onMounted } from "vue";
import { useGithubRepositories } from "~/composables/useGithubRepositories";
import AppHeader from "~/components/AppHeader.vue";
import AppLink from "~/components/AppLink.vue";
import ItemCard from "~/components/ItemCard.vue";
import PageTitle from "~/components/PageTitle.vue";
import AppFooter from "~/components/AppFooter.vue";

const { repositories, fetchState, error, fetchRepositories } = useGithubRepositories();

onMounted(() => {
  fetchRepositories();
});
</script>
