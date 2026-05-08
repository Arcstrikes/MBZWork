/* ===== MBZ Professional Work — main.js ===== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Navbar scroll effect ── */
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar?.classList.add('scrolled');
        scrollTop?.classList.add('visible');
      } else {
        navbar?.classList.remove('scrolled');
        scrollTop?.classList.remove('visible');
      }
    });
  
    /* ── Scroll to top ── */
    scrollTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    /* ── Mobile menu ── */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
  
    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu?.classList.toggle('open');
      document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
    });
  
    mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger?.classList.remove('open');
        mobileMenu?.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  
    /* ── Active nav link ── */
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  
    /* ── Counter animation ── */
    const counters = document.querySelectorAll('[data-count]');
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const step = Math.ceil(duration / target);
        let current = 0;
  
        const timer = setInterval(() => {
          current += Math.ceil(target / (duration / 16));
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = current + suffix;
          }
        }, 16);
  
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
  
    counters.forEach(c => countObserver.observe(c));
  
    /* ── Contact form ── */
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
  
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  
      // Simulate async send
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  
        if (formMsg) {
          formMsg.className = 'form-msg success';
          formMsg.textContent = '✓ Message sent! We\'ll get back to you within 24 hours.';
          formMsg.style.display = 'block';
          form.reset();
          setTimeout(() => (formMsg.style.display = 'none'), 6000);
        }
      }, 1800);
    });
  
    /* ── Smooth reveal for cards (no AOS) ── */
    const revealEls = document.querySelectorAll('.service-card, .testi-card, .value-card, .team-card, .hours-card');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, (entry.target.dataset.delay || 0));
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      el.dataset.delay = (i % 4) * 80;
      revealObserver.observe(el);
    });
  
    /* ── Typed hero subtitle ── */
    const typeEl = document.getElementById('heroTyped');
    if (typeEl) {
      const words = ['Interior Detailing', 'Exterior Washing', 'Tire Changes', 'Paint Protection', 'Full-Service Care'];
      let wi = 0, ci = 0, del = false;
  
      const type = () => {
        const word = words[wi];
        typeEl.textContent = del ? word.slice(0, --ci) : word.slice(0, ++ci);
  
        if (!del && ci === word.length) {
          setTimeout(() => { del = true; }, 1800);
          setTimeout(type, 2000);
          return;
        }
        if (del && ci === 0) {
          del = false;
          wi = (wi + 1) % words.length;
        }
        setTimeout(type, del ? 55 : 95);
      };
  
      type();
    }
  
  });