(function () {
  var feeds = document.querySelectorAll("[data-news-feed]");

  feeds.forEach(function (feed) {
    var items = Array.prototype.slice.call(feed.querySelectorAll("[data-news-item]"));
    var button = feed.querySelector("[data-news-more]");
    var step = Number.parseInt(feed.getAttribute("data-news-step") || "3", 10);
    var revealedCount = 0;

    if (!button || !items.length) {
      return;
    }

    items.forEach(function (item) {
      if (item.getAttribute("data-news-hidden") === "true") {
        item.hidden = true;
        item.classList.add("is-hidden");
      } else {
        revealedCount += 1;
      }
    });

    function updateButton() {
      var remaining = items.length - revealedCount;
      if (remaining <= 0) {
        button.hidden = true;
        return;
      }

      button.hidden = false;
      var nextCount = Math.min(step, remaining);
      button.setAttribute("aria-label", "Show " + nextCount + " more news items");
    }

    button.addEventListener("click", function () {
      var nextTarget = Math.min(revealedCount + step, items.length);

      while (revealedCount < nextTarget) {
        items[revealedCount].hidden = false;
        items[revealedCount].classList.remove("is-hidden");
        revealedCount += 1;
      }

      updateButton();
    });

    updateButton();
  });
})();
