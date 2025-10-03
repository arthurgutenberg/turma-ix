async function loadJSON(url){ const r = await fetch(url); if(!r.ok) throw new Error(url); return r.json(); }

function cardHTML(m, i){
  // usa m.gallery[0..2] se existir; senão reaproveita m.photo
  const g = Array.isArray(m.gallery)&&m.gallery.length ? m.gallery : [m.photo,m.photo,m.photo];
  return `<li class="member-card" data-idx="${i}">
    <img class="main" src="${g[0]}" alt="Foto de ${m.name}" onerror="this.src='img/members/defaults/foto-25-19.jpg'">
    <img class="thumb left"  src="${g[1]}" alt="" onerror="this.style.display='none'">
    <img class="thumb right" src="${g[2]}" alt="" onerror="this.style.display='none'">
    <span class="overlay">${m.name}</span>
    <span class="nickname">${m.nickname}</span>
    <div class="content">
      <div class="handle"><a class="link" href="${m.instagram_url||'#'}" target="_blank" rel="noopener">${m.instagram_text}</a></div>
    </div>
  </li>`;
}

function centerIndex(track){
  const mid = track.getBoundingClientRect().left + track.clientWidth/2;
  let best = {i:0, d:1e9};
  [...track.children].forEach((el,i)=>{
    const rect = el.getBoundingClientRect();
    const c = rect.left + rect.width/2;
    const d = Math.abs(c-mid);
    if(d<best.d) best={i,d};
  });
  return best.i;
}
function setActive(track, i){
  [...track.children].forEach((el,idx)=> el.classList.toggle('is-center', idx===i));
  const bg = document.getElementById('members-bg');
  if(bg) [...bg.children].forEach((el,idx)=> el.classList.toggle('glow', idx===i));
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const track = document.getElementById('members-track');
  if(!track) return;
  const data = await loadJSON('data/members.json');

  // nomes no fundo
  const bg = document.getElementById('members-bg');
  if(bg) bg.innerHTML = data.map(d=>`<span class="bg-name">${d.name}</span>`).join('');

  track.innerHTML = data.map(cardHTML).join('');

  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  prev.addEventListener('click', ()=> track.scrollBy({left:-350, behavior:'smooth'}));
  next.addEventListener('click', ()=> track.scrollBy({left:+350, behavior:'smooth'}));

  const update = ()=> setActive(track, centerIndex(track));
  track.addEventListener('scroll', ()=> requestAnimationFrame(update));
  window.addEventListener('resize', update);
  update();
});
