(function () {
  var feeds = document.querySelectorAll("[data-expandable-feed]");

  Array.prototype.forEach.call(feeds, function (feed) {
    var items = Array.prototype.slice.call(feed.querySelectorAll("[data-expandable-item]"));
    var button = feed.querySelector("[data-expandable-more]");
    var step = parseInt(feed.getAttribute("data-expandable-step") || "3", 10);
    var revealedCount = 0;

    if (!button || !items.length) {
      return;
    }

    items.forEach(function (item) {
      if (item.getAttribute("data-expandable-hidden") === "true") {
        item.hidden = true;
        item.classList.add("is-hidden");
      } else {
        revealedCount += 1;
      }
    });

    function updateButton() {
      var remaining = items.length - revealedCount;
      button.hidden = remaining <= 0;
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
