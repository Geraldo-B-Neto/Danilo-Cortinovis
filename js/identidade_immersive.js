/* ═══════════════════════════════════════════════════════
   identidade_immersive.js — v3.0 (Multi-Versões)
   Motor LERP (Linear Interpolation) @ 0.075 independente
   Suporta as 4 versões na mesma página para comparação.
   Fase 1: Intro (0% - 25%) - Zoom / Cover / Shutter / Split
   Fase 2: Horizontal Scroll (25% - 70%)
   Fase 3: Spatial Stacking (70% - 100%)
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const sections = document.querySelectorAll('.identidade-immersive');
    if (!sections.length) return;

    sections.forEach(section => {
        const trilho = section.querySelector('.id-trilho');
        const sCards = section.querySelectorAll('.id-stack-card');
        const phase2Videos = section.querySelectorAll('.id-slide-card__video iframe');

        if (!trilho) return;

        // Determinar a versão baseado nas classes do elemento pai
        let version = 'original';
        if (section.classList.contains('id-version-a')) version = 'a';
        else if (section.classList.contains('id-version-b')) version = 'b';
        else if (section.classList.contains('id-version-c')) version = 'c';

        // LERP Motor vars (exclusivo desta seção)
        let currentScroll = window.pageYOffset;
        let targetScroll = window.pageYOffset;
        const amt = 0.075; // Assinatura visual premium

        let sectionTop = 0;
        let sectionHeight = 0;
        let isActive = false;

        function updateGeometry() {
            sectionTop = section.offsetTop;
            // Definimos altura fixa para controle de scroll longo
            section.style.height = '600vh';
            sectionHeight = section.offsetHeight;
        }

        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        /**
         * LOOP PRINCIPAL (RAF)
         */
        let lastProgress = -1;
        let isAnimating = false;

        function animate() {
            if (!isActive) {
                isAnimating = false;
                return;
            }

            currentScroll = lerp(currentScroll, targetScroll, amt);
            const scrollDiff = Math.abs(targetScroll - currentScroll);

            if (scrollDiff < 0.1) {
                // Dorme o loop quando chega muito próximo do destino
                currentScroll = targetScroll;
                isAnimating = false;
            } else {
                // Continua animando
                isAnimating = true;
                requestAnimationFrame(animate);
            }

            const scrollDistance = currentScroll - sectionTop;
            const totalScrollable = sectionHeight - window.innerHeight;
            let progress = scrollDistance / totalScrollable;
            progress = Math.max(0, Math.min(1, progress));

            if (Math.abs(progress - lastProgress) > 0.0001) {
                updatePhases(progress);
                lastProgress = progress;
            }
        }

        /**
         * MAPEAMENTO DE FASES E MOVIMENTOS EXCLUSIVOS
         */
        function updatePhases(progress) {
            // Parallax do vídeo de fundo
            section.style.setProperty('--id-bg-parallax-y', `${-progress * 80}px`);

            // --- FASE 1: INTRO (0.0 - 0.25) ---
            const p1End = 0.25;
            let p1 = Math.min(progress / p1End, 1);

            if (version === 'original') {
                // ZOOM ORIGINAL (1x a 4x)
                const zoom = 1 + (p1 * 3); // 1x a 4x
                section.style.setProperty('--id-zoom', zoom);
                section.style.setProperty('--id-title-opacity', 1 - (p1 * 2));
                section.style.setProperty('--id-title-y', `${-p1 * 50}px`);
            } 
            else if (version === 'a') {
                // CONCEITO A: FLOATING COVER (Sobe elegante + zoom sutil de 8%)
                const zoom = 1 + (p1 * 0.08); 
                const yOffset = -p1 * 120; // desliza para cima
                const opacity = 1 - p1;
                section.style.setProperty('--id-a-zoom', zoom);
                section.style.setProperty('--id-a-y', `${yOffset}px`);
                section.style.setProperty('--id-a-opacity', opacity);
                
                // Título desce levemente para dar paralaxe reversa
                section.style.setProperty('--id-a-title-y', `${p1 * 30}px`);
                section.style.setProperty('--id-a-title-opacity', 1 - (p1 * 1.5));
            } 
            else if (version === 'b') {
                // CONCEITO B: CINEMATIC SHUTTER (Abertura lateral)
                const cropPercent = 30 * (1 - p1); // Inset horizontal de 30% a 0%
                const zoom = 1 + (p1 * 0.05); // zoom ínfimo
                const opacity = 1 - Math.max(0, (p1 - 0.8) * 5); // Fica nítido e some no fim
                section.style.setProperty('--id-b-crop', `${cropPercent}%`);
                section.style.setProperty('--id-b-zoom', zoom);
                section.style.setProperty('--id-b-opacity', opacity);

                section.style.setProperty('--id-b-title-opacity', 1 - (p1 * 1.8));
                section.style.setProperty('--id-b-title-y', `${-p1 * 20}px`);
            } 
            else if (version === 'c') {
                // CONCEITO C: SPLIT-SCREEN (Paralaxe assimétrica)
                const leftY = -p1 * 150; // Sobe
                const rightY = p1 * 100; // Desce
                const opacity = 1 - p1;
                section.style.setProperty('--id-c-left-y', `${leftY}px`);
                section.style.setProperty('--id-c-right-y', `${rightY}px`);
                section.style.setProperty('--id-c-opacity', opacity);
                
                section.style.setProperty('--id-c-title-opacity', 1 - (p1 * 1.5));
            }

            // Ocultar Intro geral quando sai da Fase 1
            if (p1 > 0.95) {
                section.style.setProperty('--id-intro-opacity', 0);
                section.style.setProperty('--id-intro-visibility', 'hidden');
            } else {
                section.style.setProperty('--id-intro-opacity', 1);
                section.style.setProperty('--id-intro-visibility', 'visible');
            }

            // --- FASE 2: HORIZONTAL (0.25 - 0.7) ---
            const p2Start = 0.25;
            const p2End = 0.7;
            let p2 = progress > p2Start ? Math.min((progress - p2Start) / (p2End - p2Start), 1) : 0;

            const trilhoWidth = trilho.scrollWidth;
            const xOffset = p2 * (trilhoWidth + window.innerWidth * 0.2);

            section.style.setProperty('--id-horizontal-x', `${-xOffset + window.innerWidth * 0.85}px`);

            // Otimização de opacidade
            let hOpacity = p2 > 0 && p2 < 1 ? 1 : (p2 === 0 ? 0 : 1 - (p2 - 0.9) * 10);
            if (p2 > 0.95) hOpacity = 1 - (p2 - 0.95) * 20;
            section.style.setProperty('--id-horizontal-opacity', hOpacity);

            // --- FASE 3: STACKING (0.7 - 1.0) ---
            const p3Start = 0.7;
            let p3 = progress > p3Start ? (progress - p3Start) / (1 - p3Start) : 0;

            if (p3 > 0.01) {
                section.style.setProperty('--id-stack-opacity', 1);
                section.style.setProperty('--id-stack-visibility', 'visible');
            } else {
                section.style.setProperty('--id-stack-opacity', 0);
                section.style.setProperty('--id-stack-visibility', 'hidden');
            }

            // Lógica de empilhamento dos cards
            const numCards = sCards.length;
            sCards.forEach((card, i) => {
                const cardStart = i / numCards;
                const cardEnd = (i + 1) / numCards;
                let cardProgress = p3 > cardStart ? Math.min((p3 - cardStart) / (cardEnd - cardStart), 1) : 0;

                // Direção de origem
                const origin = card.getAttribute('data-origin') || 'bottom';
                let initX = 0, initY = 0;

                if (origin === 'top-left') { initX = -120; initY = -120; }
                else if (origin === 'top-right') { initX = 120; initY = -120; }
                else if (origin === 'bottom-left') { initX = -120; initY = 120; }
                else if (origin === 'bottom-right') { initX = 120; initY = 120; }
                else if (origin === 'left') { initX = -150; initY = 0; }
                else if (origin === 'right') { initX = 150; initY = 0; }
                else { initY = 150; } // default bottom

                // Posição final
                const currentX = initX + (0 - initX) * cardProgress;
                const currentY = initY + (0 - initY) * cardProgress;
                const currentRot = ((i % 2 === 0 ? 1 : -1) * (i * 2)) * cardProgress;

                // "Afundamento"
                let scale = 1;
                let overlayOpacity = 0;
                const nextCardStart = (i + 1) / numCards;
                if (p3 > nextCardStart) {
                    const sinkProgress = Math.min((p3 - nextCardStart) / (1 / numCards), 1);
                    scale = 1 - (sinkProgress * 0.05);
                    overlayOpacity = sinkProgress * 0.5; // Escurecimento em vez de escala pesada
                }

                card.style.setProperty('--id-card-x', `${currentX}%`);
                card.style.setProperty('--id-card-y', `${currentY}%`);
                card.style.setProperty('--id-card-rotate', `${currentRot}deg`);
                card.style.setProperty('--id-card-scale', scale);
                card.style.setProperty('--id-card-overlay', overlayOpacity);
            });
        }

        /**
         * EVENT LISTENERS
         */
        window.addEventListener('scroll', () => {
            targetScroll = window.pageYOffset;
            
            // Failsafe: Se o usuário estiver fisicamente navegando dentro da seção,
            // força isActive para true (previne bugs de IntersectionObserver em elementos muito altos no mobile/safari)
            const scrollY = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            if (scrollY + viewportHeight >= sectionTop && scrollY <= sectionTop + sectionHeight) {
                isActive = true;
            }

            if (isActive && !isAnimating) {
                isAnimating = true;
                requestAnimationFrame(animate);
            }
        }, { passive: true });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isActive = entry.isIntersecting;
                if (isActive) {
                    // Recalcula geometria no exato momento que entra para evitar desvios causados por layout shift
                    updateGeometry();
                    targetScroll = window.pageYOffset;
                    currentScroll = targetScroll;
                    if (!isAnimating) {
                        isAnimating = true;
                        requestAnimationFrame(animate);
                    }
                    // Carrega os iframes do Vimeo
                    phase2Videos.forEach(iframe => {
                        if (iframe.dataset.src && iframe.src !== iframe.dataset.src) {
                            iframe.src = iframe.dataset.src;
                        }
                    });
                } else {
                    // Descarrega para liberar CPU
                    phase2Videos.forEach(iframe => {
                        iframe.src = '';
                    });
                }
            });
        }, { threshold: 0 });

        observer.observe(section);

        window.addEventListener('resize', updateGeometry);
        window.addEventListener('load', updateGeometry); // Recalcula quando tudo carregar (imagens, fontes, frames)
        updateGeometry();
    });
})();
