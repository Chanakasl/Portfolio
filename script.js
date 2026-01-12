/* ===========================
   Smooth Scrolling + Active Nav Link
   =========================== */
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href"); // #section
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;

    const navHeight = document.querySelector(".navbar").offsetHeight;
    const sectionTop = targetSection.offsetTop - navHeight;

    window.scrollTo({ top: sectionTop, behavior: "smooth" });

    // Close mobile menu if open
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
  });
});

/* ===========================
   Mobile Nav Toggle
   =========================== */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  navToggle.classList.toggle("open");
});

/* ===========================
   Animate Skill Bars When in View
   =========================== */
const progressBars = document.querySelectorAll(".progress-bar span");

const animateSkills = () => {
  progressBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (inView && !bar.classList.contains("animate")) {
      const width = bar.getAttribute("data-width");
      bar.style.setProperty("--w", width + "%");
      bar.classList.add("animate");
    }
  });
};

window.addEventListener("scroll", animateSkills);
animateSkills(); // on load

/* ===========================
   Contact Form Validation
   =========================== */
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", e => {
  e.preventDefault(); // stop real submit

  // Reset old errors
  document.querySelectorAll(".error").forEach(err => (err.textContent = ""));

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  let valid = true;

  if (name === "") {
    showError("name", "Name is required.");
    valid = false;
  }

  if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email.");
    valid = false;
  }

  if (message === "") {
    showError("message", "Message can't be empty.");
    valid = false;
  }

  if (valid) {
    // Here you would normally send data to server
    alert("Thank you! Your message has been sent.");
    contactForm.reset();
  }
});

function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorEl = field.parentElement.querySelector(".error");
  errorEl.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}