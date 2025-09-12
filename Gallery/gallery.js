document.addEventListener('DOMContentLoaded', () => {
  
  let selectedCategory = '';
  let selectedSubcategory = '';
  let selectedImages = [];
  let currentIndex = 0;
  let templates = [];

  const sections = document.querySelectorAll('.section');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const backBtns = document.querySelectorAll('.back-btn');
  const subcategoryButtons = document.getElementById('subcategoryButtons');
  const demoDisplay = document.getElementById('demoDisplay');
  const cardStack = document.getElementById('cardStack');
  const prevBtn = document.getElementById('prevCard');
  const nextBtn = document.getElementById('nextCard');
  const progressCounter = document.getElementById('progressCounter');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const addBtn = document.getElementById('addBtn');
  const selectedDesignInput = document.getElementById('selectedDesign');
  const contactForm = document.getElementById('contactForm');

  const folderMap = {
    "baby-shower": "baby-shower",
    "wedding": "WEDDING",
    "birthday": "BIRTHDAY",
    "engagement": "ENGAGEMENT",
    "house-warming": "HOUSE-WARMING",
    "naming-ceremony": "NAMING-CEREMONY",
    "upanayanam": "UPANAYANAM",
    "corporate": "CORPORATE",
    "floral": "FLORAL",
    "royal": "ROYAL",
    "recently-ordered": "CUSTOMER"
  };

  const categoriesData = {
    "baby-shower": { display: 3, premium: 25, special: 10 },
    "birthday": { display: 3, premium: 109, special: 35 },
    "corporate": { display: 23, premium: 100, special: 0 },
    "recently-ordered": { display: 8, premium: 0, special: 0 },
    "engagement": { display: 3, premium: 87, special: 16 },
    "floral": { display: 0, premium: 45, special: 19 },
    "house-warming": { display: 3, premium: 49, special: 14 },
    "naming-ceremony": { display: 3, premium: 32, special: 14 },
    "royal": { display: 0, premium: 86, special: 33 },
    "upanayanam": { display: 6, premium: 62, special: 0 },
    "wedding": { display: 3, premium: 78, special: 30 }
  };

  const baseImagePath = '../TEMPLATES';

  const imageFiles = {
    "baby-shower": {
      "premium": [
        "BBS-P-01.jpg","BBS-P-02.jpg","BBS-P-03.jpg","BBS-P-04.jpg","BBS-P-05.jpg",
        "BBS-P-06.jpg","BBS-P-07.jpg","BBS-P-08.jpg","BBS-P-09.jpg","BBS-P-10.jpg",
        "BBS-P-11.jpg","BBS-P-12.jpg","BBS-P-13.jpg","BBS-P-14.jpg","BBS-P-15.jpg",
        "BBS-P-16.jpg","BBS-P-17.jpg","BBS-P-18.jpg","BBS-P-19.jpg","BBS-P-20.jpg",
        "BBS-P-21.jpg","BBS-P-22.jpg","BBS-P-23.jpg","BBS-P-24.jpg","BBS-P-25.jpg"
      ],
      "special": [
        "BBS-S-01.jpg","BBS-S-02.jpg","BBS-S-03.jpg","BBS-S-04.jpg","BBS-S-05.jpg",
        "BBS-S-06.jpg","BBS-S-07.jpg","BBS-S-08.jpg","BBS-S-09.jpg","BBS-S-10.jpg"
      ],
      "display": ["BS-DISPLAY1.jpg","BS-DISPLAY2.jpg","BS-DISPLAY3.jpg"]
    },
    "wedding": {
      "premium": Array.from({length: 78}, (_, i) => `WED-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 30}, (_, i) => `WED-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": ["WED-DISPLAY1.jpg","WED-DISPLAY2.jpg","WED-DISPLAY3.jpg"]
    },
    "engagement": {
      "premium": Array.from({length: 87}, (_, i) => `ENG-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 16}, (_, i) => `ENG-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": ["ENG-DISPLAY1.jpg","ENG-DISPLAY2.jpg","ENG-DISPLAY3.jpg"]
    },
    "birthday": {
      "premium": Array.from({length: 109}, (_, i) => `BDY-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 35}, (_, i) => `BDY-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": ["BDAY-DISPLAY1.jpg","BDAY-DISPLAY2.jpg","BDAY-DISPLAY3.jpg"]
    },
    "house-warming": {
      "premium": Array.from({length: 49}, (_, i) => `HW-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 14}, (_, i) => `HW-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": ["HOUSE-DISPLAY1.jpg","HOUSE-DISPLAY2.jpg","HOUSE-DISPLAY3.jpg"]
    },
    "naming-ceremony": {
      "premium": Array.from({length: 32}, (_, i) => `NC-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 14}, (_, i) => `NC-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": ["NAMEC-DISPLAY1.jpg","NAMEC-DISPLAY2.jpg","NAMEC-DISPLAY3.jpg"]
    },
    "upanayanam": {
      "premium": Array.from({length: 62}, (_, i) => `UPA-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": [],
      "display": [
        "UP-DISPLAY1.jpg","UP-DISPLAY2.jpg","UP-DISPLAY3.jpg",
        "UP-DISPLAY4.jpg","UP-DISPLAY5.jpg","UP-DISPLAY6.jpg"
      ]
    },
    "corporate": {
      "premium": Array.from({length: 100}, (_, i) => `CORP-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": [],
      "display": Array.from({length: 23}, (_, i) => `CORP-DISP-${String(i+1).padStart(2, '0')}.jpg`)
    },
    "floral": {
      "premium": Array.from({length: 45}, (_, i) => `FLO-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 19}, (_, i) => `FLO-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": []
    },
    "royal": {
      "premium": Array.from({length: 86}, (_, i) => `ROY-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 33}, (_, i) => `ROY-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": []
    },
    "recently-ordered": {
      "premium": [],
      "special": [],
      "display": [
        "CUSTOMER-P-01.jpg","CUSTOMER-P-02.jpg","CUSTOMER-P-03.jpg","CUSTOMER-P-04.jpg",
        "CUSTOMER-P-05.jpg","CUSTOMER-P-06.jpg","CUSTOMER-P-07.jpg","CUSTOMER-P-08.png"
      ]
    }
  };

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      buildSubcategoryPage();
      showSection('subcategory');
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.back));
  });

  function buildSubcategoryPage() {
    const cat = categoriesData[selectedCategory];
    subcategoryButtons.innerHTML = '';
    demoDisplay.innerHTML = '';

    const title = document.querySelector('#subcategory .section-title');
    title.textContent = (selectedCategory === "recently-ordered") ? "Client Custom Designs" : "Choose Subcategory";

    for (let i = 1; i <= cat.display; i++) {
      const img = document.createElement('img');
      if (selectedCategory === "upanayanam" && (i === 5 || i === 6)) img.classList.add('landscape');
      if (selectedCategory === "baby-shower") img.src = `${baseImagePath}/${folderMap[selectedCategory]}/BS-DISPLAY${i}.jpg`;
      else if (selectedCategory === "wedding") img.src = `${baseImagePath}/${folderMap[selectedCategory]}/WED-DISPLAY${i}.jpg`;
      else if (selectedCategory === "engagement") img.src = `${baseImagePath}/${folderMap[selectedCategory]}/ENG-DISPLAY${i}.jpg`;
      else if (selectedCategory === "birthday") img.src = `${baseImagePath}/${folderMap[selectedCategory]}/BDAY-DISPLAY${i}.jpg`;
      else if (selectedCategory === "house-warming") img.src = `${baseImagePath}/${folderMap[selectedCategory]}/HOUSE-DISPLAY${i}.jpg`;
      else if (selectedCategory === "naming-ceremony") img.src = `${baseImagePath}/${folderMap[selectedCategory]}/NAMEC-DISPLAY${i}.jpg`;
      else if (selectedCategory === "upanayanam") img.src = `${baseImagePath}/${folderMap[selectedCategory]}/UP-DISPLAY${i}.jpg`;
      else if (selectedCategory === "corporate") img.src = `${baseImagePath}/${folderMap[selectedCategory]}/CORP-DISP/CORP-DISP-${String(i).padStart(2, '0')}.jpg`;
      else if (selectedCategory === "recently-ordered") {
        const ext = i === 8 ? 'png' : 'jpg';
        img.src = `${baseImagePath}/${folderMap[selectedCategory]}/CUSTOMER-P-${String(i).padStart(2, '0')}.${ext}`;
      }
      demoDisplay.appendChild(img);
    }

    if (cat.premium > 0) {
      const btn = document.createElement('button');
      btn.className = 'subcategory-btn';
      btn.textContent = "Premium";
      btn.onclick = () => loadTemplates("premium", cat.premium);
      subcategoryButtons.appendChild(btn);
    }
    if (cat.special > 0) {
      const btn = document.createElement('button');
      btn.className = 'subcategory-btn';
      btn.textContent = "Special";
      btn.onclick = () => loadTemplates("special", cat.special);
      subcategoryButtons.appendChild(btn);
    }
    if (selectedCategory === "recently-ordered") loadTemplates("display", cat.display);
  }

  function loadTemplates(type, count) {
    selectedSubcategory = type;
    templates = [];
    selectedImages = [];
    currentIndex = 0;
    checkoutBtn.style.display = "none";

    const files = (imageFiles[selectedCategory] && imageFiles[selectedCategory][type]) || [];

    files.forEach(fileName => {
      let subPath = (type === "display") ? "" : `/${selectedSubcategory}`;
      if (selectedCategory === "corporate") {
        if (type === "premium") subPath = "/CORPORATEP";
        else if (type === "display") subPath = "/CORP-DISP";
      } else if ([ "wedding","engagement","birthday","house-warming","naming-ceremony","upanayanam","floral","royal" ].includes(selectedCategory) && type !== "display") {
        subPath = subPath.toUpperCase();
      }
      templates.push({ id: fileName, src: `${baseImagePath}/${folderMap[selectedCategory]}${subPath}/${fileName}` });
    });

    renderCard(currentIndex);
    showSection('gallery');
  }

  function renderCard(index) {
    cardStack.innerHTML = '';
    if (index < 0 || index >= templates.length) {
      cardStack.innerHTML = `<p>No more templates</p>`;
      progressCounter.textContent = '';
      return;
    }

    const t = templates[index];
    const card = document.createElement('div');
    card.className = 'invitation-card';
    if (selectedCategory === "upanayanam" && (index === 4 || index === 5)) card.classList.add('landscape');
    card.innerHTML = `<img src="${t.src}" alt="${t.id}">`;
    cardStack.appendChild(card);

    progressCounter.textContent = `Template ${index+1} of ${templates.length}`;

    if (addBtn) {
      if (selectedImages.includes(t.id)) {
        addBtn.textContent = 'Remove';
        addBtn.classList.add('added');
      } else {
        addBtn.textContent = 'Add';
        addBtn.classList.remove('added');
      }
      addBtn.onclick = () => {
        if (selectedImages.includes(t.id)) selectedImages = selectedImages.filter(img => img !== t.id);
        else selectedImages.push(t.id);
        updateCheckoutList();
        checkoutBtn.style.display = selectedImages.length ? "inline-block" : "none";
        renderCard(currentIndex);
      };
    }
    enableSwipe(card);
  }

  function enableSwipe(card) {
    let startX = 0, currentX = 0, dragging = false;
    card.addEventListener('touchstart', e => { startX = e.touches[0].clientX; dragging = true; });
    card.addEventListener('touchmove', e => { if (!dragging) return; currentX = e.touches[0].clientX - startX; card.style.transform = `translateX(${currentX}px) rotate(${currentX/20}deg)`; });
    card.addEventListener('touchend', () => {
      dragging = false;
      if (Math.abs(currentX) > 100) {
        const direction = currentX > 0 ? -1 : 1; // positive currentX is swipe right (previous), negative is left (next)
        card.style.transition = 'transform 0.3s ease'; card.style.transform = `translateX(${currentX > 0 ? 500 : -500}px) rotate(${currentX/10}deg)`;
        setTimeout(() => { currentIndex += direction; renderCard(currentIndex); }, 300);
      } else { card.style.transition = 'transform 0.3s ease'; card.style.transform = 'translateX(0) rotate(0)'; }
      currentX = 0;
    });
  }

  prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderCard(currentIndex); } });
  nextBtn.addEventListener('click', () => { if (currentIndex < templates.length - 1) { currentIndex++; renderCard(currentIndex); } });

  // Pre-fill occasion based on selected category
const occasionSelect = document.getElementById("occasion");
if (occasionSelect) {
  let labelMap = {
    "baby-shower": "Baby Shower",
    "wedding": "Wedding",
    "engagement": "Engagement",
    "birthday": "Birthday",
    "house-warming": "House Warming",
    "naming-ceremony": "Naming Ceremony",
    "upanayanam": "Upanayanam",
    "corporate": "Corporate",
  };
  occasionSelect.value = labelMap[selectedCategory] || "";
}


checkoutBtn.addEventListener('click', () => {
  selectedDesignInput.value = selectedImages.join(', ');
  updateCheckoutList();

  // Pre-fill occasion
  const occasionSelect = document.getElementById("occasion");
  if (occasionSelect) {
    let labelMap = {
      "baby-shower": "Baby Shower",
      "wedding": "Wedding",
      "engagement": "Engagement",
      "birthday": "Birthday",
      "house-warming": "House Warming",
      "naming-ceremony": "Naming Ceremony",
      "upanayanam": "Upanayanam",
      "corporate": "Corporate",
    };
    occasionSelect.value = labelMap[selectedCategory] || "";
  }

  showSection('form');
});

  function updateCheckoutList() {
    const preview = document.getElementById("selectedPreview");
    preview.innerHTML = "";
    selectedImages.forEach(id => {
      const img = document.createElement("img");
      let subfolder = selectedSubcategory === "display" ? "" : `/${selectedSubcategory.toUpperCase()}`;
      if (selectedCategory === "corporate") {
        if (selectedSubcategory === "premium") subfolder = "/CORPORATEP";
        else if (selectedSubcategory === "display") subfolder = "/CORP-DISP";
      }
      img.src = `${baseImagePath}/${folderMap[selectedCategory]}${subfolder}/${id}`;
      img.alt = id;
      const wrapper = document.createElement("div"); wrapper.style.position = "relative"; wrapper.style.display = "inline-block";
      img.style.display = "block"; img.style.cursor = "pointer";
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "×"; removeBtn.title = "Remove";
      Object.assign(removeBtn.style, { position:"absolute", top:"-8px", right:"-8px", background:"rgba(0,0,0,0.7)", color:"#fff", border:"none", borderRadius:"50%", width:"22px", height:"22px", cursor:"pointer", fontSize:"14px" });
      removeBtn.addEventListener('click', e => { e.stopPropagation(); selectedImages = selectedImages.filter(x => x !== id); updateCheckoutList(); checkoutBtn.style.display = selectedImages.length ? "inline-block" : "none"; renderCard(currentIndex); });
      wrapper.appendChild(img); wrapper.appendChild(removeBtn); preview.appendChild(wrapper);
    });
    selectedDesignInput.value = selectedImages.join(", ");
    if (selectedImages.length === 0) showSection('gallery');
  }

  function validateForm() {
    let valid = true;
    const name = document.getElementById("name");
    if (!/^[a-zA-Z ]{3,}$/.test(name.value.trim())) { name.setCustomValidity("Please enter at least 3 letters."); valid = false; } else name.setCustomValidity("");
    // Phone: Indian 10 digits, allows +91 or leading 0
const phone = document.getElementById("phone");
if (!/^(?:\+91|0)?[6-9]\d{9}$/.test(phone.value.trim())) {
  phone.setCustomValidity("Enter a valid Indian mobile number (10 digits, can start with +91 or 0).");
  valid = false;
} else {
  phone.setCustomValidity("");
}

    // Email: must be valid format
const email = document.getElementById("email");
if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) {
  email.setCustomValidity("Enter a valid email address.");
  valid = false;
} else {
  email.setCustomValidity("");
}

  }

  
});

// Occasion: must be selected
/*const occasion = document.getElementById("occasion");
if (occasion.value === "") {
  occasion.setCustomValidity("Please select an occasion.");
  valid = false;
} else {
  occasion.setCustomValidity("");
}*/

// Handle contact form submission with custom redirect
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Let browser validate fields
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    })
    .then(response => {
      if (response.ok) {
        window.location.href = "thankyou.html";  // ✅ custom page
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch(() => alert("Error submitting form."));
  });
}
