export default defineNuxtRouteMiddleware((to, from) => {
// Vérifier si la page actuelle est l'accueil
  if (to.path === '/') {
    // Récupérer l'heure actuelle
    const currentMinute = new Date().getMinutes();

    // Si la minute est paire, rediriger vers /repositories
    if (currentMinute % 2 === 0) {
      console.log('oui redirigé');
      if (to.path !== '/repositories') {
        return navigateTo('/repositories');
      }
    } else {
      console.log('non redirigé');
    }
  }
});
