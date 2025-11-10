const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const STORAGE_KEY = 'coffeesData';
const STORAGE_EXPIRY_KEY = 'coffeesDataExpiry';
const EXPIRY_HOURS = 24;

const fetchCoffeesFromAPI = async () => {
  try {
    const response = await fetch(`${API_URL}filter.php?i=Coffee`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const getAllCoffees = async () => {
  const cachedData = localStorage.getItem(STORAGE_KEY);
  const expiry = localStorage.getItem(STORAGE_EXPIRY_KEY);
  const now = new Date().getTime();

  if (cachedData && expiry && now < parseInt(expiry)) {
    return JSON.parse(cachedData);
  } else {
    const coffees = await fetchCoffeesFromAPI();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coffees));
    localStorage.setItem(STORAGE_EXPIRY_KEY, now + EXPIRY_HOURS * 3600 * 1000);
    return coffees;
  }
};

const getCoffeeById = async (id) => {
  try {
    const response = await fetch(`${API_URL}lookup.php?i=${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.drinks ? data.drinks[0] : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

const createCardMenu = (drink) => `
  <div 
    data-id="${drink.idDrink}" 
    class="bg-amber-100 rounded-2xl overflow-hidden shadow-lg transition duration-300 cursor-pointer
           flex flex-col items-center p-2 gap-2
           md:flex-col md:items-start md:p-4
           group relative"
  >
    <img 
      src="${drink.strDrinkThumb}" 
      alt="${drink.strDrink}" 
      class="w-full aspect-square object-cover rounded-lg"
    />
    <div class="flex-1 text-center md:text-left">
      <h3 class="text-lg font-bold text-amber-900 mb-1">${drink.strDrink}</h3>
    </div>
    <span
      class="absolute bottom-1/2 left-1/2 mb-2 -translate-x-1/2 px-3 py-1 text-xs rounded bg-amber-800 text-white 
             opacity-0 translate-y-2 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 ease-out whitespace-nowrap"
    >
      Klik untuk detail
    </span>
  </div>
`;



const createCardFavMenu = (drink) => `
  <div data-id="${drink.idDrink}" class="flex-shrink-0 w-64 bg-amber-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition duration-300 snap-start">
    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="w-full aspect-square object-cover" />
    <div class="p-3 bg-amber-100 text-center">
      <h3 class="text-md font-semibold text-amber-800 truncate">${drink.strDrink}</h3>
    </div>
  </div>
`;



const displayFavoriteMenu = async () => {
  const container = document.querySelector("#menuFavContainer");
  if (!container) return;

  const coffees = await getAllCoffees();
  container.innerHTML = coffees.slice(0, 4).map(createCardFavMenu).join('');

};

const displayMenu = async () => {
  const menuList = document.getElementById('menu-list');
  if (!menuList) return;

  const coffees = await getAllCoffees();
  menuList.innerHTML = coffees.map(createCardMenu).join('');

  menuList.querySelectorAll('div[data-id]').forEach(card => {
    card.addEventListener('click', async () => {
      const drink = await getCoffeeById(card.getAttribute('data-id'));
      if (drink) showModal(drink);
    });
  });
};

const showModal = (drink) => {
  const modal = document.getElementById('modal');
  document.getElementById('modal-img').src = drink.strDrinkThumb;
  document.getElementById('modal-title').textContent = drink.strDrink;
  document.getElementById('modal-instructions').textContent = drink.strInstructions;
  modal.classList.remove('opacity-0', 'pointer-events-none');
};

const closeModal = () => {
  const modal = document.getElementById('modal');
  modal.classList.add('opacity-0', 'pointer-events-none');
};

document.addEventListener("DOMContentLoaded", () => {
  displayFavoriteMenu();
  displayMenu();

  const modalCloseBtn = document.getElementById('modal-close');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
});
