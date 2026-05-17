/* ═══════════════════════════════════════════════════════
   navbar.js — Danilo Cortinovis Barbeiro
   ─────────────────────────────────────────────────────
   AJUSTES NECESSÁRIOS NO HTML (mínimos):
   1. Remover id="agendar" do <section class="depoimento">
      → manter apenas no <section class="cta-agendar">
   2. Adicionar id="instagram" à <div class="bastidores">
   3. (Opcional) Adicionar id="transformacao" à <section class="transformacao">
   4. (Opcional) Adicionar id="manifesto"    à <section class="manifesto">
   ─────────────────────────────────────────────────────
   Módulos:
   1. Navbar — oculta ao descer; aparece ao subir (após metade do herói); compacta depois
   2. Hamburger / Drawer mobile
   3. Scroll-spy — destaca link ativo em TODOS os links (navbar + footer)
   4. Smooth scroll — todas as âncoras internas, incluindo footer
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────────────────────
     Referências globais
  ──────────────────────────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const drawer      = document.getElementById('drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!navbar || !hamburger || !drawer) {
    console.warn('navbar.js: elementos essenciais não encontrados.');
    return;
  }


  /* ══════════════════════════════════════════════════════
     1. NAVBAR SCROLL
        Aparece após 50% da altura do herói.
        Fica compacta 40px depois do trigger.
  ══════════════════════════════════════════════════════ */

  function calcTriggerY() {
    const heroi = document.querySelector('.heroi');
    if (!heroi) return window.innerHeight * 0.5;
    return heroi.offsetTop + heroi.offsetHeight * 0.5;
  }

  let triggerY = calcTriggerY();
  let lastScrollY = window.scrollY || window.pageYOffset;
  const DIRECTION_DELTA = 6;

  function updateNavbarVisibility() {
    // === FASE DE LEITURA (READ) ===
    const scrollY = window.scrollY || window.pageYOffset;
    const drawerAberto = drawer.classList.contains('navbar__drawer--aberto');
    const isCurrentlyVisible = navbar.classList.contains('navbar--visivel');

    // === LÓGICA ===
    let visivel = false;
    if (drawerAberto) {
      visivel = true;
    } else {
      const isAboveTrigger = scrollY < triggerY;
      const delta = scrollY - lastScrollY;

      if (isAboveTrigger) {
        visivel = false;
      } else if (delta < -DIRECTION_DELTA) {
        visivel = true;
      } else if (delta > DIRECTION_DELTA) {
        visivel = false;
      } else {
        visivel = isCurrentlyVisible;
      }
    }
    
    const isCompact = scrollY > triggerY + 40;

    // === FASE DE ESCRITA (WRITE) ===
    navbar.classList.toggle('navbar--visivel', visivel);
    navbar.classList.toggle('navbar--oculta', !visivel);
    navbar.classList.toggle('navbar--compacta', isCompact);
    
    lastScrollY = scrollY;
  }

  /* Estado inicial */
  navbar.classList.add('navbar--oculta');

  let navTicking = false;
  function onNavScroll() {
    if (!navTicking) {
      window.requestAnimationFrame(() => {
        updateNavbarVisibility();
        navTicking = false;
      });
      navTicking = true;
    }
  }

  window.addEventListener('scroll', onNavScroll, { passive: true });

  window.addEventListener('resize', () => {
    triggerY = calcTriggerY();
    onNavScroll();
  }, { passive: true });

  updateNavbarVisibility();


  /* ══════════════════════════════════════════════════════
     2. HAMBURGER / DRAWER MOBILE
  ══════════════════════════════════════════════════════ */

  function openDrawer() {
    drawer.classList.add('navbar__drawer--aberto');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('navbar__hamburger--ativo');
    document.body.style.overflow = 'hidden';
    updateNavbarVisibility();
  }

  function closeDrawer() {
    drawer.classList.remove('navbar__drawer--aberto');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('navbar__hamburger--ativo');
    document.body.style.overflow = '';
    updateNavbarVisibility();
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('navbar__drawer--aberto') ? closeDrawer() : openDrawer();
  });

  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  document.addEventListener('click', (e) => {
    if (
      drawer.classList.contains('navbar__drawer--aberto') &&
      !drawer.contains(e.target) &&
      !hamburger.contains(e.target)
    ) closeDrawer();
  });


  /* ══════════════════════════════════════════════════════
     3. SCROLL-SPY
        Observa todas as seções e destaca o link
        correspondente em QUALQUER lugar da página
        (navbar desktop, navbar drawer, footer).

        Mapa: id-da-seção → âncoras que ele representa.
        Seções decorativas (manifesto, transformacao) ficam
        com anchors vazio e não alteram o estado ativo.
  ══════════════════════════════════════════════════════ */

  const MAPA_SECOES = [
    { id: 'sobre',         anchors: ['#sobre']     },
    { id: 'instagram',     anchors: ['#instagram'] }, /* <div class="bastidores" id="instagram"> */
    { id: 'servicos',      anchors: ['#servicos']  },
    { id: 'transformacao', anchors: []             }, /* sem link na nav — observado silenciosamente */
    { id: 'manifesto',     anchors: []             }, /* idem */
    { id: 'agendar',       anchors: ['#agendar']   }, /* apenas .cta-agendar deve ter esse id */
    { id: 'contato',       anchors: ['#contato']   }, /* footer */
  ];

  /* Todos os links de âncora da página: navbar, drawer e footer */
  const todosOsLinks = document.querySelectorAll([
    '.navbar__nav a[href^="#"]',
    '.navbar__drawer-nav a[href^="#"]',
    '.rodape__lista a[href^="#"]',
    '.rodape__base-links a[href^="#"]',
  ].join(', '));

  function clearLinksAtivos() {
    todosOsLinks.forEach(link => link.classList.remove('navbar__link--ativo'));
  }

  function setLinkAtivo(anchorHref) {
    todosOsLinks.forEach(link => {
      if (link.getAttribute('href') === anchorHref) {
        link.classList.add('navbar__link--ativo');
      }
    });
  }

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const secao = MAPA_SECOES.find(s => s.id === entry.target.id);
      if (!secao || secao.anchors.length === 0) return;

      clearLinksAtivos();
      secao.anchors.forEach(anchor => setLinkAtivo(anchor));
    });
  }, {
    root: null,
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0,
  });

  MAPA_SECOES.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) {
      spyObserver.observe(el);
    } else {
      console.info(`navbar.js scroll-spy: #${id} não encontrado. Adicione o id à seção correspondente no HTML.`);
    }
  });


  /* ══════════════════════════════════════════════════════
     4. SMOOTH SCROLL
        Cobre TODOS os links de âncora da página:
        navbar, drawer, footer, CTAs, botões de seção.
        Desconta a altura da navbar quando ela está visível.
  ══════════════════════════════════════════════════════ */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const destino = document.querySelector(href);
      if (!destino) return;

      e.preventDefault();

      closeDrawer();

      const navbarAltura = navbar.classList.contains('navbar--visivel')
        ? navbar.offsetHeight
        : 0;

      const topo =
        destino.getBoundingClientRect().top +
        (window.scrollY || window.pageYOffset) -
        navbarAltura -
        8;

      window.scrollTo({ top: topo, behavior: 'smooth' });
    });
  });


})();