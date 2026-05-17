/* ═══════════════════════════════════════════════════════
   init.js — Aplicação do config.js no HTML estático
   Atualiza links de WhatsApp, redes sociais e horários
   em todos os lugares onde aparecem, sem tocar no HTML.
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Helpers ── */
  function setHref(selector, href) {
    document.querySelectorAll(selector).forEach(el => { el.href = href; });
  }

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach(el => { el.textContent = text; });
  }

  /* ══════════════════════════════════════════════════════
     1. WhatsApp — todos os links do site
  ══════════════════════════════════════════════════════ */
  setHref('a[href*="wa.me"]', DC.whatsapp);


  /* ══════════════════════════════════════════════════════
     2. Instagram — todos os links do site
  ══════════════════════════════════════════════════════ */
  setHref('a[href*="instagram.com/barbeiro_cortinovis"]', DC.instagram);


  /* ══════════════════════════════════════════════════════
     3. E-mail
  ══════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
    el.href        = `mailto:${DC.email}`;
    el.textContent = DC.email;
  });


  /* ══════════════════════════════════════════════════════
     4. Informações de atendimento (seção CTA + footer)
     Atualiza pelo conteúdo textual dos .cta-info-item__valor
     usando o ícone-pai como âncora de identificação.

     Estratégia: encontra o item pelo label e atualiza o valor.
  ══════════════════════════════════════════════════════ */

  function atualizarInfoItem(labelTexto, novoValorHTML) {
    document.querySelectorAll('.cta-info-item').forEach(item => {
      const label = item.querySelector('.cta-info-item__label');
      if (label?.textContent.trim() === labelTexto) {
        const valor = item.querySelector('.cta-info-item__valor');
        if (valor) valor.innerHTML = novoValorHTML;
      }
    });
  }

  atualizarInfoItem(
    'Horário',
    `${DC.horario.label}<br>${DC.horario.horas}`
  );

  atualizarInfoItem(
    'Local',
    `${DC.local.cidade}<br>${DC.local.estado}`
  );

  atualizarInfoItem(
    'Agendamento',
    DC.agendamento
  );

  atualizarInfoItem(
    'Pagamento',
    DC.pagamento
  );


  /* ══════════════════════════════════════════════════════
     5. Footer — horário e local
  ══════════════════════════════════════════════════════ */

  document.querySelectorAll('.rodape__contato-item').forEach(item => {
    const svg  = item.querySelector('svg');
    const texto = item.querySelector('p');
    if (!svg || !texto) return;

    /* Identifica o item pelo path do ícone (atributo d ou viewBox não é suficiente —
       usamos a posição relativa ao pai como fallback seguro) */
    const link = texto.querySelector('a');

    /* Horário — item que contém "Seg" */
    if (texto.textContent.includes('Seg')) {
      texto.innerHTML = `${DC.horario.label}: ${DC.horario.horas}<br>Dom: ${DC.horario.domingo}`;
    }

    /* Local — item que contém "Patrocínio" ou "MG" */
    if (texto.textContent.includes('Patrocínio') || texto.textContent.includes('MG')) {
      if (!link) { /* não é o link do WhatsApp */
        texto.innerHTML = `${DC.local.cidade}, ${DC.local.estado}<br>Agendar via WhatsApp`;
      }
    }
  });


  /* ══════════════════════════════════════════════════════
     6. Rodapé — descrição com anos de experiência dinâmicos
  ══════════════════════════════════════════════════════ */

  const anoInicio = 2019;
  const anos      = new Date().getFullYear() - anoInicio;

  const descRodape = document.querySelector('.rodape__marca-descricao');
  if (descRodape) {
    descRodape.textContent =
      `${anos} anos elevando a autoestima dos homens de ${DC.local.cidade}. ` +
      `Precisão, presença e respeito pelo estilo de cada cliente.`;
  }

})();