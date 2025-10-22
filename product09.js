// رقم واتسابك
const WHATSAPP_NUMBER = "213796349554"; // بدون + أو 00، فقط 213…
// أسعار التوصيل
const DELIVERY_PRICES = {
  "إلى المكتب": 500,
  "إلى باب المنزل": 800
};

// سعر المنتج
const PRODUCT_PRICE = 2970;

// دالة للحصول على اسم المنتج من الصفحة
function getProductName() {
    return document.querySelector('h2.fw-bold')?.textContent?.trim() || 'بيجامة نوم';
}

// بيانات الولايات والبلديات
// بيانات الولايات والبلديات الجزائرية
const data = {
  "01- أدرار": ["أدرار", "رقان", "تسابيت", "زاوية كنتة", "اولف", "تيميمون", "بودة", "فنوغيل", "تيت", "تامنطيت"],
  "02- الشلف": ["الشلف", "وادي الفضة", "بني حواء", "الكريمية", "زبوجة", "أبو الحسن", "المرسى", "بني راشد", "بوزغاية", "تاجنة", "تاوقريت", "الهرانفة", "سيدي عكاشة", "الصبحة", "حرشون", "أولاد فارس", "سيدي عبد الرحمان"],
  "03- الأغواط": ["الأغواط", "قصر الحيران", "بريان", "غرداية", "حاسي الرمل", "عين ماضي", "السوقر", "وادي مرة", "تاويالة", "الحويطة"],
  "04- أم البواقي": ["أم البواقي", "عين فكرون", "سوق نعمان", "عين البيضاء", "فسديس", "الضلعة", "الرحية", "مسكيانة", "عين بابوش", "بئر الشهداء", "سيقوس", "عين الزيتون"],
  "05- باتنة": ["باتنة", "مروانة", "عين التوتة", "أريس", "بريكة", "الشمرة", "عين جاسر", "فسديس", "غسيرة", "معافة", "أولاد سي سليمان", "تازولت", "ثنية العابد", "تيمقاد", "وزرة"],
  "06- بجاية": ["بجاية", "أوقاس", "أميزور", "أغريب", "برباشة", "درقينة", "القصر", "خراطة", "وادي غير", "سيدي عيش", "تازملت", "توجة", "أمالو", "بوحمزة"],
  "07- بسكرة": ["بسكرة", "أورلال", "برج بن عزوز", "جمورة", "الغروس", "ليوة", "مشونش", "أوماش", "زريبة الوادي", "طيبان", "عين الناقة", "دوشيرة", "الحاجب"],
  "08- بشار": ["بشار", "بني ونيف", "العبادلة", "بوكايس", "لحمر", "موغل", "تاغيت", "القنادسة", "تبلبالة", "بني عباس"],
  "09- البليدة": ["البليدة", "بوعينان", "بوفاريك", "الأربعاء", "موزاية", "أولاد يعيش", "بوعرفة", "حمام ملوان", "الصومعة", "الشبلي", "سيدي الربيع", "الشفة"],
  "10- البويرة": ["البويرة", "الأخضرية", "عين الترك", "بئر غبالو", "حيزر", "الهاشمية", "مشد الله", "سور الغزلان", "سوق الخميس", "الخبوزية", "العجيبة", "برج أوخريص"],
  "11- تمنراست": ["تمنراست", "عين قزام", "عين صالح", "إدلس", "تاظروك", "عين أمقل"],
  "12- تبسة": ["تبسة", "العوينات", "بئر العاتر", "بئر مقدم", "الونزة", "صفصاف الوسرى", "مرسط", "الماء الأبيض", "نقرين", "بوقاعة", "العقلة", "الشريعة"],
  "13- تلمسان": ["تلمسان", "بنى سنوس", "غزوات", "سبدو", "شتوان", "حمام بوغرارة", "العقيد عبد القادر", "عين تالوت", "الفحول", "الرمشي", "صبرة", "سيدي الجيلالي", "عين يوسف", "عين فزة"],
  "14- تيارت": ["تيارت", "مدروة", "مغيلة", "وادي ليلي", "حمادية", "عين دزاريت", "عين كرمس", "دهيمة", "قصر الشلالة", "السبعين", "سي عبد الغني", "تاخمرت"],
  "15- تيزي وزو": ["تيزي وزو", "عين الحمام", "أزفون", "بنى دوالة", "بنى زمنزار", "بوجيمة", "بونوح", "ذراع الميزان", "فريحة", "إفرحونان", "إيلولة أومالو", "ماكودة", "مقلع", "مشطرا", "واقنون", "واسيف", "يزي ناث أث عيسى"],
  "16- الجزائر": ["الجزائر الوسطى", "القصبة", "باب الوادي", "بلوزداد", "بولوغين", "الدار البيضاء", "الحراش", "بئر مراد رايس", "بئر توتة", "بوروبة", "الدالي إبراهيم", "الشراقة", "الحمامات", "الرويبة", " Hussein Dey", "القبة", "Les Fusilles", "المحمدية", "الرايس حميدو", "سيدي امحمد", "سيدي موسى", "المرادية", "بني مسوس"],
  "17- الجلفة": ["الجلفة", "عين وسارة", "دار الشيوخ", "الشعيبة", "حد الصحاري", "عين الإبل", "مسعد", "سيدي لعجال", "تعظميت", "زعفران", "القديد", "بن يعقوب"],
  "18- جيجل": ["جيجل", "الطارف", "الشقفة", "الميلية", "سيدي معروف", "العنصر", "القنار", "أم الطوب", "بودريعة", "جيملة", "السطارة", "سلمى بن زيادة"],
  "19- سطيف": ["سطيف", "عين أرنات", "عين آزال", "عين ولمان", "بئر العرش", "بوعنداس", "جميلة", "قجال", "صالح باي", "العلمة", "حمام قرقور", "حمام السخنة", "ماوكلان", "القلتة", "بني عزيز", "بني ورتيلان", "ذراع قبيلة", "أولاد تبان", "تاشودة", "تيزي نبشار"],
  "20- سعيدة": ["سعيدة", "عين السلطان", "أولاد ابراهيم", "حمام رباح", "يوب", "سيدي احمد", "سيدي عمر", "المعمورة"],
  "21- سعيدة": ["سكيكدة", "أزفون", "بن عزوز", "الحدائق", "حمادي كرومة", "القل", "قنواع", "رمضان جمال", "سيدي مزغيش", "تمالوس", "زيتونة", "أولاد عطية", "عين قشرة"],
  "22- سيدي بلعباس": ["سيدي بلعباس", "بن باديس", "مرحوم", "مزغران", "رأس الماء", "سيدي علي بوسيدي", "سيدي لحسن", "تلموني", "تيندوف", "عين أدن", "عين البرد", "بوخنفيس", "الحصيبة", "مكدرة"],
  "23- عنابة": ["عنابة", "عين الباردة", "الشرفة", "الحجار", "برحال", "سرايدي", "شطايبي", "تيديس", "العلمة"],
  "24- قالمة": ["قالمة", "عين صندل", "بومهرة", "جبل الوحش", "حمام دباغ", "حمام النبايل", "لخزارة", "هيليوبوليس", "وادي الزناتي", "بوشقوف", "قلعة بوصبع", "وادي فراغة"],
  "25- قسنطينة": ["قسنطينة", "الخروب", "عين أعبيد", "عين السمارة", "زيغود يوسف", "حامة بوزيان", "ابن زياد", "الراية", " first November", "Ouled Rahmoune", "Didouche Mourad"],
  "26- المدية": ["المدية", "العمارية", "العزيزية", "الشعيبة", "حناشة", "قصر البخاري", "أولاد عنتر", "أولاد إبراهيم", "سيدي نعمان", "تابلة", "العيساوية", "القلب الكبير", "مزغنة", "وزرة", "سغوان", "Tamesguida"],
  "27- المدية": ["مستغانم", "حجاج", "خير الدين", "مزغران", "سيدي علي", "عين تادلس", "بوقيراط", "صيادة", "شعبة اللحم", "منصورة", "وادي الخير", "خضرة", "سيدي لخضر"],
  "28- المدية": ["المسيلة", "أولاد دراج", "أولاد سيدي إبراهيم", "بني يلمان", "جمعة", "حمام الضلعة", "المعاضيد", "مقرة", "سليم", "عين الحجل", "عين الملح", "بوسعادة", "الخبانة", "القلعة", "أولاد ماضي"],
  "29- معسكر": ["معسكر", "بوحنيفية", "الغمري", "حسين", "مقطع دوز", "مخادمة", "وادي الأبطال", "عين فارس", "غريس", "فراقيق", "ملاكو", "قرجوم", "سيدي قادة", "سيق", "تيزي"],
  "30- ورقلة": ["ورقلة", "حاسي مسعود", "انقوسة", "البرمة", "حاسي بن عبد الله", "سيدي خويلد", "طاقين", "تعظميت", "النزلة"],
  "31- وهران": ["وهران", "عين الترك", "أرزيو", "بوتليليس", "السانية", "بطيوة", "بئر الجير", "حاسي بونيف", "حاسي بن عقبة", "مرسى الحجاج", "وادي تليلات", "قديل", "العنصر", "الكرمة"],
  "32- البيض": ["البيض", "بوقطب", "الشقيق", "الغاسول", "الخيثر", "العبادلة", "الونشريس", "رقاصة", "الطواب"],
  "33- إليزي": ["إليزي", "إن أمناس", "دبداب", "برج عمر إدريس"],
  "34- برج بوعريريج": ["برج بوعريريج", "عين تاغروت", "البئر", "برج زمورة", "الجعافرة", "الحمادية", "المعاصم", "المعاضيد", "المنصورة", "رأس الوادي", "سيدي امبارك", "تقلعيت", "تسامرت", "الاخضرية"],
  "35- بومرداس": ["بومرداس", "بغلية", "بودواو", "الشافلوكية", "دلس", "أولاد هداج", "سي مصطفى", "تيمزريت", "خميس الخشنة", "الناصرية"],
  "36- الطارف": ["الطارف", "بن مهيدي", "بوحجار", "بوقوس", "الطارف المركز", "العيون", "الشط", "بحيرة الطيور", "بسباس", "القالة", "الزيتونة", "عين العسل", "الذرعان"],
  "37- تندوف": ["تندوف", "أوم العير"],
  "38- تيسمسيلت": ["تيسمسيلت", "عمورة", "خميستي", "لالوام", "سيدي عتبة", "سيدي بوتوشنت", "ثنية الاحد", "الأزهرية", "برج الأمير عبد القادر"],
  "39- الوادي": ["الوادي", "البياضة", "دوار الماء", "المقرن", "الرباح", "الطريفاوي", "الرقيبة", "حساني عبد الكريم", "قمار", "اميه ونسة", "سطيل", "تغزوت"],
  "40- خنشلة": ["خنشلة", "بابار", "الشحنة", "شلية", "الحامة", "المحمل", "الولجة", "يابوس", "بوحمامة", "تاكسلانت", "عين الطويلة", "قمولة", "تاوزيانت"],
  "41- سوق أهراس": ["سوق أهراس", "سدراتة", "المراهنة", "تاورة", "الزعرورية", "الحدادة", "المشروحة", "أولاد إدريس", "البيضاء", "الدريعة", "الزوابي", "عين زانة", "أم العظائم"],
  "42- تيبازة": ["تيبازة", "أحمر العين", "بوهارون", "بورقيقة", "الشعيبة", "دamous", "فوكة", "قوراية", "حجوط", "القليعة", "سيدي راشد", "سيدي سميان", "الناظور"],
  "43- ميلة": ["ميلة", "أحمد راشدي", "عين البيضاء", "ferdjouza", "grarem", "حمالة", "مينار زارزة", "رواشد", "سيدي خليفة", "تادمايت", "تاجنانت", "تسالة لمطاعي", "ترعي باينان", "تيفاش", "يحي بني قشة"],
  "44- عين الدفلى": ["عين الدفلى", "العامرة", "بطحية", "بن علال", "برج الأمير خالد", "بومقر", "دواودة", "العبادية", "العطاف", "خميس مليانة", "مليانة", "روينة", "زارورة", "زمورة"],
  "45- النعامة": ["النعامة", "عين الصفراء", "مشرع الصفا", "مغرار", "عين بن خليل", "الصفصاف", "الصبحة"],
  "46- عين تيموشنت": ["عين تيموشنت", "العين", "العقيد الحاج لخضر", "عين الأربعاء", "عين الكيحل", "بني صاف", "الحشادنة", "أغلال", "أولاد بوجمعة", "أولاد الكيحل", "سيدي بن عدة", "تامزورة", "حاسي الغلة"],
  "47- غرداية": ["غرداية", "ضاية بن ضحوة", "القرارة", "بونورة", "المنيعة", "زلفانة", "سبسب", "متليلي"],
  "48- غليزان": ["غليزان", "عمي موسى", "بلعسل", "بني درقن", "بني زنطيس", "الحمادنة", "الحاسي", "القلعة", "المطمر", "وادي رهيو", "رأس عقبة", "سيدي سعادة", "سيدي امحمد بن علي", "عين طارق", "الرمكة", "الولجة"]
};

// ==========================
// تحديث الأسعار
// ==========================
function updatePrices() {
  const quantity = parseInt(document.getElementById("quantity").value) || 0;
  const deliveryType = document.getElementById("delivery").value;
  
  // حساب سعر المنتجات
  const productsTotal = quantity * PRODUCT_PRICE;
  
  // حساب سعر التوصيل
  const deliveryTotal = DELIVERY_PRICES[deliveryType] || 0;
  
  // حساب المبلغ الإجمالي
  const grandTotal = productsTotal + deliveryTotal;
  
  // تحديث العرض
  document.getElementById("productsPrice").textContent = productsTotal.toLocaleString() + " دج";
  document.getElementById("deliveryPrice").textContent = deliveryTotal.toLocaleString() + " دج";
  document.getElementById("totalPrice").textContent = grandTotal.toLocaleString() + " دج";
}

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
  const productName = getProductName(); // الحصول على الاسم تلقائياً
  const existing = cart.find(i => i.name === productName && i.color === selectedColor);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ 
      name: productName, // استخدام الاسم التلقائي
      price: Number(price), 
      qty: 1, 
      color: selectedColor 
    });
  }
  saveCart(cart);
  updateCartCount();
  showToast(`✅ تمت إضافة "${productName}" إلى العربة`);
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
            <div class="text-muted small">اللون: ${item.color}</div>
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

// خيارات اللون
let selectedColor = "";
document.querySelectorAll(".color-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedColor = btn.dataset.color;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // زر إضافة للسلة
  document.querySelector("#orderForm").addEventListener("submit", function(e) {
    e.preventDefault();
    if (!selectedColor) {
      return alert("⚠️ الرجاء اختيار اللون!");
    }
    const productName = getProductName(); // الحصول على الاسم تلقائياً
    addToCart(productName, PRODUCT_PRICE);
    // إرسال الطلب عبر واتساب
    sendOrderWhatsApp();
  });

  // تحديث الأسعار عند تغيير الكمية أو نوع التوصيل
  document.getElementById("quantity").addEventListener("input", updatePrices);
  document.getElementById("delivery").addEventListener("change", updatePrices);
  
  // تحديث الأسعار أول مرة
  updatePrices();

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
  
  const productsTotal = quantity * PRODUCT_PRICE;
  const deliveryTotal = DELIVERY_PRICES[delivery] || 0;
  const grandTotal = productsTotal + deliveryTotal;

  // الحصول على اسم المنتج تلقائياً
  const productName = getProductName();

  const message = encodeURIComponent(
    `🧾 طلب جديد من Ain Fakroun Fashion:\n` +
    `📦 المنتج: ${productName}\n` +
    `🔢 الكمية: ${quantity} (جميع المقاسات)\n` +
    `🎨 اللون: ${selectedColor}\n` +
    `💰 سعر المنتجات: ${productsTotal.toLocaleString()} دج\n` +
    `🚚 سعر التوصيل: ${deliveryTotal.toLocaleString()} دج\n` +
    `💵 المبلغ الإجمالي: ${grandTotal.toLocaleString()} دج\n` +
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