// Permanent scroll button for demo page with matching color scheme
document.addEventListener('DOMContentLoaded', function() {
    // Create permanent scroll button with matching color scheme
    const scrollButton = document.createElement('div');
    scrollButton.className = 'permanent-scroll-button';
    scrollButton.innerHTML = `
        <svg viewBox="0 0 24 24" class="scroll-icon">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
    `;
    
    // Add permanent styles with matching color scheme from scroll-indicator.css
    const style = document.createElement('style');
    style.textContent = `
        .permanent-scroll-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #d4af37, #f4e4bc);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
            z-index: 1000;
            opacity: 1;
            visibility: visible;
        }
        
        .permanent-scroll-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        }
        
        .permanent-scroll-button .scroll-icon {
            width: 24px;
            height: 24px;
            fill: #333;
            transition: transform 0.3s ease;
        }
        
        .permanent-scroll-button .scroll-icon.up {
            transform: rotate(180deg);
        }
        
        .permanent-scroll-button:hover .scroll-icon {
            transform: translateY(2px);
        }
        
        .permanent-scroll-button:hover .scroll-icon.up {
            transform: rotate(180deg) translateY(2px);
        }
        
        @media (max-width: 768px) {
            .permanent-scroll-button {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
            
            .permanent-scroll-button .scroll-icon {
                width: 20px;
                height: 20px;
            }
        }
        
        @media (max-width: 480px) {
            .permanent-scroll-button {
                bottom: 15px;
                right: 15px;
                width: 40px;
                height: 40px;
            }
            
            .permanent-scroll-button .scroll-icon {
                width: 18px;
                height: 18px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(scrollButton);
    
    // State management
    let isAtBottom = false;
    
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
        
        isAtBottom = (scrollTop + clientHeight) >= (scrollHeight - 10);
        
        const icon = scrollButton.querySelector('.scroll-icon');
        if (isAtBottom) {
            icon.classList.add('up');
            scrollButton.setAttribute('title', 'Scroll to top');
        } else {
            icon.classList.remove('up');
            scrollButton.setAttribute('title', 'Scroll to bottom');
        }
    }
    
    // Handle scroll button click
    scrollButton.addEventListener('click', function() {
        if (isAtBottom) {
            scrollToTop();
        } else {
            scrollToBottom();
        }
    });
    
    // Update icon on scroll
    window.addEventListener('scroll', updateIcon);
    
    // Initial icon setup
    updateIcon();
});
