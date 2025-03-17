// DOM Elements
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navMenu = document.getElementById("navMenu");
const navMenuOverlay = document.getElementById("navMenuOverlay");
const toast = document.getElementById("toast");
const toastIcon = document.getElementById("toastIcon");
const toastMessage = document.getElementById("toastMessage");
const toastClose = document.getElementById("toastClose");

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Set up hamburger menu
  hamburgerMenu.addEventListener("click", toggleNavMenu);
  navMenuOverlay.addEventListener("click", closeNavMenu);

  // Set up toast close button
  toastClose.addEventListener("click", hideToast);

  // Set active nav link
  setActiveNavLink();
});

// Theme toggle functionality
function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateThemeToggle();
}

function updateThemeToggle() {
  const isLight = document.body.classList.contains("light-theme");
  document.getElementById("theme-icon").textContent = isLight ? "☀️" : "🌙";
  document.getElementById("theme-text").textContent = isLight
    ? "Light Mode"
    : "Dark Mode";
}

// Toggle navigation menu
function toggleNavMenu() {
  hamburgerMenu.classList.toggle("open");
  navMenu.classList.toggle("open");
  navMenuOverlay.classList.toggle("open");

  // Add event listener to close nav menu when clicking outside
  document.addEventListener("click", closeNavMenuOutside);
}

// Close navigation menu
function closeNavMenu() {
  hamburgerMenu.classList.remove("open");
  navMenu.classList.remove("open");
  navMenuOverlay.classList.remove("open");

  // Remove event listener
  document.removeEventListener("click", closeNavMenuOutside);
}

// Close nav menu when clicking outside
function closeNavMenuOutside(event) {
  if (
    !navMenu.contains(event.target) &&
    !hamburgerMenu.contains(event.target)
  ) {
    closeNavMenu();
  }
}

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-menu-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Show toast notification
function showToast(message, type = "success") {
  // Set toast icon based on type
  let icon = "";

  switch (type) {
    case "success":
      icon = "✅";
      break;
    case "error":
      icon = "❌";
      break;
    case "warning":
      icon = "⚠️";
      break;
    default:
      icon = "ℹ️";
  }

  toastIcon.textContent = icon;
  toastMessage.textContent = message;

  // Remove existing classes
  toast.classList.remove("success", "error", "warning");

  // Add new class
  toast.classList.add(type);

  // Show toast
  toast.classList.add("show");

  // Hide toast after 3 seconds
  setTimeout(hideToast, 3000);
}

// Hide toast notification
function hideToast() {
  toast.classList.remove("show");
}

// Replace all alert() calls with showToast()
window.originalAlert = window.alert;
window.alert = function (message) {
  showToast(message, "warning");
};
