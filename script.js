
const bookingForm = document.getElementById("booking-form");
const serviceSelect = document.getElementById("service");
const dateInput = document.getElementById("visit-date");
const message = document.getElementById("form-message");

// Display the current year in the footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Prevent visitors from choosing a date in the past
const today = new Date();
const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;

// Select the service when a visitor clicks its card link
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

// Handle the booking form

const visitTime = document.getElementById("visit-time");

// Replace with your real WhatsApp business number.
// Kenya format: 254712345678 (no + or spaces)
const businessWhatsApp = "254718668196";

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("client-name").value.trim();
  const email = document.getElementById("client-email").value.trim();
  const service = serviceSelect.value;
  const date = dateInput.value;
  const time = visitTime.value;

  if (!name || !email || !service || !date || !time) {
    message.textContent = "Please complete every field.";
    return;
  }

  if (date < localToday) {
    message.textContent = "Please choose today or a future date.";
    return;
  }

  if (businessWhatsApp.includes("X")) {
    message.textContent =
      "Please add your real WhatsApp business number in script.js.";
    return;
  }

  const bookingMessage =
    `Hello Aura Studio! I'd like to request an appointment.\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Service: ${service}\n` +
    `Preferred date: ${date}\n` +
    `Preferred time: ${time}\n\n` +
    `Please confirm availability.`;

  const whatsappURL =
    "https://wa.me/" + businessWhatsApp +
    "?text=" + encodeURIComponent(bookingMessage);

  window.open(whatsappURL, "_blank");

  message.textContent =
    "Your booking message is ready in WhatsApp. Send it to request your appointment.";
});

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");

  themeToggle.textContent = isDark ? "☀ Light" : "☾ Dark";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
});

