document.addEventListener('DOMContentLoaded', () => {
  const videoSlides = document.querySelectorAll('.video-slide');
  let audioActive = false; // Stato audio globale

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('video');
      if (video) {
        if (entry.isIntersecting) {
          video.muted = !audioActive; // Muto se audio non attivo
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  videoSlides.forEach(slide => {
    observer.observe(slide);
    const video = slide.querySelector('video');
    if (video) {
      video.preload = 'auto';
      video.muted = true; // TUTTI i video partono in mute
    }
  });

  // Touch/click su tutto lo schermo per attivare/disattivare audio
  document.body.addEventListener('click', () => {
    audioActive = !audioActive;
    videoSlides.forEach(slide => {
      const video = slide.querySelector('video');
      if (video) {
        // Solo il video della slide visibile reagisce (se vuoi solo lui)
        if (slide.getBoundingClientRect().top < window.innerHeight &&
            slide.getBoundingClientRect().bottom > 0) {
          video.muted = !audioActive;
        }
      }
    });
  });
});
