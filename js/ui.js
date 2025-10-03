
// Title reveal animation per section/page
function revealTitleBanner(){
  document.querySelectorAll('.page-title-reveal,.title-banner').forEach(el=>{
    // already handled by CSS keyframe; but remove after 2.4s
    setTimeout(()=>{ el.style.display='none'; }, 2400);
  });
}
document.addEventListener('DOMContentLoaded', revealTitleBanner);

document.addEventListener('DOMContentLoaded', ()=>{
  const obs = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); obs.unobserve(e.target); }});
  }, {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=> obs.observe(el));
});

// NEWS render
