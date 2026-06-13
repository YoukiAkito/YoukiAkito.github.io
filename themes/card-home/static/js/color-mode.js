(function () {
  var buttons = document.querySelectorAll("[data-color-mode-switch]");
  var currentMode = document.documentElement.getAttribute("data-color-mode") || "light";
  var nav = document.querySelector(".site-nav");
  var navLinks = nav ? nav.querySelectorAll("a") : [];
  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");

  function applyMode(mode) {
    mode = mode === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-color-mode", mode);
    try {
      localStorage.setItem("color-mode", mode);
    } catch (error) {}
    buttons.forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-color-mode-switch") === mode);
    });
  }

  function setupNavTransition() {
    if (!nav) return;
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.target && link.target !== "_self") return;

        var targetUrl = new URL(link.href, window.location.href);
        if (targetUrl.origin !== window.location.origin) return;
        if (targetUrl.href === window.location.href) return;

        event.preventDefault();
        navLinks.forEach(function (item) {
          item.classList.toggle("active", item === link);
        });
        if (header && menuToggle) {
          header.classList.remove("menu-open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
        window.setTimeout(function () {
          window.location.href = targetUrl.href;
        }, 180);
      });
    });
  }

  function setupMenuToggle() {
    if (!header || !menuToggle) return;

    menuToggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 861px) and (orientation: landscape)").matches) {
        header.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyMode(button.getAttribute("data-color-mode-switch"));
    });
  });

  applyMode(currentMode);
  setupNavTransition();
  setupMenuToggle();
})();
