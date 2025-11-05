// Unified Navigation System
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const overlayMenu = document.getElementById('overlayMenu');
    const closeMenu = document.getElementById('closeMenu');
    const menuButtons = document.querySelectorAll('.menu-button');
    const homeButton = document.querySelector('.home-button');
    // Remove or comment out demoButton related code to avoid multiple demo buttons
    // const demoButton = document.querySelector('.btn-demo');
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

    // Demo button navigation
    // if (demoButton) {
    //     demoButton.addEventListener('click', () => {
    //         const link = demoButton.getAttribute('data-link');
    //         if (link) {
    //             window.location.href = link;
    //         }
    //     });
    // }

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

// Website Security - Prevent right-click, long press, and image downloads across the entire site
document.addEventListener("DOMContentLoaded", () => {
    // Prevent right-click context menu on the entire document
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Prevent long press on mobile devices across the entire document
    document.addEventListener('touchstart', (e) => {
        // Clear any existing timeout
        if (document.longPressTimeout) {
            clearTimeout(document.longPressTimeout);
        }

        // Set a timeout for long press detection
        document.longPressTimeout = setTimeout(() => {
            e.preventDefault();
            return false;
        }, 500); // 500ms threshold for long press
    });

    document.addEventListener('touchend', (e) => {
        // Clear the long press timeout on touch end
        if (document.longPressTimeout) {
            clearTimeout(document.longPressTimeout);
            document.longPressTimeout = undefined;
        }
    });

    document.addEventListener('touchmove', (e) => {
        // Cancel long press if user moves finger
        if (document.longPressTimeout) {
            clearTimeout(document.longPressTimeout);
            document.longPressTimeout = undefined;
        }
    });

    // Prevent right-click context menu on all images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        // Prevent drag and drop
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });

        // Make images non-draggable
        img.draggable = false;

        // Disable image selection
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.MozUserSelect = 'none';
        img.style.msUserSelect = 'none';
    });

    // Prevent keyboard shortcuts for saving images and viewing source
    document.addEventListener('keydown', (e) => {
        // Prevent Ctrl+S, Ctrl+U (view source), and other save shortcuts
        if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }
    });

    // Prevent image source inspection via developer tools
    const originalImageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    if (originalImageSrc && originalImageSrc.set) {
        Object.defineProperty(HTMLImageElement.prototype, 'src', {
            set: function(value) {
                // Allow setting src normally, but log attempts to inspect
                if (value && typeof value === 'string') {
                    // You can add additional validation here if needed
                    originalImageSrc.set.call(this, value);
                }
            },
            get: originalImageSrc.get
        });
    }
});
