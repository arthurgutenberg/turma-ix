
const cozyMessages = [
  'Esta data ainda está <strong>debaixo da neve</strong> — nada marcado por aqui.',
  'Evento não <strong>descongelado</strong>… por enquanto ❄️.',
  'O iglu está <strong>fechado</strong> neste dia. Volte amanhã!',
  'Os pinguins estão <strong>em patrulha</strong> — sem compromissos hoje.',
  'Silêncio polar: <strong>agenda livre</strong>.'
];

function renderDetail(events){
  const list = document.getElementById('agenda-events');
  const empty = document.querySelector('.agenda-empty');
  list.innerHTML = '';
  if(!events || !events.length){
    empty.innerHTML = `<p>${cozyMessages[Math.floor(Math.random()*cozyMessages.length)]}</p>`;
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  events.forEach(ev=>{
    const li = document.createElement('li');
    const time = ev.start ? new Date(ev.start).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'}) : '';
    li.innerHTML = `<strong>${ev.title}</strong><br>${ev.location || ''} ${time? '• '+time : ''}`;
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const calendarEl = document.getElementById('calendar');
  if(!calendarEl) return;
  const res = await fetch('data/events.json');
  const data = await res.json();
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 'auto',
    locale: 'pt-br',
    headerToolbar: { left: 'prev,next', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' },
    events: data,
    dateClick: (info) => {
      const dayEvents = calendar.getEvents().filter(e => FullCalendar.formatDate(e.start, {year:'numeric', month:'2-digit', day:'2-digit'}) === FullCalendar.formatDate(info.date, {year:'numeric', month:'2-digit', day:'2-digit'})).map(e=>({title:e.title, start:e.start, location:e.extendedProps.location||''}));
      renderDetail(dayEvents);
    },
    eventClick: (info) => {
      renderDetail([{title: info.event.title, start: info.event.start, location: info.event.extendedProps.location||''}]);
    }
  });
  calendar.render();
});
