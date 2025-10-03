async function loadJSON(url){ const r = await fetch(url); if(!r.ok) throw new Error('fetch '+url+' '+r.status); return await r.json(); }

function memberCard(m, idx){
  return `<li class="member-card" data-idx="${idx}">
    <img src="${m.photo}" alt="Foto de ${m.name}" onerror="this.src='img/members/defaults/foto-25-19.jpg'">
    <span class="overlay">${m.name}</span>
    <span class="nickname">${m.nickname}</span>
    <div class="content">
      <div class="handle"><a class="link" href="${m.instagram_url||'#'}" target="_blank" rel="noopener">${m.instagram_text}</a></div>
    </div>
  </li>`;
}

function nearestCenterIdx(track){
  const cards = [...track.children];
  const mid = track.getBoundingClientRect().left + track.clientWidth/2;
  let best = {idx:0, dist: Infinity};
  cards.forEach((el, i)=>{
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width/2;
    const d = Math.abs(center - mid);
    if(d < best.dist){ best = {idx:i, dist:d}; }
  });
  return best.idx;
}

function setActiveCard(track, idx){
  [...track.children].forEach((el,i)=> el.classList.toggle('is-center', i===idx));
  const bg = document.getElementById('members-bg');
  if(bg){ [...bg.children].forEach((el,i)=> el.classList.toggle('glow', i===idx)); }
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const track = document.getElementById('members-track');
  if(!track) return;
  try{
    const data = await loadJSON('data/members.json');
    track.innerHTML = data.map((m,i)=> memberCard(m,i)).join('');

    // nomes no fundo (brilho no ativo)
    const bg = document.getElementById('members-bg');
    if(bg){ bg.innerHTML = data.map(d => `<span class="bg-name">${d.name}</span>`).join(''); }

    // setas
    const prev = document.querySelector('.carousel-btn.prev');
    const next = document.querySelector('.carousel-btn.next');
    prev.addEventListener('click', ()=> track.scrollBy({left: -350, behavior:'smooth'}));
    next.addEventListener('click', ()=> track.scrollBy({left: +350, behavior:'smooth'}));

    // destaque do card central
    const updateCenter = ()=> setActiveCard(track, nearestCenterIdx(track));
    track.addEventListener('scroll', ()=> requestAnimationFrame(updateCenter));
    window.addEventListener('resize', updateCenter);
    updateCenter();
  }catch(e){
    track.innerHTML = '<p style="opacity:.8">Não foi possível carregar os membros agora.</p>';
    console.error(e);
  }
});
