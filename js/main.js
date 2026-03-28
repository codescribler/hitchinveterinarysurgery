/* ============================================================
   HITCHIN VETERINARY SURGERY — DEMO SITE
   main.js: scroll effects, modal, nav, interactions
   ============================================================ */

(function () {
  'use strict';

  /* ---- SCROLL-REVEAL (IntersectionObserver) -------------- */
  const revealItems = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealItems.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    revealItems.forEach((el) => el.classList.add('revealed'));
  }

  /* ---- CREDENTIAL ITEMS (staggered reveal) --------------- */
  const credentialItems = document.querySelectorAll('.credential-item');
  if ('IntersectionObserver' in window && credentialItems.length) {
    const credObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            credObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    credentialItems.forEach((el) => credObs.observe(el));
  } else {
    credentialItems.forEach((el) => el.classList.add('revealed'));
  }

  /* ---- NAV SCROLL EFFECT --------------------------------- */
  const header = document.getElementById('siteHeader');
  let lastScrollY = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---- STICKY CTA BAR ----------------------------------- */
  const stickyCta = document.getElementById('stickyCta');
  const heroSection = document.getElementById('hero');

  if (stickyCta && heroSection) {
    const stickyObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            stickyCta.classList.add('visible');
            stickyCta.removeAttribute('aria-hidden');
          } else {
            stickyCta.classList.remove('visible');
            stickyCta.setAttribute('aria-hidden', 'true');
          }
        });
      },
      { threshold: 0.1 }
    );
    stickyObs.observe(heroSection);
  }

  /* ---- MOBILE NAV TOGGLE --------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close when a nav link is clicked
    navLinks.querySelectorAll('.nav-link, .nav-cta').forEach((link) => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- DEMO MODAL --------------------------------------- */
  const modal = document.getElementById('demoModal');
  const modalClose = document.getElementById('modalClose');
  const ctaTriggers = document.querySelectorAll('.cta-trigger');

  // Focus trap elements
  const focusableSelectors = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus the first focusable element
    const focusable = modal.querySelectorAll(focusableSelectors);
    if (focusable.length) focusable[0].focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open on CTA click
  ctaTriggers.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Close on X button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Focus trap within modal
  if (modal) {
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(modal.querySelectorAll(focusableSelectors));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ---- SERVICE CARD image hover effect ------------------ */
  // Already handled via CSS transition on .service-feature-image img

  /* ---- SMOOTH SCROLL for anchor links ------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
