document.addEventListener("DOMContentLoaded", async function () {
  const amenitiesDropdown = document.getElementById("amenities");

  try {
    const response = await fetch("/api/v1/amenities"); 
    if (!response.ok) {
      throw new Error("Failed to fetch amenities");
    }
    const amenities = await response.json();

    amenities.forEach((amenity) => {
      const option = document.createElement("option");
      option.value = amenity.id;
      option.textContent = amenity.name;
      amenitiesDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching amenities:", error);
  }
});
