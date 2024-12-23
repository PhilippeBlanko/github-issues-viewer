import { useRuntimeConfig, useCookie } from "#app";
import { ref } from "vue";

export const useUpdateGithubIssue = () => {
  const updatedIssue = ref(null);
  const fetchState = ref('idle');
  const error = ref(null);
  const config = useRuntimeConfig();
  const isAuthenticated = useCookie('is_authenticated').value || false;
  const userSlug = isAuthenticated ? useCookie('user_info').value.login : 'PhilippeBlanko';

  const fetchUpdateIssue = async (repositorySlug, issueSlug, issueData) => {
    fetchState.value = 'pending';
    try {
      const response = await fetch(`https://api.github.com/repos/${userSlug}/${repositorySlug}/issues/${issueSlug}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${config.public.githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData),
      })

      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }

      updatedIssue.value = await response.json();
      fetchState.value = 'succeeded';
    } catch (err) {
      error.value = err.message;
      fetchState.value = 'failed';
    }
  }

  return { updatedIssue, fetchState, error, fetchUpdateIssue }
}
