# update_all_features.py

import os
import re

# 1. Update style.css
css_addition = """
/* ==========================================================================
   ENHANCED EDITORIAL FEATURES: CONNECTIONS GRID, GALLERY LOAD MORE & DARK TEXT FIX
   ========================================================================== */

/* Fix font on dark backgrounds: Ensure 100% high-contrast white */
.nm-hero-title,
.nm-hero .editorial_eyebrow-text,
.nm-popular-label,
.nm-popular-pill,
.nm-tile-title,
.nm-plan-title,
.nm-plan-block .editorial_eyebrow-text,
.section_final-cta .final-cta_heading {
  color: #FFFFFF !important;
}

.nm-hero-subtitle,
.nm-tile-caption,
.nm-plan-text,
.section_final-cta .final-cta_description {
  color: rgba(255, 255, 255, 0.95) !important;
}

.nm-tile-title,
.section_final-cta .final-cta_heading {
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6) !important;
}

.nm-tile-caption,
.section_final-cta .final-cta_description {
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5) !important;
}

/* Trusted Connections Grid with Names & Icons */
.nm-connections-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin: 32px 0 12px 0;
  text-align: left;
}

.nm-conn-item {
  background: var(--zn-white, #FFFFFF);
  border: 1px solid var(--zn-border, #E2E8F0);
  border-radius: 10px;
  padding: 22px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.nm-conn-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(16, 43, 67, 0.08);
}

.nm-conn-icon-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(196, 61, 70, 0.08);
  color: var(--zn-crimson, #C43D46);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.nm-conn-name {
  font-family: var(--font-heading, 'Poppins', sans-serif);
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--zn-navy, #102B43);
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.nm-conn-sub {
  font-family: var(--font-body, 'Manrope', sans-serif);
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--zn-text-muted, #627D98);
  margin: 0;
}

/* Zion Favorites with Authentic Project Photos */
.nm-fav-img-wrap {
  width: 100%;
  height: 145px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
}

.nm-fav-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.nm-fav-card:hover .nm-fav-img {
  transform: scale(1.05);
}

/* Gallery Load More Hidden Grid */
.nm-gallery-more {
  display: none;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 210px;
  gap: 16px;
  margin-top: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.nm-gallery-more.is-visible {
  display: grid;
  opacity: 1;
  transform: translateY(0);
}

/* Simple Scroll Animation (IntersectionObserver support) */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* Responsive adjustments for new features */
@media (max-width: 1024px) {
  .nm-connections-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .nm-connections-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .nm-gallery-more {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 150px;
  }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_addition)
print("style.css successfully updated!")


# 2. Update script.js with Gallery Load More click & smooth scroll
gallery_script = """
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
        loadMoreBtn.innerHTML = '<span>All Photos Loaded</span> <i class=\"fa-solid fa-check\"></i>';
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
"""

with open('script.js', 'a', encoding='utf-8') as f:
    f.write(gallery_script)
print("script.js successfully updated!")

