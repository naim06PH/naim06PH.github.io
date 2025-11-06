const sections = document.querySelectorAll('.hero');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let isScrolling = false;
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
  sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  updateDots(index);
  animateSection(index);

  // Asegura que no se corte al final del scroll
  setTimeout(() => {
    isScrolling = false;
  }, 1000);
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

function clearAnimationState(section) {
  if (!section) return;
  // remove inline delays and fade-up classes so animations can re-run
  section.querySelectorAll('.fade-up').forEach(el => {
    el.classList.remove('fade-up');
    el.style.animationDelay = '';
  });
}

function animateSection(index) {
  const section = sections[index];
  if (!section) return;

  // clear state in all sections
  sections.forEach(s => clearAnimationState(s));

  const title = section.querySelector('h1');
  const subtitle = section.querySelector('.subtitle');

  if (title) {
    title.classList.add('fade-up');
    title.style.animationDelay = '0.12s';
  }
  if (subtitle) {
    subtitle.classList.add('fade-up');
    subtitle.style.animationDelay = '0.25s';
  }

  const jobs = section.querySelectorAll('.job');
  jobs.forEach((job, i) => {
    job.classList.add('fade-up');
    job.style.animationDelay = `${0.35 + i * 0.07}s`;
  });
}

updateDots(currentIndex);
animateSection(currentIndex);
