// Custom Cursor
const cursorDot = document.getElementById("cursorDot");
const cursorOutline = document.getElementById("cursorOutline");

document.addEventListener("mousemove", (e) => {
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";

  cursorOutline.style.left = e.clientX + "px";
  cursorOutline.style.top = e.clientY + "px";
});

// Cursor hover effects
const interactiveElements = document.querySelectorAll(
  "a, button, .project-card, .skill-tag"
);
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.style.transform = "scale(2)";
    cursorOutline.style.transform = "scale(1.5)";
  });

  el.addEventListener("mouseleave", () => {
    cursorDot.style.transform = "scale(1)";
    cursorOutline.style.transform = "scale(1)";
  });
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY / scrollHeight;
  scrollProgress.style.transform = `scaleX(${scrolled})`;
});

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all elements with data-scroll attribute
document.querySelectorAll("[data-scroll]").forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(el);
});

// Smooth scroll for navigation
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Navbar active state
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.background = "";
    if (link.getAttribute("href").slice(1) === current) {
      link.style.background = "rgba(255, 255, 255, 0.2)";
    }
  });
});

// Form submission
function handleSubmit(e) {
  e.preventDefault();
  alert("Thank you for your message! This is a demo form.");
  e.target.reset();
}

// Parallax effect on hero
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-content");
  const scrolled = window.scrollY;
  // Cek jika hero ada sebelum memanipulasi style
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 500;
  }
});

// Random skill tag animations
const skillTags = document.querySelectorAll(".skill-tag");
skillTags.forEach((tag, index) => {
  tag.style.transitionDelay = `${index * 0.05}s`;
});
