// Floating Video Container Functionality with Background Audio
document.addEventListener('DOMContentLoaded', () => {
    const tutorialVideo = document.getElementById('tutorialVideo');
    const tutorialBGM = document.getElementById('tutorialBGM');

    if (!tutorialVideo) {
        console.warn('Tutorial video element not found');
        return;
    }

    // Prevent right-click context menu on video
    tutorialVideo.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Additional protection against downloading
    tutorialVideo.addEventListener('keydown', (e) => {
        // Prevent keyboard shortcuts for saving/downloading
        if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            return false;
        }
    });

    // Prevent drag and drop
    tutorialVideo.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });

    // Prevent video source inspection
    tutorialVideo.addEventListener('loadedmetadata', () => {
        // Remove controls that might allow downloading
        tutorialVideo.controlsList.add('nodownload');
    });

    // Additional security measures
    Object.defineProperty(tutorialVideo, 'src', {
        get: function() { return this.getAttribute('src'); },
        set: function(value) {
            // Only allow setting if it's the expected video
            if (value === 'Raaya_Tutorial.mp4') {
                this.setAttribute('src', value);
            }
        }
    });

    // Background Audio Functionality
    if (tutorialBGM) {
        // Play BGM when video starts playing (every time)
        tutorialVideo.addEventListener('play', () => {
            tutorialBGM.currentTime = 0; // Reset to beginning
            tutorialBGM.play().catch(e => {
                console.log('BGM autoplay prevented by browser:', e);
            });
        });

        // Pause BGM when video pauses
        tutorialVideo.addEventListener('pause', () => {
            tutorialBGM.pause();
        });

        // Stop BGM when video ends
        tutorialVideo.addEventListener('ended', () => {
            tutorialBGM.pause();
            tutorialBGM.currentTime = 0;

            // Auto-scroll to top of page when video ends
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
