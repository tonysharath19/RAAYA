// Scroll Indicator Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll indicator element
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <svg viewBox="0 0 24 24" class="scroll-icon">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
    `;
    
    // Add styles
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'scroll-indicator.css';
    document.head.appendChild(style);
    
    document.body.appendChild(scrollIndicator);
    console.log("Scroll Indicator added to the DOM");
    
    // State management
    let isAtBottom = false;
    
    // Check if content is scrollable
    function isScrollable() {
        return document.body.scrollHeight > window.innerHeight + 100;
    }
    
    // Show/hide scroll indicator
    function toggleScrollIndicator() {
        if (isScrollable()) {
            scrollIndicator.classList.add('show');
        } else {
            scrollIndicator.classList.remove('show');
        }
    }
    
    // Scroll to bottom
    function scrollToBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    // Scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Update icon based on scroll position
    function updateIcon() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.body.scrollHeight;
        const clientHeight = window.innerHeight;
        
        isAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 10); // 10px threshold
        
        const icon = scrollIndicator.querySelector('.scroll-icon');
        if (isAtBottom) {
            // At bottom - show up arrow
            icon.classList.add('up');
            scrollIndicator.setAttribute('title', 'Scroll to top');
        } else {
            // Not at bottom - show down arrow
            icon.classList.remove('up');
            scrollIndicator.setAttribute('title', 'Scroll to bottom');
        }
    }
    
    // Handle scroll indicator click
    scrollIndicator.addEventListener('click', function() {
        if (isAtBottom) {
            scrollToTop();
        } else {
            scrollToBottom();
        }
    });
    
    // Handle scroll events
    function handleScroll() {
        updateIcon();
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.body.scrollHeight;
        const clientHeight = window.innerHeight;
        
        // Show/hide based on scroll position
        if (scrollTop > 100 || isAtBottom) {
            scrollIndicator.classList.add('show');
        } else if (!isScrollable()) {
            scrollIndicator.classList.remove('show');
        }
    }
    
    // Initialize and add event listeners
    toggleScrollIndicator();
    updateIcon();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', function() {
        toggleScrollIndicator();
        updateIcon();
        handleScroll();
    });
    
    // Re-check on content changes
    const observer = new MutationObserver(function() {
        setTimeout(() => {
            toggleScrollIndicator();
            updateIcon();
            handleScroll();
        }, 100);
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });
});

// Function to add scroll indicator to any page
function addScrollIndicatorToPage() {
    // Check if already added
    if (document.querySelector('.scroll-indicator')) return;
    
    // Add CSS
    if (!document.querySelector('link[href*="scroll-indicator.css"]')) {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'scroll-indicator.css';
        document.head.appendChild(style);
    }
    
    // Initialize scroll indicator
    const script = document.createElement('script');
    script.src = 'scroll-indicator.js';
    document.body.appendChild(script);
}
