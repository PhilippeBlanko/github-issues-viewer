import axios from 'axios';

export default defineNuxtPlugin(() => {
  // Instance pour l'API GitHub
  const githubApi = axios.create({
    baseURL: 'https://api.github.com',
  });

  // Instance pour une autre API (exemple)
  const anotherApi = axios.create({
    baseURL: 'https://api.another-service.com',
  });

  return {
    provide: {
      githubApi,   // Accès via `useNuxtApp().$githubApi`
      anotherApi,  // Accès via `useNuxtApp().$anotherApi`
    },
  };
});

// const { $githubApi, $anotherApi } = useNuxtApp();

// const response = await $githubApi.get('/user');
// console.log(response.data);

// const response = await $anotherApi.get('/endpoint');
// console.log(response.data);
