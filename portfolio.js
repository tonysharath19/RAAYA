document.addEventListener("DOMContentLoaded", () => {
    const categoryCards = document.querySelectorAll(".category-card");
    const eventCardsContainer = document.querySelector(".event-cards");
    const eventGrid = document.querySelector(".event-grid");
    const categoryDescription = document.querySelector(".category-description");
    const backButton = document.querySelector(".back-button");
    const homeButton = document.querySelector(".home-button");

    // Home button redirect
    homeButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Event lists
    const events = {
        personal: [
            "Wedding",
            "Engagement",
            "Anniversary",
            "Birthday",
            "Baby Shower",
            "Naming Ceremony",
            "Housewarming",
            "Upanayanam"
        ],
        corporate: [
            "Product Launches",
            "Company Anniversary",
            "Corporate Party / Gala Night",
            "Conferences / Seminars",
            "Award Functions"
        ],
        demo: [
            "Interactive Demo",
            "Live Preview",
            "Sample Designs",
            "Feature Showcase"
        ]
    };

    const categoryDescriptions = {
        personal: "Curated collections of personal event invitations to celebrate your intimate and joyous moments.",
        corporate: "Professional and stylish corporate invitations tailored for your business and formal events.",
        demo: "Interactive demonstrations and sample designs showcasing our digital invitation capabilities."
    };

    function createEventCard(name) {
        const card = document.createElement("div");
        card.classList.add("event-card");
        card.textContent = name;
        return card;
    }

    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            const category = card.dataset.category;
            categoryDescription.textContent = categoryDescriptions[category];

            eventGrid.innerHTML = "";

            events[category].forEach(eventName => {
                const eventCard = createEventCard(eventName);
                eventGrid.appendChild(eventCard);

                // Shimmer animation
                setTimeout(() => {
                    eventCard.classList.add("hover-shimmer");
                    setTimeout(() => eventCard.classList.remove("hover-shimmer"), 1000);
                }, 100);
            });

            eventCardsContainer.style.display = "flex";
            document.querySelector(".category-cards").style.display = "none";
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    backButton.addEventListener("click", () => {
        eventCardsContainer.style.display = "none";
        document.querySelector(".category-cards").style.display = "flex";
        categoryDescription.textContent = "";
    });
});
