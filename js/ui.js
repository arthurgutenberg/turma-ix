
// Title reveal animation per section/page
function revealTitleBanner(){
  document.querySelectorAll('.page-title-reveal,.title-banner').forEach(el=>{
    // already handled by CSS keyframe; but remove after 2.4s
    setTimeout(()=>{ el.style.display='none'; }, 2400);
  });
}
document.addEventListener('DOMContentLoaded', revealTitleBanner);

// NEWS render
