const pages = [
  "index.html",
  "about.html",
  "form.html"
];

function getCurrentPageIndex() {
  const path = window.location.pathname.split("/").pop();
  return pages.indexOf(path);
}

let lastScroll = 0;
let isThrottled = false;

function handleScroll(e) {
  if (isThrottled) return;
  isThrottled = true;
  setTimeout(() => { isThrottled = false; }, 900); // prevent rapid fire

  const delta = e.deltaY || e.detail || e.wheelDelta;
  const idx = getCurrentPageIndex();
  if (delta > 0 && idx < pages.length - 1) {
    // Scroll down
    window.location.href = pages[idx + 1];
  } else if (delta < 0 && idx > 0) {
    // Scroll up
    window.location.href = pages[idx - 1];
  }
}

window.addEventListener("wheel", handleScroll, { passive: false });
window.addEventListener("keydown", function(e) {
  const idx = getCurrentPageIndex();
  if (e.key === "ArrowDown" && idx < pages.length - 1) {
    window.location.href = pages[idx + 1];
  } else if (e.key === "ArrowUp" && idx > 0) {
    window.location.href = pages[idx - 1];
  }
});