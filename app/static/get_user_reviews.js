document.addEventListener("DOMContentLoaded", function () {
  const reviewListSection = document.getElementById("review_list");

  // Function to get a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Function to delete a review
  async function deleteReview(reviewID) {
    const token = getCookie("jwt_token");

    if (!reviewID) {
      console.error("Place ID is missing");
      return;
    }

    try {
      const response = await fetch(`/api/v1/reviews/${reviewID}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("Place delete response status:", response.status); // Debug log

      if (!response.ok) {
        console.error("Failed to delete place");
        return;
      }
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  }

  // Function to render reviews
  function renderReviews(reviews) {
    const token = getCookie("jwt_token");
    const userId = getCookie("user_id");
    console.log("Token:", token); // Debug log
    console.log("User ID:", userId); // Debug log

    reviewListSection.innerHTML = "";
    if (reviews.length === 0) {
      const noReviews = document.createElement("p");
      noReviews.textContent = "No reviews available for this place.";
      reviewListSection.appendChild(noReviews);
    } else {
      reviews
        .filter((review) => review.user_id === userId)
        .forEach((review) => {
          const reviewCard = document.createElement("div");
          reviewCard.classList.add("review-card");

          const reviewerName = document.createElement("p");
          reviewerName.innerHTML = `<strong>${review.id}</strong>`;

          const reviewText = document.createElement("p");
          reviewText.textContent = review.text;

          const reviewRating = document.createElement("p");
          reviewRating.innerHTML = `<strong>Rating:</strong> ${"★".repeat(
            review.rating
          )}${"☆".repeat(5 - review.rating)}`;

          const updateButton = document.createElement("button");
          updateButton.textContent = "Update review";
          updateButton.classList.add("update-review-button");
          updateButton.addEventListener("click", function () {
            window.location.href = `/HBnB/reviews/${review.place_id}/${review.id}/update_review`;
          });

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete review";
          deleteButton.classList.add("delete-review-button");
          deleteButton.addEventListener("click", function () {
            const userChoice = confirm(
              "Are you sure you want to delete this review?"
            );
            if (userChoice) {
              console.log("User chose OK");
              deleteReview(review.id);
            } else {
              console.log("User chose Cancel");
            }

            window.location.href = `/HBnB/${userId}/my_account`;
          });

          reviewCard.appendChild(reviewerName);
          reviewCard.appendChild(reviewText);
          reviewCard.appendChild(reviewRating);
          reviewCard.appendChild(updateButton);
          reviewCard.appendChild(deleteButton);

          reviewListSection.appendChild(reviewCard);
        });
    }
  }

  // Function to fetch reviews
  async function fetchReviews() {
    const token = getCookie("jwt_token");

    try {
      const response = await fetch(`/api/v1/reviews`, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("Reviews response status:", response.status); // Debug log

      if (!response.ok) {
        console.error("Failed to fetch reviews");
        return;
      }

      const reviews = await response.json();
      console.log("Reviews:", reviews);
      renderReviews(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

  fetchReviews();
});
