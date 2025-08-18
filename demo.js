// Demo page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get the demo button
    const ecardButton = document.getElementById('ecardButton');
    
    // Add click event listener to the button
    ecardButton.addEventListener('click', function() {
        // Create a simple alert for now (can be expanded later)
        alert('E-card & Video Invites feature coming soon!');
        
        // Future enhancement: redirect to demo gallery or open modal
        // window.location.href = 'demo-gallery.html';
    });
    
    // Add some interactive hover effects
    ecardButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    ecardButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Add loading state simulation
    ecardButton.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Smooth scroll behavior for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
