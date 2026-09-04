function pad(n){ return n.toString().padStart(2, '0'); }

function formatDateLong(dateStr){
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

function formatTime12h(hhmm){
  const [h, m] = (hhmm || '20:00').split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = ((h + 11) % 12) + 1;
  return h12 + ':' + pad(m) + ' ' + period;
}

function buildICS(ev){
  const [y, mo, d] = ev.date.split('-').map(Number);
  const [hh, mm] = (ev.time || '20:00').split(':').map(Number);
  const start = new Date(y, mo - 1, d, hh, mm);
  const end = new Date(start.getTime() + (ev.durationMinutes || 90) * 60000);
  const fmt = dt => dt.getFullYear() + pad(dt.getMonth()+1) + pad(dt.getDate()) + 'T' + pad(dt.getHours()) + pad(dt.getMinutes()) + '00';
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Devries Guys//Dorm Night//EN','BEGIN:VEVENT',
    'UID:' + (ev.title || 'dorm-night').replace(/\s+/g,'-').toLowerCase() + '-' + start.getTime() + '@devries',
    'DTSTART:' + fmt(start),'DTEND:' + fmt(end),'SUMMARY:' + (ev.title || 'Dorm Night'),
    'LOCATION:' + (ev.location || ''),'DESCRIPTION:' + (ev.description || ''),'END:VEVENT','END:VCALENDAR'].join('\r\n');
}

function downloadICS(index){
  const ev = window.VISIBLE_DORM_EVENTS[index];
  const blob = new Blob([buildICS(ev)], { type:'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (ev.title || 'dorm-night').replace(/\s+/g,'-') + '.ics';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str == null ? '' : str;
  return div.innerHTML;
}

async function renderDormNights(){
  const container = document.getElementById('dormnight-list');
  if(!container) return;
  const building = (document.body.dataset.building || '').toUpperCase();
  const all = upcomingEvents(await getDevriesEvents());
  const visible = all.filter(ev => ev.building === building || ev.building === 'ALL');
  window.VISIBLE_DORM_EVENTS = visible;

  if(!visible.length){
    container.innerHTML = '<p class="empty-note">No upcoming dorm nights posted yet — check back soon.</p>';
    return;
  }
  container.innerHTML = visible.map((ev, i) => `
    <div class="dormnight">
      <div>
        <div class="when">${formatDateLong(ev.date)} · ${formatTime12h(ev.time)}${ev.building === 'ALL' ? ' · All Devries' : ''}</div>
        <div class="title">${escapeHtml(ev.title || 'Dorm Night')}</div>
        <div class="where">${escapeHtml(ev.location || '')}</div>
        ${ev.description ? `<div class="desc">${escapeHtml(ev.description)}</div>` : ''}
      </div>
      <button class="cal-btn" onclick="downloadICS(${i})">+ Add to calendar</button>
    </div>`).join('');
}

document.addEventListener('DOMContentLoaded', renderDormNights);
