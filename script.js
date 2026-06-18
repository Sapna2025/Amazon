const searchBtn = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");

searchBtn.addEventListener("click", () => {
    const product = searchInput.value.trim();

    if (product === "") {
        searchInput.style.border = "2px solid red";
        searchInput.placeholder = "Please enter a product name!";
        setTimeout(() => {
            searchInput.style.border = "none";
            searchInput.placeholder = "Search Amazon";
        }, 2000);
    } else {
        // Redirects to real Amazon search results
        window.open(`https://www.amazon.in/s?k=${encodeURIComponent(product)}`, "_blank");
    }
});

// Allow Enter key to trigger search
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});




const backToTop = document.querySelector(".foot-panel1");

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});




const boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
    // Set transition once so it applies to both hover-in and hover-out
    box.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

    box.addEventListener("mouseenter", () => {
        box.style.transform = "scale(1.03)";
        box.style.boxShadow = "0 6px 18px rgba(0,0,0,0.2)";
        box.style.cursor = "pointer";
    });

    box.addEventListener("mouseleave", () => {
        box.style.transform = "scale(1)";
        box.style.boxShadow = "none";
    });
});




const dealItems = document.querySelectorAll(".deal-items img");

dealItems.forEach((item, index) => {
    item.style.cursor = "pointer";
    item.style.transition = "transform 0.2s ease";

    item.addEventListener("mouseenter", () => {
        item.style.transform = "scale(1.05)";
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "scale(1)";
    });

    item.addEventListener("click", () => {
        alert(`You clicked product #${index + 1} — Add a product link here!`);
    });
});




const signinSection = document.querySelector(".nav-signin span");
const hour = new Date().getHours();

if (hour < 12) {
    signinSection.innerText = "Good Morning,";
} else if (hour < 18) {
    signinSection.innerText = "Good Afternoon,";
} else {
    signinSection.innerText = "Good Evening,";
}




const heroSection = document.querySelector(".hero-section");

const heroImages = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/SamsungS25/BAU/Unrec/PC_Hero_3000x1200._CB792694915_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Wireless/Samsung/SamsungS25/Unrec/MayART/D39737497_IN_WLME_Samsung_S25_NewLaunch_PC_Hero_3000x1200._CB794096157_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/2025/MSO_JUNE/GW/Unrec/JuneART/PC_Hero_3000x1200._CB792694915_.jpg"
];

let currentImage = 0;

// Add smooth fade transition to hero section
heroSection.style.transition = "background-image 0.8s ease-in-out";

// --- Create dot indicators ---
const dotsContainer = document.createElement("div");
dotsContainer.style.cssText = `
    position: absolute;
    bottom: 170px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
`;

// Make hero section a positioning parent for dots
heroSection.style.position = "relative";
heroSection.appendChild(dotsContainer);

// Create one dot per image
const dots = heroImages.map((_, i) => {
    const dot = document.createElement("div");
    dot.style.cssText = `
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${i === 0 ? "white" : "rgba(255,255,255,0.4)"};
        cursor: pointer;
        transition: background-color 0.3s ease;
    `;
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
    return dot;
});

// Function to switch to a specific slide
function goToSlide(index) {
    currentImage = index;
    heroSection.style.backgroundImage = `url('${heroImages[currentImage]}')`;

    // Update dots: active dot = white, others = faded
    dots.forEach((dot, i) => {
        dot.style.backgroundColor = i === currentImage
            ? "white"
            : "rgba(255,255,255,0.4)";
    });
}

// Auto-play slider every 4 seconds
setInterval(() => {
    const nextImage = (currentImage + 1) % heroImages.length;
    goToSlide(nextImage);
}, 4000);




const cartDiv = document.querySelector(".nav-cart");

// Track cart count
let cartCount = 0;

// Create the badge element
const cartBadge = document.createElement("span");
cartBadge.innerText = cartCount;
cartBadge.style.cssText = `
    position: absolute;
    top: -5px;
    right: -8px;
    background-color: #f08804;
    color: white;
    font-size: 11px;
    font-weight: bold;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Make cart icon a positioning parent for badge
cartDiv.style.position = "relative";

// Add badge inside cart icon
const cartIcon = cartDiv.querySelector("i");
cartIcon.style.position = "relative";
cartIcon.appendChild(cartBadge);

// Function to add to cart — call this when "Add to Cart" is clicked
function addToCart() {
    cartCount++;
    cartBadge.innerText = cartCount;
    cartBadge.style.transform = "scale(1.3)";
    setTimeout(() => {
        cartBadge.style.transform = "scale(1)";
    }, 200);
}

// For demo: clicking any deal image adds to cart
dealItems.forEach(item => {
    item.addEventListener("dblclick", () => {
        addToCart();
    });
});