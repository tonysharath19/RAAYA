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
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselContainer = document.querySelector('.carousel-container');

    if (carouselTrack && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalImages = 12;
        let autoSlideInterval;

        // Function to update carousel position
        function updateCarousel() {
            const translateX = -currentIndex * (100 / totalImages);
            carouselTrack.style.transform = `translateX(${translateX}%)`;
        }

        // Next button click
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
            resetAutoSlide();
        });

        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
            resetAutoSlide();
        });

        // Auto-slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalImages;
                updateCarousel();
            }, 3000); // Change slide every 3 seconds
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
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





