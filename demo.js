// Demo page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all demo buttons
    const birthdayButton = document.getElementById('birthdayButton');
    const engagementButton = document.getElementById('engagementButton');
    const weddingButton = document.getElementById('weddingButton');
    const houseWarmingButton = document.getElementById('houseWarmingButton');
    const ecardButton = document.getElementById('ecardButton');
    
    // Birthday button redirect
    birthdayButton.addEventListener('click', function() {
        window.location.href = 'https://birthday-demo.onrender.com';
    });
    
    // Engagement button redirect
    engagementButton.addEventListener('click', function() {
        window.location.href = 'https://engagement-invite.onrender.com';
    });
    
    // Wedding button redirect
    weddingButton.addEventListener('click', function() {
        window.location.href = 'https://wedding-demo.onrender.com';
    });
    
    // House Warming button redirect
    houseWarmingButton.addEventListener('click', function() {
        window.location.href = 'https://house-warming-demo.onrender.com';
    });
    
    // E-card button redirect to gallery.html
    ecardButton.addEventListener('click', function() {
        window.location.href = 'Gallery/gallery.html';
    });
    
    // Add interactive hover effects for all buttons
    const allButtons = document.querySelectorAll('.demo-button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
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
