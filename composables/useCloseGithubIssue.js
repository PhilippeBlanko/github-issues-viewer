import { useRuntimeConfig, useCookie } from "#app";
import { ref } from "vue";

export const useCloseGithubIssue = () => {
  const closedIssue = ref(null);
  const fetchState = ref('idle');
  const error = ref(null);
  const config = useRuntimeConfig();
  const isAuthenticated = useCookie('is_authenticated').value || false;
  const userSlug = isAuthenticated ? useCookie('user_info').value.login : 'PhilippeBlanko';

  const fetchCloseIssue = async (repositorySlug, issueSlug) => {
    fetchState.value = 'pending';
    try {
      const response = await fetch(`https://api.github.com/repos/${userSlug}/${repositorySlug}/issues/${issueSlug}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${config.public.githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: 'closed',
        })
      })

      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }

      closedIssue.value = await response.json();
      fetchState.value = 'succeeded';
    } catch (err) {
      error.value = err.message;
      fetchState.value = 'failed';
    }
  }

  return { closedIssue, fetchState, error, fetchCloseIssue }
}
