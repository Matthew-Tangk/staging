document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");
  var toggles = document.querySelectorAll(".ticket .toggle");

  toggles.forEach(function (toggle) {
    toggle.addEventListener("change", function () {
      var statusElement = toggle
        .closest(".eventDetails")
        .querySelector(".status");
      var ticketId = toggle.closest(".ticket").id;
      var status = toggle.checked ? "attending" : "rejected";

      statusElement.textContent = "Status: " + status;

      updateStatus(ticketId, status);
      console.log(status);
    });

    // Initial status check
    var statusElement = toggle
      .closest(".eventDetails")
      .querySelector(".status");
    if (!toggle.checked) {
      statusElement.textContent = "Status: rejected";
    }
  });

  function updateStatus(ticketId, status) {
    var route = "/updateStatus/" + ticketId.replace("ticket", "");

    fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }), // Send the status in the request body
    })
      .then(function (response) {
        if (response.ok) {
          console.log("Status updated successfully");
        } else {
          console.log("Failed to update status.");
        }
      })
      .catch(function (error) {
        console.log("An error occurred:", error);
      });
  }
});
