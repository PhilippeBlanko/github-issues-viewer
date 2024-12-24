export default defineNuxtPlugin(nuxtApp => {
  // Directive personnalisée pour changer la couleur de fond au survol
  nuxtApp.vueApp.directive('hover-bg', {
    beforeMount(el, binding) {
      const color = binding.value || 'yellow'; // Si aucune couleur n'est passée, on met 'yellow'
      el.addEventListener('mouseenter', () => {
        el.style.backgroundColor = color;
      });
      el.addEventListener('mouseleave', () => {
        el.style.backgroundColor = '';
      });
    }
  });
});
