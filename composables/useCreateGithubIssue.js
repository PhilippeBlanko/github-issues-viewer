import { useRuntimeConfig } from "#app";
import { ref } from "vue";

export const useCreateGithubIssue = () => {
  const createdIssue = ref(null);
  const fetchState = ref('idle');
  const error = ref(null);
  const config = useRuntimeConfig();

  const fetchCreateIssue = async (issueData) => {
    fetchState.value = 'pending';
    try {
      const response = await fetch('https://api.github.com/repos/philippeblanko/github-issues-viewer/issues', {
        method: 'POST',
        headers: {
          'Authorization': `token ${config.public.githubToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issueData),
      })

      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }

      createdIssue.value = await response.json();
      fetchState.value = 'succeeded';
    } catch (err) {
      error.value = err.message;
      fetchState.value = 'failed';
    }
  }

  return { createdIssue, fetchState, error, fetchCreateIssue }
}
