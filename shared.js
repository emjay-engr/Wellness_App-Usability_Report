/* ================================================
   shared.js
   Shared across ALL pages: navbar toggle, tabs
   Supports nested tab groups independently
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

    this.allLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.links) this.links.classList.remove('nav--open');
      });
    });

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


class TabGroup {
  /**
   * Controls ONE independent tab group.
   * @param {HTMLElement} container - the .tabs wrapper element
   */
  constructor(container) {
    this.container = container;
    this.buttons   = Array.from(container.querySelectorAll(':scope > .tabs__nav > .tabs__btn'));
    this.panels    = Array.from(container.querySelectorAll(':scope > .tabs__panel'));
    this._init();
  }

  _init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => this._activate(btn));
    });
  }

  _activate(activeBtn) {
    const target = activeBtn.dataset.tab;

    // Update buttons — only inside THIS container's nav
    this.buttons.forEach(b => b.classList.remove('tab--active'));
    activeBtn.classList.add('tab--active');

    // Update panels — only direct child panels of THIS container
    this.panels.forEach(panel => {
      if (panel.dataset.tab === target) {
        panel.classList.add('tab--active');
      } else {
        panel.classList.remove('tab--active');
      }
    });
  }
}


class TabManager {
  /**
   * Finds every .tabs element on the page and gives each
   * its own independent TabGroup instance.
   */
  constructor() {
    this.groups = [];
    this._init();
  }

  _init() {
    const tabContainers = document.querySelectorAll('.tabs');
    tabContainers.forEach(container => {
      this.groups.push(new TabGroup(container));
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


class BackToTop {
  constructor() {
    this.btn = document.getElementById('topBtn');
    if (!this.btn) return;
    this._init();
  }

  _init() {
    window.addEventListener('scroll', () => {
      this.btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}


/* ── Bootstrap on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
  new TabManager();   // handles ALL tab groups including nested ones
  new ScrollAnimator();
  new BackToTop();
});