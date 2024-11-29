document.addEventListener("DOMContentLoaded", function () {
  const deleteAccount = document.getElementById("delete-account-button");
  const userId = getCookie("user_id");

  // Function to get a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Function to delete a user from the DataBase
  async function deleteUser(userId) {
    const token = getCookie("jwt_token");

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("User delete response status:", response.status); // Debug log

      if (!response.ok) {
        console.error("Failed to delete user");
        alert("Failed to delete user:", error);
        return;
      }
    } catch (error) {
      console.error("Error deleting place:", error);
      alert("An error uccured:", error);
    }
  }
    
  async function logout() {
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getCookie("jwt_token")}`,
        },
      });

      if (response.ok) {
        clearCookies();
        window.location.href = "/HBnB";
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  function clearCookies() {
    document.cookie =
      "jwt_token=; path=/HBnB; expires=0; secure; SameSite=Strict";
    document.cookie =
      "user_id=; path=/HBnB; expires=0; secure; SameSite=Strict";
  }

  deleteAccount.addEventListener("click", function () {
    const userChoice = confirm("Are you sure you want to delete your account with all associated places and reviews?");
    if (userChoice) {
        console.log("User chose OK");
        deleteUser(userId);
    } else {
        console.log("User chose Cancel");
        return;
    }
    logout();
    clearCookies();

    window.location.href = `/HBnB/`;
  });
});
