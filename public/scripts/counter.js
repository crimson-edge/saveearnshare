// Counter animation function
function animateCounter(element, target) {
  // Start from a higher initial value (80% of target)
  let current = Math.floor(target * 0.8);
  const duration = 2000; // Animation duration in milliseconds
  const increment = (target - current) / (duration / 16); // Update every 16ms (roughly 60fps)
  const formatter = new Intl.NumberFormat('en-US');

  // Set initial value
  element.textContent = formatter.format(current);

  const animate = () => {
    current += increment;
    if (current >= target) {
      element.textContent = formatter.format(Math.floor(target));
      return;
    }
    element.textContent = formatter.format(Math.floor(current));
    requestAnimationFrame(animate);
  };

  animate();
}

// Intersection Observer to start animation when counters are visible
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        animateCounter(counter, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Start observing the statistics section
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.getElementById('statistics');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
