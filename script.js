document.addEventListener('DOMContentLoaded', () => {

  /* ===== ANIMASI GAUGE ===== */
  const gaugeFill = document.getElementById('gaugeFill');
  if (gaugeFill) {
    setTimeout(() => {
      gaugeFill.style.strokeDashoffset = '154'; // ~38.6% dari 251
    }, 400);
  }

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.background = 'rgba(14,14,15,0.98)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
      navbar.style.background = 'rgba(14,14,15,0.85)';
      navbar.style.boxShadow = 'none';
    }
  });

  /* ===== REVEAL ON SCROLL ===== */
  const revealTargets = document.querySelectorAll(
    '.point-card, .about-left, .about-right, .layanan-card, .galeri-item, .testi-card, .review-box, .kontak-card'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ===== FALLBACK GAMBAR GALERI ===== */
  document.querySelectorAll('.galeri-img img').forEach((img) => {
    img.addEventListener('error', function () {
      if (!this.dataset.fallback) {
        this.dataset.fallback = 'true';
        const alt = encodeURIComponent(this.alt || 'Galeri');
        this.src = `https://placehold.co/600x400/1b1b1b/f39c12?text=${alt}`;
      }
    });
  });

});