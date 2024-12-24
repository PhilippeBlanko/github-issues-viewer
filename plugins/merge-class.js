// plugins/merge-class.js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('merge-class', {
    beforeMount(el, binding) {
      // Si 'class2' est passé en attribut, on fusionne avec 'class'
      const class2 = binding.value;
      if (class2) {
        el.classList.add(...class2.split(' ')); // Ajoute les classes de class2 à l'élément
      }
    }
  });
});
