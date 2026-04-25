/* ================================================
   shared.js
   Shared across ALL pages: navbar toggle, tabs
================================================ */

class Navbar {
  constructor() {
    this.toggle = document.querySelector('.navbar__toggle');
    this.links = document.querySelector('.navbar__links');
    this.allLinks = document.querySelectorAll('.navbar__links a');

    this._init();
  }

  _init() {
    // Mobile toggle
    if (this.toggle && this.links) {
      this.toggle.addEventListener('click', () => {
        this.links.classList.toggle('nav--open');
      });
    }

    // Close menu when clicking a link
    this.allLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.links) {
          this.links.classList.remove('nav--open');
        }
      });
    });

    this._setActiveLink();
  }

  _setActiveLink() {
    const currentPage =
      window.location.pathname.split('/').pop() || 'index.html';

    this.allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('nav--active');
      }
    });
  }
}

class Tabs {
  constructor(selector) {
    this.containers = document.querySelectorAll(selector);
    this._init();
  }

  _init() {
    this.containers.forEach(container => {
      const buttons = container.querySelectorAll('.tabs__btn');
      const panels = container.querySelectorAll('.tabs__panel');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;

          // update buttons
          buttons.forEach(b => b.classList.remove('tab--active'));
          btn.classList.add('tab--active');

          // update panels
          panels.forEach(panel => {
            panel.classList.toggle(
              'tab--active',
              panel.dataset.tab === target
            );
          });
        });
      });
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
      entries => {
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

/* ── INIT EVERYTHING ── */
document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
  new Tabs('.tabs');
  new ScrollAnimator();
});