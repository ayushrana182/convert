class LookbookManager {
  constructor() {
    this.popupContainer = null;
    this.activePopup = null;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Lookbook script loaded');
      this.setupPopupContainer();
      this.setupHotspots();
      this.setupEventListeners();
    });
  }

  setupPopupContainer() {
    this.popupContainer = document.getElementById('popup-container');
    if (!this.popupContainer) {
      this.popupContainer = document.createElement('div');
      this.popupContainer.id = 'popup-container';
      this.popupContainer.className = 'popup-container';
      document.body.appendChild(this.popupContainer);
    }
  }
  
setupHotspots() {
  // Setup lookbook hotspots
  document.querySelectorAll('.lookbook-hotspot').forEach(hotspot => {
    const button = hotspot.querySelector('.hotspot-button');
    const popup = hotspot.querySelector('.hotspot-popup');
    
    if (button && popup) {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.handleHotspotClick(hotspot, popup);
      });
    }
  });

  // Setup product hotspots
  document.querySelectorAll('.product-hotspot').forEach(hotspot => {
    const popup = hotspot.querySelector('.product-popup');
    
    if (popup) {
      hotspot.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        // Prevent link navigation if the popup is active
        e.stopImmediatePropagation();
        this.handleHotspotClick(hotspot, popup);
      });
    }
  });
}

  setupEventListeners() {
    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.popup-container') && 
          !e.target.closest('.lookbook-hotspot') && 
          !e.target.closest('.product-hotspot')) {
        this.closeActivePopup();
      }
    });

    this.popupContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Reposition on scroll/resize
    window.addEventListener('resize', () => this.repositionActivePopup());
    window.addEventListener('scroll', () => this.repositionActivePopup());
  }

  positionPopup(hotspot, popup) {
    const hotspotRect = hotspot.getBoundingClientRect();
    const popupWidth = parseInt(getComputedStyle(popup).width) || 320;
    const popupHeight = popup.offsetHeight || 200;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = hotspotRect.left + (hotspotRect.width / 2) - (popupWidth / 2);
    let top = hotspotRect.top - popupHeight - 15;
    
    // Horizontal positioning adjustments
    if (left < 10) {
      left = 10;
    } else if (left + popupWidth > viewportWidth - 10) {
      left = viewportWidth - popupWidth - 10;
    }
    
    // Vertical positioning adjustments
    if (top < 10) {
      top = hotspotRect.bottom + 15;
    }
    if (top + popupHeight > viewportHeight - 10) {
      top = viewportHeight - popupHeight - 10;
    }
    
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
  }

  handleHotspotClick(hotspot, popup) {
    // Close existing popup if different
    if (this.activePopup && this.activePopup !== popup) {
      this.closeActivePopup();
    }
    
    // Toggle current popup
    if (this.activePopup === popup) {
      this.closeActivePopup();
    } else {
      this.showPopup(hotspot, popup);
    }
  }

  showPopup(hotspot, popup) {
    const popupClone = popup.cloneNode(true);
    this.popupContainer.appendChild(popupClone);
    this.positionPopup(hotspot, popupClone);
    
    requestAnimationFrame(() => {
      popupClone.classList.add('active');
    });
    
    this.activePopup = popupClone;
    
    // Store reference to original hotspot for repositioning
    popupClone.setAttribute('data-hotspot-id', hotspot.getAttribute('data-hotspot-id'));
  }

  closeActivePopup() {
    if (this.activePopup) {
      this.activePopup.classList.remove('active');
      if (this.activePopup.parentNode === this.popupContainer) {
        this.popupContainer.removeChild(this.activePopup);
      }
      this.activePopup = null;
    }
  }

  repositionActivePopup() {
    if (this.activePopup) {
      const hotspotId = this.activePopup.getAttribute('data-hotspot-id');
      const hotspot = document.querySelector(`[data-hotspot-id="${hotspotId}"]`);
      if (hotspot) {
        this.positionPopup(hotspot, this.activePopup);
      }
    }
  }
}

window.scrollToLookbook = function(lookbookId) {
  const lookbookSection = document.querySelector('.lookbook-section');
  if (lookbookSection) {
    lookbookSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Initialize the lookbook manager
new LookbookManager();