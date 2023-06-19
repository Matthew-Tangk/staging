document.addEventListener("DOMContentLoaded", function () {
  var toggles = document.querySelectorAll(".toggle");

  toggles.forEach(function (toggle) {
    toggle.addEventListener("change", function () {
      var statusElement = toggle
        .closest(".eventDetails")
        .querySelector(".status");
      if (toggle.checked) {
        statusElement.textContent = "Status: attending";
        sendStatusToServer("attending"); // Call a function to send status to the server
      } else {
        statusElement.textContent = "Status: rejected";
        sendStatusToServer("rejected"); // Call a function to send status to the server
      }
    });

    // Initial status check
    var statusElement = toggle
      .closest(".eventDetails")
      .querySelector(".status");
    if (!toggle.checked) {
      statusElement.textContent = "Status: rejected";
      sendStatusToServer("rejected"); // Call a function to send status to the server
    }
  });

  // Function to send status to the server
  function sendStatusToServer(status) {
    fetch("/concertbuddies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
});
