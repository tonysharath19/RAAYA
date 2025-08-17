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
            btn.style.boxShadow = '0 5px 15px rgba(203, 161, 53, 0.4)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = 'none';
        });
    });
});
