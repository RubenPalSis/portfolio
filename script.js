// Dark Mode Functionality
function initDarkMode() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.setAttribute('aria-label', 'Cambiar modo oscuro/claro');
  document.body.appendChild(themeToggle);

  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
}

// Add scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.experience-card, .study-card, .skill-card, .award-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Dark Mode
  initDarkMode();
  
  // Initialize scroll animations
  initScrollAnimations();

  // Actualizar año en el footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Menú móvil
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
    });
  }
  
  // Carrusel de proyectos
  const carouselTrack = document.querySelector('.carousel-track');
  const projectCards = document.querySelectorAll('.project-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentProjectIndex = 0;

  function showProject(index) {
    // Ocultar todos los proyectos
    projectCards.forEach(card => card.classList.remove('active'));
    
    // Mostrar el proyecto actual
    projectCards[index].classList.add('active');
    
    // Actualizar indicadores
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[index].classList.add('active');
    
    currentProjectIndex = index;
  }

  // Navegación con flechas
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      let newIndex = currentProjectIndex - 1;
      if (newIndex < 0) newIndex = projectCards.length - 1;
      showProject(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
      let newIndex = currentProjectIndex + 1;
      if (newIndex >= projectCards.length) newIndex = 0;
      showProject(newIndex);
    });
  }

  // Navegación con indicadores
  indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      showProject(index);
    });
  });

  // Lightbox para imágenes
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close');
  const lightboxImages = document.querySelectorAll('.lightbox-img');
  const prevLightboxBtn = document.querySelector('.prev-lightbox-btn');
  const nextLightboxBtn = document.querySelector('.next-lightbox-btn');
  
  let currentImageIndex = 0;
  let currentGalleryImages = [];

  // Abrir lightbox al hacer clic en una imagen
  lightboxImages.forEach((img, index) => {
    img.addEventListener('click', function() {
      // Obtener todas las imágenes del proyecto actual
      const projectCard = this.closest('.project-card');
      currentGalleryImages = Array.from(projectCard.querySelectorAll('.lightbox-img'));
      
      // Encontrar el índice de la imagen clickeada
      currentImageIndex = currentGalleryImages.indexOf(this);
      
      // Mostrar la imagen en el lightbox
      lightboxImg.src = this.src;
      lightboxModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar lightbox
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      lightboxModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Cerrar lightbox al hacer clic fuera de la imagen
  lightboxModal.addEventListener('click', function(e) {
    if (e.target === lightboxModal) {
      lightboxModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Navegación en el lightbox
  if (prevLightboxBtn && nextLightboxBtn) {
    prevLightboxBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    
    nextLightboxBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }

  // Navegación con teclado en el lightbox
  document.addEventListener('keydown', function(e) {
    if (lightboxModal.style.display === 'block') {
      if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      } else if (e.key === 'Escape') {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
  });

  function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
      currentImageIndex = currentGalleryImages.length - 1;
    } else if (currentImageIndex >= currentGalleryImages.length) {
      currentImageIndex = 0;
    }
    
    lightboxImg.src = currentGalleryImages[currentImageIndex].src;
  }

  // Swipe para móviles
  let touchStartX = 0;
  let touchEndX = 0;

  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    carouselContainer.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe izquierda - siguiente proyecto
      let newIndex = currentProjectIndex + 1;
      if (newIndex >= projectCards.length) newIndex = 0;
      showProject(newIndex);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe derecha - proyecto anterior
      let newIndex = currentProjectIndex - 1;
      if (newIndex < 0) newIndex = projectCards.length - 1;
      showProject(newIndex);
    }
  }

  // Smooth scroll para enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Cerrar menú móvil si está abierto
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Cerrar menú móvil al hacer clic en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
      }
    });
  });
});
