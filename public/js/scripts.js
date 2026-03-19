// Minimal scripts for Retro Redesign
document.addEventListener('DOMContentLoaded', () => {
  console.log('Retro Redesign Initialized');

  // Password Protection Logic
  if (document.body.classList.contains('case-study')) {
    const isUnlocked = sessionStorage.getItem('work_unlocked') === 'true';
    if (isUnlocked) {
      document.body.classList.add('unlocked');
    } else {
      // Create and inject the modal
      const modalHtml = `
        <div id="password-modal" class="password-modal-overlay">
          <div class="retro-card">
            <h2 class="pixel-title" style="font-size: 2rem; margin-bottom: 1rem;">Protected</h2>
            <p style="font-size: 1.2rem; margin-bottom: 1.5rem; line-height: 1.4;">Please enter the password to view this case study.</p>
            <form id="password-form" style="display: flex; flex-direction: column; gap: 1rem;">
              <input type="password" id="work-password" placeholder="Password" required style="padding: 0.8rem; font-family: var(--font-pixel); font-size: 1.2rem; border: 4px solid #000; outline: none; border-radius: 12px;">
              <p id="password-error" style="color: #a00; display: none; margin: 0; font-size: 1rem; font-weight: bold;">Incorrect password.</p>
              <button type="submit" style="display: inline-block; padding: 10px 20px; font-family: var(--font-pixel); font-size: 1.2rem; background: #000; color: #fff; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; margin-top: 0.5rem;">Unlock</button>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      
      const form = document.getElementById('password-form');
      const errorMsg = document.getElementById('password-error');
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputStr = document.getElementById('work-password').value;
        if (inputStr === 'Josesworkin2026') {
          sessionStorage.setItem('work_unlocked', 'true');
          document.body.classList.add('unlocked');
          const modal = document.getElementById('password-modal');
          if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
              modal.remove();
            }, 300);
          }
        } else {
          errorMsg.style.display = 'block';
        }
      });
    }
  }

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

  // FAB Mobile Navigation Toggle
  const fabMenuBtn = document.querySelector('.fab-menu-btn');
  const pillNav = document.querySelector('.pill-nav');
  if (fabMenuBtn && pillNav) {
    fabMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      pillNav.classList.toggle('fab-open');
    });

    document.addEventListener('click', (e) => {
      if (pillNav.classList.contains('fab-open')) {
        // If clicked outside the pillNav container, close it
        if (!pillNav.contains(e.target)) {
          pillNav.classList.remove('fab-open');
        }
      }
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