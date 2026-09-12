/**
 * Personal Portfolio - UI Interactions & State Management (Editorial Edition)
 */

(function () {
  'use strict';

  // --- 1. DOM Elements ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // --- 2. Dark Mode Logic ---
  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      themeIconSun?.classList.remove('hidden');
      themeIconMoon?.classList.add('hidden');
      themeToggleBtn?.setAttribute('aria-label', 'Switch to light mode');
    } else {
      document.documentElement.classList.remove('dark');
      themeIconSun?.classList.add('hidden');
      themeIconMoon?.classList.remove('hidden');
      themeToggleBtn?.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    applyTheme(isDark);
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newTheme = !isCurrentlyDark;
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  });

  // Sync with OS preference if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });

  // --- 3. Navbar Elevation on Scroll ---
  function handleNavElevation() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('bg-stone-50/90', 'dark:bg-stone-950/90', 'backdrop-blur-md', 'border-b', 'border-stone-200/80', 'dark:border-stone-800/80');
      navbar.classList.remove('bg-transparent', 'border-transparent');
    } else {
      navbar.classList.remove('bg-stone-50/90', 'dark:bg-stone-950/90', 'backdrop-blur-md', 'border-b', 'border-stone-200/80', 'dark:border-stone-800/80');
      navbar.classList.add('bg-transparent', 'border-transparent');
    }
  }

  window.addEventListener('scroll', handleNavElevation, { passive: true });
  handleNavElevation();

  // --- 4. Mobile Menu Drawer Toggle ---
  let isMobileMenuOpen = false;

  function setMobileMenu(open) {
    isMobileMenuOpen = open;
    mobileMenuBtn?.setAttribute('aria-expanded', String(open));
    if (open) {
      mobileMenu?.classList.remove('hidden');
      requestAnimationFrame(() => {
        mobileMenu?.classList.remove('opacity-0', '-translate-y-2');
        mobileMenu?.classList.add('opacity-100', 'translate-y-0');
      });
    } else {
      mobileMenu?.classList.remove('opacity-100', 'translate-y-0');
      mobileMenu?.classList.add('opacity-0', '-translate-y-2');
      setTimeout(() => {
        if (!isMobileMenuOpen) mobileMenu?.classList.add('hidden');
      }, 150);
    }
  }

  mobileMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setMobileMenu(!isMobileMenuOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobileMenuOpen) setMobileMenu(false);
    });
  });

  document.addEventListener('click', (e) => {
    if (isMobileMenuOpen && !mobileMenu?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
      setMobileMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      setMobileMenu(false);
      mobileMenuBtn?.focus();
    }
  });

  // --- 5. Active Section Highlighting ---
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('text-stone-950', 'dark:text-stone-100', 'font-bold', 'underline', 'underline-offset-4');
              link.classList.remove('text-stone-600', 'dark:text-stone-400');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('text-stone-950', 'dark:text-stone-100', 'font-bold', 'underline', 'underline-offset-4');
              link.classList.add('text-stone-600', 'dark:text-stone-400');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // --- 6. Contact Form Submission (Client Simulation) ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Note';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending note...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        if (formStatus) {
          formStatus.classList.remove('hidden');
          formStatus.innerHTML = `
            <div class="p-3 rounded border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs flex items-center gap-2">
              <svg class="w-4 h-4 text-stone-700 dark:text-stone-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Thank you. Your message has been noted. I will reply within 24–48 hours.</span>
            </div>
          `;
          setTimeout(() => {
            formStatus.classList.add('hidden');
          }, 8000);
        }
      }, 600);
    });
  }

  initTheme();
})();
