// Scroll Indicator Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll indicator element
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <svg viewBox="0 0 24 24">
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
    
    // Handle scroll indicator click
    scrollIndicator.addEventListener('click', function() {
        scrollToBottom();
        scrollIndicator.classList.remove('show');
    });
    
    // Handle scroll events
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.body.scrollHeight;
        const clientHeight = window.innerHeight;
        
    // Use the same logic as in index.html
    const isAtBottom = (scrollTop + clientHeight) >= scrollHeight;
        
        console.log(`Scroll Top: ${scrollTop}, Client Height: ${clientHeight}, Scroll Height: ${scrollHeight}, Is At Bottom: ${isAtBottom}`);
        
        if (isAtBottom) {
            scrollIndicator.classList.remove('show');
        } else if (isScrollable()) {
            scrollIndicator.classList.add('show');
        }
    }
    
    // Initialize and add event listeners
    toggleScrollIndicator();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', function() {
        toggleScrollIndicator();
        handleScroll();
    });
    
    // Re-check on content changes
    const observer = new MutationObserver(function() {
        setTimeout(toggleScrollIndicator, 100);
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
