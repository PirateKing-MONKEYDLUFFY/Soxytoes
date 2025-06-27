const sortLabel = document.getElementById('sortLabel');
const sortDropdown = document.getElementById('sortDropdown');

sortLabel.addEventListener('click', () => {
  const isVisible = sortDropdown.style.display === 'block';
  sortDropdown.style.display = isVisible ? 'none' : 'block';
});

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
  if (!sortLabel.contains(e.target) && !sortDropdown.contains(e.target)) {
    sortDropdown.style.display = 'none';
  }
});
const reviewTrack = document.querySelector('.review-track');
const reviewCards = document.querySelectorAll('.review-card');
let currentIndex = 0;
const totalCards = reviewCards.length;
const visibleCards = window.innerWidth <= 768 ? 1 : 3;

function moveCarousel() {
  currentIndex++;
  if (currentIndex > totalCards - visibleCards) {
    currentIndex = 0;
  }
  const moveX = -(currentIndex * (105));
  reviewTrack.style.transform = `translateX(${moveX}%)`;
}

let interval = setInterval(moveCarousel, 3000);

// Update visibleCards on resize
window.addEventListener('resize', () => {
  clearInterval(interval);
  currentIndex = 0;
  reviewTrack.style.transform = `translateX(0)`;
  interval = setInterval(moveCarousel, 3000);
});


const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.querySelector('.drawer-header span');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// Mobile drawer dropdown functionality
document.querySelectorAll('.drawer-menu li').forEach(item => {
  // Add listener only to the span and icon container, not the whole li
  const clickableArea = item.querySelector('span');
  const iconArea = item.querySelector('.drawer-icons');

  const clickHandler = (e) => {
    const dropdown = item.querySelector('.drawer-dropdown');
    if (dropdown) {
      item.classList.toggle('open');
      e.stopPropagation(); // Prevent parent dropdowns from toggling
    }
  };

  if (clickableArea && iconArea) {
    clickableArea.addEventListener('click', clickHandler);
    iconArea.addEventListener('click', clickHandler);
  }
});
