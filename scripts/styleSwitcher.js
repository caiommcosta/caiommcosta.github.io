document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const iconElement = toggleBtn.querySelector("i");

  // Verificar preferência salva no LocalStorage
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    htmlElement.setAttribute("data-theme", "dark");
    updateIcon(true);
  } else {
    htmlElement.setAttribute("data-theme", "light");
    updateIcon(false);
  }

  toggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Atualiza atributo HTML
    htmlElement.setAttribute("data-theme", newTheme);

    // Salva preferência
    localStorage.setItem("theme", newTheme);

    // Atualiza ícone
    updateIcon(newTheme === "dark");
  });

  function updateIcon(isDark) {
    // Remove classes antigas
    iconElement.classList.remove("ph-moon", "ph-sun");

    if (isDark) {
      iconElement.classList.add("ph-sun");
    } else {
      iconElement.classList.add("ph-moon");
    }
  }
});
