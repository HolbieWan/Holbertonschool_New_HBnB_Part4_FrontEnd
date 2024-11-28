document.addEventListener("DOMContentLoaded", function () {
  const register_form = document.getElementById("register-place-form");

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

  register_form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = getCookie("jwt_token");
    const userId = getCookie("user_id");
    const placeId = getPlaceId();
    console.log("Retrieved Token:", token); // Debugging log
    console.log("Retrieved ID", userId); // Debugging log
    console.log("Retrieved placeId", placeId); // Debugging log

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
      
    if (!placeId) {
      console.error("Place ID is missing");
      console.log("Current cookies:", document.cookie); // Debug log
      return;
    }

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const amenitiesInput = document.getElementById("amenities").value;

    const amenities = amenitiesInput
      ? amenitiesInput.split(",").map((item) => item.trim())
      : [];

    const placeData = {
      title: title,
      description: description,
      price: parseFloat(price),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      owner_id: userId,
      amenities: amenities,
    };

    console.log("Submitting place data:", placeData); // Debug log
    console.log("Final Payload Sent:", JSON.stringify(placeData, null, 2));

    try {
      const response = await fetch(`/api/v1/places/${placeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(placeData),
      });

      console.log("Register place response status:", response.status); // Debug log

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(`Error: ${errorData.msg}`);
        return;
      }

      const user_data = await response.json();
      console.log("Place updated successfully:", user_data);

      // Redirect to my_account page
      window.location.href = `/HBnB/${userId}/my_account`;
      
    } catch (error) {
      console.error("Error during registration:", error);
    }
  });
});
