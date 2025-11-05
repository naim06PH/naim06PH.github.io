const sections = document.querySelectorAll('.hero');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let isScrolling = false;

// Detectar si es móvil
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// --- Scroll automático SOLO en escritorio ---
if (!isMobile) {
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0 && currentIndex < sections.length - 1) {
      currentIndex++;
    } else if (e.deltaY < 0 && currentIndex > 0) {
      currentIndex--;
    }

    scrollToSection(currentIndex);
  });
}

function scrollToSection(index) {
  isScrolling = true;
  sections[index].scrollIntoView({ behavior: 'smooth' });
  updateDots(index);

  setTimeout(() => {
    isScrolling = false;
  }, 1200);
}

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    scrollToSection(i);
  });
});

// Inicializa el estado
updateDots(currentIndex);
