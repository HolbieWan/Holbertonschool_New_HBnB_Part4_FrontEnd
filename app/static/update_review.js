document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("review-form");
  const reviewText = document.getElementById("review-text");
  const reviewRating = document.getElementById("review-rating");

  // Function to get a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  // Function to get reviewId from Url
  function getReviewId() {
    const pathParts = window.location.pathname.split("/");
    return pathParts[4];
  }

  // Function to get placeId from Url
  function getPlaceId() {
    const pathParts = window.location.pathname.split("/");
    return pathParts[3];
  }

  // Function to update the review in DB
  reviewForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = getCookie("jwt_token");
    const userId = getCookie("user_id");
    const placeId = getPlaceId();
    const reviewId = getReviewId();

    if (!token) {
      console.error("User is not logged in");
      window.location.href = "/login";
      return;
    }

    if (!reviewId) {
      console.error("Review ID is missing");
      return;
    }
      
    if (!placeId) {
      console.error("Place ID is missing");
      console.log("Current cookies:", document.cookie); // Debug log
      return;
    }

    const reviewData = {
      user_id: userId,
      text: reviewText.value,
      rating: parseInt(reviewRating.value, 10),
      place_id: placeId,
    };

    console.log("Submitting review data:", reviewData); // Debug log
    console.log("JWT token:", token); // Debug log

    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      console.log("Submit review response status:", response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to submit updated review:", errorText);
        return;
      }

      const updatedReview = await response.json();
      console.log("Review submitted:", updatedReview);

      // Clear the form
      reviewText.value = "";
      reviewRating.value = "";

      // Redirect to my_account page
      window.location.href = `/HBnB/${userId}/my_account`;

    } catch (error) {
      console.error("Error updating review:", error);
    }
  });
});
