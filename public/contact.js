document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch("submit_contact_form.php", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Form is successfully submitted!!!!!");
        window.location.href = "homepage.html";
      } else {
        console.error("Form submission FAILED, something went wrong");
      }
    })
    .catch(error => {
      console.error("Error try again", error);
    });
  });
