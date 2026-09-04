function upcomingEvents(events){
  const today = new Date();
  today.setHours(0,0,0,0);
  return (events || []).filter(ev => {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(ev.date || '')) return false;
    const [y,m,d] = ev.date.split('-').map(Number);
    return new Date(y,m-1,d) >= today;
  }).sort((a,b) => ((a.date || '') + (a.time || '')).localeCompare((b.date || '') + (b.time || '')));
}

async function getDevriesEvents(){
  return window.DEVRIES_EVENTS || [ {
 building: "ALL",
    date: "2026-09-5",
    time: "8:45",
    durationMinutes: 00,
    title: "Orientation Day!",
    location: "Devries Building",
    description: "Get excited for Orientation day! "
    }
  ];
}
