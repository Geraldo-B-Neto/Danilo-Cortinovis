/* ═══════════════════════════════════════════
   BARBEARIA — barbearia.js (CTA DINÂMICO + PREVIEW HOVER)
═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ════════════════════════════════════════
     DADOS — categorias e serviços
     badge: 'exclusivo' | 'novo' | null
     fotos: [principal, media, pequena]
             (null = imagem some)
  ════════════════════════════════════════ */
  var CATEGORIAS = [
    {
      id: 'cabelo',
      nome: 'Cabelo',
      servicos: [
        {
          nome: 'Corte',
          preco: 'R$ 35',
          duracao: '30 min',
          descricao: 'Corte personalizado com tesoura ou máquina, moldado ao estilo e ao formato do rosto.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85',
            'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80',
            'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80'
          ]
        },
        {
          nome: 'Selagem',
          preco: 'R$ 80',
          duracao: '60 min',
          descricao: 'Tratamento que sela os fios, eliminando frizz e devolvendo brilho e maciez ao cabelo.',
          badge: 'exclusivo',
          fotos: [
            'https://images.unsplash.com/photo-1560869713-bf676ead9c1a?w=1200&q=85',
            null,
            null
          ]
        },
        {
          nome: 'Relaxamento',
          preco: 'R$ 70',
          duracao: '50 min',
          descricao: 'Reduz o volume e amolece os fios para cabelos mais fáceis de modelar no dia a dia.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1560869713-bf676ead9c1a?w=1200&q=85',
            null,
            null
          ]
        },
        {
          nome: 'Luzes',
          preco: 'R$ 120',
          duracao: '90 min',
          descricao: 'Mechas naturais ou contrastantes que adicionam dimensão e movimento ao corte.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=85',
            null,
            null
          ]
        },
        {
          nome: 'Platinado',
          preco: 'R$ 150',
          duracao: '120 min',
          descricao: 'Descoloração completa para o loiro mais claro, com tratamento de hidratação incluso.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1200&q=85',
            'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80',
            null
          ]
        },
        {
          nome: 'Hidratação',
          preco: 'R$ 45',
          duracao: '30 min',
          descricao: 'Máscara de nutrição profunda para cabelos ressecados ou danificados por processos químicos.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1560869713-bf676ead9c1a?w=1200&q=85',
            null,
            null
          ]
        }
      ]
    },
    {
      id: 'barba',
      nome: 'Barba',
      servicos: [
        {
          nome: 'Barba',
          preco: 'R$ 45',
          duracao: '30 min',
          descricao: 'Acabamento preciso com navalha, definindo cada detalhe do estilo e contorno do rosto.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&q=85',
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80'
          ]
        },
        {
          nome: 'Depilação Nariz',
          preco: 'R$ 15',
          duracao: '10 min',
          descricao: 'Remoção de pelos nasais com linha ou cera, rápida e sem desconforto excessivo.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&q=85',
            null,
            null
          ]
        },
        {
          nome: 'Pigmentação',
          preco: 'R$ 60',
          duracao: '40 min',
          descricao: 'Preenchimento de falhas e uniformização da cor da barba para um visual mais denso e definido.',
          badge: 'exclusivo',
          fotos: [
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&q=85',
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
            null
          ]
        }
      ]
    },
    {
      id: 'rosto',
      nome: 'Rosto',
      servicos: [
        {
          nome: 'Sobrancelha',
          preco: 'R$ 20',
          duracao: '15 min',
          descricao: 'Design e alinhamento das sobrancelhas para complementar o corte e realçar o olhar.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=85',
            null,
            null
          ]
        },
        {
          nome: 'Limpeza de Pele',
          preco: 'R$ 55',
          duracao: '40 min',
          descricao: 'Higienização profunda com vapor e extração, preparando a pele para o dia a dia.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&q=85',
            null,
            null
          ]
        },
        {
          nome: 'Cone Hindu',
          preco: 'R$ 40',
          duracao: '30 min',
          descricao: 'Técnica milenar de auriculoterapia com cone de incenso, aliviando tensão e limpando os ouvidos.',
          badge: 'exclusivo',
          fotos: [
            'https://images.unsplash.com/photo-1560869713-bf676ead9c1a?w=1200&q=85',
            null,
            null
          ]
        }
      ]
    },
    {
      id: 'combo',
      nome: 'Combo',
      servicos: [
        {
          nome: 'Corte + Barba',
          preco: 'R$ 70',
          duracao: '55 min',
          descricao: 'O combo completo: corte personalizado e barba na navalha com acabamento impecável.',
          badge: null,
          fotos: [
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85',
            'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80',
            'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80'
          ]
        }
      ]
    }
  ];

  /* ── Elementos ── */
  var tabsEl    = document.getElementById('servicos-tabs');
  var listaEl   = document.getElementById('servicos-lista');
  var nomeEl    = document.getElementById('servico-nome');
  var descEl    = document.getElementById('servico-descricao');
  var precoEl   = document.getElementById('servico-preco');
  var duracaoEl = document.getElementById('servico-duracao');
  var linhaEl   = document.getElementById('servico-linha');
  var detalheEl = document.getElementById('servico-detalhe');
  var fotoPrinEl = document.getElementById('servico-foto-principal');
  var fotoMedEl  = document.getElementById('servico-foto-media');
  var fotoPeqEl  = document.getElementById('servico-foto-pequena');
  
  // ➕ CTA
  var ctaEl     = document.getElementById('servicos-cta');
  var ctaBtnEl  = document.getElementById('cta-btn');

  if (!tabsEl || !listaEl || !ctaEl) return;

  /* ── VARIÁVEIS DE CONTROLE ── */
  var catAtiva     = 0;
  var servicoAtivo = 0;
  var emTransicao  = false;
  var previewAtivo = false;
  var previewTimer = null;
  var TRANSICAO    = 400;
  var lastIsMobile = window.innerWidth < 768;


  /* ── Criar tabs ── */
  CATEGORIAS.forEach(function (cat, ci) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'servicos__tab' + (ci === 0 ? ' ativa' : '');
    btn.textContent = cat.nome;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', ci === 0 ? 'true' : 'false');
    btn.setAttribute('aria-controls', 'servicos-lista');
    btn.addEventListener('click', function () {
      if (ci === catAtiva) return;
      mudarCategoria(ci);
    });
    tabsEl.appendChild(btn);
  });

  /* ── Mudar categoria ── */
  function mudarCategoria(ci) {
    catAtiva = ci;
    servicoAtivo = 0;
    previewAtivo = false;

    /* Atualiza tabs */
    Array.from(tabsEl.querySelectorAll('.servicos__tab')).forEach(function (t, i) {
      t.classList.toggle('ativa', i === ci);
      t.setAttribute('aria-selected', i === ci ? 'true' : 'false');
    });

    /* Renderiza lista */
    renderizarLista();

    /* Ativa primeiro serviço + CTA */
    var primeiroServico = CATEGORIAS[ci].servicos[0];
    ativarCTA(primeiroServico.nome);
    atualizarDetalhe(primeiroServico);
  }

  /* ── Renderizar lista (COM CTA + PREVIEW HOVER) ── */
  function renderizarLista() {
    listaEl.innerHTML = '';
    var servicos = CATEGORIAS[catAtiva].servicos;
    var isMobile = window.innerWidth < 768;


    servicos.forEach(function (s, si) {
      if (isMobile) {
        // Layout Accordion para Mobile
        var details = document.createElement('details');
        details.className = 'servico-accordion';
        if (si === servicoAtivo) details.open = true;

        var summary = document.createElement('summary');
        summary.className = 'servico-accordion__summary';
        
        var nome = document.createElement('span');
        nome.className = 'servico-item__nome';
        nome.textContent = s.nome;
        summary.appendChild(nome);

        if (s.badge) {
          var badge = document.createElement('span');
          badge.className = 'servico-item__badge servico-item__badge--' + s.badge;
          badge.textContent = s.badge === 'exclusivo' ? 'Exclusivo' : 'Novo';
          summary.appendChild(badge);
        }

        var content = document.createElement('div');
        content.className = 'servico-accordion__content';

        var desc = document.createElement('p');
        desc.className = 'servico-accordion__desc';
        desc.textContent = s.descricao;
        content.appendChild(desc);

        var meta = document.createElement('div');
        meta.className = 'servico-accordion__meta';
        meta.innerHTML = `<span>${s.preco}</span> • <span>${s.duracao}</span>`;
        content.appendChild(meta);

        // Imagem única no mobile dentro do accordion
        if (s.fotos && s.fotos[0]) {
          var img = document.createElement('img');
          img.className = 'servico-accordion__img';
          img.src = s.fotos[0];
          img.alt = s.nome;
          content.appendChild(img);
        }

        var btn = document.createElement('button');
        btn.className = 'servicos__cta-btn';
        btn.textContent = `Agendar ${s.nome}`;
        btn.onclick = function() {
          var msg = encodeURIComponent(`Olá! Gostaria de agendar: ${s.nome}`);
          window.open(`https://wa.me/5511999999999?text=${msg}`, '_blank');
        };
        content.appendChild(btn);

        details.appendChild(summary);
        details.appendChild(content);

        // Lógica para fechar outros accordions ao abrir um novo
        details.addEventListener('toggle', function() {
          if (details.open) {
            servicoAtivo = si;
            Array.from(listaEl.querySelectorAll('details')).forEach(function(d) {
              if (d !== details) d.open = false;
            });
          }
        });

        listaEl.appendChild(details);

      } else {
        // Layout Original para Desktop
        var li = document.createElement('li');
        li.className = 'servico-item' + (si === servicoAtivo ? ' ativo' : '');
        li.setAttribute('role', 'option');
        li.setAttribute('aria-selected', si === servicoAtivo ? 'true' : 'false');
        li.setAttribute('tabindex', '0');
        li.dataset.servicoIndex = si;

        var nomeLi = document.createElement('span');
        nomeLi.className = 'servico-item__nome';
        nomeLi.textContent = s.nome;
        li.appendChild(nomeLi);

        if (s.badge) {
          var badgeLi = document.createElement('span');
          badgeLi.className = 'servico-item__badge servico-item__badge--' + s.badge;
          badgeLi.textContent = s.badge === 'exclusivo' ? 'Exclusivo' : 'Novo';
          li.appendChild(badgeLi);
        }

        li.addEventListener('click', function () {
          if (si === servicoAtivo) return;
          servicoAtivo = si;
          previewAtivo = false;
          
          Array.from(listaEl.querySelectorAll('.servico-item')).forEach(function (item, i) {
            item.classList.toggle('ativo', i === si);
            item.setAttribute('aria-selected', i === si ? 'true' : 'false');
          });
          
          ativarCTA(s.nome);
          atualizarDetalhe(s);
        });

        li.addEventListener('mouseenter', function() {
          if (emTransicao || si === servicoAtivo) return;
          previewAtivo = true;
          clearTimeout(previewTimer);
          var servico = CATEGORIAS[catAtiva].servicos[si];
          previewServico(servico);
        });

        li.addEventListener('mouseleave', function() {
          if (si === servicoAtivo) return;
          previewAtivo = false;
          previewTimer = setTimeout(function() {
            if (!previewAtivo) restaurarAtivo();
          }, 200);
        });

        li.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            li.click();
          }
        });

        listaEl.appendChild(li);
      }
    });
  }

  /* ➕ CTA DINÂMICO */
  function ativarCTA(nomeServico) {
    if (!ctaEl || !ctaBtnEl) return;
    
    var textoCTA = `Agendar ${nomeServico}`;
    
    ctaEl.classList.remove('servicos__cta--inativo');
    ctaBtnEl.disabled = false;
    ctaBtnEl.textContent = textoCTA;
    ctaBtnEl.setAttribute('data-text', textoCTA);
    
    // 🔗 WhatsApp com nome do serviço (personalize o número)
    ctaBtnEl.onclick = function() {
      var msg = encodeURIComponent(`Olá! Gostaria de agendar: ${nomeServico}`);
      window.open(`https://wa.me/5511999999999?text=${msg}`, '_blank');
    };
  }

  /* ➕ Desativar CTA */
  function desativarCTA() {
    if (!ctaEl || !ctaBtnEl) return;
    
    ctaEl.classList.add('servicos__cta--inativo');
    ctaBtnEl.disabled = true;
    ctaBtnEl.textContent = 'Selecione um serviço';
    ctaBtnEl.setAttribute('data-text', 'Selecione um serviço');
    ctaBtnEl.onclick = null;
  }

  /* 🎬 PREVIEW HOVER - SEM alterar CTA */
  function previewServico(servico) {
    if (emTransicao) return;
    
    // Remove transições para fluidez máxima
    if (detalheEl) detalheEl.classList.remove('trocando');
    var fotos = [fotoPrinEl, fotoMedEl, fotoPeqEl];
    fotos.forEach(function(f) { 
      if (f) f.classList.remove('saindo', 'trocando'); 
    });
    
    // Preview SÓ das infos (CTA permanece inativo)
    if (nomeEl)    nomeEl.textContent = servico.nome;
    if (descEl)    descEl.textContent = servico.descricao;
    if (precoEl)   precoEl.textContent = servico.preco;
    if (duracaoEl) duracaoEl.textContent = servico.duracao;
    
    var srcs = servico.fotos || [];
    if (fotoPrinEl) fotoPrinEl.src = srcs[0] || '';
    if (fotoMedEl)  fotoMedEl.src  = srcs[1] || '';
    if (fotoPeqEl)  fotoPeqEl.src  = srcs[2] || '';
  }

  /* 🎬 RESTAURAR ATIVO */
  function restaurarAtivo() {
    if (previewAtivo || emTransicao) return;
    var servico = CATEGORIAS[catAtiva].servicos[servicoAtivo];
    atualizarDetalhe(servico);
  }

  /* ── Atualizar detalhe (ANIMAÇÃO COMPLETA) ── */
  function atualizarDetalhe(servico) {
    if (emTransicao) return;
    emTransicao = true;

    if (detalheEl) detalheEl.classList.add('trocando');
    if (linhaEl) linhaEl.classList.remove('visivel');

    var fotos = [fotoPrinEl, fotoMedEl, fotoPeqEl];
    fotos.forEach(function (f) {
      if (f) f.classList.add('saindo');
    });

    setTimeout(function () {
      if (nomeEl)    nomeEl.textContent    = servico.nome;
      if (descEl)    descEl.textContent    = servico.descricao;
      if (precoEl)   precoEl.textContent   = servico.preco;
      if (duracaoEl) duracaoEl.textContent = servico.duracao;

      var srcs = servico.fotos || [];
      if (fotoPrinEl) {
        fotoPrinEl.src = srcs[0] || '';
        fotoPrinEl.classList.remove('saindo');
      }
      if (fotoMedEl) {
        fotoMedEl.src = srcs[1] || '';
        fotoMedEl.classList.remove('saindo');
      }
      if (fotoPeqEl) {
        fotoPeqEl.src = srcs[2] || '';
        fotoPeqEl.classList.remove('saindo');
      }

      if (detalheEl) detalheEl.classList.remove('trocando');

      setTimeout(function () {
        if (linhaEl) linhaEl.classList.add('visivel');
      }, 80);

      emTransicao = false;
    }, TRANSICAO);
  }

  /* ── Init ── */
  renderizarLista();
  desativarCTA(); // Estado inicial
  
  // Ativa primeiro serviço + CTA
  setTimeout(function() {
    var primeiroServico = CATEGORIAS[0].servicos[0];
    servicoAtivo = 0;
    ativarCTA(primeiroServico.nome);
    atualizarDetalhe(primeiroServico);
    
    if (linhaEl) linhaEl.classList.add('visivel');
  }, 300);

  /* ── Resize Listener ── */
  window.addEventListener('resize', function () {
    var isMobile = window.innerWidth < 768;
    if (isMobile !== lastIsMobile) {
      lastIsMobile = isMobile;
      renderizarLista();
      
      // Se voltarmos para desktop, precisamos garantir que o detalhe reflita o servicoAtivo
      if (!isMobile) {
        var servico = CATEGORIAS[catAtiva].servicos[servicoAtivo];
        atualizarDetalhe(servico);
        ativarCTA(servico.nome);
      }
    }
  });

})();