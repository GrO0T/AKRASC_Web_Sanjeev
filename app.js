// --- 1. Navbar & Scroll Logic ---
const navbar = document.querySelector("#navbar");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileToggle = document.querySelector("#mobileToggle");
const sections = ["home", "about", "details", "gallery", "speakers", "faq", "contact"];
const scrollLinks = document.querySelectorAll('[data-scroll]');

function handleScroll() {
    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // ScrollSpy
    let current = "";
    sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = "#" + id;
            }
        }
    });

    scrollLinks.forEach((link) => {
        link.classList.remove("is-active");
        if (link.getAttribute("data-scroll") === current) {
            link.classList.add("is-active");
        }
    });
}

window.addEventListener("scroll", handleScroll);

scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-scroll');
        const targetSection = document.querySelector(targetId);
        if(targetSection) {
            mobileMenu.hidden = true; 
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

mobileToggle.addEventListener("click", () => {
    mobileMenu.hidden = !mobileMenu.hidden;
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) mobileMenu.hidden = true;
});

// --- 2. Countdown Timer ---
const targetDate = new Date("2026-01-31T09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("cdDays").innerText = String(days).padStart(2, '0');
    document.getElementById("cdHours").innerText = String(hours).padStart(2, '0');
    document.getElementById("cdMinutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("cdSeconds").innerText = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// --- 3. FAQ Accordion ---
const faqTriggers = document.querySelectorAll('.faq-trigger');
faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const content = trigger.nextElementSibling;
        
        faqTriggers.forEach(other => {
            if (other !== trigger) {
                other.setAttribute('aria-expanded', 'false');
                other.nextElementSibling.hidden = true;
            }
        });

        trigger.setAttribute('aria-expanded', !isExpanded);
        content.hidden = isExpanded; 
    });
});

// --- 4. Registration Modal ---
const modal = document.getElementById("modalBackdrop");
const openBtns = [document.getElementById("openRegisterTop"), document.getElementById("openRegisterMobile"), document.getElementById("openRegisterHero")];
const closeBtn = document.getElementById("closeModal");
const regForm = document.getElementById("regForm");
const regSuccess = document.getElementById("regSuccess");

function openModal() {
    modal.style.display = "grid"; 
    document.body.style.overflow = "hidden";
}
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    regForm.style.display = "block";
    regSuccess.hidden = true;
    regForm.reset();
}

openBtns.forEach(btn => { if(btn) btn.addEventListener("click", openModal); });
if(closeBtn) closeBtn.addEventListener("click", closeModal);
if(modal) modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });

// Form Validation
const regSubmit = document.getElementById("regSubmit");
regSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    
    if(name && email) {
        regForm.style.display = "none";
        regSuccess.hidden = false;
        showToast("Success", "Ticket sent to " + email);
        setTimeout(closeModal, 2000);
    } else {
        document.querySelector('[data-error="name"]').innerText = name ? "" : "Name is required";
        document.querySelector('[data-error="email"]').innerText = email ? "" : "Email is required";
    }
});

// --- 5. Toast Logic ---
const toast = document.getElementById("toast");
function showToast(title, desc) {
    document.getElementById("toastTitle").innerText = title;
    document.getElementById("toastDesc").innerText = desc;
    toast.classList.add("active");
    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000);
}

// --- 6. Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));