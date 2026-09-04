function homeEscape(str){
  const d=document.createElement('div');
  d.textContent=str == null ? '' : str;
  return d.innerHTML;
}

function shortMonth(dateStr){
  const [y,m,d]=dateStr.split('-').map(Number);
  const dt=new Date(y,m-1,d);
  return {
    day:d,
    mon:dt.toLocaleDateString(undefined,{month:'short'}),
    weekday:dt.toLocaleDateString(undefined,{weekday:'short'})
  };
}

function homeTime(hhmm){
  const [h,m]=(hhmm || '20:00').split(':').map(Number);
  const ap=h>=12?'PM':'AM';
  const h12=((h+11)%12)+1;
  return `${h12}:${String(m).padStart(2,'0')} ${ap}`;
}

function renderToday(){
  const now = new Date();
  const dateEl = document.getElementById('today-date');
  const greeting = document.getElementById('greeting');

  if(dateEl){
    dateEl.textContent = now.toLocaleDateString(undefined,{
      weekday:'long',
      month:'long',
      day:'numeric'
    });
  }

  if(greeting){
    const hour = now.getHours();
    let text = 'Good evening.';
    if(hour < 12) text = 'Good morning.';
    else if(hour < 17) text = 'Good afternoon.';
    greeting.textContent = text;
  }
}

async function renderHomeEvents(){
  const box=document.getElementById('devries-event-list');
  if(!box) return;

  const events=upcomingEvents(await getDevriesEvents())
    .filter(ev => ev.building === 'ALL')
    .slice(0,4);

  if(!events.length){
    box.innerHTML='<div class="quiet-card"><strong>Nothing building-wide scheduled right now.</strong></div>';
    return;
  }

  box.innerHTML=events.map(ev=>{
    const dt=shortMonth(ev.date);
    return `<div class="event">
      <div class="date-badge">
        <div class="day">${dt.day}</div>
        <div class="mon">${dt.mon}</div>
      </div>
      <div class="event-info">
        <div class="title">${homeEscape(ev.title)}</div>
        <div class="meta">${dt.weekday} · ${homeTime(ev.time)}${ev.location ? ' · ' + homeEscape(ev.location) : ''}</div>
      </div>
    </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded',()=>{
  renderToday();
  renderHomeEvents();
});
