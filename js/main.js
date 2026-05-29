document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navItems = document.querySelectorAll('.nav-item');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  // Handle collapsible dropdowns on mobile click
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link && item.querySelector('.dropdown-menu')) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('mobile-dropdown-active');
        }
      });
    }
  });

  // Close mobile nav when clicking normal menu item
  const menuLinks = document.querySelectorAll('.nav-menu > li:not(.has-dropdown) > a, .dropdown-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle && navMenu) {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  });

  // Header Scroll Class
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Hero Section Slider (Banners)
  const slides = document.querySelectorAll('.hero-slider .slide');
  const slideDots = document.querySelectorAll('.hero-slider .slide-dot');
  let currentHeroSlide = 0;
  let heroInterval;

  function showHeroSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slideDots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    slideDots[index].classList.add('active');
    currentHeroSlide = index;
  }

  function nextHeroSlide() {
    let nextIndex = (currentHeroSlide + 1) % slides.length;
    showHeroSlide(nextIndex);
  }

  function startHeroAutoplay() {
    if (slides.length > 1) {
      heroInterval = setInterval(nextHeroSlide, 5000);
    }
  }

  function resetHeroAutoplay() {
    clearInterval(heroInterval);
    startHeroAutoplay();
  }

  slideDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showHeroSlide(idx);
      resetHeroAutoplay();
    });
  });

  // Start slider
  if (slides.length > 0) {
    showHeroSlide(0);
    startHeroAutoplay();
  }

  // Infrastructure Gallery Slider
  const galleryTrack = document.getElementById('galleryTrack');
  const gallerySlides = document.querySelectorAll('.gallery-slide');
  const btnPrev = document.getElementById('galleryPrev');
  const btnNext = document.getElementById('galleryNext');
  let currentGalleryIndex = 0;

  function updateGalleryPosition() {
    if (galleryTrack) {
      galleryTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
    }
  }

  if (btnNext && btnPrev && gallerySlides.length > 0) {
    btnNext.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % gallerySlides.length;
      updateGalleryPosition();
    });

    btnPrev.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
      updateGalleryPosition();
    });

    // Touch support for gallery swipe
    let startX = 0;
    let endX = 0;
    galleryTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    galleryTrack.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const difference = startX - endX;
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          btnNext.click();
        } else {
          btnPrev.click();
        }
      }
    }, { passive: true });
  }

  // Interactive Treatments Tabs
  const tabBtns = document.querySelectorAll('.treatment-tabs .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Mobile Touch Support for Flip Cards
  const teamCards = document.querySelectorAll('.team-card-3d');
  teamCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Toggle flipped state on click (useful for touch screens)
      if (window.innerWidth <= 1024) {
        // If clicked on an element inside the card, check if it's card-back (to flip back) or card-front (to flip)
        const inner = this.querySelector('.card-inner');
        this.classList.toggle('flipped');
        
        // Remove flipped from others
        teamCards.forEach(c => {
          if (c !== card) {
            c.classList.remove('flipped');
          }
        });
      }
    });
  });

  // Intersection Observer for scroll animations (reveal elements)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
