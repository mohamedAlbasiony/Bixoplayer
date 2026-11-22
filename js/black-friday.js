
document.addEventListener("DOMContentLoaded", () => {
  const widget = document.getElementById("bf2026Widget");
  const details = document.getElementById("bf2026Details");
  const toggle = document.getElementById("bf2026Toggle");
  const close = document.getElementById("bf2026Close");
  const open = document.getElementById("bf2026Open");

  if (!widget || !details || !toggle) return;

  const whatsappNumber = "966539677087";

  // Set the real offer deadline here, including timezone.
  // Example format: 2026-11-30T23:59:59+03:00
  const offerDeadline = "";

  const expiry = offerDeadline
    ? new Date(offerDeadline).getTime()
    : null;

  const validDeadline =
    expiry !== null && Number.isFinite(expiry);

  function openOffers() {
    details.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    details.scrollTop = 0;
  }

  function closeOffers() {
    details.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    if (details.hidden) {
      openOffers();
    } else {
      closeOffers();
    }
  });

  close?.addEventListener("click", closeOffers);

  open?.addEventListener("click", openOffers);

  // WhatsApp subscription links
  document.querySelectorAll("[data-bf-years]").forEach(link => {
    const years = link.dataset.bfYears;
    const price = link.dataset.bfPrice;

    const message =
      `أهلًا BIXOPLAY 👋\n\n` +
      `أنا جاي من موقع bixoplay.net\n` +
      `وعايز أشترك في عرض Black Friday.\n\n` +
      `الباقة: PRO\n` +
      `المدة: ${years} سنة\n` +
      `السعر: ${price} دولار\n\n` +
      `ممكن أعرف خطوات الاشتراك؟`;

    link.href =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(message);

    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // Countdown
  const timer = document.querySelector(".bf2026-timer");

  if (!validDeadline) {
    if (timer) {
      timer.innerHTML =
        "<span>LIMITED-TIME OFFER</span>";
    }
    return;
  }

  function updateCountdown() {
    const remaining = Math.max(0, expiry - Date.now());

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining / 3600000) % 24);
    const minutes = Math.floor((remaining / 60000) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    const values = {
      bfDays: days,
      bfHours: hours,
      bfMinutes: minutes,
      bfSeconds: seconds
    };

    Object.entries(values).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = String(value).padStart(2, "0");
      }
    });

    if (remaining === 0) {
      if (timer) timer.textContent = "OFFER ENDED";

      document.querySelectorAll("[data-bf-years]")
        .forEach(link => {
          link.removeAttribute("href");
          link.removeAttribute("target");
          link.setAttribute("aria-disabled", "true");
        });

      clearInterval(interval);
    }
  }

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
});
