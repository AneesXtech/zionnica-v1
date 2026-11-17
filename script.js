// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // PAGE LOADER FADEOUT
  // ==========================================
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.visibility = 'hidden';
      }, 800);
    });

    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.visibility = 'hidden';
      }, 800);
    }, 1500);
  }


  // ==========================================
  // FLOATING STICKY HEADER
  // ==========================================
  const header = document.getElementById('header');
  const scrollThreshold = 60;

  const handleScroll = () => {
    if (document.body.classList.contains('nav-open')) return;
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();


  // ==========================================
  // MOBILE SIDEBAR NAVIGATION & DROPDOWNS
  // ==========================================
  const mobileToggle = document.getElementById('floating-mobile-toggle');
  const floatingNav = document.getElementById('floating-nav');
  let mobileBackdrop = document.getElementById('mobile-nav-backdrop') || document.querySelector('.mobile-nav-backdrop');

  // Create backdrop dynamically if not already present
  if (!mobileBackdrop && floatingNav) {
    mobileBackdrop = document.createElement('div');
    mobileBackdrop.className = 'mobile-nav-backdrop';
    mobileBackdrop.id = 'mobile-nav-backdrop';
    document.body.appendChild(mobileBackdrop);
  }

  if (mobileToggle && floatingNav) {
    const mobileClose = document.getElementById('mobile-sidebar-close');

    const openMobileNav = () => {
      mobileToggle.classList.add('active');
      floatingNav.classList.add('active');
      if (mobileBackdrop) mobileBackdrop.classList.add('active');
      document.body.classList.add('nav-open');
    };

    const closeMobileNav = () => {
      mobileToggle.classList.remove('active');
      floatingNav.classList.remove('active');
      if (mobileBackdrop) mobileBackdrop.classList.remove('active');
      document.body.classList.remove('nav-open');
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (floatingNav.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileNav();
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', () => {
        closeMobileNav();
      });
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && floatingNav.classList.contains('active')) {
        closeMobileNav();
      }
    });

    // Handle dropdown toggles on mobile screens
    const dropdowns = floatingNav.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-item');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
      }
    });

    // Close mobile nav when clicking a dropdown link
    const dropdownLinks = floatingNav.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeMobileNav();
        }
      });
    });

    // Close mobile nav when clicking a direct nav link
    const directLinks = floatingNav.querySelectorAll('a.nav-item:not(.dropdown-trigger), .mobile-sidebar-cta');
    directLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeMobileNav();
        }
      });
    });
  }


  // ==========================================
  // SEARCH TRIGGER
  // ==========================================
  const searchTrigger = document.getElementById('nav-search-trigger');
  const searchSection = document.getElementById('search-section');
  const searchInput = document.getElementById('destination-search-input');

  if (searchTrigger && searchSection) {
    searchTrigger.addEventListener('click', () => {
      searchSection.scrollIntoView({ behavior: 'smooth' });
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 500);
      }
    });
  }


  // ==========================================
  // HERO STORY & SCROLL ACTIONS
  // ==========================================
  const heroStoryTrigger = document.getElementById('hero-story-trigger');
  const readStoryBtn = document.getElementById('read-story-btn');
  const storyModalOverlay = document.getElementById('story-modal-overlay');
  const storyModalClose = document.getElementById('story-modal-close');

  const openStoryModal = () => {
    if (storyModalOverlay) {
      storyModalOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  const closeStoryModal = () => {
    if (storyModalOverlay) {
      storyModalOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  if (heroStoryTrigger) heroStoryTrigger.addEventListener('click', openStoryModal);
  if (readStoryBtn) readStoryBtn.addEventListener('click', openStoryModal);
  if (storyModalClose) storyModalClose.addEventListener('click', closeStoryModal);

  if (storyModalOverlay) {
    storyModalOverlay.addEventListener('click', (e) => {
      if (e.target === storyModalOverlay) {
        closeStoryModal();
      }
    });
  }

  // Scroll to Explore Widget
  const scrollExploreBtn = document.getElementById('scroll-explore-btn');
  if (scrollExploreBtn) {
    scrollExploreBtn.addEventListener('click', () => {
      const exploreSection = document.getElementById('explore');
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // ==========================================
  // GENERIC SLIDER CONTROLLER
  // ==========================================
  const initSlider = ({ trackId, prevId, nextId, gapPx, visibleCount, centerActive, defaultIndex = 0 }) => {
    const track = document.getElementById(trackId);
    if (!track) return;

    if (track.dataset.sliderInitialized) {
      track.updateConfig({ visibleCount, gapPx, centerActive });
      return;
    }

    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!prevBtn || !nextBtn) return;

    let currentIndex = defaultIndex;
    const slides = track.children;
    const container = track.parentElement;

    let currentVisibleCount = visibleCount;
    let currentGapPx = gapPx;
    let currentCenterActive = centerActive;

    const updateSlider = () => {
      const isDesktop = window.innerWidth > 1024;
      const maxIndex = (currentCenterActive && isDesktop) ? (slides.length - 1) : Math.max(0, slides.length - currentVisibleCount);

      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }

      const slideWidth = slides[0].offsetWidth;
      const containerWidth = container.offsetWidth;

      let offset = 0;
      if (currentCenterActive && isDesktop) {
        offset = currentIndex * (slideWidth + currentGapPx) - (containerWidth - slideWidth) / 2;

        for (let i = 0; i < slides.length; i++) {
          if (i === currentIndex) {
            slides[i].classList.add('is-active');
          } else {
            slides[i].classList.remove('is-active');
          }
        }
      } else {
        offset = currentIndex * (slideWidth + currentGapPx);
        for (let i = 0; i < slides.length; i++) {
          slides[i].classList.remove('is-active');
        }
      }

      track.style.transform = `translateX(-${offset}px)`;

      prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
      prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
      nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';
      nextBtn.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';
    };

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener('click', () => {
      const isDesktop = window.innerWidth > 1024;
      const maxIndex = (currentCenterActive && isDesktop) ? (slides.length - 1) : Math.max(0, slides.length - currentVisibleCount);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });

    window.addEventListener('resize', () => {
      const isDesktop = window.innerWidth > 1024;
      currentIndex = (currentCenterActive && isDesktop) ? defaultIndex : 0;
      updateSlider();
    });

    track.updateConfig = ({ visibleCount, gapPx, centerActive }) => {
      currentVisibleCount = visibleCount;
      currentGapPx = gapPx;
      currentCenterActive = centerActive;
      updateSlider();
    };

    track.dataset.sliderInitialized = "true";
    updateSlider();
  };

  const getTourVisibleCount = () => {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
  };

  initSlider({
    trackId: 'dest-tour-track',
    prevId: 'explore-prev-btn',
    nextId: 'explore-next-btn',
    gapPx: 22,
    visibleCount: getTourVisibleCount(),
    centerActive: false,
    defaultIndex: 0
  });

  window.addEventListener('resize', () => {
    initSlider({
      trackId: 'dest-tour-track',
      prevId: 'explore-prev-btn',
      nextId: 'explore-next-btn',
      gapPx: 22,
      visibleCount: getTourVisibleCount(),
      centerActive: false,
      defaultIndex: 0
    });
  });


  // ==========================================
  // CONFIRMATION POPUPS
  // ==========================================
  const modalOverlay = document.getElementById('modal-overlay');
  const modalMessage = document.getElementById('modal-message');

  const showSuccessModal = (message) => {
    if (modalOverlay && modalMessage) {
      modalMessage.textContent = message;
      modalOverlay.style.display = 'flex';
    }
  };


  // ==========================================
  // FORM HANDLING
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('footer-newsletter-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value;
      
      const checkboxes = document.querySelectorAll('input[name="interest"]:checked');
      const interests = Array.from(checkboxes).map(cb => cb.parentNode.textContent.trim());

      console.log('ZIONNICA Inquiry Received:', { name, email, subject, interests });
      contactForm.reset();
      
      showSuccessModal(`Thank you, ${name}! Your inquiry regarding "${subject}" has been successfully logged. We will review your travel and relocation goals and contact you at ${email} within 24 hours.`);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.footer_newsletter-pill-input');
      const email = emailInput ? emailInput.value : '';

      console.log('Newsletter subscription:', email);
      newsletterForm.reset();
      
      showSuccessModal(`Thank you for subscribing! We've registered ${email} to receive our latest Nicaragua travel stories, Sandbird updates, and relocation guides.`);
    });
  }


  // ==========================================
  // SEARCH LOGIC
  // ==========================================
  const searchForm = document.getElementById('destination-search-form');
  const popularLinks = document.querySelectorAll('.search-bar_popular-link');

  const performDestinationSearch = (query) => {
    if (!query) return;
    const q = query.toLowerCase().trim();

    if (q.includes('due diligence') || q.includes('property') || q.includes('invest') || q.includes('realtor')) {
      const investSec = document.getElementById('invest');
      if (investSec) investSec.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (q.includes('expat') || q.includes('living') || q.includes('retire') || q.includes('cost of living')) {
      const liveSec = document.getElementById('live');
      if (liveSec) liveSec.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (q.includes('food') || q.includes('restaurant') || q.includes('favorite') || q.includes('eat') || q.includes('hotel')) {
      const eatSec = document.getElementById('eat');
      if (eatSec) eatSec.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }

    let matchedIndex = -1;
    const mappings = [
      { index: 0, keywords: ['beach', 'surf', 'ocean', 'coast', 'san juan', 'popoyo', 'remanso'] },
      { index: 1, keywords: ['colonial', 'city', 'cities', 'granada', 'history', 'culture', 'leon'] },
      { index: 2, keywords: ['island', 'ometepe', 'corn island', 'lake', 'water'] },
      { index: 3, keywords: ['volcano', 'hiking', 'hike', 'adventure', 'masaya', 'cerro negro'] },
      { index: 4, keywords: ['matagalpa', 'boaco', 'camoapa', 'nature', 'highlands', 'gems'] },
      { index: 5, keywords: ['community', 'communities', 'emerald coast'] }
    ];

    for (const map of mappings) {
      if (map.keywords.some(keyword => q.includes(keyword))) {
        matchedIndex = map.index;
        break;
      }
    }

    if (matchedIndex !== -1) {
      setTimeout(() => {
        const prevBtn = document.getElementById('explore-prev-btn') || document.getElementById('dest-prev-btn');
        const nextBtn = document.getElementById('explore-next-btn') || document.getElementById('dest-next-btn');
        if (prevBtn && nextBtn) {
          for (let i = 0; i < 6; i++) {
            prevBtn.click();
          }
          for (let i = 0; i < matchedIndex; i++) {
            nextBtn.click();
          }
        }
      }, 500);
    }
  };

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      performDestinationSearch(searchInput.value);
    });
  }

  popularLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const text = link.textContent.trim();
      if (searchInput) {
        searchInput.value = text;
      }
      performDestinationSearch(text);
    });
  });


  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ==========================================
  // Custom cursor removed



  // ==========================================
  // MASTER REAL PROJECT SPLIT ACCORDION INTERACTION
  // ==========================================
  const splitAccordion = document.getElementById('journey-split-accordion');
  if (splitAccordion) {
    const panels = splitAccordion.querySelectorAll('.split_panel');
    
    panels.forEach(panel => {
      // Mouseenter sets active state
      panel.addEventListener('mouseenter', () => {
        panels.forEach(p => p.classList.remove('is-active'));
        panel.classList.add('is-active');
      });

      // Click handling
      panel.addEventListener('click', (e) => {
        const targetAnchor = panel.getAttribute('data-target');
        panels.forEach(p => p.classList.remove('is-active'));
        panel.classList.add('is-active');

        // Scroll to destination on CTA click or mobile tap
        if (e.target.closest('.split_cta-btn') || window.innerWidth <= 768) {
          if (targetAnchor && document.querySelector(targetAnchor)) {
            const targetEl = document.querySelector(targetAnchor);
            const headerOffset = 80;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // ==========================================
  // CONSULTATION & INQUIRY MODAL HANDLERS
  // ==========================================
  const consultModal = document.getElementById('consultation-modal-overlay');
  const consultCloseBtn = document.getElementById('consultation-modal-close');
  const openConsultBtn = document.getElementById('open-consultation-btn');
  const consultForm = document.getElementById('consultation-form');
  const successModal = document.getElementById('modal-overlay');

  if (openConsultBtn && consultModal) {
    openConsultBtn.addEventListener('click', () => {
      consultModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  if (consultCloseBtn && consultModal) {
    consultCloseBtn.addEventListener('click', () => {
      consultModal.style.display = 'none';
      document.body.style.overflow = '';
    });

    consultModal.addEventListener('click', (e) => {
      if (e.target === consultModal) {
        consultModal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  if (consultForm && successModal) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      consultModal.style.display = 'none';
      successModal.style.display = 'flex';
      consultForm.reset();
      document.body.style.overflow = '';
    });
  }

  // ==========================================
  // JOURNAL & GALLERY CATEGORY FILTER PILLS
  // ==========================================
  const filterPills = document.querySelectorAll('.filter_pill');
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
      });
    });
  }

  const galleryPills = document.querySelectorAll('.gallery_pill');
  if (galleryPills.length > 0) {
    galleryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        galleryPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
      });
    });
  }

});

// Gallery filter (redesigned gallery section)
// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.zx-pill');
  const items = document.querySelectorAll('.zx-gal figure');
  pills.forEach(pill => pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.toggle('is-active', p === pill));
    const f = pill.dataset.filter;
    items.forEach(it => { it.hidden = f !== 'all' && it.dataset.cat !== f; });
  }));
});

// Gallery carousel arrows
// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const rail = document.querySelector('.zk-rail');
  document.querySelectorAll('.zk-arrows button').forEach(b => b.addEventListener('click', () => {
    if (rail) rail.scrollBy({ left: Number(b.dataset.dir) * 320, behavior: 'smooth' });
  }));
});


// ==========================================================================
// SECTION 1: FEATURED TRIPS SLIDER CONTROLLER
// ==========================================================================
// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('trip-slider-track');
  const prevBtn = document.getElementById('trip-prev-btn');
  const nextBtn = document.getElementById('trip-next-btn');
  const progressFill = document.getElementById('trip-progress-fill');
  const viewport = document.getElementById('trip-slider-viewport');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.trip-card');
  const totalCards = cards.length;
  let currentIndex = 0;

  const getVisibleCount = () => {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 2.5;
  };

  const updateSlider = () => {
    const cardWidth = cards[0].offsetWidth;
    const gap = 26;
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    if (progressFill) {
      const progressPercent = Math.min(100, Math.round(((currentIndex + 1) / totalCards) * 100));
      progressFill.style.width = `${progressPercent}%`;
    }

    // Toggle button opacity / state
    prevBtn.style.opacity = currentIndex === 0 ? '0.45' : '1';
    const maxIndex = Math.max(0, totalCards - Math.floor(getVisibleCount()));
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.45' : '1';
  };

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const maxIndex = Math.max(0, totalCards - Math.floor(getVisibleCount()));
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    } else {
      // Loop or bounce back
      currentIndex = 0;
      updateSlider();
    }
  });

  // Touch & Swipe Support
  let startX = 0;
  let isSwiping = false;

  viewport.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe left -> Next
        nextBtn.click();
      } else {
        // Swipe right -> Prev
        prevBtn.click();
      }
    }
    isSwiping = false;
  }, { passive: true });

  window.addEventListener('resize', updateSlider);
  updateSlider();
});


// ==========================================================================
// SECTION 2: INTERACTIVE FEATURED DESTINATIONS CONTROLLER
// ==========================================================================
// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const destItems = document.querySelectorAll('.feat-dest_item');
  const activeImg = document.getElementById('feat-dest-active-img');
  const imgBadge = document.getElementById('feat-dest-img-badge');

  if (!destItems.length || !activeImg) return;

  const switchDestination = (item) => {
    if (item.classList.contains('is-active')) return;

    destItems.forEach(i => i.classList.remove('is-active'));
    item.classList.add('is-active');

    const newImgSrc = item.dataset.destImg;
    const newTitle = item.dataset.destTitle;
    const newTag = item.dataset.destTag;

    // Smooth image crossfade
    activeImg.classList.add('fade-out');
    setTimeout(() => {
      activeImg.src = newImgSrc;
      activeImg.alt = newTitle;
      activeImg.classList.remove('fade-out');

      if (imgBadge) {
        const badgeTag = imgBadge.querySelector('.badge-tag');
        const badgeTitle = imgBadge.querySelector('.badge-title');
        if (badgeTag && newTag) badgeTag.textContent = newTag;
        if (badgeTitle && newTitle) badgeTitle.textContent = newTitle;
      }
    }, 180);
  };

  destItems.forEach(item => {
    // Switch on hover (desktop)
    item.addEventListener('mouseenter', () => switchDestination(item));
    // Switch on click (desktop & mobile)
    item.addEventListener('click', () => switchDestination(item));
  });
});


// ==========================================================================
// SECTION 3: CONNECTIONS CARDS QUICK-CONNECT
// ==========================================================================
// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const connectBtns = document.querySelectorAll('.connection-card_btn');
  const consultModal = document.getElementById('consultation-modal-overlay');
  const consultInterest = document.getElementById('consult-interest');

  connectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = btn.dataset.category;
      if (consultModal) {
        e.preventDefault();
        consultModal.style.display = 'flex';
        if (consultInterest) {
          // Pre-select or focus
          consultInterest.value = 'Local Connections';
        }
      }
    });
  });
});


// ==========================================================================
// SCROLL REVEAL OBSERVER
// ==========================================================================
// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.reveal-on-scroll, section, .trip-card, .connection-card, .fav_card, .blog_big-card, .blog_stacked-card, .gallery_photo-item, .founder-story-card');
  targets.forEach(t => t.classList.add('is-revealed'));

  if ('IntersectionObserver' in window && targets.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

    targets.forEach(t => {
      observer.observe(t);
    });
  }
});

// ==========================================
// CONSULTATION MODAL SYSTEM (EXPLORE & LIVE)
// ==========================================
// ==========================================
// CLEAN URL / ROUTING HANDLER (Remove .html from address bar on HTTP/HTTPS)
// ==========================================
(function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {
    // Fail silently in restricted sandbox or file contexts
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('consultation-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = document.getElementById('modal-backdrop');

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('is-active', 'active');
      document.body.style.overflow = '';
    }
  };

  const openModal = () => {
    if (modal) {
      modal.classList.add('is-active', 'active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.querySelectorAll('[data-open-modal="consultation"], a[href="#consultation-modal"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && (modal.classList.contains('is-active') || modal.classList.contains('active'))) {
      closeModal();
    }
  });
});

// ==========================================
// GALLERY LOAD MORE WITH SMOOTH SCROLL (HOME PAGE)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const loadMoreBtn = document.getElementById('gallery-load-more-btn');
  const moreGrid = document.getElementById('gallery-more-grid');

  if (loadMoreBtn && moreGrid) {
    loadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!moreGrid.classList.contains('is-visible')) {
        moreGrid.classList.add('is-visible');
        loadMoreBtn.innerHTML = '<span>All Photos Loaded</span> <i class="fa-solid fa-check"></i>';
        loadMoreBtn.style.pointerEvents = 'none';
        loadMoreBtn.style.opacity = '0.75';
        
        // Smoothly scroll down so newly revealed photos come into view
        setTimeout(() => {
          moreGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
    });
  }
});
