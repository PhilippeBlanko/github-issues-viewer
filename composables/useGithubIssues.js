import { ref } from 'vue';

export const useGitHubIssues = () => {
  const issues = ref([]);
  const fetchState = ref('idle');
  const error = ref(null);

  const fetchIssues = async () => {
    fetchState.value = 'pending';
    try {
      const response = await fetch('https://api.github.com/repos/philippeblanko/github-issues-viewer/issues', {
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
