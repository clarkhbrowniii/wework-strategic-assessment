(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const labels = ['Opening', 'Frameworks 1–2', 'Frameworks 3–4', 'Frameworks 5–6', 'Frameworks 7–8', 'Strategic verdict'];
  const track = $('track');
  window.presentationContent.forEach((pair, index) => {
    const panel = document.createElement('section');
    panel.className = 'panel';
    panel.setAttribute('aria-label', labels[index + 1]);
    panel.innerHTML = `<header class="panel-heading"><div><p class="eyebrow">THE STRATEGIC ASSESSMENT</p><h2>${pair.title}</h2></div><img class="wordmark" src="assets/wordmark.png" alt="WeWork"></header><div class="cards">${pair.cards.map((card, j) => `<article class="card"><div class="card-heading"><span class="number">${String(index * 2 + j + 1).padStart(2, '0')}</span><h3>${card.name}</h3></div><h4>${card.verdict}</h4><p class="explanation">${card.explanation}</p><div class="evidence"><p class="eyebrow">EVIDENCE</p><strong>${card.metric}</strong><p>${card.evidence}</p>${card.note ? `<small>${card.note}</small>` : ''}</div><p class="source">${card.source}</p></article>`).join('')}</div>`;
    track.append(panel);
  });
  function render(current, previous, duration) {
    document.body.dataset.scene = current;
    track.style.transform = `translateX(-${Math.max(0, Math.min(3, current - 1)) * 100}%)`;
    // Hero and closing transitions must not slide the track underneath.
    track.classList.toggle('immediate', duration !== 600);
    $('hero').classList.toggle('departed', current !== 0);
    $('hero').setAttribute('aria-hidden', String(current !== 0));
    $('hero').inert = current !== 0;
    $('closing').hidden = current !== 5;
    [...track.children].forEach((panel, index) => {
      panel.setAttribute('aria-hidden', String(current !== index + 1));
      panel.inert = current !== index + 1;
    });
    $('announcement').textContent = labels[current];
  }
  const navigation = window.createNavigation({ render, reducedMotion: () => motion.matches, onStart() {} });
  render(0, 0, 0);
  $('presentation').addEventListener('click', event => { if (!event.target.closest('button, a, [data-control]')) navigation.move(1, 'click'); });
  window.addEventListener('wheel', event => { event.preventDefault(); const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1); navigation.wheel(delta); }, { passive: false });
  async function toggleFullscreen() {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); else $('announcement').textContent = 'Fullscreen is unavailable. Use your browser’s fullscreen control.'; }
    catch { $('announcement').textContent = 'Fullscreen was unavailable. Use your browser’s fullscreen control.'; }
  }
  window.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
    if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); return; }
    if (event.key === 'Escape') { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); return; }
    if (event.target.closest('button') && [' ', 'Enter'].includes(event.key)) return;
    if (['ArrowRight', ' ', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); navigation.move(event.key === 'ArrowLeft' ? -1 : 1); }
  });
})();
