document.addEventListener("DOMContentLoaded", function () {
  const langButton = document.getElementById("langButton");
  const langMenu = document.getElementById("langMenu");
  const terminalsButton = document.getElementById("terminalsButton");
  const terminalsMenu = document.getElementById("terminalsMenu");

  function toggleMenu(menu) {
    if (menu.classList.contains("hidden")) {
      closeAllMenus();
      menu.classList.remove("hidden");
      menu.style.display = "block";
    } else {
      menu.classList.add("hidden");
      menu.style.display = "none";
    }
  }

  function closeAllMenus() {
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.classList.add("hidden");
      menu.style.display = "none";
    });
  }

  langButton.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMenu(langMenu);
  });

  terminalsButton.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMenu(terminalsMenu);
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".lang-switcher") &&
      !event.target.closest(".terminals-menu")
    ) {
      closeAllMenus();
    }
  });

  document
    .querySelectorAll("#langMenu li, #terminalsMenu li")
    .forEach((item) => {
      item.addEventListener("click", () => {
        closeAllMenus();
      });
    });
});
