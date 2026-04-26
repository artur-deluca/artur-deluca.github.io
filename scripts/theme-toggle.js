(function () {
  var storageKey = "theme-preference";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");
  var mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {}
  }

  function resolveTheme() {
    var storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    if (mediaQuery && mediaQuery.matches) {
      return "dark";
    }
    return "light";
  }

  function syncToggle(theme) {
    if (!toggle) {
      return;
    }

    var icon = toggle.querySelector(".theme-toggle-icon");
    var label = toggle.querySelector(".theme-toggle-text");
    var isDark = theme === "dark";
    var actionLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

    toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    toggle.setAttribute("aria-label", actionLabel);
    toggle.setAttribute("title", actionLabel);

    if (label) {
      label.textContent = actionLabel;
    }

    if (icon) {
      icon.className = isDark ? "theme-toggle-icon fa-regular fa-sun" : "theme-toggle-icon fa-regular fa-moon";
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    syncToggle(theme);
  }

  applyTheme(resolveTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      setStoredTheme(nextTheme);
      applyTheme(nextTheme);
    });
  }

  if (mediaQuery && typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", function (event) {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? "dark" : "light");
      }
    });
  }
})();
