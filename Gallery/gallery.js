document.addEventListener('DOMContentLoaded', () => {

  // Generate or retrieve session ID
  let sessionId = sessionStorage.getItem('gallerySessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('gallerySessionId', sessionId);
  }

  // Cart storage key
  const cartKey = 'galleryCart_' + sessionId;

  // Load cart from sessionStorage
  function loadCart() {
    const stored = sessionStorage.getItem(cartKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Save cart to sessionStorage
  function saveCart(cart) {
    sessionStorage.setItem(cartKey, JSON.stringify(cart));
  }

  // Update cart icon visibility and count
  function updateCartIcon(count) {
    const cartIconGallery = document.getElementById('cartIconGallery');
    const cartCountGallery = document.getElementById('cartCountGallery');
    if (cartIconGallery && cartCountGallery) {
      if (count > 0) {
        cartIconGallery.style.display = 'flex';
        cartCountGallery.textContent = count;
      } else {
        cartIconGallery.style.display = 'none';
      }
    }
  }

  // Open cart modal
  function openCartModal() {
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        let subfolder = item.subcategory === "display" ? "" : `/${item.subcategory.toUpperCase()}`;
        if (item.category === "corporate") {
          if (item.subcategory === "premium") subfolder = "/CORPORATEP";
          else if (item.subcategory === "display") subfolder = "/CORP-DISP";
        }
        const imgSrc = `${baseImagePath}/${folderMap[item.category]}${subfolder}/${item.id}`;

        cartItem.innerHTML = `
          <img src="${imgSrc}" alt="${item.id}">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.category.replace('-', ' ').toUpperCase()} - ${item.subcategory.toUpperCase()}</h4>
            <button class="cart-item-remove" data-id="${item.id}" data-category="${item.category}" data-subcategory="${item.subcategory}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });

      // Add event listeners to remove buttons
      document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          const category = e.target.dataset.category;
          const subcategory = e.target.dataset.subcategory;
          cartItems = cartItems.filter(item => !(item.id === id && item.category === category && item.subcategory === subcategory));
          saveCart(cartItems);
          updateCartIcon(cartItems.length);
          openCartModal(); // Refresh modal
        });
      });
    }

    // Update cart footer based on cart contents
    const cartFooter = document.querySelector('.cart-footer');
    if (cartItems.length === 0) {
      cartFooter.innerHTML = '<button class="cart-close-btn" id="cartCloseBtnEmpty">Close</button>';
      document.getElementById('cartCloseBtnEmpty').addEventListener('click', () => {
        cartModal.classList.remove('active');
      });
    } else {
      cartFooter.innerHTML = '<button class="checkout-btn" id="checkoutBtn">Proceed to Checkout</button>';
      // Add event listener to the newly created button
      document.getElementById('checkoutBtn').addEventListener('click', () => {
        document.getElementById('cartModal').classList.remove('active');
        // Populate form with all selected designs
        const allSelected = cartItems.map(item => item.id).join(', ');
        document.getElementById('selectedDesign').value = allSelected;

        // Pre-fill occasion based on first item or most common
        const occasionSelect = document.getElementById("occasion");
        if (occasionSelect && cartItems.length > 0) {
          const labelMap = {
            "baby-shower": "Baby Shower",
            "wedding": "Wedding",
            "engagement": "Engagement",
            "birthday": "Birthday",
            "house-warming": "House Warming",
            "naming-ceremony": "Naming Ceremony",
            "upanayanam": "Upanayanam",
            "corporate": "Corporate",
            "floral": "Floral",
            "royal": "Royal"
          };
          occasionSelect.value = labelMap[cartItems[0].category] || "";
        }

        showSection('form');
      });
    }

    cartModal.classList.add('active');
  }
  // Close cart modal
  document.getElementById('cartCloseBtn').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
  });

  // Proceed to checkout
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
    // Populate form with all selected designs
    const allSelected = cartItems.map(item => item.id).join(', ');
    document.getElementById('selectedDesign').value = allSelected;

    // Pre-fill occasion based on first item or most common
    const occasionSelect = document.getElementById("occasion");
    if (occasionSelect && cartItems.length > 0) {
      const labelMap = {
        "baby-shower": "Baby Shower",
        "wedding": "Wedding",
        "engagement": "Engagement",
        "birthday": "Birthday",
        "house-warming": "House Warming",
        "naming-ceremony": "Naming Ceremony",
        "upanayanam": "Upanayanam",
        "corporate": "Corporate",
        "floral": "Floral",
        "royal": "Royal"
      };
      occasionSelect.value = labelMap[cartItems[0].category] || "";
    }

    showSection('form');
  });

  // Add event listener to cart icon to open modal
  const cartIconGallery = document.getElementById('cartIconGallery');
  if (cartIconGallery) {
    cartIconGallery.addEventListener('click', () => {
      openCartModal();
    });
  }

  let selectedCategory = '';
  let selectedSubcategory = '';
  let templates = [];
  let cartItems = loadCart(); // Load persistent cart

  const sections = document.querySelectorAll('.section');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const backBtns = document.querySelectorAll('.back-btn');
  const subcategoryButtons = document.getElementById('subcategoryButtons');
  const demoDisplay = document.getElementById('demoDisplay');
  const productsGrid = document.getElementById('productsGrid');
  const selectedDesignInput = document.getElementById('selectedDesign');
  const contactForm = document.getElementById('contactForm');

  // Update cart icon on load
  updateCartIcon(cartItems.length);

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
    "baby-shower": { display: 3, premium: 26, special: 10 },
    "birthday": { display: 3, premium: 110, special: 35 },
    "corporate": { display: 23, premium: 100, special: 0 },
    "recently-ordered": { display: 27, premium: 0, special: 0 },
    "engagement": { display: 3, premium: 87, special: 16 },
    "floral": { display: 0, premium: 45, special: 19 },
    "house-warming": { display: 3, premium: 52, special: 14 },
    "naming-ceremony": { display: 3, premium: 33, special: 14 },
    "royal": { display: 0, premium: 86, special: 33 },
    "upanayanam": { display: 7, premium: 63, special: 0 },
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
        "BBS-P-21.jpg","BBS-P-22.jpg","BBS-P-23.jpg","BBS-P-24.jpg","BBS-P-25.jpg",
        "BBS-P-26.jpg"
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
      "premium": Array.from({length: 110}, (_, i) => `BDY-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 34}, (_, i) => `BDY-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": ["BDAY-DISPLAY1.jpg","BDAY-DISPLAY2.jpg","BDAY-DISPLAY3.jpg"]
    },
    "house-warming": {
      "premium": Array.from({length: 52}, (_, i) => `HW-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 14}, (_, i) => `HW-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": ["HOUSE-DISPLAY1.jpg","HOUSE-DISPLAY2.jpg","HOUSE-DISPLAY3.jpg"]
    },
    "naming-ceremony": {
      "premium": Array.from({length: 33}, (_, i) => `NC-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": Array.from({length: 14}, (_, i) => `NC-S-${String(i+1).padStart(2, '0')}.jpg`),
      "display": ["NAMEC-DISPLAY1.jpg","NAMEC-DISPLAY2.jpg","NAMEC-DISPLAY3.jpg"]
    },
    "upanayanam": {
      "premium": Array.from({length: 63}, (_, i) => i+1 === 21 ? `UPA-P-21.gif` : `UPA-P-${String(i+1).padStart(2, '0')}.jpg`),
      "special": [],
      "display": [
        "UP-DISPLAY1.jpg","UP-DISPLAY2.jpg","UP-DISPLAY3.jpg",
        "UP-DISPLAY4.jpg","UP-DISPLAY5.jpg","UP-DISPLAY6.jpg","UP-DISPLAY7.png"
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
        "CUSTOMER-P-05.jpg","CUSTOMER-P-06.jpg","CUSTOMER-P-07.jpg","CUSTOMER-P-08.png","CUSTOMER-P-09.png","CUSTOMER-P-11.jpg",
        "BABY-SHOWER-1.jpg","BABY-SHOWER-2.jpg","BIRTHDAY-1.jpg","BIRTHDAY-2.jpg",
        "ENGAGEMENT-1.jpg","ENGAGEMENT-2.jpg","HOUSEWARMING-1.jpg","HOUSEWARMING-2.jpg",
        "NAMING-CEREMONY-1.jpg","NAMING-CEREMONY-2.png","UPANAYANAM-1.jpg","WEDDING-1.jpg","WEDDING-2.jpg","UP-DISPLAY7.png",
        "Gorthala-Vinay-Wedding_Invite.jpg","VINAY-WED-WTSAPP.png","VINAY-WEDDING-INSTA-STORY.jpg"
      ]
    }
  };

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0); // Scroll to top when switching sections
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      loadGalleryPage();
      showSection('gallery');
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.back));
  });

  function loadGalleryPage() {
    templates = [];
    productsGrid.innerHTML = '';

    // Add all images grid
    const allImagesGrid = document.createElement('div');
    allImagesGrid.className = 'products-grid';
    productsGrid.appendChild(allImagesGrid);

    // Load display images
    const displayFiles = imageFiles[selectedCategory] && imageFiles[selectedCategory]["display"] || [];
    displayFiles.forEach(fileName => {
      let subPath = (selectedCategory === "corporate") ? "/CORP-DISP" : "";
      templates.push({ id: fileName, src: `${baseImagePath}/${folderMap[selectedCategory]}${subPath}/${fileName}`, subcategory: "display" });
    });

    // Load premium templates
    const premiumFiles = imageFiles[selectedCategory] && imageFiles[selectedCategory]["premium"] || [];
    premiumFiles.forEach(fileName => {
      let subPath = "/premium";
      if (selectedCategory === "corporate") subPath = "/CORPORATEP";
      else if ([ "wedding","engagement","birthday","house-warming","naming-ceremony","upanayanam","floral","royal" ].includes(selectedCategory)) subPath = "/PREMIUM";
      templates.push({ id: fileName, src: `${baseImagePath}/${folderMap[selectedCategory]}${subPath}/${fileName}`, subcategory: "premium" });
    });

    // Load special templates
    const specialFiles = imageFiles[selectedCategory] && imageFiles[selectedCategory]["special"] || [];
    specialFiles.forEach(fileName => {
      let subPath = "/special";
      if ([ "wedding","engagement","birthday","house-warming","naming-ceremony","upanayanam","floral","royal" ].includes(selectedCategory)) subPath = "/SPECIAL";
      templates.push({ id: fileName, src: `${baseImagePath}/${folderMap[selectedCategory]}${subPath}/${fileName}`, subcategory: "special" });
    });

    renderProductsGrid(allImagesGrid);
  }

  function buildSubcategoryPage() {
    const cat = categoriesData[selectedCategory];
    subcategoryButtons.innerHTML = '';
    demoDisplay.innerHTML = '';

    const title = document.querySelector('#subcategory .section-title');
    title.textContent = (selectedCategory === "recently-ordered") ? "Client Custom Designs" : "Choose Subcategory";

    const displayFiles = imageFiles[selectedCategory] && imageFiles[selectedCategory]["display"] || [];
    displayFiles.forEach(fileName => {
      const img = document.createElement('img');
      if (selectedCategory === "upanayanam" && (fileName.includes('UP-DISPLAY5') || fileName.includes('UP-DISPLAY6'))) img.classList.add('landscape');
      img.src = `${baseImagePath}/${folderMap[selectedCategory]}/${fileName}`;
      img.draggable = false;
      img.addEventListener('contextmenu', e => e.preventDefault());
      demoDisplay.appendChild(img);
    });

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

    renderProductsGrid();
    showSection('gallery');
  }

  function renderProductsGrid() {
    // Clear the grid appropriately
    const existingHeadings = productsGrid.querySelectorAll('.section-title');
    const templatesHeading = Array.from(existingHeadings).find(h => h.textContent === 'TEMPLATES');
    if (templatesHeading) {
      // Remove everything after the TEMPLATES heading
      let nextSibling = templatesHeading.nextSibling;
      while (nextSibling) {
        const temp = nextSibling.nextSibling;
        productsGrid.removeChild(nextSibling);
        nextSibling = temp;
      }
    } else {
      // No heading, clear entire grid to prevent duplication
      productsGrid.innerHTML = '';
    }

    templates.forEach(t => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';

      const isInCart = cartItems.some(item => item.category === selectedCategory && item.subcategory === t.subcategory && item.id === t.id);

      productItem.innerHTML = `
        <img src="${t.src}" alt="${t.id}" draggable="false" oncontextmenu="return false;">
        <button class="add-btn ${isInCart ? 'added' : ''}" data-id="${t.id}" data-subcategory="${t.subcategory}">${isInCart ? 'Remove' : 'Add'}</button>
      `;

      const img = productItem.querySelector('img');
      img.addEventListener('contextmenu', e => e.preventDefault());

      const btn = productItem.querySelector('.add-btn');
      btn.addEventListener('click', () => {
        const subcategory = btn.dataset.subcategory;
        if (isInCart) {
          cartItems = cartItems.filter(item => !(item.category === selectedCategory && item.subcategory === subcategory && item.id === t.id));
          btn.textContent = 'Add';
          btn.classList.remove('added');
        } else {
          cartItems.push({ category: selectedCategory, subcategory: subcategory, id: t.id });
          btn.textContent = 'Remove';
          btn.classList.add('added');
        }
        saveCart(cartItems);
        updateCartIcon(cartItems.length);
        renderProductsGrid(); // Re-render to update button states
      });

      productsGrid.appendChild(productItem);
    });
  }

  // Pre-fill occasion based on selected category
  const occasionSelect = document.getElementById("occasion");
  if (occasionSelect) {
    const labelMap = {
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

  function updateCheckoutList() {
    const preview = document.getElementById("selectedPreview");
    preview.innerHTML = "";
    const selectedImages = cartItems.map(item => item.id);
    selectedImages.forEach(id => {
      const img = document.createElement("img");
      const item = cartItems.find(item => item.id === id);
      let subfolder = item.subcategory === "display" ? "" : `/${item.subcategory.toUpperCase()}`;
      if (item.category === "corporate") {
        if (item.subcategory === "premium") subfolder = "/CORPORATEP";
        else if (item.subcategory === "display") subfolder = "/CORP-DISP";
      }
      img.src = `${baseImagePath}/${folderMap[item.category]}${subfolder}/${id}`;
      img.alt = id;
      img.draggable = false;
      img.addEventListener('contextmenu', e => e.preventDefault());
      const wrapper = document.createElement("div"); wrapper.style.position = "relative"; wrapper.style.display = "inline-block";
      img.style.display = "block"; img.style.cursor = "pointer";
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "×"; removeBtn.title = "Remove";
      Object.assign(removeBtn.style, { position:"absolute", top:"-8px", right:"-8px", background:"rgba(0,0,0,0.7)", color:"#fff", border:"none", borderRadius:"50%", width:"22px", height:"22px", cursor:"pointer", fontSize:"14px" });
      removeBtn.addEventListener('click', e => { e.stopPropagation(); cartItems = cartItems.filter(cartItem => cartItem.id !== id); saveCart(cartItems); updateCartIcon(cartItems.length); updateCheckoutList(); renderProductsGrid(); });
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
