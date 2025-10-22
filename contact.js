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
});

// Add hover effects for contact buttons
document.addEventListener('DOMContentLoaded', () => {
    const contactBtns = document.querySelectorAll('.contact-btn');

    contactBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 5px 15px rgba(203,161,53,0.4)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = 'none';
        });
    });
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselContainer = document.querySelector('.carousel-container');

    if (!carouselTrack) return;

    let currentIndex = 0;
    const totalImages = 12;
    let autoSlideInterval;

    // Function to update carousel position
    function updateCarousel() {
        const translateY = -currentIndex * (100 / totalImages);
        carouselTrack.style.transform = `translateY(${translateY}%)`;
    }

    // Next slide function
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    // Auto slide function
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Pause on hover
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // Start auto slide
    startAutoSlide();

    // Add scroll animation for designs section
    const designsSection = document.querySelector('.designs-section');
    if (designsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scrolled');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(designsSection);
    }
});



