document.addEventListener("DOMContentLoaded", function () {
  const register_form = document.getElementById("register-place-form");

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  register_form.addEventListener("submit", async function (event) {
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
      amenities: amenities
    };

    console.log("Submitting place data:", placeData); // Debugging log
    console.log("Final Payload Sent:", JSON.stringify(placeData, null, 2));

    try {
      const response = await fetch("/api/v1/places/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(placeData),
      });

      console.log("Register place response status:", response.status); // Debugging log

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(`Error: ${errorData.msg}`);
        return;
      }

      const user_data = await response.json();
      console.log("Place registered successfully:", user_data);

      // Redirect to the login page
      window.location.href = "/HBnB/";
    } catch (error) {
      console.error("Error during registration:", error);
    }
  });
});
