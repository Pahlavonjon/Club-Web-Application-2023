window.addEventListener("load", function() {
  var button = document.getElementById("RSVP");
  var buttonText = localStorage.getItem("buttonText");
  if (buttonText) {
    button.innerHTML = buttonText;
  }
});

var eventsData = JSON.parse(localStorage.getItem("eventsData")) || [];

function saveEventsData() {
  localStorage.setItem("eventsData", JSON.stringify(eventsData));
}

function generateCommentsHTML(comments) {
  return comments.map(function(comment) {
    return `
      <div class="comment">
        <p>${comment.text}</p>
        <p>${comment.timestamp}</p>
      </div>
    `;
  }).join("");
}

function generateEventHTML(event) {
  var eventDateTime = new Date(event.dateTime);
  var day = eventDateTime.getDate().toString().padStart(2, '0');
  var month = (eventDateTime.getMonth() + 1).toString().padStart(2, '0');
  var year = eventDateTime.getFullYear().toString();
  var time = eventDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return `
    <div class="event" id="event_${event.id}">
      <button class="RSVP" onclick="rsvp(this)">RSVP</button>
      <h2>${event.title}</h2>
      <p>Date: ${day}/${month}/${year}, Time: ${time}</p>
      <p>${event.description}</p>
      <p class="timestamp">${event.timestamp}</p>
      <div class="comments-section">
        <h3>Comments</h3>
        ${generateCommentsHTML(event.comments)}
        <input type="text" id="commentInput_${event.id}" placeholder="Add a comment">
        <button onclick="addComment(${event.id})">Add Comment</button>
      </div>
    </div>
  `;
}

function rsvp(button) {
  if (button.innerHTML === "RSVP") {
    button.innerHTML = "Going!";
  } else {
    button.innerHTML = "RSVP";
  }

  localStorage.setItem("buttonText", button.innerHTML);
}

function displayEvents() {
  var eventContainer = document.getElementById("eventContainer");
  eventContainer.innerHTML = "";

  var reversedEventsData = eventsData.slice().reverse();

  reversedEventsData.forEach(function(event) {
    var eventHTML = generateEventHTML(event);
    eventContainer.innerHTML += eventHTML;
  });
}

function addComment(eventId) {
  var commentInput = document.getElementById("commentInput_" + eventId);
  var commentText = commentInput.value.trim();

  if (commentText !== "") {
    var eventItem = eventsData.find(function(event) {
      return event.id === eventId;
    });

    if (eventItem) {
      var comment = {
        text: commentText,
        timestamp: new Date().toLocaleString(),
      };

      eventItem.comments.push(comment);
      saveEventsData();

      var commentsSection = document.getElementById("event_" + eventId).querySelector(".comments-section");
      var newCommentHTML = generateCommentsHTML([comment]);
      commentsSection.insertAdjacentHTML("beforeend", newCommentHTML);

      commentInput.value = "";
    }
  }
}

displayEvents();
