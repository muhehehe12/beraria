/* 
  BERĂRIA HM GARDEN - FUNCTIONAL LOGIC
  Preloader, Navigation, and Rose Petal Particles
*/

document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const header = document.querySelector('.header');
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const navClose = document.getElementById('navClose');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const petalContainer = document.getElementById('petal-container');

  // --- PRELOADER HANDLE ---
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.style.overflow = 'auto';
    }, 1500);
  });

  // --- HEADER SCROLL ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- NAVIGATION LOGIC ---
  const toggleNav = () => {
    navOverlay.classList.toggle('open');
    if (navOverlay.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  hamburger.addEventListener('click', toggleNav);
  navClose.addEventListener('click', toggleNav);
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });

  // --- FALLING ROSE PETALS ---
  const createPetal = () => {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Randomize properties for "iPhone Premium" feel
    const size = Math.random() * 15 + 10 + 'px';
    const left = Math.random() * 100 + '%';
    const duration = Math.random() * 5 + 5 + 's';
    const delay = Math.random() * 5 + 's';
    const blur = Math.random() * 2 + 'px';
    
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = left;
    petal.style.animationDuration = duration;
    petal.style.animationDelay = delay;
    petal.style.filter = `blur(${blur})`;
    
    // Apply a random petal shape
    const borderRadius = `${Math.random() * 50 + 50}% ${Math.random() * 20 + 10}% ${Math.random() * 50 + 50}% ${Math.random() * 20 + 10}%`;
    petal.style.borderRadius = borderRadius;

    petalContainer.appendChild(petal);

    // Remove petal after animation to keep DOM clean
    setTimeout(() => {
      petal.remove();
    }, parseFloat(duration) * 1000 + parseFloat(delay) * 1000);
  };

  // Create initial petals and start the "rain"
  if (petalContainer) {
    for (let i = 0; i < 30; i++) {
      createPetal();
    }
    
    setInterval(createPetal, 400);
  }

  // --- REVIEWS CAROUSEL ---
  const reviews = document.querySelectorAll('.review-card');
  const dots = document.querySelectorAll('.dot');
  let currentReview = 0;

  const showReview = (index) => {
    reviews.forEach(r => r.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    reviews[index].classList.add('active');
    dots[index].classList.add('active');
  };

  if (reviews.length > 0) {
    setInterval(() => {
      currentReview = (currentReview + 1) % reviews.length;
      showReview(currentReview);
    }, 5000);

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentReview = idx;
        showReview(currentReview);
      });
    });
  }

  // --- REVEAL ON SCROLL ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.about, .menu-item, .contact-box, .review-card, .story-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // Listen for the 'in-view' class to trigger animation
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.in-view').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
});