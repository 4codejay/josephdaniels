// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Navbar Scroll Effect (Optimized with throttling)
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// GSAP Animations (Optimized with will-change)
gsap.utils.toArray('.section-header').forEach(header => {
  gsap.from(header.children, {
    scrollTrigger: {
      trigger: header,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });
});

// Hero Section Animations
const heroTimeline = gsap.timeline();
heroTimeline
  .from('.hero-image-wrapper', {
    scale: 0,
    rotation: 180,
    duration: 1,
    ease: 'back.out(1.7)'
  })
  .from('.hero-title .title-line', {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.4')
  .from('.hero-description', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.hero-buttons .btn', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.2')
  .from('.scroll-indicator', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.2');

// About Section Animations
gsap.utils.toArray('.about-text p').forEach((p, i) => {
  gsap.from(p, {
    scrollTrigger: {
      trigger: p,
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out'
  });
});

gsap.utils.toArray('.stat-item').forEach((stat, i) => {
  gsap.from(stat, {
    scrollTrigger: {
      trigger: stat,
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    delay: i * 0.08,
    ease: 'power2.out'
  });
});

gsap.utils.toArray('.skill-item').forEach((skill, i) => {
  gsap.from(skill, {
    scrollTrigger: {
      trigger: skill,
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true
    },
    x: -30,
    opacity: 0,
    duration: 0.5,
    delay: i * 0.05,
    ease: 'power2.out'
  });
});

// Portfolio Cards Animation (Optimized)
gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.05,
    ease: 'power2.out'
  });
});

// Parallax Effect removed for performance - stars background handles this

// Counter Animation for Stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Intersection Observer for Counter
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
  counterObserver.observe(stat);
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            item.classList.remove('hidden');
          }
        });
      } else {
        gsap.to(item, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            item.classList.add('hidden');
          }
        });
      }
    });
  });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const portfolioButtons = document.querySelectorAll('.portfolio-btn');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImageIndex = 0;
const images = Array.from(portfolioButtons).map(btn => {
  const img = btn.getAttribute('data-image');
  const fallback = btn.getAttribute('data-fallback');
  return { src: img, fallback: fallback || img };
});

function openLightbox(index) {
  currentImageIndex = index;
  const imageData = images[index];
  lightboxImage.src = imageData.src;
  lightboxImage.onerror = function() {
    if (imageData.fallback && this.src !== imageData.fallback) {
      this.src = imageData.fallback;
    }
  };
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  gsap.fromTo(lightbox, 
    { opacity: 0 },
    { opacity: 1, duration: 0.3 }
  );
  
  gsap.fromTo(lightboxImage,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
  );
}

function closeLightbox() {
  gsap.to(lightbox, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateLightboxImage();
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  gsap.to(lightboxImage, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    onComplete: () => {
      const imageData = images[currentImageIndex];
      lightboxImage.src = imageData.src;
      lightboxImage.onerror = function() {
        if (imageData.fallback && this.src !== imageData.fallback) {
          this.src = imageData.fallback;
        }
      };
      gsap.to(lightboxImage, {
        opacity: 1,
        scale: 1,
        duration: 0.3
      });
    }
  });
}

portfolioButtons.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(index);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Close lightbox on outside click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  }
});

// Contact Form Removed

// Scroll Reveal Animation for Contact Items
gsap.utils.toArray('.contact-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.08,
    ease: 'power2.out'
  });
});

// Form Input Animations Removed (Form removed)

// Smooth Scroll on Page Load
window.addEventListener('load', () => {
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  });
});

// Cursor Effect (Optional Enhancement)
let cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1
  });
  
  gsap.to(cursorFollower, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3
  });
});

document.querySelectorAll('a, button, .portfolio-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});

// Performance Optimization: Lazy Load Images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Refresh ScrollTrigger on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

// Generate Dynamic Stars (Optimized - reduced count for performance)
function createStars() {
  const starsBackground = document.getElementById('stars-background');
  if (!starsBackground) return;
  
  const starsContainer = starsBackground.querySelector('.stars');
  const starsContainer2 = starsBackground.querySelector('.stars2');
  const starsContainer3 = starsBackground.querySelector('.stars3');
  
  if (!starsContainer || !starsContainer2 || !starsContainer3) return;
  
  // Create additional twinkling stars - Layer 1 (bright stars) - Reduced to 60 for performance
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'dynamic-star';
    const size = Math.random() * 2.5 + 1;
    const opacity = Math.random() * 0.7 + 0.4;
    const left = Math.random() * 100;
    const top = Math.random() * 200;
    const delay = Math.random() * 2;
    const duration = Math.random() * 2 + 2;
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      left: ${left}%;
      top: ${top}%;
      opacity: ${opacity};
      animation: twinkle-star ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 1.5}px white;
      pointer-events: none;
      will-change: opacity, transform;
      transform: translateZ(0);
    `;
    starsContainer.appendChild(star);
  }
  
  // Layer 2 (medium stars) - Reduced to 40
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.className = 'dynamic-star';
    const size = Math.random() * 1.5 + 0.5;
    const opacity = Math.random() * 0.5 + 0.3;
    const left = Math.random() * 100;
    const top = Math.random() * 200;
    const delay = Math.random() * 3;
    const duration = Math.random() * 2 + 3;
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      left: ${left}%;
      top: ${top}%;
      opacity: ${opacity};
      animation: twinkle-star ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px white;
      pointer-events: none;
      will-change: opacity;
      transform: translateZ(0);
    `;
    starsContainer2.appendChild(star);
  }
  
  // Layer 3 (large bright stars) - Reduced to 30
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'dynamic-star';
    const size = Math.random() * 3 + 2;
    const opacity = Math.random() * 0.8 + 0.5;
    const left = Math.random() * 100;
    const top = Math.random() * 200;
    const delay = Math.random() * 4;
    const duration = Math.random() * 3 + 2;
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      left: ${left}%;
      top: ${top}%;
      opacity: ${opacity};
      animation: twinkle-star ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 1.5}px white, 0 0 ${size * 3}px rgba(255,255,255,0.6);
      pointer-events: none;
      will-change: opacity, transform;
      transform: translateZ(0);
    `;
    starsContainer3.appendChild(star);
  }
}

// Add CSS for dynamic stars animation
const style = document.createElement('style');
style.textContent = `
  @keyframes twinkle-star {
    0%, 100% {
      opacity: 0.2;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
  
  .dynamic-star {
    pointer-events: none;
  }
`;
document.head.appendChild(style);

// Initialize stars on page load
window.addEventListener('load', () => {
  createStars();
});
