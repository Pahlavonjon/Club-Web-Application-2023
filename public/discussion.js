// Retrieve events
var events = JSON.parse(localStorage.getItem('events')) || [];
var eventContainer = document.getElementById("eventContainer");

// Clear
function clearEventContainer() {
  eventContainer.innerHTML = '';
}

// comment
function createCommentElement(comment) {
  var commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  var timestampElement = document.createElement("span");
  timestampElement.classList.add("timestamp");
  timestampElement.textContent = comment.timestamp;
  commentElement.appendChild(timestampElement);

  var commentTextElement = document.createElement("p");
  commentTextElement.textContent = comment.text;
  commentElement.appendChild(commentTextElement);

  return commentElement;
}

// new comment
function postComment(e) {
    var commentText = e.target.previousElementSibling.value;
    var timestamp = new Date().toLocaleString();

    var eventElement = e.target.closest(".event");
    var eventIndex = Array.from(eventContainer.children).indexOf(eventElement);

    // copy event
    var updatedEvent = Object.assign({}, events[eventIndex]);

    // new comment
    var newComment = {
      text: commentText,
      timestamp: timestamp
    };

    // Update comments
    updatedEvent.comments.push(newComment);

    // Update events
    events[eventIndex] = updatedEvent;

    localStorage.setItem('events', JSON.stringify(events));

    var commentElement = createCommentElement(newComment);
    eventElement.querySelector(".comment-section").appendChild(commentElement);

    e.target.previousElementSibling.value = "";
}

// Create event
function createEventElement(event) {
  var eventElement = document.createElement("div");
  eventElement.classList.add("event");

  var titleElement = document.createElement("h3");
  titleElement.textContent = event.title;
  eventElement.appendChild(titleElement);

  var eventTextElement = document.createElement("p");
  eventTextElement.textContent = event.text;
  eventElement.appendChild(eventTextElement);

  var timestampElement = document.createElement("span");
  timestampElement.classList.add("timestamp");
  timestampElement.textContent = event.timestamp;
  eventElement.appendChild(timestampElement);

  var commentSection = document.createElement("div");
  commentSection.classList.add("comment-section");

  var commentInput = document.createElement("input");
  commentInput.setAttribute("type", "text");
  commentInput.setAttribute("placeholder", "Add a comment...");
  commentSection.appendChild(commentInput);

  var commentButton = document.createElement("button");
  commentButton.textContent = "Post Comment";
  commentSection.appendChild(commentButton);

  // event listener
  commentButton.addEventListener("click", function(e) {
    postComment(e);
  });

  eventElement.appendChild(commentSection);

  event.comments.forEach(function(comment) {
    var commentElement = createCommentElement(comment);
    commentSection.appendChild(commentElement);
  });

  return eventElement;
}

// Display events
function displayEvents() {
  clearEventContainer();

  events.forEach(function(event) {
    var eventElement = createEventElement(event);
    eventContainer.appendChild(eventElement);
  });
}

// Post new event
function postEvent() {
  var eventTitle = document.getElementById("eventTitleInput").value;
  var eventText = document.getElementById("eventInput").value;
  var timestamp = new Date().toLocaleString();

  var newEvent = {
    title: eventTitle,
    text: eventText,
    timestamp: timestamp,
    comments: []
  };

  events.push(newEvent);
  localStorage.setItem('events', JSON.stringify(events));

  document.getElementById("eventTitleInput").value = "";
  document.getElementById("eventInput").value = "";

  displayEvents();
}


// Load existing events
displayEvents();
