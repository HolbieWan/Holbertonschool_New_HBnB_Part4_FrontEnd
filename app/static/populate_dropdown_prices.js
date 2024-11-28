document.addEventListener("DOMContentLoaded", async function () {
  const priceDropdown = document.getElementById("price-filter");

  try {
    const prices = [100, 200, 300, 400, 500, 600, 700, 800, 1000]

    prices.forEach((price) => {
      const option = document.createElement("option");
      option.value = price;
      option.textContent = price;
      priceDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
});
