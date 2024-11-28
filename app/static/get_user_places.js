document.addEventListener("DOMContentLoaded", function () {
  const placesList = document.getElementById("places-list");

  window.allUserPlaces = [];

  // Function to get a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Function to fetch places
  async function fetchPlaces() {
    const token = getCookie("jwt_token");
    const userId = getCookie("user_id");
    console.log("Token:", token); // Debug log
    console.log("User ID:", userId); // Debug log

    try {
      const response = await fetch(`/api/v1/users/${userId}/places`, {
        method: "GET",
      });

      console.log("Fetch response status:", response.status); // Debug log

      if (!response.ok) {
        console.error("Failed to fetch places:", await response.text());
        return;
      }

      const places = await response.json();
      console.log("Fetched places:", places); // Debug log
      window.allUserPlaces = places;
      renderPlaces(places);

    } catch (error) {
      console.error("Error fetching places:", error);
      alert("User not logged in. Please go to login page.");
    }
  }

  // Function to delete a place
  async function deletePlace(placeID) {
    const token = getCookie("jwt_token");

    if (!placeID) {
      console.error("Place ID is missing");
      return;
    }

    try {
      const response = await fetch(`/api/v1/places/${placeID}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("Place delete response status:", response.status); // Debug log

      if (!response.ok) {
        console.error("Failed to delete place");
        alert("Failed to delete place:", error);
        return;
      }

    } catch (error) {
      console.error("Error deleting place:", error);
    }
  }

  // Function to render places
  function renderPlaces(places) {
    const userId = getCookie("user_id");
    placesList.innerHTML = "";
    places.forEach((place) => {
      const placeCard = document.createElement("div");
      placeCard.classList.add("place-card");

      const placeImage = document.createElement("img");
      placeImage.src = `/static/images/beach-house.jpeg`;
      placeImage.alt = place.name;
      placeImage.classList.add("place-image");

      const placeTitle = document.createElement("h3");
      placeTitle.textContent = place.title;

      const placePrice = document.createElement("p");
      placePrice.innerHTML = `<strong>Price per night:</strong> ${place.price} €`;

      const placeLocation = document.createElement("p");
      placeLocation.innerHTML = `<strong>Location:</strong> ${place.city_id}`;

      const detailsButton = document.createElement("button");
      detailsButton.textContent = "View Details";
      detailsButton.classList.add("details-button");
      detailsButton.addEventListener("click", function () {
        window.location.href = `/HBnB/place?id=${place.id}`;
      });

      const updateButton = document.createElement("button");
      updateButton.textContent = "Update place";
      updateButton.classList.add("update-place-button");
      updateButton.addEventListener("click", function () {
        window.location.href = `/HBnB/places/${place.id}/update_place`;
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete place";
      deleteButton.classList.add("delete-place-button");
      deleteButton.addEventListener("click", function () {
        const userChoice = confirm(
          "Are you sure you want to delete this place?"
        );
        if (userChoice) {
          console.log("User chose OK");
          deletePlace(place.id);
        } else {
          console.log("User chose Cancel");
        }
        
        window.location.href = `/HBnB/${userId}/my_account`;
      });

      placeCard.appendChild(placeTitle);
      placeCard.appendChild(placeImage);
      placeCard.appendChild(placePrice);
      placeCard.appendChild(placeLocation);
      placeCard.appendChild(detailsButton);
      placeCard.appendChild(updateButton);
      placeCard.appendChild(deleteButton);

      placesList.appendChild(placeCard);
    });
  }

  fetchPlaces();

  // Expose the renderPlaces function globally
  window.renderPlaces = renderPlaces;
});
