
// Simple placeholder rows with sample cards (can be wired to a JSON later)
function card(t){
  return `<article class="mural-card reveal">
    <img src="img/members/defaults/foto-25-138.jpg" alt="Foto do evento">
    <div class="content">
      <h4>${t}</h4>
      <p>Descrição do evento, impressões e memórias. Substitua por textos reais quando quiser.</p>
    </div>
  </article>`;
}
document.addEventListener('DOMContentLoaded', ()=>{
  ['row-1','row-2','row-3'].forEach((_,i)=>{
    const el = document.getElementById('mural-row-'+(i+1));
    if(el){ el.innerHTML = card('Registro '+(i*2+1)) + card('Registro '+(i*2+2)); }
  });
});
