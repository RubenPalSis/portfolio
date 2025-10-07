// Obtener elementos
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');
const imgs = document.querySelectorAll('.lightbox-img');
const close = document.getElementsByClassName('close')[0];

// Al hacer click en cualquier imagen
imgs.forEach(img => {
  img.onclick = () => {
    modal.style.display = 'flex';   // usamos flex para centrar
    modalImg.src = img.src;          // mostrar imagen original
  }
});

// Cerrar al clickear la X
close.onclick = () => { modal.style.display = 'none'; }

// Cerrar al clickear fuera de la imagen
modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; }
