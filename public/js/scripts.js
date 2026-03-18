// Minimal scripts for Retro Redesign
document.addEventListener('DOMContentLoaded', () => {
  console.log('Retro Redesign Initialized');

  // Optional: Add a slight flicker effect on card click or other pixel-y interactions
  const retroCard = document.querySelector('.retro-card');
  if (retroCard) {
    retroCard.addEventListener('click', () => {
      retroCard.style.transform = 'scale(0.98)';
      setTimeout(() => {
        retroCard.style.transform = 'scale(1)';
      }, 100);
    });
  }

  // Scroll Indicator Logic
  const scrollAreas = document.querySelectorAll('.card-scroll-area');

  scrollAreas.forEach(area => {
    const indicator = document.createElement('div');
    indicator.classList.add('scroll-indicator');
    indicator.innerHTML = '▼';

    // Append to retro-card
    const parentCard = area.closest('.retro-card');
    if (parentCard) {
      parentCard.appendChild(indicator);
    }

    // Function to check if we need to show the indicator
    const checkScroll = () => {
      // If the content is scrollable and we haven't reached the bottom
      const isScrollable = area.scrollHeight > area.clientHeight;
      const isAtBottom = Math.abs(area.scrollHeight - area.scrollTop - area.clientHeight) < 5;

      if (isScrollable && !isAtBottom) {
        indicator.classList.add('visible');
      } else {
        indicator.classList.remove('visible');
      }
    };

    // Initial check needed slightly after load for custom fonts to render
    setTimeout(checkScroll, 100);
    setTimeout(checkScroll, 500); // Failsafe for slower font rendering

    window.addEventListener('resize', checkScroll);
    area.addEventListener('scroll', checkScroll);
  });
  // Lightbox Logic
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const images = document.querySelectorAll('.card-body img');

    const openLightbox = (src) => {
      lightbox.style.display = 'flex';
      lightboxImg.src = src;
      document.body.style.overflow = 'hidden'; // Lock scroll
    };

    const closeLightbox = () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = ''; // Unlock scroll
    };

    images.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(img.src);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    
    // Clicking anywhere in the lightbox closes it (image or overlay)
    lightbox.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
});