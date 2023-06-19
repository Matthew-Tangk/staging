document.addEventListener("DOMContentLoaded", function () {
  var toggles = document.querySelectorAll(".toggle");

  toggles.forEach(function (toggle) {
    toggle.addEventListener("change", function () {
      var statusElement = toggle
        .closest(".eventDetails")
        .querySelector(".status");
      if (toggle.checked) {
        statusElement.textContent = "Status: attending";
        console.log("attending");
      } else {
        statusElement.textContent = "Status: rejected";
        console.log("rejected");
      }
    });

    // Initial status check
    var statusElement = toggle
      .closest(".eventDetails")
      .querySelector(".status");
    if (!toggle.checked) {
      statusElement.textContent = "Status: rejected";
    }
  });
});
