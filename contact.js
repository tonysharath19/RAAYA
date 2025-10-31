// Contact page specific functionality
document.addEventListener("DOMContentLoaded", () => {
    // Add smooth scroll behavior for contact buttons
    const contactBtns = document.querySelectorAll('.contact-btn');

    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add scroll animation for contact container
    const contactContainer = document.querySelector('.contact-container');
    if (contactContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        contactContainer.style.opacity = '0';
        contactContainer.style.transform = 'translateY(30px)';
        contactContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        observer.observe(contactContainer);
    }

    // Add scroll animation for designs section
    const designsSection = document.querySelector('.designs-section');
    if (designsSection) {
        const designsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        designsSection.style.opacity = '0';
        designsSection.style.transform = 'translateY(30px)';
        designsSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        designsObserver.observe(designsSection);
    }

    // Carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselTrack) {
        let currentIndex = 0;
        const totalImages = 27;
        let autoSlideInterval;
        let slideHeight = 300; // Default height

        // Set slide height based on screen size
        function setSlideHeight() {
            slideHeight = window.innerWidth <= 480 ? 250 : 300;
        }

        setSlideHeight(); // Initial set

        // Update on resize
        window.addEventListener('resize', () => {
            setSlideHeight();
            updateCarousel(); // Recalculate position on resize
        });

        // Function to update carousel position
        function updateCarousel() {
            const translateY = -currentIndex * slideHeight;
            carouselTrack.style.transform = `translateY(${translateY}px)`;
        }

        // Auto-slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalImages;
                updateCarousel();
            }, 2000); // Change slide every 2 seconds
        }

        // Pause auto-slide on hover
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        // Resume auto-slide when mouse leaves
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        // Start auto-slide initially
        startAutoSlide();
    }

    // Additional security for carousel images
    const carouselImages = document.querySelectorAll('.carousel-track img');
    carouselImages.forEach(img => {
        // Prevent right-click context menu
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // Prevent drag and drop
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });

        // Prevent long press on mobile devices
        img.addEventListener('touchstart', (e) => {
            if (img.longPressTimeout) {
                clearTimeout(img.longPressTimeout);
            }

            img.longPressTimeout = setTimeout(() => {
                e.preventDefault();
                return false;
            }, 500);
        });

        img.addEventListener('touchend', (e) => {
            if (img.longPressTimeout) {
                clearTimeout(img.longPressTimeout);
                img.longPressTimeout = undefined;
            }
        });

        img.addEventListener('touchmove', (e) => {
            if (img.longPressTimeout) {
                clearTimeout(img.longPressTimeout);
                img.longPressTimeout = undefined;
            }
        });

        // Make images non-draggable and non-selectable
        img.draggable = false;
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.MozUserSelect = 'none';
        img.style.msUserSelect = 'none';
    });
});

// Add hover effects for contact buttons
document.addEventListener('DOMContentLoaded', () => {
    const contactBtns = document.querySelectorAll('.contact-btn');

    contactBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 5px 15px rgba(203, 161, 53, 0.4)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = 'none';
        });
    });
});





