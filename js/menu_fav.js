document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    {
      img: "https://picsum.photos/400?random=1",
      nama: "Cappuccino",
      harga: 25000,
    },
    {
      img: "https://picsum.photos/400?random=2",
      nama: "Latte",
      harga: 27000,
    },
    {
      img: "https://picsum.photos/400?random=3",
      nama: "Americano",
      harga: 22000,
    },
    {
      img: "https://picsum.photos/400?random=4",
      nama: "Mocha",
      harga: 30000,
    },
  ];

  const container = document.querySelector("#menuFavContainer");
  
  menuItems.forEach((item) => {
    container.innerHTML += `
            <div class="relative group rounded-lg overflow-hidden shadow mx-4">
              <img src="${item.img}" class="w-full aspect-square object-cover" alt="${item.nama}" />
              <div class="absolute left-0 right-0 bottom-0 bg-amber-900/40 backdrop-blur-sm text-white p-3 text-center opacity-100 md:opacity-0 md:translate-y-full md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                <h5 class="font-semibold text-lg">${item.nama}</h5>
                <p class="text-sm">${item.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
              </div>
            </div>
          `;
  });
});