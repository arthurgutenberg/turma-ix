
// Title reveal animation per section/page
function revealTitleBanner(){
  document.querySelectorAll('.page-title-reveal,.title-banner').forEach(el=>{
    // already handled by CSS keyframe; but remove after 2.4s
    setTimeout(()=>{ el.style.display='none'; }, 2400);
  });
}
document.addEventListener('DOMContentLoaded', revealTitleBanner);

window.showToast = (msg, ms=2400)=>{
  const root = document.getElementById('toast-root');
  if(!root) return;
  const el = document.createElement('div');
  el.style.cssText = "background:#1b2239;color:#fff;padding:10px 14px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);opacity:0;transform:translateY(6px);transition:.2s";
  el.textContent = msg;
  root.appendChild(el);
  requestAnimationFrame(()=>{ el.style.opacity=1; el.style.transform='translateY(0)'; });
  setTimeout(()=>{ el.style.opacity=0; el.style.transform='translateY(6px)'; setTimeout(()=> el.remove(), 200); }, ms);
};


document.addEventListener('DOMContentLoaded', ()=>{
  const obs = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); obs.unobserve(e.target); }});
  }, {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=> obs.observe(el));
});

// NEWS render
