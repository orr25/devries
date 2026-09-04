function dayOfYear(date){
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function renderVerseOfDay(){
  const card = document.getElementById('verse-of-day');
  if(!card) return;

  const content = window.DEVRIES_CONTENT || {};
  const verses = content.verses || [];
  if(!verses.length) return;

  const verse = verses[dayOfYear(new Date()) % verses.length];
  const label = card.querySelector('.card-label');
  if(label && content.home && content.home.verseLabel){
    label.textContent = content.home.verseLabel;
  }

  const text = card.querySelector('.verse-text');
  const ref = card.querySelector('.verse-ref');
  if(text) text.textContent = verse.text;
  if(ref) ref.textContent = verse.ref + ' · KJV';
}

document.addEventListener('DOMContentLoaded', renderVerseOfDay);
