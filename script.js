const products = [

    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 1499,
        category: "electronics",
        rating: 4.5,
        image: "https://picsum.photos/400/300?random=1"
    },

    {
        id: 2,
        name: "Smart Watch Series 8",
        price: 2499,
        category: "electronics",
        rating: 4.3,
        image: "https://picsum.photos/400/300?random=2"
    },

    {
        id: 3,
        name: "Men's Casual Cotton Shirt",
        price: 799,
        category: "fashion",
        rating: 4.2,
        image: "https://picsum.photos/400/300?random=3"
    },

    {
        id: 4,
        name: "Women's Running Shoes",
        price: 1299,
        category: "fashion",
        rating: 4.4,
        image: "https://picsum.photos/400/300?random=4"
    },

    {
        id: 5,
        name: "Modern Table Lamp",
        price: 899,
        category: "home",
        rating: 4.1,
        image: "https://picsum.photos/400/300?random=5"
    },

    {
        id: 6,
        name: "Non Stick Cooking Pan",
        price: 699,
        category: "home",
        rating: 4.5,
        image: "https://picsum.photos/400/300?random=6"
    },

    {
        id: 7,
        name: "The Power of Your Mind Book",
        price: 399,
        category: "books",
        rating: 4.6,
        image: "https://picsum.photos/400/300?random=7"
    },

    {
        id: 8,
        name: "JavaScript Programming Book",
        price: 599,
        category: "books",
        rating: 4.7,
        image: "https://picsum.photos/400/300?random=8"
    },

    {
        id: 9,
        name: "Portable Bluetooth Speaker",
        price: 1199,
        category: "electronics",
        rating: 4.4,
        image: "https://picsum.photos/400/300?random=9"
    },

    {
        id: 10,
        name: "Men's Sports T-Shirt",
        price: 499,
        category: "fashion",
        rating: 4.0,
        image: "https://picsum.photos/400/300?random=10"
    },

    {
        id: 11,
        name: "LED Ceiling Light",
        price: 1099,
        category: "home",
        rating: 4.3,
        image: "https://picsum.photos/400/300?random=11"
    },

    {
        id: 12,
        name: "Laptop Backpack",
        price: 899,
        category: "fashion",
        rating: 4.5,
        image: "https://picsum.photos/400/300?random=12"
    }

];


let cart = JSON.parse(localStorage.getItem("amazonCart")) || [];

const productContainer =
    document.getElementById("products");

const searchInput =
    document.getElementById("searchInput");

const categorySelect =
    document.getElementById("categorySelect");

const searchBtn =
    document.getElementById("searchBtn");

const cartCount =
    document.getElementById("cartCount");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const noProducts =
    document.getElementById("noProducts");


// DISPLAY PRODUCTS

function displayProducts(list = products) {

    productContainer.innerHTML = "";

    if (list.length === 0) {

        noProducts.style.display = "block";

        return;

    }

    noProducts.style.display = "none";


    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product";

        card.innerHTML = `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <div class="rating">
                ⭐ ${product.rating}
            </div>

            <div class="category">
                ${product.category.toUpperCase()}
            </div>

            <div class="price">
                ₹${product.price.toLocaleString("en-IN")}
            </div>

            <button
                class="add-cart"
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>
        `;

        productContainer.appendChild(card);

    });

}


// ADD TO CART

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    openCart();

}


// UPDATE CART

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;padding:30px;">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

        count += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-price">
                    ₹${item.price.toLocaleString("en-IN")}
                </div>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(div);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        total.toLocaleString("en-IN");

}


// CHANGE QUANTITY

function changeQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(product => product.id !== id);

    }


    saveCart();

    updateCart();

}


// REMOVE FROM CART

function removeFromCart(id) {

    cart =
        cart.filter(product => product.id !== id);

    saveCart();

    updateCart();

}


// SEARCH

function searchProducts() {

    const search =
        searchInput.value.toLowerCase().trim();

    const category =
        categorySelect.value;


    const filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayProducts(filtered);

}


// SEARCH EVENTS

searchBtn.addEventListener(
    "click",
    searchProducts
);


searchInput.addEventListener(
    "input",
    searchProducts
);


categorySelect.addEventListener(
    "change",
    searchProducts
);


// CART OPEN

document.querySelector(".cart")
    .addEventListener("click", openCart);


function openCart() {

    cartSidebar.classList.add("open");

    cartOverlay.style.display = "block";

}


// CART CLOSE

document.getElementById("closeCart")
    .addEventListener("click", closeCart);


cartOverlay.addEventListener(
    "click",
    closeCart
);


function closeCart() {

    cartSidebar.classList.remove("open");

    cartOverlay.style.display = "none";

}


// SAVE CART

function saveCart() {

    localStorage.setItem(
        "amazonCart",
        JSON.stringify(cart)
    );

}


// SCROLL TO PRODUCTS

function scrollToProducts() {

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// INITIAL LOAD

displayProducts();

updateCart();