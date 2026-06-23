// Mock Database of Dishes/Restaurants
const DISHES_DATABASE = [
  {
    id: 1,
    name: "Classic Paneer Butter Masala",
    cuisine: "North Indian",
    location: "nakhas",
    price: 249,
    rating: 4.8,
    deliveryTime: "30-35 min",
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Woodfired Margherita Pizza",
    cuisine: "Italian",
    location: "jaycis",
    price: 329,
    rating: 4.6,
    deliveryTime: "25-30 min",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Szechuan Veg Manchurian",
    cuisine: "Chinese",
    location: "ruhatta",
    price: 189,
    rating: 4.3,
    deliveryTime: "35-40 min",
    badge: "Spicy",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Hyderabadi Chicken Biryani",
    cuisine: "North Indian",
    location: "sipah",
    price: 299,
    rating: 4.9,
    deliveryTime: "40-45 min",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Crispy Masala Dosa",
    cuisine: "South Indian",
    location: "kachahari",
    price: 120,
    rating: 4.5,
    deliveryTime: "20-25 min",
    badge: "Light Bite",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Decadent Chocolate Lava Cake",
    cuisine: "Desserts",
    location: "nakhas",
    price: 149,
    rating: 4.7,
    deliveryTime: "15-20 min",
    badge: "Sweet Deal",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    name: "Double Cheese Gourmet Burger",
    cuisine: "Fast Food",
    location: "sipah",
    price: 199,
    rating: 4.4,
    deliveryTime: "25-30 min",
    badge: "Classic",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "Crispy Vegetable Spring Rolls",
    cuisine: "Chinese",
    location: "jaycis",
    price: 159,
    rating: 4.2,
    deliveryTime: "30-35 min",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 9,
    name: "Creamy Fettuccine Alfredo",
    cuisine: "Italian",
    location: "ruhatta",
    price: 279,
    rating: 4.5,
    deliveryTime: "30-35 min",
    badge: "Chef Special",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    name: "Deluxe Gulab Jamun (2 Pcs)",
    cuisine: "Desserts",
    location: "kachahari",
    price: 79,
    rating: 4.8,
    deliveryTime: "10-15 min",
    badge: "Traditional",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 11,
    name: "Delhi Style Chole Bhature",
    cuisine: "North Indian",
    location: "nakhas",
    price: 160,
    rating: 4.7,
    deliveryTime: "20-25 min",
    badge: "Must Try",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 12,
    name: "Spicy Pepperoni Pizza",
    cuisine: "Italian",
    location: "sipah",
    price: 389,
    rating: 4.6,
    deliveryTime: "25-30 min",
    badge: "Hot Choice",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80"
  }
];

// App State
let cart = [];
let activeCategory = "All";

// Elements Selection
let searchInput, locationSelect, searchBtn, cardsGrid, categoryTabsContainer;
let cartDrawer, cartOverlay, cartItemsList, cartCountBadge, cartTotalPriceElement, checkoutBtn;
let headerNav, userProfileMenu;

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM Elements
  searchInput = document.getElementById("search");
  locationSelect = document.querySelector("select[name='location']");
  searchBtn = document.querySelector(".search-section button");
  cardsGrid = document.getElementById("restaurant-grid");
  categoryTabsContainer = document.getElementById("category-tabs");
  
  cartDrawer = document.getElementById("cart-drawer");
  cartOverlay = document.getElementById("cart-overlay");
  cartItemsList = document.getElementById("cart-items");
  cartCountBadge = document.getElementById("cart-count");
  cartTotalPriceElement = document.getElementById("cart-total-price");
  checkoutBtn = document.getElementById("checkout-btn");
  
  headerNav = document.getElementById("header-nav");

  // Initialize features
  setupUserSession();
  setupCartEvents();
  renderCategoryTabs();
  filterAndRenderDishes(); // Initial load

  // Search & Filter Events
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      filterAndRenderDishes();
      showToast("Search filters applied!", "info");
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        filterAndRenderDishes();
        showToast("Search filters applied!", "info");
      }
    });
  }
});

// Toast System
function showToast(message, type = "success") {
  let container = document.getElementById("global-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "global-toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "✅";
  if (type === "error") icon = "❌";
  if (type === "info") icon = "ℹ️";
  if (type === "warning") icon = "⚠️";

  toast.innerHTML = `
    <span>${icon}</span>
    <div>${message}</div>
    <span class="toast-close" onclick="this.parentElement.remove()">×</span>
  `;

  container.appendChild(toast);

  // Auto dismiss
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// User Session Management
function setupUserSession() {
  const session = JSON.parse(localStorage.getItem("sky_foods_session"));
  
  if (!headerNav) return;

  if (session) {
    // User is logged in - Replace Log In link with profile dropdown
    const navHTML = `
      <div class="cart-trigger" onclick="toggleCartDrawer(true)">
        <span>🛒</span> Cart <span id="cart-count" class="cart-count">0</span>
      </div>
      <div class="profile-menu" id="profile-menu">
        <div class="profile-trigger" onclick="toggleProfileDropdown(event)">
          <div class="profile-avatar">${session.name.charAt(0).toUpperCase()}</div>
          <span>Hi, ${session.name.split(" ")[0]}</span>
          <span style="font-size: 0.7rem; margin-left: 2px;">▼</span>
        </div>
        <div class="profile-dropdown" id="profile-dropdown">
          <div class="dropdown-header">
            <div class="dropdown-name">${session.name}</div>
            <div class="dropdown-email">${session.email}</div>
          </div>
          <div class="dropdown-item" onclick="showToast('Profile Settings - Simulation', 'info')">👤 My Profile</div>
          <div class="dropdown-item" onclick="showToast('Past Orders - Simulation', 'info')">📦 My Orders</div>
          <div class="dropdown-item logout-item" onclick="handleLogout()">🚪 Log Out</div>
        </div>
      </div>
      <a href="#contact">Contact Us</a>
      <a href="#about">About Us</a>
    `;
    headerNav.innerHTML = navHTML;
    
    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
      const dropdown = document.getElementById("profile-dropdown");
      const trigger = document.querySelector(".profile-trigger");
      if (dropdown && dropdown.classList.contains("active") && !dropdown.contains(e.target) && !trigger.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });

  } else {
    // User is not logged in - Default navigation links
    const navHTML = `
      <div class="cart-trigger" onclick="toggleCartDrawer(true)">
        <span>🛒</span> Cart <span id="cart-count" class="cart-count">0</span>
      </div>
      <a href="form.html" class="login-nav-btn">Log In</a>
      <a href="#contact">Contact Us</a>
      <a href="#about">About Us</a>
    `;
    headerNav.innerHTML = navHTML;
  }
  
  // Re-sync cart count badge since DOM elements might have changed
  cartCountBadge = document.getElementById("cart-count");
  updateCartBadge();
}

function toggleProfileDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById("profile-dropdown");
  if (dropdown) {
    dropdown.classList.toggle("active");
  }
}

function handleLogout() {
  localStorage.removeItem("sky_foods_session");
  showToast("Logged out successfully!", "success");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

// Render Categories
function renderCategoryTabs() {
  if (!categoryTabsContainer) return;
  
  const categories = ["All", "North Indian", "South Indian", "Chinese", "Italian", "Fast Food", "Desserts"];
  
  categoryTabsContainer.innerHTML = categories.map(cat => `
    <button class="category-tab ${cat === activeCategory ? 'active' : ''}" onclick="selectCategory('${cat}')">${cat}</button>
  `).join("");
}

function selectCategory(category) {
  activeCategory = category;
  renderCategoryTabs();
  filterAndRenderDishes();
}

// Render Cards
function filterAndRenderDishes() {
  if (!cardsGrid) return;
  
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const location = locationSelect ? locationSelect.value : "";
  
  const filtered = DISHES_DATABASE.filter(dish => {
    // Category filter
    const matchesCategory = activeCategory === "All" || dish.cuisine === activeCategory;
    
    // Location filter
    const matchesLocation = !location || dish.location === location;
    
    // Search query filter (matches name, cuisine, or location)
    const matchesQuery = !query || 
      dish.name.toLowerCase().includes(query) || 
      dish.cuisine.toLowerCase().includes(query) ||
      dish.location.toLowerCase().includes(query);
      
    return matchesCategory && matchesLocation && matchesQuery;
  });

  if (filtered.length === 0) {
    cardsGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No Dishes Found</h3>
        <p>Try refining your search query, location selection, or category tab.</p>
      </div>
    `;
    return;
  }

  cardsGrid.innerHTML = filtered.map(dish => `
    <div class="restaurant-card" data-id="${dish.id}">
      <span class="card-badge">${dish.badge}</span>
      <div class="card-img-wrapper">
        <img src="${dish.image}" alt="${dish.name}" class="card-img" onerror="this.src='food.png'">
        <div class="card-rating">
          <span class="rating-star">★</span> ${dish.rating}
        </div>
      </div>
      <div class="card-content">
        <h3 class="card-title">${dish.name}</h3>
        <p class="card-cuisine">${dish.cuisine} • ${dish.location.toUpperCase()}</p>
        <div class="card-meta">
          <span class="card-price">₹${dish.price}</span>
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <span class="card-delivery">⏱ ${dish.deliveryTime}</span>
            <button class="add-btn" onclick="addToCart(${dish.id})">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// Shopping Cart Functions
function setupCartEvents() {
  // Read existing cart from local storage if available
  const storedCart = localStorage.getItem("sky_foods_cart");
  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);
      renderCartItems();
      updateCartBadge();
    } catch(e) {
      cart = [];
    }
  }

  // Bind background overlay click to close cart
  if (cartOverlay) {
    cartOverlay.addEventListener("click", () => toggleCartDrawer(false));
  }
}

function toggleCartDrawer(open) {
  if (!cartDrawer || !cartOverlay) return;
  
  if (open) {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
  } else {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
  }
}

function addToCart(dishId) {
  const dish = DISHES_DATABASE.find(d => d.id === dishId);
  if (!dish) return;

  const existingItem = cart.find(item => item.id === dishId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      quantity: 1
    });
  }

  localStorage.setItem("sky_foods_cart", JSON.stringify(cart));
  renderCartItems();
  updateCartBadge();
  showToast(`Added ${dish.name} to cart!`, "success");
  
  // Auto open cart drawer on add
  toggleCartDrawer(true);
}

function updateCartQuantity(dishId, change) {
  const item = cart.find(item => item.id === dishId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== dishId);
  }

  localStorage.setItem("sky_foods_cart", JSON.stringify(cart));
  renderCartItems();
  updateCartBadge();
}

function removeCartItem(dishId) {
  const item = cart.find(item => item.id === dishId);
  cart = cart.filter(item => item.id !== dishId);
  localStorage.setItem("sky_foods_cart", JSON.stringify(cart));
  renderCartItems();
  updateCartBadge();
  if (item) {
    showToast(`Removed ${item.name} from cart.`, "info");
  }
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountBadge) {
    cartCountBadge.textContent = totalCount;
    cartCountBadge.style.display = totalCount > 0 ? "inline-block" : "none";
  }
}

function renderCartItems() {
  if (!cartItemsList || !cartTotalPriceElement || !checkoutBtn) return;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty.</p>
        <p style="font-size: 0.8rem; color: var(--text-light)">Add items from our premium menu to satisfy your cravings.</p>
      </div>
    `;
    cartTotalPriceElement.textContent = "₹0";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='food.png'">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
      </div>
      <div class="cart-item-actions">
        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
      </div>
      <button class="remove-item-btn" onclick="removeCartItem(${item.id})">🗑️</button>
    </div>
  `).join("");

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalPriceElement.textContent = `₹${totalPrice}`;
}

// Simulated checkout process
function handleCheckout() {
  const session = JSON.parse(localStorage.getItem("sky_foods_session"));
  
  if (!session) {
    showToast("Please log in to complete your checkout.", "warning");
    setTimeout(() => {
      window.location.href = "form.html";
    }, 1500);
    return;
  }

  // Create modal markup in DOM dynamically if it doesn't exist
  let modalOverlay = document.getElementById("checkout-success-modal");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.id = "checkout-success-modal";
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay);
  }

  const orderId = "SKY-" + Math.floor(100000 + Math.random() * 900000);

  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-icon">🎉</div>
      <h2 class="modal-title">Order Placed Successfully!</h2>
      <p class="modal-desc">
        Thank you for choosing Sky Foods, <strong>${session.name}</strong>!<br>
        Your order <strong>${orderId}</strong> has been received and is being prepared with premium care.
        It will arrive hot at your doorstep in approximately 30 minutes.
      </p>
      <button class="modal-btn" onclick="closeCheckoutModal()">Awesome!</button>
    </div>
  `;

  // Clear cart
  cart = [];
  localStorage.removeItem("sky_foods_cart");
  renderCartItems();
  updateCartBadge();
  toggleCartDrawer(false);

  // Activate Modal
  setTimeout(() => {
    modalOverlay.classList.add("active");
  }, 100);
}

function closeCheckoutModal() {
  const modalOverlay = document.getElementById("checkout-success-modal");
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
  }
}

// Global Exports for inline HTML execution
window.toggleCartDrawer = toggleCartDrawer;
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeCartItem = removeCartItem;
window.handleCheckout = handleCheckout;
window.closeCheckoutModal = closeCheckoutModal;
window.toggleProfileDropdown = toggleProfileDropdown;
window.handleLogout = handleLogout;
window.selectCategory = selectCategory;

