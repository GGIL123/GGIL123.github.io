const toggleBtn = document.querySelector(".menu-toggle");
const dropdown = document.querySelector(".dropdown");

toggleBtn.addEventListener("click", () => {
  dropdown.classList.toggle("open");
});
