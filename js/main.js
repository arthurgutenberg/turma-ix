
// Navbar indicator and active link handling
const nav = document.querySelector('.nav-center');
const indicator = document.querySelector('.nav-indicator');
const links = [...document.querySelectorAll('.nav-center .nav-link')];

function moveIndicator(el){
  const rect = el.getBoundingClientRect();
  const parentRect = nav.getBoundingClientRect();
  indicator.style.width = rect.width + 'px';
  indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
}

function setActive(path){
  const match = links.find(a => (a.getAttribute('href') === path) || (a.getAttribute('href').endsWith(path)));
  if(match){ links.forEach(a => a.classList.remove('active')); match.classList.add('active'); moveIndicator(match); }
}

window.addEventListener('resize', ()=>{
  const current = document.querySelector('.nav-center .nav-link.active') || links[0];
  moveIndicator(current);
});

// initial highlight
setTimeout(()=>{
  const path = location.pathname + (location.hash || '');
  // if home anchors
  if(location.pathname === '/' || location.pathname.endsWith('index.html')){
    setActive('/#home');
  }else{
    setActive(location.pathname);
  }
}, 100);

// smooth anchor scroll
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  setActive('/#'+id);
});
