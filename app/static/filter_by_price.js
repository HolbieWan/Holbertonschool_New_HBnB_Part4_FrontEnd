document.addEventListener('DOMContentLoaded', function () {
    const priceFilter = document.getElementById('price-filter');

    priceFilter.addEventListener('change', function () {
        const selectedPrice = Number(priceFilter.value);
        const filteredPlaces = window.allPlaces.filter(place => {
            return selectedPrice === '' || place.price <= selectedPrice;
        });
        window.renderPlaces(filteredPlaces);
    });
});
