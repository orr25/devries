(function(){
  const content = window.DEVRIES_CONTENT || {};

  function setText(selector, value){
    const el = document.querySelector(selector);
    if(el && value != null) el.textContent = value;
  }

  function applyHome(){
    if(!document.body.classList.contains('home-page')) return;
    const home = content.home || {};
    setText('[data-home="eyebrow"]', home.eyebrow);
    setText('[data-home="title"]', home.title);
    setText('[data-home="intro"]', home.intro);
    setText('[data-home="verseLabel"]', home.verseLabel);
  }

  function applyDorm(){
    const code = (document.body.dataset.building || '').toUpperCase();
    if(!code) return;
    const dorm = (content.dorms || {})[code];
    if(!dorm) return;

    setText('[data-dorm="name"]', dorm.name);
    setText('[data-dorm="intro"]', dorm.intro);
    setText('[data-dorm="raName"]', dorm.raName);
    setText('[data-dorm="raRole"]', dorm.raRole);
    setText('[data-dorm="raBio"]', dorm.raBio);

    const photo = document.querySelector('[data-dorm="raPhoto"]');
    if(photo && dorm.raPhoto){
      photo.style.backgroundImage = `url('${dorm.raPhoto}')`;
      photo.style.backgroundSize = 'cover';
      photo.style.backgroundPosition = 'center';
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    applyHome();
    applyDorm();
  });
})();
