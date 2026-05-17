/**
 * LÓGICA DAS OPÇÕES DE TRANSFORMAÇÃO
 */
(function() {
    'use strict';

    // ─── OPTION 1: LENS ───
    const v1 = document.querySelector('.transform-v1-lens');
    const lensBefore = document.querySelector('.lens-img--before');
    const lensCursor = document.querySelector('.lens-cursor');

    if (v1 && lensBefore) {
        v1.addEventListener('mousemove', (e) => {
            const rect = v1.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Move o clip-path da imagem "Antes"
            lensBefore.style.clipPath = `circle(150px at ${x}px ${y}px)`;
            
            // Move a linha guia (opcional, para dar efeito de ferramenta)
            if (lensCursor) {
                lensCursor.style.left = `${e.clientX}px`;
            }
        });

        // Efeito ao scroll (se a lente estiver no centro)
        window.addEventListener('scroll', () => {
            const rect = v1.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // A lente pode se expandir ou pulsar ao scroll
            }
        });
    }

    // ─── OPTION 2: FORGE (STACKING) ───
    // O efeito de stacking é feito via CSS (position: sticky), 
    // mas podemos adicionar uma rotação dinâmica.
    const forgeItems = document.querySelectorAll('.forge-item');
    window.addEventListener('scroll', () => {
        forgeItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const card = item.querySelector('.forge-card');
            if (rect.top < 0) {
                const progress = Math.abs(rect.top) / window.innerHeight;
                // Efeito de encolhimento enquanto o próximo sobe
                card.style.transform = `scale(${1 - progress * 0.2}) rotate(${progress * 5}deg)`;
                card.style.opacity = 1 - progress;
            } else {
                card.style.transform = `scale(1) rotate(0deg)`;
                card.style.opacity = 1;
            }
        });
    });

    // ─── OPTION 3: BENTO REVEAL ───
    // O hover já é tratado via CSS, mas podemos adicionar um 
    // paralaxe leve nas imagens internas.
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const img = card.querySelector('.bento-img');
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            img.style.transform = `scale(1.1) translate(${x * 20}px, ${y * 20}px)`;
        });

        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.bento-img');
            img.style.transform = `scale(1) translate(0, 0)`;
        });
    });

})();
