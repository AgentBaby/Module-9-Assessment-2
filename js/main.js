$(function () {

  // Footer year
  $("#year").text(new Date().getFullYear());

  // If a photo file is missing, remove it so the emoji placeholder shows instead
  $(".photo img").each(function () {
    var img = this;
    function drop() { $(img).remove(); }
    $(img).on("error", drop);
    if (img.complete && img.naturalWidth === 0) { drop(); }
  });

  // Filter reviews by city
  $(".btn-filter").on("click", function () {
    var city = $(this).data("city");
    $(".btn-filter").removeClass("active");
    $(this).addClass("active");

    $(".review").each(function () {
      var show = city === "all" || $(this).data("city") === city;
      $(this).toggleClass("hidden-review", !show);
    });
  });

  // Fill the review modal from the clicked card
  $("#reviewModal").on("show.bs.modal", function (event) {
    var $card = $(event.relatedTarget);
    var rating = parseInt($card.data("rating"), 10);
    var stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    var $photo = $card.find(".photo").clone();

    $("#modalTitle").text($card.data("title"));
    $("#modalCity").text($card.data("city"));
    $("#modalStars").text(stars).attr("aria-label", rating + " out of 5");
    $("#modalText").text($card.data("text"));
    $("#modalPhoto").attr("data-emoji", $photo.attr("data-emoji")).empty().append($photo.find("img"));
  });

  // Let keyboard users open cards with Enter or Space
  $(".ff-card").on("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      $(this).trigger("click");
    }
  });

  // Close the mobile menu after choosing a link
  $("#mainNav .nav-link").on("click", function () {
    var $nav = $("#mainNav");
    if ($nav.hasClass("show")) {
      bootstrap.Collapse.getOrCreateInstance($nav[0]).hide();
    }
  });

  // Subscribe form validation
  $("#subscribeForm").on("submit", function (e) {
    e.preventDefault();
    var $email = $("#email");
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($email.val().trim());

    $email.toggleClass("is-invalid", !valid);
    if (valid) {
      $(this).addClass("d-none");
      $("#subscribeMsg").removeClass("d-none");
    }
  });
});
