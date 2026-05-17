/* ═══════════════════════════════════════════════════════
   transformacao_immersive.js — v2.0
   Motor de Scroll Progressivo com LERP (Linear Interpolation)
   Fase 1: Intro Zoom (0% - 30%)
   Fase 2: Horizontal Scroll (30% - 100%)
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const section = document.querySelector('.transform-immersive');
    const sticky = document.querySelector('.transform-immersive__sticky');
    const intro = document.querySelector('.transform-immersive__intro');
    const trilho = document.querySelector('.transform-immersive__horizontal');
    const cards = document.querySelectorAll('.immersive-card__slider');

    if (!section || !trilho) return;

    // Configurações do motor
    let currentScroll = 0;
    let targetScroll = 0;
    const ease = 0.08; // Fator de LERP (0.1 = mais rápido, 0.05 = mais suave/lento)

    let sectionTop = 0;
    let sectionHeight = 0;
    let isActive = false;

    /**
     * 1. ATUALIZAÇÃO DE GEOMETRIA
     */
    function updateGeometry() {
        sectionTop = section.offsetTop;
        sectionHeight = section.offsetHeight;
        // Definimos a altura da seção baseada no número de cards + o zoom
        // Cada card adiciona espaço de scroll
        // totalHeight = windowHeight * (1 (zoom) + numCards * 0.8)
        const numCards = document.querySelectorAll('.immersive-card').length;
        const calculatedHeight = window.innerHeight * (1.5 + numCards * 1.2);
        section.style.height = `${calculatedHeight}px`;
        sectionHeight = calculatedHeight;
    }

    /**
     * 2. MOTOR LERP (requestAnimationFrame)
     */
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    let lastProgress = -1;
    function animate() {
        if (!isActive) return;

        currentScroll = lerp(currentScroll, targetScroll, ease);
        const scrollDiff = Math.abs(targetScroll - currentScroll);

        if (scrollDiff < 0.01 && lastProgress !== -1) {
            // Idle
        } else {
            const scrollDistance = currentScroll - sectionTop;
            const totalScrollable = sectionHeight - window.innerHeight;
            let progress = scrollDistance / totalScrollable;
            progress = Math.max(0, Math.min(1, progress));

            if (Math.abs(progress - lastProgress) > 0.0001) {
                updateVisuals(progress);
                lastProgress = progress;
            }
        }

        requestAnimationFrame(animate);
    }

    /**
     * 3. MAPEAMENTO DE FASES E VISUAIS
     */
    function updateVisuals(progress) {
        // --- FASE 1: INTRO ZOOM (0.0 a 0.3) ---
        const phase1End = 0.3;
        let p1 = Math.min(progress / phase1End, 1);

        // Zoom da imagem (de 1 a 30)
        const zoomValue = 1 + (p1 * 29);
        section.style.setProperty('--intro-zoom', zoomValue);

        // Opacidade da Intro
        if (p1 > 0.95) {
            section.style.setProperty('--intro-opacity', 0);
            section.style.setProperty('--intro-visibility', 'hidden');
        } else {
            section.style.setProperty('--intro-opacity', 1 - (p1 * 1.2));
            section.style.setProperty('--intro-visibility', 'visible');
        }

        // --- FASE 2: HORIZONTAL (0.3 a 1.0) ---
        let p2 = progress > phase1End ? (progress - phase1End) / (1 - phase1End) : 0;

        // Translação horizontal
        // O trilho começa em 100vw e termina em -X onde X é o comprimento do trilho
        const trilhoWidth = trilho.scrollWidth;
        const horizontalMove = p2 * (trilhoWidth - window.innerWidth * 0.5);

        section.style.setProperty('--horizontal-x', `${100 - (p2 * 180)}vw`); // Entrada suave
        // Melhor usar translate relativo ao tamanho do trilho
        const xOffset = p2 * (trilhoWidth + window.innerWidth * 0.2);
        section.style.setProperty('--horizontal-x', `${-xOffset + window.innerWidth * 0.8}px`);
        section.style.setProperty('--horizontal-opacity', p2 > 0.05 ? 1 : p2 * 20);

        // Parallax de fundo (0.5x speed)
        const parallaxY = p2 * 150; // move 150px
        section.style.setProperty('--bg-parallax-y', `${-parallaxY}px`);
    }

    /**
     * 4. LISTENERS DE SCROLL
     */
    window.addEventListener('scroll', () => {
        targetScroll = window.pageYOffset;
    }, { passive: true });

    /**
     * 5. INTERSECTION OBSERVER
     * Gerencia o ciclo de vida para economizar recursos
     */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isActive = entry.isIntersecting;
            if (isActive) {
                targetScroll = window.pageYOffset;
                currentScroll = targetScroll;
                requestAnimationFrame(animate);
            }
        });
    }, { threshold: 0 });

    observer.observe(section);

    /**
     * 6. SLIDER INTERATIVO (Antes e Depois)
     */
    cards.forEach(card => {
        const updateSlider = (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            let percent = (x / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            card.style.setProperty('--exposure', `${percent}%`);
        };

        const onMove = (e) => {
            if (e.buttons === 1 || e.type === 'touchmove') {
                updateSlider(e);
            }
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('touchmove', onMove, { passive: false });
        card.addEventListener('mousedown', updateSlider);
        card.addEventListener('touchstart', updateSlider, { passive: false });
    });

    // Inicialização
    window.addEventListener('resize', updateGeometry);
    updateGeometry();

})();
