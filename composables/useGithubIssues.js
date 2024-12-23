import { useCookie } from "#app";
import { ref } from 'vue';

export const useGithubIssues = () => {
  const issues = ref([]);
  const fetchState = ref('idle');
  const error = ref(null);
  const isAuthenticated = useCookie('is_authenticated').value || false;
  const userSlug = isAuthenticated ? useCookie('user_info').value.login : 'PhilippeBlanko';

  const fetchIssues = async (repositorySlug) => {
    fetchState.value = 'pending';
    try {
      const response = await fetch(`https://api.github.com/repos/${userSlug}/${repositorySlug}/issues`, {
        headers: {
          'Accept': 'application/vnd.github.raw+json'
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }

      issues.value = await response.json();
      fetchState.value = 'succeeded';
    } catch (err) {
      error.value = err.message;
      fetchState.value = 'failed';
    }
  }

  return { issues, fetchState, error, fetchIssues };
}
