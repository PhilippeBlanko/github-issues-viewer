// plugins/setGradientBackground.js
export default defineNuxtPlugin(nuxtApp => {
  if (process.client) {
    const setGradientBackground = () => {
      console.log('change couleur de fond')
      const hour = new Date().getHours(); // Obtenir l'heure actuelle

      let gradient = '';

      if (hour >= 6 && hour < 12) {
        // Matin
        gradient = 'linear-gradient(to right, #FFFAE3, #FFEB7D)';
      } else if (hour >= 12 && hour < 18) {
        // Après-midi
        gradient = 'linear-gradient(to right, #A2DFF7, #3A8DFF)';
      } else {
        // Soir
        gradient = 'linear-gradient(to right, #3A3D4D, #2F3A47)';
      }

      // Applique l'animation de fond avec un dégradé dynamique
      document.body.style.background = gradient;
      document.body.style.transition = 'background 1s ease-in-out'; // Ajoute une transition fluide
    };

    // Appeler la fonction au démarrage de l'application pour définir l'arrière-plan au chargement
    setGradientBackground();

    // Injecter la fonction dans l'application
    nuxtApp.provide('changeBackground', setGradientBackground);
  }
});
