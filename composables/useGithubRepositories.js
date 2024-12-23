import { useCookie } from "#app";
import { ref } from 'vue';

export const useGithubRepositories = () => {
  const repositories = ref([]);
  const fetchState = ref('idle');
  const error = ref(null);
  const isAuthenticated = useCookie('is_authenticated').value || false;
  const userSlug = isAuthenticated ? useCookie('user_info').value.login : 'PhilippeBlanko';

  const fetchRepositories = async () => {
    fetchState.value = 'pending';
    try {
      const response = await fetch(`https://api.github.com/users/${userSlug}/repos`, {
        headers: {
          'Accept': 'application/vnd.github+json',
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }

      repositories.value = await response.json();
      fetchState.value = 'succeeded';
    } catch (err) {
      error.value = err.message;
      fetchState.value = 'failed';
    }
  }

  return { repositories, fetchState, error, fetchRepositories };
}
