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

// Filter menu open/close logic
const filterMenu = document.getElementById('filterMenu');
const filterOverlay = document.getElementById('filterOverlay');
const closeFilterMenu = document.getElementById('closeFilterMenu');

// Desktop: Show filters button
const showFiltersBtn = document.querySelector('.top-bar .left');
if (showFiltersBtn) {
  showFiltersBtn.addEventListener('click', function(e) {
    // Only open if clicking the filter icon or text, not the product count
    if (e.target.closest('span') || e.target.closest('i')) {
      filterMenu.classList.add('active');
      filterOverlay.classList.add('active');
    }
  });
}
// Mobile: Filters button
const filterBtnMobile = document.querySelector('.filter-btn-mobile');
if (filterBtnMobile) {
  filterBtnMobile.addEventListener('click', function() {
    filterMenu.classList.add('active');
    filterOverlay.classList.add('active');
  });
}
// Close filter menu
if (closeFilterMenu) {
  closeFilterMenu.addEventListener('click', function() {
    filterMenu.classList.remove('active');
    filterOverlay.classList.remove('active');
  });
}
if (filterOverlay) {
  filterOverlay.addEventListener('click', function() {
    filterMenu.classList.remove('active');
    filterOverlay.classList.remove('active');
  });
}

// Filter menu dropdown logic (run after DOM is loaded)
document.addEventListener('DOMContentLoaded', function() {
  function setupFilterDropdowns() {
    // Remove previous listeners by cloning nodes
    document.querySelectorAll('.filter-section-header').forEach(header => {
      const newHeader = header.cloneNode(true);
      header.parentNode.replaceChild(newHeader, header);
    });
    document.querySelectorAll('.filter-section-pointer').forEach(pointer => {
      const newPointer = pointer.cloneNode(true);
      pointer.parentNode.replaceChild(newPointer, pointer);
    });

    // Add listeners
    const filterSectionHeaders = document.querySelectorAll('.filter-section-header');
    filterSectionHeaders.forEach(header => {
      header.addEventListener('click', function(e) {
        const section = header.parentElement;
        section.classList.toggle('open');
        // Toggle arrow direction
        const icon = header.querySelector('.filter-section-pointer');
        if (section.classList.contains('open')) {
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-up');
        } else {
          icon.classList.remove('fa-angle-up');
          icon.classList.add('fa-angle-down');
        }
      });
    });
    const pointers = document.querySelectorAll('.filter-section-pointer');
    pointers.forEach(pointer => {
      pointer.addEventListener('click', function(e) {
        e.stopPropagation();
        const section = pointer.closest('.filter-section');
        section.classList.toggle('open');
        // Toggle arrow direction
        if (section.classList.contains('open')) {
          pointer.classList.remove('fa-angle-down');
          pointer.classList.add('fa-angle-up');
        } else {
          pointer.classList.remove('fa-angle-up');
          pointer.classList.add('fa-angle-down');
        }
      });
    });
  }

  // Initial setup
  setupFilterDropdowns();

  // Re-setup when filter menu is opened
  const filterMenu = document.getElementById('filterMenu');
  const filterOverlay = document.getElementById('filterOverlay');
  if (filterMenu && filterOverlay) {
    [filterMenu, filterOverlay].forEach(el => {
      el.addEventListener('transitionend', setupFilterDropdowns);
    });
  }
});

// Mobile Sort Bottom Sheet Logic
const sortBtnMobile = document.querySelector('.sort-btn-mobile');
const mobileSortSheet = document.getElementById('mobileSortSheet');
const closeMobileSortSheet = document.getElementById('closeMobileSortSheet');
const mobileSortOptions = document.querySelectorAll('.mobile-sort-options li');
const sortSelectedLabel = document.querySelector('.sort-selected');

if (sortBtnMobile && mobileSortSheet) {
  sortBtnMobile.addEventListener('click', function() {
    mobileSortSheet.classList.add('active');
  });
}
if (closeMobileSortSheet && mobileSortSheet) {
  closeMobileSortSheet.addEventListener('click', function() {
    mobileSortSheet.classList.remove('active');
  });
}
mobileSortOptions.forEach(option => {
  option.addEventListener('click', function() {
    // Remove selected from all
    mobileSortOptions.forEach(opt => opt.classList.remove('selected'));
    // Add selected to clicked
    option.classList.add('selected');
    // Update visible label
    if (sortSelectedLabel) {
      sortSelectedLabel.textContent = option.textContent.replace(/\s*✔?\s*$/, '');
    }
    // The tick mark will appear immediately due to the 'selected' class
    // Delay closing the sheet so user can see the tick
    setTimeout(() => {
      mobileSortSheet.classList.remove('active');
    }, 1000);
  });
});
