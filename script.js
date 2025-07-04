document.addEventListener("DOMContentLoaded", () => {
  // === Fungsionalitas Sidebar ===
  const sidebar = document.getElementById("sidebar");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  const openSidebar = (e) => {
    if (e) e.preventDefault();
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
      document.body.classList.add("body-no-scroll");
    }
  };

  const closeSidebar = () => {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      document.body.classList.remove("body-no-scroll");
    }
  };

  if (hamburgerMenu) hamburgerMenu.addEventListener("click", openSidebar);
  if (sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });

  // === Fungsionalitas Dark/Light Mode ===
  const themeToggleButtons = document.querySelectorAll("#theme-toggle, #sidebar-theme-toggle");
  const htmlElement = document.documentElement;

  const applyTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("cirebon-theme", theme);
    const isDark = theme === "dark";
    const newText = isDark ? "Light Mode" : "Dark Mode";
    themeToggleButtons.forEach((btn) => {
      if (btn) btn.textContent = newText;
    });
  };

  const savedTheme = localStorage.getItem("cirebon-theme") || "light";
  applyTheme(savedTheme);

  themeToggleButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", () => {
        const newTheme =
          htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(newTheme);
      });
    }
  });

  // === Animasi Candi (Hanya untuk Halaman Home) ===
  const candiGroup = document.querySelector(".candi-group");
  if (candiGroup) {
    setTimeout(() => {
      candiGroup.classList.add("animate-in");
    }, 500);
  }

  // === Fungsionalitas Accordion/FAQ ===
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((button) => {
      button.addEventListener("click", () => {
        const faqItem = button.closest(".faq-item");
        if (faqItem) {
          const isExpanded = faqItem.classList.contains("active");
          button.setAttribute("aria-expanded", !isExpanded);
          faqItem.classList.toggle("active");
        }
      });
    });
  }

  // === Intersection Observer untuk animasi oleh-oleh ===
  const souvenirObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Observe judul & setiap souvenir-item
  document.querySelectorAll('#oleh-oleh .section-title, #oleh-oleh .souvenir-item, .card')
    .forEach((el, idx) => {
      souvenirObserver.observe(el);
      // Delay bertahap hanya untuk souvenir-item
      if (el.classList.contains('souvenir-item, card')) {
        el.style.transitionDelay = `${idx * 0.3}s`;
      }
    });
  
  // === Fungsionalitas Tombol Scroll to Top ===
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      const scrollPosition =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollPosition > 300) {
        if (scrollToTopBtn.style.display !== "flex") {
          scrollToTopBtn.style.display = "flex";
        }
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });

    scrollToTopBtn.addEventListener("transitionend", () => {
      if (!scrollToTopBtn.classList.contains("visible")) {
        scrollToTopBtn.style.display = "none";
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === Fungsionalitas Animasi Reveal Saat Scroll ===
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // === Fungsi Counter Animation ===
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    let increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    updateCounter();
  }

  // === Observer untuk Stats Counter ===
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.target);
          if (target && !isNaN(target)) {
            animateCounter(stat, target);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  });

  const statsContainer = document.querySelector('.stats');
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }

  // === Fungsi Explore More ===
  window.exploreMore = function() {
    alert('Fitur "Jelajahi Sejarah" akan membawa Anda ke halaman detail sejarah keraton');
  };

  // === Fungsi Virtual Tour ===
  window.virtualTour = function() {
    alert('Fitur "Tur Virtual" akan membawa Anda ke pengalaman virtual tour 360°');
  };

  // === Efek Hover pada Image Container ===
  const imageContainer = document.querySelector('.image-container');
  const mainImage = document.querySelector('.main-image');

  if (imageContainer && mainImage) {
    imageContainer.addEventListener('mousemove', (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width - 0.5) * 20;
      const yPercent = (y / rect.height - 0.5) * 20;

      mainImage.style.transform = `translate(${xPercent}px, ${yPercent}px) scale(1.05)`;
    });

    imageContainer.addEventListener('mouseleave', () => {
      mainImage.style.transform = 'translate(0, 0) scale(1)';
    });
  }

  // === Fungsi TypeWriter Effect ===
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    setTimeout(type, 1000);
  }

  // === Aplikasi TypeWriter pada Subtitle ===
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) {
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 80);
  }
});