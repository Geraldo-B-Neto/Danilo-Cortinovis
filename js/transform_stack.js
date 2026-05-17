/**
 * transform_stack.js — v6.0 (Trilhos Horizontais de Alta Performance - Ultra Suave)
 * Motor de rolagem contínua acelerado por GPU + Lightbox Modal com Slider 60fps Antes e Depois
 */
(function () {
    'use strict';

    // ════════════════════════════════════════
    // 1. MOTOR DE ROLAGEM CONTÍNUA DOS TRILHOS
    // ════════════════════════════════════════
    const wraps = document.querySelectorAll('.trilho-wrap');
    if (!wraps.length) return;

    wraps.forEach(wrap => {
        const linha = wrap.querySelector('.trilho-linha');
        if (!linha) return;

        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollSpeed = wrap.querySelector('.trilho-linha--left') ? 0.7 : -0.7;
        let isHovered = false;

        // Cache dos valores de layout para evitar absolutamente qualquer Layout Thrashing!
        let maxScroll = wrap.scrollWidth - wrap.clientWidth;

        // Atualiza o cache de dimensões apenas em resize
        window.addEventListener('resize', () => {
            maxScroll = wrap.scrollWidth - wrap.clientWidth;
        });

        // Loop de auto scroll leve
        function animateScroll() {
            if (!isDown && !isHovered) {
                wrap.scrollLeft += autoScrollSpeed;
                
                // Como não podemos confiar no evento 'scroll' se o valor clampa no 0 inicial,
                // fazemos a checagem de borda aqui direto na GPU.
                if (autoScrollSpeed < 0 && wrap.scrollLeft <= 0) {
                    // Atualiza maxScroll aqui caso as imagens tenham acabado de carregar
                    maxScroll = wrap.scrollWidth - wrap.clientWidth;
                    wrap.scrollLeft = maxScroll - 2;
                } else if (autoScrollSpeed > 0 && wrap.scrollLeft >= maxScroll - 1) {
                    wrap.scrollLeft = 2;
                }
            }
            requestAnimationFrame(animateScroll);
        }

        // Mantém também pro arraste manual do usuário com mouse/touch
        wrap.addEventListener('scroll', () => {
            if (isDown) { // Só roda no evento se for o usuário arrastando
                if (wrap.scrollLeft >= maxScroll - 1) {
                    wrap.scrollLeft = 4;
                } else if (wrap.scrollLeft <= 0) {
                    maxScroll = wrap.scrollWidth - wrap.clientWidth;
                    wrap.scrollLeft = maxScroll - 4;
                }
            }
        });

        // Mouse Drag (Navegação rápida com o mouse)
        wrap.addEventListener('mousedown', (e) => {
            isDown = true;
            wrap.style.cursor = 'grabbing';
            startX = e.pageX - wrap.offsetLeft;
            scrollLeft = wrap.scrollLeft;
        });

        wrap.addEventListener('mouseleave', () => {
            isDown = false;
            isHovered = false;
            wrap.style.cursor = 'grab';
        });

        wrap.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        wrap.addEventListener('mouseup', () => {
            isDown = false;
            wrap.style.cursor = 'grab';
        });

        wrap.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrap.offsetLeft;
            const walk = (x - startX) * 2.2; // Multiplicador para arrasto ágil
            wrap.scrollLeft = scrollLeft - walk;
        });

        // Touch Swipe (Mobile) - Pausa o auto scroll durante a navegação por toque
        wrap.addEventListener('touchstart', () => { 
            isHovered = true; 
        }, { passive: true });
        
        wrap.addEventListener('touchend', () => { 
            isHovered = false; 
        }, { passive: true });

        // Inicializa o auto scroll
        requestAnimationFrame(animateScroll);
    });

    // ════════════════════════════════════════
    // 2. MODAL LIGHTBOX COM SLIDER ANTES & DEPOIS
    // ════════════════════════════════════════
    const modal = document.getElementById('trilhoModal');
    const modalImgAfter = document.getElementById('trilhoModalImgAfter');
    const modalImgBefore = document.getElementById('trilhoModalImgBefore');
    const modalBeforeWrap = document.getElementById('trilhoModalBeforeWrap');
    const modalDivisor = document.getElementById('trilhoModalDivisor');
    const modalTitle = document.getElementById('trilhoModalTitle');
    const modalDesc = document.getElementById('trilhoModalDesc');
    
    if (!modal) return;

    const cards = document.querySelectorAll('.trilho-card');
    let sliderContainerWidth = 0;

    // Abre o modal ao clicar em qualquer card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const beforeSrc = card.getAttribute('data-img-before');
            const afterSrc = card.getAttribute('data-img-after');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');

            // Carrega as imagens no modal
            modalImgBefore.src = beforeSrc;
            modalImgAfter.src = afterSrc;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;

            // Define a largura exata da imagem baseado no container
            const updateImageWidth = () => {
                const sliderWidth = document.getElementById('trilhoModalSlider').clientWidth;
                modalImgBefore.style.width = sliderWidth + 'px';
                sliderContainerWidth = sliderWidth;
            };
            
            updateImageWidth();
            // Pequeno delay para garantir carregamento e renderização corretos do DOM
            setTimeout(updateImageWidth, 50);

            // Reseta a agulha de arrasto para o centro
            setSliderPosition(sliderContainerWidth / 2);

            // Ativa o modal
            modal.classList.add('is-active');
            document.body.style.overflow = 'hidden'; // Bloqueia scroll de fundo
        });
    });

    // Função de fechar o modal
    const closeModal = () => {
        modal.classList.remove('is-active');
        document.body.style.overflow = ''; // Restaura scroll da página
    };

    document.getElementById('trilhoModalClose').addEventListener('click', closeModal);
    document.getElementById('trilhoModalBackdrop').addEventListener('click', closeModal);

    // Ajustar o tamanho da imagem de "Antes" dinamicamente no resize
    window.addEventListener('resize', () => {
        if (modal.classList.contains('is-active')) {
            const sliderWidth = document.getElementById('trilhoModalSlider').clientWidth;
            modalImgBefore.style.width = sliderWidth + 'px';
            sliderContainerWidth = sliderWidth;
            setSliderPosition(sliderWidth / 2); // Reseta para o meio ou mantém
        }
    });

    // Posicionador do Slider - Otimizado para performance com GPU transform
    function setSliderPosition(posPx) {
        posPx = Math.max(0, Math.min(sliderContainerWidth, posPx));
        let posPct = (posPx / sliderContainerWidth) * 100;
        
        // O width do wrapper do "Antes" ainda muda (necessário para o clip do antes/depois)
        modalBeforeWrap.style.width = posPct + '%';
        
        // Mudança crucial: transform em vez de left para usar aceleração de hardware (GPU)
        // Movemos no eixo X via pixels com translate3d para fluidez nativa a 60fps
        modalDivisor.style.transform = `translate3d(calc(${posPx}px - 50%), 0, 0)`;
    }

    // Lógica do Slider com Debounce via requestAnimationFrame
    const sliderContainer = document.getElementById('trilhoModalSlider');
    let dragging = false;
    let cachedRectLeft = 0;
    let currentClientX = 0;
    let ticking = false; // Flag para o requestAnimationFrame

    function moveFrame() {
        if (!sliderContainerWidth) {
            ticking = false;
            return;
        }
        
        let posPx = currentClientX - cachedRectLeft;
        setSliderPosition(posPx);
        
        // Libera o próximo frame
        ticking = false;
    }

    // Centralizador dos eventos de movimento
    function onMove(clientX) {
        currentClientX = clientX;
        
        // Se já houver um frame agendado, não faz nada. Só roda sincronizado com a tela.
        if (!ticking) {
            window.requestAnimationFrame(moveFrame);
            ticking = true;
        }
    }

    // Listeners do Mouse
    sliderContainer.addEventListener('mousedown', (e) => {
        dragging = true;
        const rect = sliderContainer.getBoundingClientRect();
        cachedRectLeft = rect.left;
        sliderContainerWidth = rect.width;
        onMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        dragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (dragging) onMove(e.clientX);
    });

    // Listeners de Touch (Mobile)
    sliderContainer.addEventListener('touchstart', (e) => {
        dragging = true;
        const rect = sliderContainer.getBoundingClientRect();
        cachedRectLeft = rect.left;
        sliderContainerWidth = rect.width;
        if (e.cancelable) e.preventDefault(); // Impede scroll indesejado do celular
        onMove(e.touches[0].clientX);
    }, { passive: false });

    window.addEventListener('touchend', () => {
        dragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (dragging) {
            if (e.cancelable) e.preventDefault(); // Bloqueia rolagem vertical da página
            onMove(e.touches[0].clientX);
        }
    }, { passive: false });

})();
