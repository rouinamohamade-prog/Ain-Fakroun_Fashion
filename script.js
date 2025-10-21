// ==========================
// إعدادات عامة
// ==========================
const CART_KEY = "ainf_cart_v1";

// استرجاع / حفظ العربة
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cartCount").textContent = count;
}

// ==========================
// إدارة العربة
// ==========================
function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price: Number(price), qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
  showToast(`✅ تمت إضافة "${name}" إلى العربة`);
}

function renderCartModal() {
  const cart = getCart();
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    list.innerHTML = `<li class="list-group-item text-center text-muted">العربة فارغة</li>`;
  } else {
    cart.forEach((item, i) => {
      total += item.price * item.qty;
      list.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <div class="fw-bold">${item.name}</div>
            <div class="text-muted small">${item.qty} × ${item.price} دج</div>
          </div>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-outline-dark me-2 btn-increase" data-idx="${i}">+</button>
            <button class="btn btn-sm btn-outline-secondary me-2 btn-decrease" data-idx="${i}">-</button>
            <button class="btn btn-sm btn-outline-danger btn-remove" data-idx="${i}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </li>`;
    });
  }
  document.getElementById("cartTotal").textContent = `${total.toLocaleString()} دج`;
}

// ==========================
// تهيئة الأحداث
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // أزرار "أضف إلى العربة"
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.name, btn.dataset.price);
    });
  });

  // عداد العربة
  updateCartCount();

  // عرض العربة عند فتح المودال
  document.getElementById("cartModal")
    .addEventListener("show.bs.modal", renderCartModal);

  // أزرار التحكم داخل العربة
  document.getElementById("cartItems").addEventListener("click", e => {
    const idx = e.target.closest("[data-idx]")?.dataset.idx;
    if (!idx) return;

    const cart = getCart();
    if (e.target.closest(".btn-remove")) {
      cart.splice(idx, 1);
    } else if (e.target.closest(".btn-decrease")) {
      cart[idx].qty = Math.max(0, cart[idx].qty - 1);
      if (cart[idx].qty === 0) cart.splice(idx, 1);
    } else if (e.target.closest(".btn-increase")) {
      cart[idx].qty++;
    }

    saveCart(cart);
    renderCartModal();
    updateCartCount();
  });

  // زر إتمام الطلب
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (getCart().length === 0) return alert("🛒 العربة فارغة!");
    alert("✅ شكراً لطلبك! سنقوم بالاتصال بك لتأكيد الطلب.");
    localStorage.removeItem(CART_KEY);
    updateCartCount();
    bootstrap.Modal.getInstance(document.getElementById("cartModal")).hide();
  });

  // البحث الفوري
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  searchInput.addEventListener("input", filterProducts);
  searchBtn.addEventListener("click", filterProducts);
});

// ==========================
// البحث في المنتجات
// ==========================
function filterProducts() {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  document.querySelectorAll("#productsGrid .product").forEach(card => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    card.parentElement.style.display = title.includes(q) ? "" : "none";
  });
}

// ==========================
// إشعار جميل عند الإضافة
// ==========================
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}