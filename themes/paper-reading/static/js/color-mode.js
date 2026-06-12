(function () {
  var buttons = document.querySelectorAll("[data-color-mode-switch]");
  var currentMode = document.documentElement.getAttribute("data-color-mode") || "light";
  var nav = document.querySelector(".site-nav");
  var navLinks = nav ? nav.querySelectorAll("a") : [];

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
        window.setTimeout(function () {
          window.location.href = targetUrl.href;
        }, 180);
      });
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyMode(button.getAttribute("data-color-mode-switch"));
    });
  });

  applyMode(currentMode);
  setupNavTransition();
})();
