// Pilih tombol di footer
const openOffCanvasBtn = document.querySelector('#footer button');

openOffCanvasBtn.addEventListener('click', () => {
  // Buat overlay
  const overlay = document.createElement('div');
  overlay.id = 'modalOverlay';
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50';

  // Buat offcanvas
  const offcanvas = document.createElement('div');
  offcanvas.className = 'bg-amber-50 w-80 max-w-full h-full pt-16 px-4 shadow-lg transform translate-x-full transition-transform duration-300';
  
  offcanvas.innerHTML = `
    <div class="bg-amber-800">
      <h2 class="text-xl font-bold mb-4">Identitas</h2>
      <p class="mb-2"><strong>Nama:</strong> Ubay Lah</p>
      <p class="mb-4"><strong>NPM:</strong> 1234567890</p>
    </div>
    <button id="closeModal" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Tutup</button>
  `;

  overlay.appendChild(offcanvas);
  document.body.appendChild(overlay); // Append ke body supaya overlay bisa menutupi semua

  // Animasi masuk offcanvas
  setTimeout(() => {
    offcanvas.classList.remove('translate-x-full');
  }, 10);

  // Event tutup
  const closeModalBtn = overlay.querySelector('#closeModal');
  closeModalBtn.addEventListener('click', () => {
    offcanvas.classList.add('translate-x-full');
    setTimeout(() => overlay.remove(), 300);
  });

  // Klik di luar offcanvas
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      offcanvas.classList.add('translate-x-full');
      setTimeout(() => overlay.remove(), 300);
    }
  });
});
