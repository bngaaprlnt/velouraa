/// ===========================================
// Veloura Shoes - app.js
// Elegant Steps, Everyday Comfort
// ===========================================

// Website Loaded
document.addEventListener("DOMContentLoaded", () => {

    console.log("👠 Veloura Shoes Website Loaded Successfully!");

});

// ===========================================
// Navbar Effect Saat Scroll
// ===========================================

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background =
            "linear-gradient(135deg,#FFC2D9,#FFB6C1)";

            navbar.style.boxShadow =
            "0 8px 20px rgba(231,84,128,.25)";

        } else {

            navbar.style.background =
            "linear-gradient(135deg,#FFD6E8,#FFC2D9)";

            navbar.style.boxShadow =
            "0 8px 20px rgba(231,84,128,.15)";

        }

    });

}

// ===========================================
// Hero Animation
// ===========================================

const heroText = document.querySelector(".hero-text");

if (heroText) {

    window.addEventListener("load", () => {

        heroText.style.opacity = "1";
        heroText.style.transform = "translateX(0)";

    });

}

// ===========================================
// Shop Now Button
// ===========================================

const shopBtn = document.querySelector(".hero .btn");

if (shopBtn) {

    shopBtn.addEventListener("click", function(e){

        e.preventDefault();

        window.location.href = "products.html";

    });

}

// ===========================================
// Feature Card Animation
// ===========================================

const features = document.querySelectorAll(".feature");

features.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// ===========================================
// Product Card Animation
// ===========================================

const products = document.querySelectorAll(".product-card");

products.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});

// ======================================
// ADD TO CART
// ======================================

const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(button => {

    button.addEventListener("click", function () {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);
        const image = this.dataset.image;

        if (!name || !price || !image) {
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.name === name);

        if (existing) {

            existing.qty++;

        } else {

            cart.push({

                name: name,
                price: price,
                image: image,
                qty: 1

            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartBadge();

        alert(name + " berhasil ditambahkan ke keranjang 🛒");

    });

});


// ======================================
// CART BADGE
// ======================================

function updateCartBadge() {

    const badge = document.querySelector(".cart-count");

    if (!badge) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.qty;

    });

    badge.innerText = total;

}

updateCartBadge();


// ======================================
// SEARCH PRODUCT
// ======================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(product => {

            const name = product.dataset.name.toLowerCase();

            if (name.includes(keyword)) {

                product.style.display = "flex";

            } else {

                product.style.display = "none";

            }

        });

    });

}


// ======================================
// FILTER PRODUCT
// ======================================

const filterButtons = document.querySelectorAll(".filter button");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        const filter = this.dataset.filter;

        document.querySelectorAll(".product-card").forEach(product => {

            if (
                filter === "all" ||
                product.dataset.category === filter
            ) {

                product.style.display = "flex";

            } else {

                product.style.display = "none";

            }

        });

    });

});


// ======================================
// TAMPILKAN CART
// ======================================

const cartContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const grandTotal = document.getElementById("grand-total");

if (cartContainer) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
<div class="empty-cart">
    <h2>🛒 Keranjang Belanja Masih Kosong</h2>
    <p>Sepertinya kamu belum menambahkan produk ke keranjang.</p>
    <a href="products.html" class="btn">
        Belanja Sekarang
    </a>
</div>
`;

        if (cartTotal) cartTotal.innerText = "Rp0";
        if (grandTotal) grandTotal.innerText = "Rp0";

    } else {

        cart.forEach((item, index) => {

            total += item.price * item.qty;

            cartContainer.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h3>${item.name}</h3>

                    <p class="price">
                        Rp${item.price.toLocaleString("id-ID")}
                    </p>

                    <p class="subtotal">
                        <strong>Subtotal :</strong>
                        Rp${(item.price * item.qty).toLocaleString("id-ID")}
                    </p>

                    <label><strong>Choose Size</strong></label>

                    <select class="shoe-size">

                        <option>36</option>
                        <option>37</option>
                        <option selected>38</option>
                        <option>39</option>
                        <option>40</option>

                    </select>

                </div>

                <div class="quantity">

                    <button class="qty-btn"
                    onclick="decreaseQty(${index})">

                        <i class="fa-solid fa-minus"></i>

                    </button>

                    <span>${item.qty}</span>

                    <button class="qty-btn"
                    onclick="increaseQty(${index})">

                        <i class="fa-solid fa-plus"></i>

                    </button>

                </div>

                <button class="remove"
                onclick="removeItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                    Remove

                </button>

            </div>

            `;

        });

        if (cartTotal) {

            cartTotal.innerText =
                "Rp" + total.toLocaleString("id-ID");

        }

        if (grandTotal) {

            const finalTotal = Math.max(total - 20000, 0);

            grandTotal.innerText =
                "Rp" + finalTotal.toLocaleString("id-ID");

        }

    }

}
// ======================================
// QUANTITY & REMOVE
// ======================================

function increaseQty(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].qty++;

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

function decreaseQty(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

function removeItem(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();

    location.reload();

}


// ======================================
// CHECKOUT SUMMARY
// ======================================

const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");

if(checkoutItems){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    checkoutItems.innerHTML = "";

    cart.forEach(item=>{

        total += item.price * item.qty;

        checkoutItems.innerHTML += `

        <div class="checkout-product">

            <img src="${item.image}" alt="${item.name}">

            <div>

                <h4>${item.name}</h4>

                <p>Qty : ${item.qty}</p>

                <p>Rp${(item.price*item.qty).toLocaleString("id-ID")}</p>

            </div>

        </div>

        `;

    });

    total = Math.max(total-20000,0);

    checkoutTotal.innerText =
    "Rp"+total.toLocaleString("id-ID");

}


// ======================================
// PLACE ORDER
// ======================================

const placeOrder = document.getElementById("place-order");

if(placeOrder){

    placeOrder.addEventListener("click",function(e){

        e.preventDefault();

        const name=document.querySelector('input[type="text"]');
        const email=document.querySelector('input[type="email"]');
        const phone=document.querySelector('input[type="tel"]');
        const address=document.querySelector("textarea");

        if(
            !name.value.trim() ||
            !email.value.trim() ||
            !phone.value.trim() ||
            !address.value.trim()
        ){

            alert("⚠️ Mohon Lengkapi semua data terlebih dahulu");cart

            return;

        }

        alert("🎉 Pesanan berhasil dibuat!");

        localStorage.removeItem("cart");

updateCartBadge();

window.location.href = "success.html";

    });

}
// ==============================
// TOTAL PAYMENT
// ==============================

let paymentCart = JSON.parse(localStorage.getItem("cart")) || [];

let paymentTotal = 0;

paymentCart.forEach(item => {

    paymentTotal += item.price * item.qty;

});

paymentTotal = Math.max(paymentTotal - 20000, 0);


// ==============================
// PAYMENT METHOD
// ==============================

const paymentOptions = document.querySelectorAll('input[name="payment"]');
const paymentInfo = document.getElementById("payment-info");

if (paymentInfo) {

    paymentOptions.forEach(option => {

        option.addEventListener("change", function () {

            switch (this.value) {

                case "bank":

                    paymentInfo.innerHTML = `

                    <div class="payment-card">

                        <h4>🏦 Bank Transfer</h4>

                        <p><strong>BCA</strong> : 1234567890</p>

                        <p><strong>Mandiri</strong> : 9876543210</p>

                        <p><strong>A/N</strong> : Veloura Shoes</p>

                    </div>

                    `;

                break;


                case "qris":

                    paymentInfo.innerHTML = `

                    <div class="payment-card">

                        <h4>📱 QRIS Payment</h4>

                        <img src="Qris.png"
                        class="Qris.png"
                        alt="QRIS">

                        <h3>Total Pembayaran</h3>

                        <h2>
                        Rp${paymentTotal.toLocaleString("id-ID")}
                        </h2>

                        <p>
                        Silakan scan QRIS untuk menyelesaikan pembayaran.
                        </p>

                    </div>

                    `;

                break;


                case "ewallet":

                    paymentInfo.innerHTML = `

                    <div class="payment-card">

                        <h4>💳 E-Wallet</h4>

                        <p>DANA : 081214394425</p>

                        <p>OVO : 08220628394</p>

                        <p>GoPay : 088972322431</p>

                        <p>ShopeePay : 08818245793</p>

                    </div>

                    `;

                break;


                default:

                    paymentInfo.innerHTML = `

                    <div class="payment-card">

                        <h4>🚚 Cash On Delivery</h4>

                        <p>
                        Bayar langsung kepada kurir saat pesanan diterima.
                        </p>

                    </div>

                    `;

            }

        });

    });

    if (paymentOptions.length > 0) {

        paymentOptions[0].dispatchEvent(
            new Event("change")
        );

    }

}


// ==============================
// FOOTER YEAR
// ==============================

console.log("© 2026 Veloura Shoes");
//=====================================
// TOAST NOTIFICATION
//=====================================

function showToast(message){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },2500);

}
//=====================================
// SCROLL TO TOP
//=====================================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 250) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

setTimeout(()=>{

loader.style.display="none";

},800);

}

});
// ======================================
// NEWSLETTER SUBSCRIBE
// ======================================

const newsletterForm = document.querySelector(".newsletter form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = this.querySelector("input").value.trim();

        if (email === "") {

            alert("⚠️ Please enter your email.");

            return;

        }

        showToast("💖 Thank you for subscribing!");

        this.reset();

    });

}
// ======================================
// DETAIL PRODUCT MODAL
// ======================================

const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.querySelector(".close-modal");

const detailButtons = document.querySelectorAll(".detail-btn");

detailButtons.forEach(button => {

    button.addEventListener("click", function(){

        modal.style.display = "flex";

        modalImg.src = this.dataset.image;

        modalName.innerText = this.dataset.name;

        modalPrice.innerText = this.dataset.price;

        modalDesc.innerText = this.dataset.desc;

    });

});

if(closeModal){

    closeModal.addEventListener("click", function(){

        modal.style.display = "none";

    });

}

window.addEventListener("click", function(e){

    if(e.target == modal){

        modal.style.display = "none";

    }

});
// =========================
// BACK TO TOP
// =========================

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

function showToast(message){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    },3000);

}