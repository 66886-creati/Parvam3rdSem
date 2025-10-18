// ====== Restaurant Data ======
const restaurants = [
  {
    id: 1,
    name: "Pizza Planet",
    image: "https://thvnext.bing.com/th/id/OIP.htjrHInqbz8Zw51MR2dZhQHaEK?w=313&h=180&c=7&r=0&o=7&cb=12&pid=1.7&rm=3",
    menu: [
      { id: 101, name: "Margherita", price: 199 },
      { id: 102, name: "Farmhouse", price: 249 },
      { id: 103, name: "Cheese Burst", price: 299 },
      { id: 104, name: "BBQ Chicken", price: 329 },
    ],
  },
  {
    id: 2,
    name: "Burger Hub",
    image: "https://tinyurl.com/4fpxk7cn",
    menu: [
      { id: 201, name: "Classic Burger", price: 149 },
      { id: 202, name: "Cheese Burger", price: 179 },
      { id: 203, name: "Veggie Delight", price: 129 },
      { id: 204, name: "Spicy Paneer", price: 159 },
    ],
  },
  {
    id: 3,
    name: "Meghana Foods",
    image: "https://tinyurl.com/mrxbry3s",
    menu: [
      { id: 301, name: "Chicken Biryani", price: 399 },
      { id: 302, name: "Arabian Mandi", price: 449 },
      { id: 303, name: "Afghani Kabsa", price: 429 },
    ],
  },
  {
  id: 4,
  name: "Taco Town",
  image: "https://tinyurl.com/2ss72vjw",
  menu: [
    { id: 401, name: "Chicken Taco", price: 179 },
    { id: 402, name: "Veggie Taco", price: 149 },
    { id: 403, name: "Chicken Quesadilla", price: 199 },
  ],
},
{
  id: 5,
  name: "Pasta Palace",
  image: "https://tinyurl.com/rb85awwf",
  menu: [
    { id: 501, name: "Alfredo Pasta", price: 259 },
    { id: 502, name: "Penne Arrabiata", price: 229 },
    { id: 503, name: "Mac and Cheese", price: 199 },
  ],
},
{
  id: 6,
  name: "Indian Masala",
  image: "https://tinyurl.com/bdkwwa2k",
  menu: [
    { id: 601, name: "Paneer Butter Masala", price: 299 },
    { id: 602, name: "Chicken Biryani", price: 349 },
    { id: 603, name: "Butter Naan (2 pcs)", price: 59 },
  ],
},

];

// ====== Cart Logic ======
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ====== Load Restaurants ======
function renderRestaurants() {
  const container = document.getElementById("restaurants");
  container.innerHTML = "";
  
  // Show the main container in case it was hidden
  document.getElementById("restaurant-container").style.display = "block";

  restaurants.forEach((resto) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm" onclick="openMenu(${resto.id})">
        <img src="${resto.image}" class="card-img-top" alt="${resto.name}">
        <div class="card-body">
          <h5 class="card-title">${resto.name}</h5>
          <p class="card-text">Click to view menu</p>
        </div>
      </div>
    `;
    container.appendChild(col);
  });



  // Hide loader and show content
  document.getElementById("loader").style.display = "none";
  document.getElementById("restaurant-container").style.display = "block";
}

// ====== Open Menu Modal ======
function openMenu(id) {
  const resto = restaurants.find((r) => r.id === id);
  let menuHTML = `<h5 class="mb-3">${resto.name}</h5>`;
  resto.menu.forEach((item) => {
    menuHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <div>${item.name} - ₹${item.price}</div>
        <button class="btn btn-sm btn-primary" onclick="addToCart(event, ${item.id}, ${id})">Add</button>
      </div>
    `;
  });

  showModal(menuHTML);
}

// ====== Show Bootstrap Modal ======
function showModal(content) {
  const modalDiv = document.createElement("div");
  modalDiv.className = "modal fade";
  modalDiv.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">${content}</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalDiv);
  const modal = new bootstrap.Modal(modalDiv);
  modal.show();

  modalDiv.addEventListener("hidden.bs.modal", () => modalDiv.remove());
}

// ====== Add to Cart ======
function addToCart(event, itemId, restoId) {
  event.stopPropagation(); // Prevent modal closing
  const resto = restaurants.find((r) => r.id === restoId);
  const item = resto.menu.find((m) => m.id === itemId);

  const existing = cart.find((c) => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart();
  updateCart();
  showToast("Item added to cart!");
}

// ====== Save to localStorage ======
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ====== Update Cart UI ======
function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center mb-2";
    div.innerHTML = `
      <div>
        ${item.name} (x${item.qty})
        <button class="btn btn-sm btn-outline-secondary mx-1" onclick="changeQty(${idx}, 1)">+</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${idx}, -1)">-</button>
      </div>
      <span>₹${item.price * item.qty}</span>
    `;
    cartContainer.appendChild(div);
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

// ====== Change Quantity ======
function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1); // remove item
  }
  saveCart();
  updateCart();
}

// ====== Toggle Cart Sidebar ======
function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar");
  cartSidebar.classList.toggle("open");
}

// ====== Checkout ======
// function checkout() {
//   if (cart.length === 0) {
//     alert("Your cart is empty!");
//     return;
//   }
//   alert("Thank you for your order!");
//   cart = [];
//   saveCart();
//   updateCart();
//   toggleCart();
// }
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Show modal instead of alert
  const modal = new bootstrap.Modal(document.getElementById("checkoutModal"));
  modal.show();

  cart = [];
  saveCart();
  updateCart();
  toggleCart();
}


// ====== Toast Notification ======
function showToast(message) {
  const toastEl = document.getElementById("toast");
  toastEl.querySelector(".toast-body").innerText = message;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// ====== Initial Load ======
document.addEventListener("DOMContentLoaded", () => {
  renderRestaurants(); // immediately render restaurants
  updateCart();
});

