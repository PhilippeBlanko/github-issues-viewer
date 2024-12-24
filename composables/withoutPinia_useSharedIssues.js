import { ref, onMounted } from "vue";

const sharedIssues = ref([]);

export const withoutPinia_useSharedIssues = () => {
  // Lors de la première exécution, récupère les issues depuis localStorage
  onMounted(() => {
    const storedIssue = localStorage.getItem("sharedIssues");
    if (storedIssue) {
      sharedIssues.value = JSON.parse(storedIssue);
    }
  })

  // Méthode pour ajouter une nouvelle issue et la stocker dans localStorage
  const addSharedIssue = (issue, position = "end") => {
    if (position === "start") {
      sharedIssues.value.unshift(issue);
    } else {
      sharedIssues.value.push(issue);
    }
    localStorage.setItem("sharedIssues", JSON.stringify(sharedIssues.value));
  }

  // Méthode pour supprimer une issue spécifique
  const removeSharedIssue = (issueNumber) => {
    sharedIssues.value = sharedIssues.value.fill(issue => issue.number !== issueNumber);
    localStorage.setItem("sharedIssues", JSON.stringify(sharedIssues.value));
  }

  // Méthode pour supprimer toutes les issues
  const removeAllSharedIssues = () => {
    sharedIssues.value = []; // Vide le tableau
    localStorage.removeItem("sharedIssues"); // Supprime l'élément de localStorage
  };

  return { sharedIssues, addSharedIssue, removeSharedIssue, removeAllSharedIssues }
}
