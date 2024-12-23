import { ref, onMounted } from "vue";

const sharedIssue = ref(null);

export const useSharedIssue = () => {
  // Lors de la première exécution, récupère la donnée depuis localStorage
  onMounted(() => {
    const storedIssue = localStorage.getItem("sharedIssue");
    if (storedIssue) {
      sharedIssue.value = JSON.parse(storedIssue);
    }
  })

  // Méthode pour mettre à jour la donnée et la stocker dans localStorage
  const setSharedIssue = (issue) => {
    sharedIssue.value = issue;
    localStorage.setItem("sharedIssue", JSON.stringify(issue));
  }

  return { sharedIssue, setSharedIssue }
}
