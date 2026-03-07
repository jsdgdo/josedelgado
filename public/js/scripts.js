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
});