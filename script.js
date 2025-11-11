document.addEventListener('DOMContentLoaded', () => {
    const videoSlides = document.querySelectorAll('.video-slide');
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
                    console.log('Playing video:', video.src);
                    video.play();
                } else {
                    console.log('Pausing video:', video.src);
                    video.pause();
                }
            } else {
                console.error('No video found in slide:', entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    videoSlides.forEach(slide => {
        observer.observe(slide);

        const video = slide.querySelector('video');
        if (video) {
            // Assicurarsi che il video sia pronto per la riproduzione
            video.addEventListener('canplaythrough', () => {
                console.log('Video can play through:', video.src);
            });

            // Garantire che il video sia precaricato
            video.preload = 'auto';
            video.muted = true; // Per consentire l'autoplay

            // Riproduci il video al caricamento della pagina
            video.play();

            video.addEventListener('click', () => {
                const allVideos = document.querySelectorAll('video');
                const isMuted = video.muted;
                allVideos.forEach(v => {
                    v.muted = !isMuted;
                });
                console.log(isMuted ? 'Unmuting all videos' : 'Muting all videos');
            });
        } else {
            console.error('No video found in slide:', slide);
        }
    });
});
