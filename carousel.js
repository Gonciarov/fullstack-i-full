const scrollLeftButton = document.querySelector('.scroll-left');
const scrollRightButton = document.querySelector('.scroll-right');
const scrollItems = document.querySelector('.scroll-items ul');

let scrollPosition = 0;
let startX = 0;
let isDragging = false;

scrollItems.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

scrollItems.addEventListener('touchmove', e => {
  if (isDragging) {
    const currentPosition = e.touches[0].clientX;
    const diff = currentPosition - startX;
    scrollPosition -= diff;
    startX = currentPosition;
    scrollItems.style.transform = `translateX(${-scrollPosition}px)`;
    updateScrollButtons();
  }
});

scrollItems.addEventListener('touchend', () => {
  isDragging = false;
});

scrollLeftButton.addEventListener('click', () => {
  scrollPosition -= 110;
  if (scrollPosition < 0) {
    scrollPosition = 0;
  }
  scrollItems.style.transform = `translateX(${-scrollPosition}px)`;
  updateScrollButtons();
});

scrollRightButton.addEventListener('click', () => {
  const maxScrollPosition = scrollItems.scrollWidth - scrollItems.clientWidth;
  scrollPosition += 100;
  if (scrollPosition > maxScrollPosition) {
    scrollPosition = maxScrollPosition;
  }
  scrollItems.style.transform = `translateX(${-scrollPosition}px)`;
  updateScrollButtons();
});

function updateScrollButtons() {
  if (scrollPosition === 0) {
    scrollLeftButton.style.visibility = 'hidden';
  } else {
    scrollLeftButton.style.visibility = 'visible';
  }

  if (scrollPosition === (scrollItems.scrollWidth - scrollItems.clientWidth)) {
    scrollRightButton.style.visibility = 'hidden';
  } else {
    scrollRightButton.style.visibility = 'visible';
  }

  const liItems = document.querySelectorAll('.scroll-items li');
  liItems.forEach(li => {
    if (li.offsetLeft < scrollPosition || li.offsetLeft + li.clientWidth > scrollPosition + scrollItems.clientWidth) {
      li.style.visibility = 'hidden';
    } else {
      li.style.visibility = 'visible';
    }
  });
}
