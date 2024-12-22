import { useRuntimeConfig } from "#app";
import { ref } from "vue";

export const useCloseGithubIssue = () => {
  const closedIssue = ref(null);
  const fetchState = ref('idle');
  const error = ref(null);
  const config = useRuntimeConfig();

  const fetchCloseIssue = async (repositorySlug, issueSlug) => {
    fetchState.value = 'pending';
    try {
      const response = await fetch(`https://api.github.com/repos/philippeblanko/${repositorySlug}/issues/${issueSlug}`, {
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
