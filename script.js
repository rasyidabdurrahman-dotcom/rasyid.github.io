const dynamicText = document.getElementById("dynamic-text");
const langToggle = document.getElementById("lang-toggle");
const themeToggle = document.getElementById("theme-toggle");
const cursor = document.querySelector(".custom-cursor");

// Force scroll to top on load
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// --- Custom Cursor ---
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
});

document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

// Cursor Hover Effects for Links/Buttons
const hoverElements = document.querySelectorAll("a, button, .skill-item, .flip-card");
hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.width = "40px";
        cursor.style.height = "40px";
        cursor.style.backgroundColor = "rgba(92, 214, 50, 0.2)";
    });
    el.addEventListener("mouseleave", () => {
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        cursor.style.backgroundColor = "transparent";
    });
});

// --- Dynamic Text ---
const titles = {
    en: ["Data Enthusiast", "Data Analyst", "Statistics Specialist"],
    id: ["Peminat Data", "Analis Data", "Spesialis Statistika"]
};
let currentLang = "en";
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentTitles = titles[currentLang];
    const currentTitle = currentTitles[titleIndex];

    if (isDeleting) {
        dynamicText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        dynamicText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % currentTitles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start Typing
typeEffect();

// --- Theme Toggle ---
themeToggle.addEventListener("click", () => {
    const isLight = document.body.getAttribute("data-theme") === "light";
    if (isLight) {
        document.body.removeAttribute("data-theme");
        document.body.classList.add("dark-mode");
    } else {
        document.body.setAttribute("data-theme", "light");
        document.body.classList.remove("dark-mode");
    }
});

// --- Language Toggle ---
langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "id" : "en";

    // Toggle Text Content
    document.querySelectorAll("[data-lang='en']").forEach(el => {
        el.style.display = currentLang === "en" ? "inline-block" : "none";
        // Reset display to block for block elements to avoid layout shifts? 
        // inline-block is generic but might break layout. Let's try block for paragraphs/divs.
        if (el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'DIV') {
            el.style.display = currentLang === "en" ? "block" : "none";
        }
        // Specific case: anchors inside list
        if (el.tagName === 'A') {
            el.style.display = currentLang === "en" ? "inline" : "none";
        }

    });

    document.querySelectorAll("[data-lang='id']").forEach(el => {
        el.style.display = currentLang === "id" ? "inline-block" : "none";
        if (el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'DIV') {
            el.style.display = currentLang === "id" ? "block" : "none";
        }
        if (el.tagName === 'A') {
            el.style.display = currentLang === "id" ? "inline" : "none";
        }
    });

    // Reset typing effect to restart with new language immediately
    charIndex = 0;
    isDeleting = false;
});

