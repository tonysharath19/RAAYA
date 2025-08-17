// Unified Navigation System
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const overlayMenu = document.getElementById('overlayMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuButtons = document.querySelectorAll('.menu-button');
    const homeButton = document.querySelector('.home-button');
    const pageContent = document.querySelector('.page-content');

    // Hamburger menu toggle with logging
    function toggleMenu() {
        console.log("Overlay menu active state before toggle:", overlayMenu.classList.contains('active'));
        console.log("Overlay menu active state before toggle:", overlayMenu.classList.contains('active'));
        overlayMenu.classList.toggle('active');
        console.log("Overlay menu active state after toggle:", overlayMenu.classList.contains('active'));
        console.log("Overlay menu active state after toggle:", overlayMenu.classList.contains('active'));
        pageContent.classList.toggle('blur');
        hamburgerMenu.classList.toggle('active');
    }

    // Event listeners
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }

    // Menu button navigation
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const link = button.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
            toggleMenu();
        });
    });

    // Home button navigation
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            const link = homeButton.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (overlayMenu.classList.contains('active') && 
            !overlayMenu.contains(e.target) && 
            !hamburgerMenu.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlayMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Scroll Animations
document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll('.hero, .about-container, .services-container, .service-card, .contact-container');

    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    
    // Initial check
    handleScrollAnimation();
});

// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
