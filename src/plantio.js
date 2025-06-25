document.addEventListener("DOMContentLoaded", () => {
  fetch("plantio.json")
    .then(res => res.json())
    .then(data => {
      const plantList = document.getElementById("plantioList");
      const plantNames = [];

      data.data.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'h-80 p-4 bg-green-200 rounded-lg shadow max-w-xs  hover:shadow-lg';

        card.innerHTML = `
          <img src="${plant.image_url}" alt="${plant.common_name}" class=" h-55 w-65 object-cover rounded">
          <h2 class="mt-2 text-lg font-semibold">${plant.common_name}</h2>
          <p class="text-sm text-gray-600 italic">${plant.scientific_name}</p>
          <p class="text-sm text-gray-800">Best for: ${plant.plant_location}</p>`;

        //  popup modal containing a close button
        card.addEventListener('click', () => {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="fixed inset-0  flex items-center justify-center bg-black/50 " onclick="this.remove()">
    <div class="bg-green-100  max-w-xl p-6 rounded-xl shadow-xl relative" onclick="event.stopPropagation()">
      
       
        <img src="${plant.image_url}" alt="${plant.common_name}"img.className = 'w-full object-contain rounded mb-4';">
        <h2 class="text-2xl font-bold">${plant.common_name}</h2>
        <p class="italic text-gray-600">${plant.scientific_name}</p>
        <p class="mt-2 text-black font-medium">Best Location: ${plant.plant_location}</p>
        <p class="mt-2 text-gray-700">${plant.plant_info}</p>
        <p class="mt-2 text-gray-700"> ${plant.plant_care}</p>
        <p class="mt-2 text-black-100 font-bold"> ${plant.plant_type}</p>
        <p class="mt-2 text-black"> ${plant.plant_fertilizer}</p>
      </div>
    </div>
  `);
});


        plantList.appendChild(card);
      });

      // Searchbar functionality
      const searchInput = document.getElementById("searchInput");
      searchInput.addEventListener("input", () => {
        const input = searchInput.value.toLowerCase();
        const suggestions = plantNames.filter(name => name.includes(input));
        console.log("Suggestions:", suggestions);
      });
    })
    .catch(err => console.error("Failed to fetch plant data:", err));

    //filtering
    const typeFilter = document.getElementById("typeFilter");
typeFilter.addEventListener("change", (event) => {
  const selectedType = event.target.value.toLowerCase();
  const cards = document.querySelectorAll("#plantioList > div");

  cards.forEach(card => {
    const plantType = card.textContent.toLowerCase();
    card.style.display = selectedType === "" || plantType.includes(selectedType) ? "block" : "none";
  });
});

});





























































































