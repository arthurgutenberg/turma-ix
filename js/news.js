
async function loadJSON(url){ const r = await fetch(url); return await r.json(); }

async function renderNews(){
  const grid = document.getElementById('news-grid');
  if(!grid) return;
  try{
    const items = await loadJSON('data/news.json');
    grid.innerHTML = '';
    items.forEach((n, i)=>{
      const card = document.createElement('article');
      card.className = 'card reveal' + (i===0 ? 'featured' : '');
      card.innerHTML = `
        <img src="${n.cover}" alt="Capa da notícia">
        <div class="content">
          <span class="badge">${new Date(n.date).toLocaleDateString('pt-BR')}</span>
          <h3>${n.title}</h3>
          <p>${n.summary||''}</p>
          <a class="link" href="${n.url}" target="_blank" rel="noopener">Ler mais</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }catch(e){
    grid.innerHTML = '<p>Não foi possível carregar as notícias.</p>';
  }
}
document.addEventListener('DOMContentLoaded', renderNews);
