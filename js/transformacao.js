/* ═══════════════════════════════════════════
   TRANSFORMAÇÃO — slider antes/depois
   Funciona com mouse, touch e teclado.
═══════════════════════════════════════════ */
(function () {
  'use strict';

  document.querySelectorAll('.transf-card__slider').forEach(function (slider) {
    var antesWrap = slider.querySelector('.transf-card__antes-wrap');
    var divisor = slider.querySelector('.transf-card__divisor');
    var handle = slider.querySelector('.transf-card__handle');

    if (!antesWrap || !divisor || !handle) return;

    var arrastando = false;
    var posAtual = 50; /* percentual */

    function moverPara(x) {
      var rect = slider.getBoundingClientRect();
      var pct = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100));
      posAtual = pct;
      antesWrap.style.width = pct + '%';
      divisor.style.left = pct + '%';
      handle.style.left = pct + '%';
    }

    /* Mouse */
    slider.addEventListener('mousedown', function (e) {
      arrastando = true;
      moverPara(e.clientX);
      e.preventDefault();
    });

    window.addEventListener('mousemove', function (e) {
      if (arrastando) moverPara(e.clientX);
    });

    window.addEventListener('mouseup', function () {
      arrastando = false;
    });

    /* Touch */
    slider.addEventListener('touchstart', function (e) {
      arrastando = true;
      moverPara(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
      if (arrastando) moverPara(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', function () {
      arrastando = false;
    });

    /* Teclado: foco no slider, setas movem 5% */
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        posAtual = Math.max(0, posAtual - 5);
        antesWrap.style.width = posAtual + '%';
        divisor.style.left = posAtual + '%';
        handle.style.left = posAtual + '%';
        e.preventDefault();
      }
      if (e.key === 'ArrowRight') {
        posAtual = Math.min(100, posAtual + 5);
        antesWrap.style.width = posAtual + '%';
        divisor.style.left = posAtual + '%';
        handle.style.left = posAtual + '%';
        e.preventDefault();
      }
    });

    /* Posição inicial */
    antesWrap.style.width = '50%';
    divisor.style.left = '50%';
    handle.style.left = '50%';
  });

})();








// /* ═══════════════════════════════════════════════════════
//    transformacao.js — Cards Antes & Depois
//    Lê DC.transformacoes do config.js, renderiza os cards
//    e inicializa o slider drag em cada um.
// ═══════════════════════════════════════════════════════ */

// (function () {
//   'use strict';

//   const trilho = document.querySelector('.transformacao__trilho');
//   if (!trilho) return;

//   const SVG_HANDLE = `
//     <svg viewBox="0 0 24 24" aria-hidden="true">
//       <polyline points="9,5 4,12 9,19"/>
//       <polyline points="15,5 20,12 15,19"/>
//     </svg>`;


//   /* ══════════════════════════════════════════════════════
//      1. RENDER DOS CARDS
//   ══════════════════════════════════════════════════════ */

//   function renderCard(t) {
//     const card = document.createElement('div');
//     card.className = 'transf-card';
//     card.setAttribute('role', 'listitem');

//     card.innerHTML = `
//       <div
//         class="transf-card__slider"
//         aria-label="Comparação: ${t.servico} antes e depois"
//         role="img"
//       >
//         <img
//           class="transf-card__depois"
//           src="${t.depois.src}"
//           alt="${t.depois.alt}"
//           loading="lazy"
//           draggable="false"
//         />
//         <div class="transf-card__antes-wrap">
//           <img
//             class="transf-card__antes"
//             src="${t.antes.src}"
//             alt="${t.antes.alt}"
//             loading="lazy"
//             draggable="false"
//           />
//         </div>
//         <div class="transf-card__divisor"></div>
//         <div class="transf-card__handle" aria-hidden="true">${SVG_HANDLE}</div>
//         <span class="transf-card__label-antes" aria-hidden="true">Antes</span>
//         <span class="transf-card__label-depois" aria-hidden="true">Depois</span>
//       </div>
//       <div class="transf-card__legenda">
//         <p class="transf-card__servico">${t.servico}</p>
//         <p class="transf-card__preco">${t.preco}</p>
//       </div>
//     `;

//     return card;
//   }

//   trilho.innerHTML = '';
//   DC.transformacoes.forEach(t => trilho.appendChild(renderCard(t)));


//   /* ══════════════════════════════════════════════════════
//      2. SLIDER DRAG — mouse + touch
//      Porcentagem (0–100) de quanto a imagem "antes" está visível.
//   ══════════════════════════════════════════════════════ */

//   function initSlider(sliderEl) {
//     const antesWrap = sliderEl.querySelector('.transf-card__antes-wrap');
//     const divisor   = sliderEl.querySelector('.transf-card__divisor');
//     const handle    = sliderEl.querySelector('.transf-card__handle');

//     let arrastando = false;
//     let posicao = 50; /* % inicial */

//     function aplicarPosicao(pct) {
//       posicao = Math.max(2, Math.min(98, pct));
//       antesWrap.style.width = posicao + '%';
//       divisor.style.left    = posicao + '%';
//       handle.style.left     = posicao + '%';
//     }

//     function calcPct(clientX) {
//       const rect = sliderEl.getBoundingClientRect();
//       return ((clientX - rect.left) / rect.width) * 100;
//     }

//     /* Mouse */
//     handle.addEventListener('mousedown', e => {
//       e.preventDefault();
//       arrastando = true;
//     });

//     document.addEventListener('mousemove', e => {
//       if (!arrastando) return;
//       aplicarPosicao(calcPct(e.clientX));
//     });

//     document.addEventListener('mouseup', () => { arrastando = false; });

//     /* Touch */
//     handle.addEventListener('touchstart', e => {
//       e.preventDefault();
//       arrastando = true;
//     }, { passive: false });

//     document.addEventListener('touchmove', e => {
//       if (!arrastando) return;
//       aplicarPosicao(calcPct(e.touches[0].clientX));
//     }, { passive: true });

//     document.addEventListener('touchend', () => { arrastando = false; });

//     /* Clique direto no slider (sem arrastar) */
//     sliderEl.addEventListener('click', e => {
//       if (e.target === handle || handle.contains(e.target)) return;
//       aplicarPosicao(calcPct(e.clientX));
//     });

//     /* Estado inicial */
//     aplicarPosicao(posicao);
//   }


//   /* Inicializa todos os sliders após render */
//   document.querySelectorAll('.transf-card__slider').forEach(initSlider);


//   /* ══════════════════════════════════════════════════════
//      3. HINT DE ARRASTAR — some após a primeira interação
//   ══════════════════════════════════════════════════════ */

//   const hint = document.querySelector('.transformacao__hint');

//   function removerHint() {
//     hint?.classList.add('transformacao__hint--sumido');
//     document.querySelectorAll('.transf-card__handle').forEach(h => {
//       h.removeEventListener('mousedown', removerHint);
//       h.removeEventListener('touchstart', removerHint);
//     });
//   }

//   document.querySelectorAll('.transf-card__handle').forEach(h => {
//     h.addEventListener('mousedown',  removerHint, { once: true });
//     h.addEventListener('touchstart', removerHint, { once: true });
//   });

// })();