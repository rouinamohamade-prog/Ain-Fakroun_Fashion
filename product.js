// رقم واتسابك
const WHATSAPP_NUMBER = "213796349554"; // بدون + أو 00، فقط 213…

// بيانات الولايات والبلديات
const data = {
  "أم البواقي": ["عين فَكرون", "قالة", "سوق أهراس"],
  "قسنطينة": ["قسنطينة", "حامة بوسعادة", "مستغانم"],
  "سطيف": ["سطيف", "عين أزِيل", "برج بوعريريج"]
};

// تعبئة قائمة الولايات عند التحميل
window.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");
  for (let state in data) {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  }
});

// التغيير في الولاية → تعبئة البلدية
document.getElementById("state").addEventListener("change", function () {
  const citySelect = document.getElementById("city");
  citySelect.innerHTML = `<option value="">اختر البلدية</option>`;
  const cities = data[this.value] || [];
  cities.forEach(city => {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    citySelect.appendChild(opt);
  });
});

// خيارات المقاس واللون
let selectedSize = "";
document.querySelectorAll(".size-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedSize = btn.dataset.size;
  });
});

let selectedColor = "";
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedColor = btn.dataset.color;
  });
});

// ==========================
// إعدادات عامة للعربة
// ==========================
const CART_KEY = "ainf_cart_v1";

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
  const existing = cart.find(i => i.name === name && i.size === selectedSize && i.color === selectedColor);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price: Number(price), qty: 1, size: selectedSize, color: selectedColor });
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
            <div class="text-muted small">المقاس: ${item.size}، اللون: ${item.color}</div>
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
  // زر إضافة للسلة
  document.querySelector("#orderForm").addEventListener("submit", function(e) {
    e.preventDefault();
    if (!selectedSize || !selectedColor) {
      return alert("⚠️ الرجاء اختيار المقاس واللون!");
    }
    addToCart("طقم أطفال ملوّن", 1800);
    // إرسال الطلب عبر واتساب
    sendOrderWhatsApp();
  });

  // عداد العربة
  updateCartCount();

  // عرض العربة عند فتح المودال
  document.getElementById("cartModal").addEventListener("show.bs.modal", renderCartModal);

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
});

// ==========================
// إرسال الطلب عبر واتساب
// ==========================
function sendOrderWhatsApp() {
  const quantity = document.getElementById("quantity").value;
  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const delivery = document.getElementById("delivery").value;
  const total = quantity * 1800;

  const message = encodeURIComponent(
    `🧾 طلب جديد من Ain Fakroun Fashion:\n` +
    `📦 المنتج: طقم أطفال ملوّن\n` +
    `🔢 الكمية: ${quantity}\n` +
    `📏 المقاس: ${selectedSize}\n` +
    `🎨 اللون: ${selectedColor}\n` +
    `💰 السعر الإجمالي: ${total} دج\n` +
    `👤 الاسم واللقب: ${fullName}\n` +
    `📞 الهاتف: ${phone}\n` +
    `📍 الولاية: ${state}\n` +
    `🏘️ البلدية: ${city}\n` +
    `🚚 التوصيل: ${delivery}`
  );

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");
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
