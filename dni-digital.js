const content = document.querySelector('.DNI_content1');
let startX = 0;
let currentX = 0;
let isDragging = false;
let isFlipped = false;

// --- Helper Functions for Event Data ---
const getClientX = (e) => {
  return e.touches ? e.touches[0].clientX : e.clientX;
};

const handleDragStart = (e) => {
  if (!content) return;
  if (e.cancelable) {
    e.preventDefault();
  }

  startX = getClientX(e);
  currentX = startX;
  isDragging = true;
};

const handleDragMove = (e) => {
  if (!isDragging) return;
  if (e.cancelable) {
    e.preventDefault();
  }

  currentX = getClientX(e);
  const diffX = currentX - startX;

  content.style.transition = 'none';

  if (!isFlipped && diffX < 0) {
    const angle = Math.min(180, Math.abs(diffX) / content.offsetWidth * 180);
    content.style.transform = `rotateY(-${angle}deg)`;
  } else if (isFlipped && diffX > 0) {
    const angle = Math.min(180, diffX / content.offsetWidth * 180);
    content.style.transform = `rotateY(-${180 - angle}deg)`;
  }
};

const handleDragEnd = (e) => {
  if (e && e.cancelable) {
    e.preventDefault();
  }

  if (!isDragging) return;

  const diffX = currentX - startX;
  const progress = Math.abs(diffX) / content.offsetWidth;

  content.style.transition = 'transform 0.5s ease';

  if (!isFlipped && diffX < 0 && progress > 0.2) {
    isFlipped = true;
    content.style.transform = 'rotateY(-180deg)';
  } else if (isFlipped && diffX > 0 && progress > 0.2) {
    isFlipped = false;
    content.style.transform = 'rotateY(0deg)';
  } else {
    content.style.transform = isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)';
  }

  isDragging = false;
};

if (content) {
  content.addEventListener('pointerdown', handleDragStart, { passive: false });
  content.addEventListener('pointermove', handleDragMove, { passive: false });
  content.addEventListener('pointerleave', handleDragEnd);
  content.addEventListener('pointercancel', handleDragEnd);
  window.addEventListener('pointerup', handleDragEnd);
  window.addEventListener('pointercancel', handleDragEnd);
}