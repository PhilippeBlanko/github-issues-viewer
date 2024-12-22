import { ref } from 'vue';

export const useGitHubIssue = () => {
  const issue = ref(null);
  const fetchState = ref('idle');
  const error = ref(null);

  const fetchIssue = async (issueNumber) => {
    fetchState.value = 'pending';
    try {
      const response = await fetch(`https://api.github.com/repos/philippeblanko/github-issues-viewer/issues/${issueNumber}`, {
        headers: {
          'Accept': 'application/vnd.github.raw+json'
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur : ${response.statusText}`);
      }

      issue.value = await response.json();
      fetchState.value = 'succeeded';
    } catch (err) {
      error.value = err.message;
      fetchState.value = 'failed';
    }
  }

  return { issue, fetchState, error, fetchIssue };
}
