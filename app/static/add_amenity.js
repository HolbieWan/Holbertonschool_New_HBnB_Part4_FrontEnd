document.addEventListener("DOMContentLoaded", function () {
  const add_amenity_form = document.getElementById("add-amenity-form");
    const placeId = getPlaceId();

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  function getPlaceId() {
    const pathParts = window.location.pathname.split("/");
    return pathParts[3];
  }

  add_amenity_form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = getCookie("jwt_token");
    const userId = getCookie("user_id");
    console.log("Retrieved Token:", token); // Debugging log
    console.log("Retrieved ID", userId); // Debugging log

    if (!token) {
      console.error("Token is missing");
      alert("Please log in as admin to register a new user.");
      window.location.href = "/HBnB/login";
      return;
    }

    if (!userId) {
      console.error("User ID is missing");
      console.log("Current cookies:", document.cookie); // Debug log
      return;
    }

    const amenitiesInput = document.getElementById("amenities").value;

    // const amenities = amenitiesInput? amenitiesInput.split(",").map((item) => item.trim()): [];

    const amenityData = {
      name: amenitiesInput
    };

    console.log("Submitting amenity data:", amenityData); // Debugging log
    console.log("Final Payload Sent:", JSON.stringify(amenityData, null, 2));

    try {
      const response = await fetch(`/api/v1/places/${placeId}/amenities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(amenityData),
      });

      console.log("Register amenity response status:", response.status); // Debugging log

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(`Error: ${errorData.msg}`);
        return;
      }

      const amenity_data = await response.json();
      console.log("Amenity added successfully:", amenity_data);

      // Redirect to the login page
      window.location.href = "/HBnB/";
    } catch (error) {
      console.error("Error during registration:", error);
    }
  });
});
