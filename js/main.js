// Mirelly Gatto — interações do álbum
(function(){
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  /* ---------- música ---------- */
  const audio = $('#audio-fundo');
  const player = $('#player');
  const btnMusica = $('#btn-musica');
  const progresso = $('#progresso');

  function tocar(){
    audio.play().then(atualizarPlayer).catch(atualizarPlayer);
  }

  function atualizarPlayer(){
    const tocando = !audio.paused;
    player.classList.toggle('tocando', tocando);
    btnMusica.setAttribute('aria-label', tocando ? 'pausar música' : 'tocar música');
  }

  btnMusica.addEventListener('click', () => {
    if(audio.paused) tocar(); else audio.pause();
  });
  audio.addEventListener('play', atualizarPlayer);
  audio.addEventListener('pause', atualizarPlayer);
  audio.addEventListener('timeupdate', () => {
    if(audio.duration) progresso.style.width = (audio.currentTime / audio.duration * 100) + '%';
  });

  /* ---------- abertura ---------- */
  const abertura = $('#abertura');
  document.body.classList.add('travado');

  function abrir(comMusica){
    abertura.classList.add('fechada');
    document.body.classList.remove('travado');
    player.classList.add('visivel');
    if(comMusica) tocar();
    setTimeout(() => abertura.remove(), 800);
  }
  $('#btn-abrir').addEventListener('click', () => abrir(true));
  $('#btn-abrir-mudo').addEventListener('click', () => abrir(false));

  /* ---------- entrada das seções ---------- */
  const revelar = $$('.revelar');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if(e.isIntersecting){ e.target.classList.add('visto'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revelar.forEach((el) => obs.observe(el));
  } else {
    revelar.forEach((el) => el.classList.add('visto'));
  }

  /* ---------- motivos: virar carta ---------- */
  $$('.motivo').forEach((m) => {
    m.setAttribute('aria-pressed', 'false');
    m.addEventListener('click', () => {
      const virado = m.classList.toggle('virado');
      m.setAttribute('aria-pressed', String(virado));
    });
  });

  /* ---------- galeria: pontinhos do carrossel ---------- */
  const galeria = $('#galeria');
  const fotos = $$('.polaroid');
  const pontos = $('#pontos');
  fotos.forEach(() => pontos.appendChild(document.createElement('span')));

  function marcarPonto(){
    const centro = galeria.scrollLeft + galeria.clientWidth / 2;
    let atual = 0, menor = Infinity;
    fotos.forEach((f, i) => {
      const d = Math.abs(f.offsetLeft + f.offsetWidth / 2 - centro);
      if(d < menor){ menor = d; atual = i; }
    });
    Array.from(pontos.children).forEach((p, i) => p.classList.toggle('ativo', i === atual));
  }
  galeria.addEventListener('scroll', () => requestAnimationFrame(marcarPonto), { passive: true });
  marcarPonto();

  /* ---------- lightbox ---------- */
  const lb = $('#lightbox');
  const lbImg = $('#lb-img');
  const lbLegenda = $('#lb-legenda');
  let indice = 0;
  let ultimoFoco = null;

  function mostrar(i){
    indice = (i + fotos.length) % fotos.length;
    const img = fotos[indice].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbLegenda.textContent = fotos[indice].dataset.legenda || '';
  }

  function abrirLb(i){
    ultimoFoco = document.activeElement;
    mostrar(i);
    lb.hidden = false;
    document.body.classList.add('travado');
    $('#lb-fechar').focus();
  }

  function fecharLb(){
    lb.hidden = true;
    document.body.classList.remove('travado');
    if(ultimoFoco) ultimoFoco.focus();
  }

  fotos.forEach((f, i) => f.querySelector('button').addEventListener('click', () => abrirLb(i)));
  $('#lb-fechar').addEventListener('click', fecharLb);
  $('#lb-ant').addEventListener('click', () => mostrar(indice - 1));
  $('#lb-prox').addEventListener('click', () => mostrar(indice + 1));
  lb.addEventListener('click', (e) => { if(e.target === lb) fecharLb(); });

  document.addEventListener('keydown', (e) => {
    if(lb.hidden) return;
    if(e.key === 'Escape') fecharLb();
    if(e.key === 'ArrowLeft') mostrar(indice - 1);
    if(e.key === 'ArrowRight') mostrar(indice + 1);
  });

  // arrastar pro lado no celular troca a foto
  let inicioX = null;
  lb.addEventListener('touchstart', (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if(inicioX === null) return;
    const dx = e.changedTouches[0].clientX - inicioX;
    if(Math.abs(dx) > 50) mostrar(indice + (dx < 0 ? 1 : -1));
    inicioX = null;
  });
})();
