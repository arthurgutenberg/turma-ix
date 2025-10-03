
async function loadJSON(url){ const r = await fetch(url); return await r.json(); }

function memberCard(m){
  return `<li class="member-card">
    <img src="${m.photo}" alt="Foto de ${m.name}">
    <span class="overlay">${m.name}</span>
    <span class="nickname">${m.nickname}</span>
    <div class="content">
      <div class="handle"><a class="link" href="${m.instagram_url||'#'}" target="_blank" rel="noopener">${m.instagram_text}</a></div>
    </div>
  </li>`;
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const track = document.getElementById('members-track');
  if(!track) return;
  const data = await loadJSON('/data/members.json');
  track.innerHTML = data.map(memberCard).join('');

  // BG names glow (simple)
  const bg = document.getElementById('members-bg');
  if(bg){
    bg.innerHTML = data.map(d => `<span style="margin:0 14px; font-weight:700; opacity:.4">${d.name}</span>`).join('');
  }

  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  prev.addEventListener('click', ()=> track.scrollBy({left: -350, behavior:'smooth'}));
  next.addEventListener('click', ()=> track.scrollBy({left: +350, behavior:'smooth'}));
});
