const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".order__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".event__content", {
  duration: 1000,
});
// Get the toggle button
const toggleButton = document.getElementById('mode-toggle');
const body = document.body;
const modeIconMoon = toggleButton.querySelector('.ri-moon-line');
const modeIconSun = toggleButton.querySelector('.ri-sun-line');
const modeText = toggleButton.querySelector('.mode-text');

// Add an event listener to the toggle button
toggleButton.addEventListener('click', () => {
  // Toggle the dark mode class on the body element
  body.classList.toggle('dark-mode');

  // Update the color properties
  if (body.classList.contains('dark-mode')) {
    body.style.backgroundColor = '#333';
    body.style.color = '#fff';
  } else {
    body.style.backgroundColor = '#fff';
    body.style.color = '#333';
  }

  // Toggle the icon and text
  if (body.classList.contains('dark-mode')) {
    modeIconMoon.style.display = 'none';
    modeIconSun.style.display = 'inline-block';
    modeText.textContent = 'Switch to Light Mode';
  } else {
    modeIconMoon.style.display = 'inline-block';
    modeIconSun.style.display = 'none';
    modeText.textContent = 'Switch to Dark Mode';
  }
});