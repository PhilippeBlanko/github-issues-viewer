import { useCookie } from "#app";
import { ref } from 'vue';

export const useGithubIssue = () => {
  const issue = ref(null);
  const fetchState = ref('idle');
  const error = ref(null);
  const isAuthenticated = useCookie('is_authenticated').value || false;
  const userSlug = isAuthenticated ? useCookie('user_info').value.login : 'PhilippeBlanko';

  const fetchIssue = async (repositorySlug, issueSlug) => {
    fetchState.value = 'pending';
    try {
      const response = await fetch(`https://api.github.com/repos/${userSlug}/${repositorySlug}/issues/${issueSlug}`, {
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
