/* ================================================
   shared.js
   Shared across ALL pages: navbar toggle, tabs
   Every page loads this script
================================================ */

class Navbar {
  constructor() {
    this.toggle   = document.querySelector('.navbar__toggle');
    this.links    = document.querySelector('.navbar__links');
    this.allLinks = document.querySelectorAll('.navbar__links a');
    this._init();
  }

  _init() {
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this._toggleMenu());
    }
    // Close menu when a link is clicked
    this.allLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.links) this.links.classList.remove('nav--open');
      });
    });
    // Mark active link based on current page filename
    this._setActiveLink();
  }

  _toggleMenu() {
    this.links.classList.toggle('nav--open');
  }

  _setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('nav--active');
      }
    });
  }
}

class Tabs {
  constructor(containerSelector) {
    this.containers = document.querySelectorAll(containerSelector);
    this._init();
  }

  _init() {
    this.containers.forEach(container => {
      const buttons = container.querySelectorAll('.tabs__btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => this._switchTab(container, btn));
      });
    });
  }

  _switchTab(container, activeBtn) {
    const targetId = activeBtn.dataset.tab;

    // Update button states
    container.querySelectorAll('.tabs__btn').forEach(b => b.classList.remove('tab--active'));
    activeBtn.classList.add('tab--active');

    // Update panel states
    container.querySelectorAll('.tabs__panel').forEach(panel => {
      panel.classList.remove('tab--active');
      if (panel.dataset.tab === targetId) {
        panel.classList.add('tab--active');
      }
    });
  }
}

class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll('.animate-on-scroll');
    this._init();
  }

  _init() {
    if (!this.elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.elements.forEach(el => observer.observe(el));
  }
}

// ── Bootstrap on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
  new Tabs('.tabs');
  new ScrollAnimator();
});