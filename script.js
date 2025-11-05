const sections = document.querySelectorAll('.hero');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let isScrolling = false;
let autoScrollInterval;
let userInteracted = false;

// --- Scroll con la rueda ---
window.addEventListener('wheel', (e) => {
  userInteracted = true;
  clearInterval(autoScrollInterval);
  if (isScrolling) return;

  if (e.deltaY > 0 && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  }

  scrollToSection(currentIndex);
  resetAutoScroll();
});

function scrollToSection(index) {
  isScrolling = true;
  sections.forEach(sec => sec.classList.remove('visible'));
  sections[index].classList.add('visible');
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
    userInteracted = true;
    clearInterval(autoScrollInterval);
    currentIndex = i;
    scrollToSection(i);
    resetAutoScroll();
  });
});

// --- Auto scroll cada 5 segundos ---
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (!userInteracted) {
      currentIndex = (currentIndex + 1) % sections.length;
      scrollToSection(currentIndex);
    }
  }, 5000);
}

// --- Pausa tras interacción ---
function resetAutoScroll() {
  userInteracted = true;
  clearInterval(autoScrollInterval);
  setTimeout(() => {
    userInteracted = false;
  }, 8000);
  startAutoScroll();
}

updateDots(currentIndex);
startAutoScroll();
