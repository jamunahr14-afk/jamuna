/* js/script.js */

document.addEventListener("DOMContentLoaded", () => {
  // --- Preloader ---
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 800); // Small delay to show off the preloader
  }

  // --- Dark/Light Mode Toggle ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  
  // Check local storage for theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  } else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      htmlElement.setAttribute("data-theme", "dark");
      updateThemeIcon("dark");
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === "dark") {
      themeToggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>'; // Requires Bootstrap Icons
    } else {
      themeToggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
    }
  }

  // --- Typing Animation ---
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");

  if (typedTextSpan) {
    const textArray = ["Web Developer", "Designer", "Student", "Creative Thinker"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } 
      else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } 
      else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    }

    // Start typing animation
    setTimeout(type, newTextDelay + 250);
  }

  // --- Active Nav Link Highlighting based on path ---
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach(link => {
    // Handle root vs /pages
    const linkPath = link.getAttribute("href");
    if (currentPath.endsWith(linkPath) || (currentPath.endsWith("/") && linkPath === "index.html")) {
      link.classList.add("active");
    }
  });

});

// --- Initialize AOS (Animate On Scroll) ---
// This requires AOS library to be loaded in HTML
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'slide',
    once: false,
    mirror: true
  });
}
