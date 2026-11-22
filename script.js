document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const saved = localStorage.getItem("maeul-theme") || "dark";
  const applyTheme = mode => {
    const theme = mode === "system" ? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : mode;
    root.dataset.theme = theme;
    document.querySelectorAll('[name="theme"]').forEach(input => input.checked = input.value === mode);
  };
  applyTheme(saved);
  document.querySelectorAll('[name="theme"]').forEach(input => input.addEventListener("change", () => {
    localStorage.setItem("maeul-theme", input.value);
    applyTheme(input.value);
  }));
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".mobile-dock a").forEach(link => {
    if (link.dataset.page === current) link.classList.add("active");
  });
  document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(button.dataset.copy); button.textContent = "복사 완료"; }
    catch { button.textContent = "코드를 길게 눌러 복사해 주세요"; }
  }));
});
