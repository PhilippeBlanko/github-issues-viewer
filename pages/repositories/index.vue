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
          <span class="font-medium text-gray-800">{{ repository.full_name }}</span> :
          <span v-if="repository.open_issues_count > 0">
            <AppLink :to="`/repositories/${repository.name}/issues`">
              Issues GitHub
              <span class="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                {{ repository.open_issues_count }}
              </span>
            </AppLink>
          </span>
          <button @click="toggleStar(repository.id)" class="ml-2 inline-flex items-center text-gray-600">
            <svg v-if="getStars(repository.id) > 0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.778 1.4 8.172L12 18.896l-7.334 3.864 1.4-8.172L.132 9.21l8.2-1.192L12 .587z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="h-4 w-4 text-gray-400" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
            </svg>
            <span class="ml-1">{{ getStars(repository.id) }}</span>
          </button>
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
const localStars = ref({});

onMounted(() => {
  fetchRepositories();

  // Vérifier si nous sommes côté client avant d'utiliser localStorage
  if (typeof window !== "undefined" && window.localStorage) {
    const storedStars = localStorage.getItem("repositoryStars");

    // Vérifier si storedStars est une chaîne valide JSON
    if (storedStars) {
      try {
        localStars.value = JSON.parse(storedStars);
      } catch (e) {
        console.error("Erreur lors du parsing de localStorage : ", e);
        localStars.value = {}; // Initialiser avec un objet vide en cas d'erreur
      }
    } else {
      localStars.value = {}; // Si aucune donnée n'est présente, initialiser avec un objet vide
    }
  }
});

// Fonction pour ajouter ou retirer une star (toggle)
const toggleStar = (repositoryId) => {
  if (!localStars.value[repositoryId]) {
    localStars.value[repositoryId] = 0; // Si le repository n'a pas de stars, on l'initialise à 0
  }

  // Toggle la valeur : si > 0, on l'enlève, sinon on l'ajoute
  localStars.value[repositoryId] = localStars.value[repositoryId] === 0 ? 1 : 0;

  // Sauvegarder dans le localStorage
  localStorage.setItem("repositoryStars", JSON.stringify(localStars.value));
};

// Récupérer les stars d'un repository
const getStars = (repositoryId) => {
  return localStars.value[repositoryId] || 0;
};
</script>
