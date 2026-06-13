(function () {
  var buttons = document.querySelectorAll("[data-color-mode-switch]");
  var currentMode = document.documentElement.getAttribute("data-color-mode") || "light";
  var nav = document.querySelector(".site-nav");
  var navLinks = nav ? nav.querySelectorAll("a") : [];
  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var navTransitionKey = "nav-transition";

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
        nav.dataset.activeIndex = String(Array.prototype.indexOf.call(navLinks, link) + 1);
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

  function getNavIndexForUrl(url) {
    if (!nav) return null;
    var targetUrl = new URL(url, window.location.href);
    var targetPath = targetUrl.pathname;

    for (var index = 0; index < navLinks.length; index += 1) {
      var linkUrl = new URL(navLinks[index].href, window.location.href);
      if (linkUrl.pathname === "/") {
        if (targetPath === "/") return index + 1;
      } else if (targetPath.indexOf(linkUrl.pathname) === 0) {
        return index + 1;
      }
    }

    return null;
  }

  function rememberPageTransition(event) {
    var link = event.target.closest ? event.target.closest("a[href]") : null;
    if (!link || !nav) return;
    if (link.closest && link.closest(".site-nav")) return;
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target && link.target !== "_self") return;

    var targetUrl = new URL(link.href, window.location.href);
    if (targetUrl.origin !== window.location.origin) return;
    if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) return;

    var fromIndex = Number(nav.dataset.activeIndex || getNavIndexForUrl(window.location.href));
    var toIndex = getNavIndexForUrl(targetUrl.href);
    if (!fromIndex || !toIndex || fromIndex === toIndex) return;

    try {
      sessionStorage.setItem(navTransitionKey, JSON.stringify({ from: fromIndex, to: toIndex }));
    } catch (error) {}
  }

  function playPendingPageTransition() {
    if (!nav) return;

    var currentIndex = Number(nav.dataset.activeIndex || getNavIndexForUrl(window.location.href));
    var transition = null;

    try {
      transition = JSON.parse(sessionStorage.getItem(navTransitionKey));
      sessionStorage.removeItem(navTransitionKey);
    } catch (error) {}

    if (!transition || transition.to !== currentIndex || transition.from === currentIndex) return;

    nav.classList.add("nav-no-transition");
    nav.dataset.activeIndex = String(transition.from);
    nav.offsetHeight;

    window.requestAnimationFrame(function () {
      nav.classList.remove("nav-no-transition");
      nav.dataset.activeIndex = String(currentIndex);
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
  document.addEventListener("click", rememberPageTransition, true);
  playPendingPageTransition();
})();
