// NetBSD México — interacciones mínimas, sin dependencias.
(() => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav-principal");

  // --- Tema -------------------------------------------------------------
  const storedTheme = localStorage.getItem("tema");
  if (storedTheme === "claro" || storedTheme === "oscuro") {
    root.dataset.theme = storedTheme;
  }

  const isDark = () =>
    root.dataset.theme
      ? root.dataset.theme === "oscuro"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

  const updateThemeLabel = () => {
    if (!themeToggle) return;
    const dark = isDark();
    themeToggle.setAttribute(
      "aria-label",
      dark ? "Activar tema claro" : "Activar tema oscuro"
    );
    themeToggle.setAttribute("title", dark ? "Tema claro" : "Tema oscuro");
    themeToggle.setAttribute("aria-pressed", String(dark));
  };

  if (themeToggle) {
    updateThemeLabel();
    themeToggle.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "claro" : "oscuro";
      try {
        localStorage.setItem("tema", root.dataset.theme);
      } catch (e) {
        // Sin almacenamiento disponible: el tema se mantiene en esta sesión.
      }
      updateThemeLabel();
    });
  }

  // --- Navegación móvil --------------------------------------------------
  const closeMenu = () => {
    if (!header || !menuToggle) return;
    header.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    nav?.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  // --- Copiar bloques de código -----------------------------------------
  const copyLabel = "Copiar";
  const copiedLabel = "Copiado";

  document.querySelectorAll(".prose .highlight").forEach((block) => {
    const code = block.querySelector("pre code");
    if (!code || !navigator.clipboard) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code";
    button.textContent = copyLabel;
    button.setAttribute("aria-label", "Copiar código al portapapeles");

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        button.textContent = copiedLabel;
        button.classList.add("is-copied");
        window.setTimeout(() => {
          button.textContent = copyLabel;
          button.classList.remove("is-copied");
        }, 1800);
      } catch {
        button.textContent = "Error";
        window.setTimeout(() => {
          button.textContent = copyLabel;
        }, 1800);
      }
    });

    block.appendChild(button);
  });
})();
