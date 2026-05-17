/* ═══════════════════════════════════════════════════════
   depoimentos.js — Carousel de depoimentos
   Renderiza os slides a partir de DC.depoimentos,
   depois inicializa: navegação, auto-play, lightbox,
   contador e foto de fundo.
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Referências DOM ── */
  const track       = document.getElementById('depTrack');
  const dotsWrap    = document.getElementById('depDots');
  const btnPrev     = document.getElementById('depPrev');
  const btnNext     = document.getElementById('depNext');
  const fotoBg      = document.getElementById('depFotoBg');
  const contadorNum = document.getElementById('depContadorNum');
  const contadorTot = document.getElementById('depContadorTotal');
  const expandirBtn = document.getElementById('depExpandir');

  /* Lightbox */
  const lightbox    = document.getElementById('depLightbox');
  const lbImg       = document.getElementById('depLbImg');
  const lbNome      = document.getElementById('depLbNome');
  const lbServico   = document.getElementById('depLbServico');
  const lbFechar    = document.getElementById('depLbFechar');
  const lbFundo     = document.getElementById('depLbFundo');
  const lbPrev      = document.getElementById('depLbPrev');
  const lbNext      = document.getElementById('depLbNext');

  if (!track) return;

  const dados = DC.depoimentos;
  const total  = dados.length;

  /* ══════════════════════════════════════════════════════
     1. RENDER DOS SLIDES
  ══════════════════════════════════════════════════════ */

  function renderEstrelas(n) {
    const svgPath = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
    return Array.from({ length: n }, () =>
      `<svg class="dep-estrela" viewBox="0 0 24 24" aria-hidden="true"><path d="${svgPath}"/></svg>`
    ).join('');
  }

  function renderSlides() {
    track.innerHTML = '';

    dados.forEach((d, i) => {
      const slide = document.createElement('div');
      slide.className = 'dep-slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', `Depoimento ${i + 1} de ${total}`);

      /* data-* preservados para o lightbox e foto de fundo */
      slide.dataset.fotoSrc  = d.foto.src;
      slide.dataset.fotoAlt  = d.foto.alt;
      slide.dataset.nome     = d.nome;
      slide.dataset.servico  = d.servico;

      slide.innerHTML = `
        <blockquote class="dep-quote">
          <p>"${d.texto}"</p>
        </blockquote>
        <div class="dep-slide__rodape">
          <div class="dep-autor">
            <div class="dep-autor__avatar">${d.iniciais}</div>
            <div class="dep-autor__info">
              <p class="dep-autor__nome">${d.nome}</p>
              <p class="dep-autor__servico">${d.servico}</p>
              <div class="dep-estrelas" role="img" aria-label="${d.estrelas} estrelas">
                ${renderEstrelas(d.estrelas)}
              </div>
            </div>
          </div>
        </div>
      `;

      track.appendChild(slide);
    });
  }

  renderSlides();

  /* ── Referências aos slides (após render) ── */
  const slides = () => track.querySelectorAll('.dep-slide');


  /* ══════════════════════════════════════════════════════
     2. DOTS
  ══════════════════════════════════════════════════════ */

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';

    dados.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'dep-dot';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `Depoimento ${i + 1}`);
      btn.addEventListener('click', () => irPara(i));
      dotsWrap.appendChild(btn);
    });
  }

  renderDots();


  /* ══════════════════════════════════════════════════════
     3. NAVEGAÇÃO DO CAROUSEL
  ══════════════════════════════════════════════════════ */

  let ativo = 0;
  let autoPlayId = null;

  function irPara(idx) {
    ativo = (idx + total) % total;
    atualizarUI();
  }

  function atualizarUI() {
    const slideEls = slides();
    const dotEls   = dotsWrap?.querySelectorAll('.dep-dot') ?? [];
    const d        = dados[ativo];

    /* Track position */
    track.style.transform = `translateX(-${ativo * 100}%)`;

    /* Foto de fundo */
    if (fotoBg) {
      fotoBg.src = d.foto.src;
      fotoBg.alt = d.foto.alt;
    }

    /* Contador */
    if (contadorNum) contadorNum.textContent = String(ativo + 1).padStart(2, '0');
    if (contadorTot) contadorTot.textContent = `— / ${String(total).padStart(2, '0')}`;

    /* Aria + dots */
    slideEls.forEach((s, i) => s.setAttribute('aria-hidden', i !== ativo ? 'true' : 'false'));
    dotEls.forEach((dot, i) => {
      dot.classList.toggle('ativo', i === ativo);
      dot.setAttribute('aria-selected', i === ativo ? 'true' : 'false');
    });
  }

  btnPrev?.addEventListener('click', () => { pararAutoPlay(); irPara(ativo - 1); });
  btnNext?.addEventListener('click', () => { pararAutoPlay(); irPara(ativo + 1); });

  /* Swipe touch */
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    pararAutoPlay();
    irPara(ativo + (dx < 0 ? 1 : -1));
  });

  /* Auto-play */
  function iniciarAutoPlay() {
    autoPlayId = setInterval(() => irPara(ativo + 1), 6000);
  }
  function pararAutoPlay() {
    clearInterval(autoPlayId);
  }

  /* Pausa ao hover */
  track.closest('.depoimento')?.addEventListener('mouseenter', pararAutoPlay);
  track.closest('.depoimento')?.addEventListener('mouseleave', iniciarAutoPlay);


  /* ══════════════════════════════════════════════════════
     4. LIGHTBOX
  ══════════════════════════════════════════════════════ */

  function abrirLightbox(idx) {
    if (!lightbox) return;
    const d = dados[idx];
    if (lbImg) {
      lbImg.src = d.foto.src;
      lbImg.alt = d.foto.alt;
    }
    if (lbNome) lbNome.textContent = d.nome;
    if (lbServico) lbServico.textContent = d.servico;

    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('ativo', 'dep-lightbox--aberto');
    document.body.style.overflow = 'hidden';
    lbFechar?.focus();
  }

  function fecharLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.classList.remove('ativo', 'dep-lightbox--aberto');
    document.body.style.overflow = '';
  }

  expandirBtn?.addEventListener('click', () => abrirLightbox(ativo));
  lbFechar?.addEventListener('click', fecharLightbox);
  lbFundo?.addEventListener('click', fecharLightbox);

  lbPrev?.addEventListener('click', () => {
    irPara(ativo - 1);
    abrirLightbox(ativo);
  });
  lbNext?.addEventListener('click', () => {
    irPara(ativo + 1);
    abrirLightbox(ativo);
  });

  document.addEventListener('keydown', e => {
    if (
      !lightbox?.classList.contains('ativo') &&
      !lightbox?.classList.contains('dep-lightbox--aberto')
    ) return;
    if (e.key === 'Escape')      fecharLightbox();
    if (e.key === 'ArrowLeft')   { irPara(ativo - 1); abrirLightbox(ativo); }
    if (e.key === 'ArrowRight')  { irPara(ativo + 1); abrirLightbox(ativo); }
  });


  /* ── Init ── */
  atualizarUI();
  iniciarAutoPlay();

})();