
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("officialOverlay");
  const modal = overlay?.querySelector(".official-modal");
  const closeButton = document.getElementById("closeOfficialNotice");
  const dismissButton = document.getElementById("dismissOfficialNotice");

  if (!overlay || !modal || !closeButton || !dismissButton) {
    return;
  }

  let previousFocus = null;

  function openNotice() {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    modal.focus();
  }

  function closeNotice() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    previousFocus?.focus();
  }

  closeButton.addEventListener("click", closeNotice);
  dismissButton.addEventListener("click", closeNotice);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeNotice();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (overlay.hidden) return;

    if (event.key === "Escape") {
      closeNotice();
      return;
    }

    if (event.key === "Tab") {
      const focusable = [
        ...modal.querySelectorAll(
          'button:not([disabled]), a[href]'
        )
      ].filter((element) => element.getClientRects().length);

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Show once per browser tab session
  if (!sessionStorage.getItem("bixoplayNoticeSeen")) {
    openNotice();
    sessionStorage.setItem("bixoplayNoticeSeen", "true");
  }
});
