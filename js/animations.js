/**
 * JS de Animação de Entrada
 * Observa elementos com a classe [class*="reveal-"] e aplica a classe "in-view"
 */
(function() {
  'use strict';

  var revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Se quisermos que a animação ocorra apenas uma vez:
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Gatilho quando 15% do elemento estiver visível
    rootMargin: '0px 0px -50px 0px' // Margem inferior para antecipar ou atrasar
  });

  function initReveals() {
    var elements = document.querySelectorAll('[class*="reveal-"]');
    elements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  // Inicializa ao carregar a página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveals);
  } else {
    initReveals();
  }
})();
