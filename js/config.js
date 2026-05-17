/* ═══════════════════════════════════════════════════════
   config.js — Danilo Cortinovis Barbeiro
   Fonte única de verdade para dados do site.
   Edite aqui; o restante dos módulos lê deste objeto.
═══════════════════════════════════════════════════════ */

const DC = {

  /* ── Contato & Redes ── */
  whatsapp:  'https://wa.me/5534999999999',
  instagram: 'https://www.instagram.com/barbeiro_cortinovis/',
  email:     'contato@danilocortinovis.com.br',

  /* ── Informações de atendimento ── */
  horario:     { label: 'Seg – Sáb', horas: '8h às 20h', domingo: 'Fechado' },
  local:       { cidade: 'Patrocínio', estado: 'Minas Gerais' },
  agendamento: 'Com hora marcada ou encaixe',
  pagamento:   'Pix, cartão ou dinheiro',


  /* ══════════════════════════════════════════════════════
     SERVIÇOS
     campos:
       categoria  — 'Cabelo' | 'Barba' | 'Rosto' | 'Combo'
       nome       — texto exibido na lista e no detalhe
       descricao  — parágrafo no painel direito
       preco      — string  ex: 'R$ 35'
       duracao    — string  ex: '40 min'
       exclusivo  — (opcional) true → exibe badge EXCLUSIVO
       fotos      — { principal, media, pequena }  URLs
  ══════════════════════════════════════════════════════ */
  servicos: [

    /* ── Cabelo ── */
    {
      categoria: 'Cabelo',
      nome:      'Corte',
      descricao: 'Corte clássico executado com tesoura e pente. Estilo atemporal para quem valoriza elegância discreta.',
      preco:     'R$ 35',
      duracao:   '35 min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
      },
    },
    {
      categoria:  'Cabelo',
      nome:       'Selagem',
      descricao:  'Tratamento que sela os fios, eliminando o frizz e devolvendo brilho e maciez ao cabelo.',
      preco:      'R$ 120',
      duracao:    '1h 30min',
      exclusivo:  true,
      fotos: {
        principal: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80',
      },
    },
    {
      categoria:  'Cabelo',
      nome:       'Relaxamento',
      descricao:  'Amolecimento controlado dos fios para quem deseja reduzir o volume com naturalidade.',
      preco:      'R$ 100',
      duracao:    '1h 20min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      },
    },
    {
      categoria: 'Cabelo',
      nome:      'Luzes',
      descricao: 'Mechas naturais para dar movimento e sofisticação ao cabelo. Resultado discreto e elegante.',
      preco:     'R$ 100',
      duracao:   '1h 30min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      },
    },
    {
      categoria: 'Cabelo',
      nome:      'Platinado',
      descricao: 'Descoloração controlada para o platinado perfeito. Inclui tratamento e finalização.',
      preco:     'R$ 150',
      duracao:   '2h',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80',
      },
    },
    {
      categoria: 'Cabelo',
      nome:      'Hidratação',
      descricao: 'Máscara de hidratação profunda que restaura a elasticidade e o brilho natural dos fios.',
      preco:     'R$ 60',
      duracao:   '40 min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
      },
    },

    /* ── Barba ── */
    {
      categoria: 'Barba',
      nome:      'Barba no Aço',
      descricao: 'Acabamento preciso com navalha, toalha quente e hidratação. Define cada contorno com maestria.',
      preco:     'R$ 45',
      duracao:   '30 min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      },
    },
    {
      categoria: 'Barba',
      nome:      'Barba Modelada',
      descricao: 'Aparagem e modelagem completa para quem usa barba grande. Inclui hidratação e finalização.',
      preco:     'R$ 40',
      duracao:   '25 min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80',
      },
    },
    {
      categoria: 'Barba',
      nome:      'Degradê Americano',
      descricao: 'Transição suave do zero ao comprimento desejado, com acabamento preciso na navalha.',
      preco:     'R$ 35',
      duracao:   '40 min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
      },
    },

    /* ── Rosto ── */
    {
      categoria:  'Rosto',
      nome:       'Limpeza de Pele',
      descricao:  'Limpeza profunda com extração, tonificação e hidratação. Pele renovada e saudável.',
      preco:      'R$ 80',
      duracao:    '1h',
      exclusivo:  true,
      fotos: {
        principal: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      },
    },
    {
      categoria: 'Rosto',
      nome:      'Design de Sobrancelha',
      descricao: 'Modelagem e definição das sobrancelhas com pinça e navalha para um visual mais marcante.',
      preco:     'R$ 30',
      duracao:   '20 min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80',
      },
    },

    /* ── Combo ── */
    {
      categoria: 'Combo',
      nome:      'Corte + Barba',
      descricao: 'O melhor dos dois mundos: corte impecável e barba no aço no mesmo atendimento.',
      preco:     'R$ 70',
      duracao:   '1h 10min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80',
      },
    },
    {
      categoria:  'Combo',
      nome:       'Corte + Barba + Sobrancelha',
      descricao:  'Pacote completo: corte, barba na navalha e design de sobrancelha. Saída impecável.',
      preco:      'R$ 90',
      duracao:    '1h 30min',
      exclusivo:  true,
      fotos: {
        principal: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
      },
    },
    {
      categoria: 'Combo',
      nome:      'Platinado + Corte',
      descricao: 'Descoloração com acabamento de corte incluso. Transformação completa em um atendimento.',
      preco:     'R$ 175',
      duracao:   '2h 30min',
      fotos: {
        principal: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=85',
        media:     'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80',
        pequena:   'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      },
    },
  ],


  /* ══════════════════════════════════════════════════════
     DEPOIMENTOS
  ══════════════════════════════════════════════════════ */
  depoimentos: [
    {
      nome:     'Marcos Silva',
      iniciais: 'MS',
      servico:  'Combo Corte + Barba',
      texto:    'Fiquei muito satisfeito! Atendimento de qualidade, muito capricho nos detalhes e o resultado ficou exatamente como eu queria.',
      estrelas: 5,
      foto: {
        src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1400&q=90',
        alt: 'Resultado do combo corte e barba — Marcos Silva',
      },
    },
    {
      nome:     'Rafael Ferreira',
      iniciais: 'RF',
      servico:  'Barba no Aço',
      texto:    'Lugar top, profissional impecável. Nunca tinha saído tão satisfeito de uma barbearia. Já virei cliente fiel.',
      estrelas: 5,
      foto: {
        src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1400&q=90',
        alt: 'Resultado da barba modelada — Rafael Ferreira',
      },
    },
    {
      nome:     'Lucas Costa',
      iniciais: 'LC',
      servico:  'Degradê Americano',
      texto:    'O Danilo entende exatamente o que você quer mesmo sem você saber explicar direito. O resultado sempre supera a expectativa.',
      estrelas: 5,
      foto: {
        src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=90',
        alt: 'Resultado do degradê americano — Lucas Costa',
      },
    },
  ],


  /* ══════════════════════════════════════════════════════
     REELS / BASTIDORES
  ══════════════════════════════════════════════════════ */
  reels: [
    {
      src:     'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80',
      alt:     'Degradê americano sendo executado',
      badge:   'Reel',
      duracao: '0:58',
      legenda: 'Degradê em 60 segundos',
      href:    'https://www.instagram.com/barbeiro_cortinovis/',
    },
    {
      src:     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      alt:     'Passeio de moto no fim de semana',
      badge:   'Estilo',
      duracao: '1:12',
      legenda: 'Fim de semana em estrada',
      href:    'https://www.instagram.com/barbeiro_cortinovis/',
    },
    {
      src:     'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80',
      alt:     'Barba sendo feita com navalha',
      badge:   'Reel',
      duracao: '0:45',
      legenda: 'Navalha e precisão',
      href:    'https://www.instagram.com/barbeiro_cortinovis/',
    },
    {
      src:     'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80',
      alt:     'Um dia completo na barbearia',
      badge:   'Vlog',
      duracao: '2:30',
      legenda: 'Um dia na cadeira',
      href:    'https://www.instagram.com/barbeiro_cortinovis/',
    },
    {
      src:     'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80',
      alt:     'Barba modelada com resultado incrível',
      badge:   'Reel',
      duracao: '0:52',
      legenda: 'Barba do zero',
      href:    'https://www.instagram.com/barbeiro_cortinovis/',
    },
    {
      src:     'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80',
      alt:     'Processo do platinado masculino',
      badge:   'Reel',
      duracao: '1:05',
      legenda: 'Platinado passo a passo',
      href:    'https://www.instagram.com/barbeiro_cortinovis/',
    },
  ],


  /* ══════════════════════════════════════════════════════
     TRANSFORMAÇÕES — ANTES & DEPOIS
  ══════════════════════════════════════════════════════ */
  transformacoes: [
    {
      servico: 'Degradê Americano',
      preco:   'R$ 35',
      antes: {
        src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85',
        alt: 'Antes: cabelo sem corte',
      },
      depois: {
        src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=85',
        alt: 'Depois: degradê americano finalizado',
      },
    },
    {
      servico: 'Barba no Aço',
      preco:   'R$ 45',
      antes: {
        src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=85',
        alt: 'Antes: barba sem tratamento',
      },
      depois: {
        src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=85',
        alt: 'Depois: barba modelada na navalha',
      },
    },
    {
      servico: 'Platinado',
      preco:   'R$ 150',
      antes: {
        src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85',
        alt: 'Antes: cabelo natural',
      },
      depois: {
        src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=85',
        alt: 'Depois: cabelo platinado',
      },
    },
  ],

};