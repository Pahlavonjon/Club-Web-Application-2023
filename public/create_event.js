// Retrieve events
var eventsData = JSON.parse(localStorage.getItem("eventsData")) || [];

// save events
function saveEventsData() {
  localStorage.setItem("eventsData", JSON.stringify(eventsData));
}

// redirect to main
function redirectToMainPage() {
  window.location.href = "events.html";
}

// Event listener
document.getElementById("eventForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Retrieve details
  var eventTitle = document.getElementById("eventTitle").value;
  var eventDescription = document.getElementById("eventDescription").value;
  var eventDate = document.getElementById("eventDate").value;
  var eventTime = document.getElementById("eventTime").value;

  // Create new event
  var newEvent = {
    id: eventsData.length + 1,
    title: eventTitle,
    description: eventDescription,
    timestamp: new Date().toLocaleString(),
    dateTime: `${eventDate} ${eventTime}`,
    comments: []
  };

  // Add new event
  eventsData.push(newEvent);

  // Save events
  saveEventsData();

  // Redirect tom main
  redirectToMainPage();
});
