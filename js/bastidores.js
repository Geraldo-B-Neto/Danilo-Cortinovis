/* ═══════════════════════════════════════════════════════
   bastidores.js — Reels / Cards de bastidores
   Lê DC.reels do config.js e renderiza o trilho.
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const trilho = document.querySelector('.bastidores__trilho');
  if (!trilho) return;

  const SVG_PLAY_PATH = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="9,7 17,12 9,17" fill="currentColor"/>
    </svg>`;

  function renderCard(reel) {
    const a = document.createElement('a');
    a.className = 'reel-card';
    a.href = reel.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('role', 'listitem');
    a.setAttribute('aria-label', `Reel: ${reel.legenda}`);

    a.innerHTML = `
      <div class="reel-card__thumb">
        <img
          class="reel-card__img"
          src="${reel.src}"
          alt="${reel.alt}"
          loading="lazy"
        />
        <div class="reel-card__play">
          <div class="reel-card__play-circulo">
            <div class="reel-card__play-triangulo"></div>
          </div>
        </div>
        <span class="reel-card__badge">${reel.badge}</span>
        ${reel.duracao ? `<span class="reel-card__duracao">${reel.duracao}</span>` : ''}
      </div>
      <p class="reel-card__legenda">${reel.legenda}</p>
    `;

    return a;
  }

  /* Busca os dados reais de uma ponte JSON para popular o trilho */
  const ENDPOINT_REELS = './api/reels.json'; // O './' ajuda a localizar a pasta no Pages


  async function fetchAndRenderReels() {
    try {
      const response = await fetch(ENDPOINT_REELS);
      if (!response.ok) throw new Error('Erro na rede: ' + response.statusText);

      const payload = await response.json();
      const data = payload.data || [];

      // Limpa o conteúdo original (que mantém a min-height do CSS)
      trilho.innerHTML = '';

      data.forEach(item => {
        // Mapeia os dados do formato Instagram para o nosso objeto local
        const reel = {
          href: item.permalink,
          src: item.thumbnail_url || item.media_url || '',
          alt: item.caption ? item.caption.substring(0, 50) + '...' : 'Instagram Reel',
          badge: item.media_type === 'VIDEO' ? 'REEL' : 'POST',
          duracao: '', // Omitido, pois o Instagram não retorna via Graph API padrão
          legenda: item.caption || ''
        };
        trilho.appendChild(renderCard(reel));
      });
    } catch (error) {
      console.warn('Bastidores: Usando fallback estático devido a erro no fetch.', error);

      // Fallback gracioso para a lista estática (se disponível)
      trilho.innerHTML = '';
      if (typeof DC !== 'undefined' && DC.reels) {
        DC.reels.forEach(reel => trilho.appendChild(renderCard(reel)));
      } else {
        trilho.innerHTML = '<p style="color: rgba(200, 192, 176, 0.45); font-family: var(--fonte-corpo); font-size: 0.8rem; margin: auto;">Não foi possível carregar os bastidores no momento.</p>';
      }
    }
  }

  fetchAndRenderReels();

})();