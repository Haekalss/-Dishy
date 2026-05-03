// CURSOR
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// NAV SCROLL
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// HERO PARALLAX + LOGO FLICKER
const heroSection = document.getElementById('home');
const heroTitle = heroSection?.querySelector('.hero-title');
const heroBackground = heroSection?.querySelector('.hero-bg');
const heroLogoSource = heroSection?.querySelector('.hero-title .hero-logo-source');
const heroLogoDisplay = heroSection?.querySelector('.hero-title .hero-logo-display');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isMobileLike = window.matchMedia('(max-width: 640px), (hover: none), (pointer: coarse)');

const setupHeroLogoChromaKey = () => {
  if (!heroTitle || !heroLogoSource || !heroLogoDisplay) return;

  const displayCtx = heroLogoDisplay.getContext('2d', { willReadFrequently: true });
  if (!displayCtx) return;

  const workCanvas = document.createElement('canvas');
  const workCtx = workCanvas.getContext('2d', { willReadFrequently: true });
  if (!workCtx) return;

  let rafId = null;
  let renderTick = 0;
  let activeScale = 1;

  const syncCanvasSize = () => {
    if (!heroLogoSource.videoWidth || !heroLogoSource.videoHeight) return false;
    const nextScale = isMobileLike.matches ? 0.6 : 1;
    const nextWidth = Math.max(1, Math.round(heroLogoSource.videoWidth * nextScale));
    const nextHeight = Math.max(1, Math.round(heroLogoSource.videoHeight * nextScale));

    if (activeScale !== nextScale || heroLogoDisplay.width !== nextWidth || heroLogoDisplay.height !== nextHeight) {
      activeScale = nextScale;
      heroLogoDisplay.width = nextWidth;
      heroLogoDisplay.height = nextHeight;
      workCanvas.width = nextWidth;
      workCanvas.height = nextHeight;
    }
    return true;
  };

  const renderFrame = () => {
    rafId = null;
    if (heroLogoSource.paused || heroLogoSource.ended) return;
    const frameStep = isMobileLike.matches ? 2 : 1;
    if (renderTick % frameStep !== 0) {
      renderTick += 1;
      rafId = window.requestAnimationFrame(renderFrame);
      return;
    }
    renderTick += 1;
    if (heroLogoSource.readyState < 2) {
      rafId = window.requestAnimationFrame(renderFrame);
      return;
    }
    if (!syncCanvasSize()) {
      rafId = window.requestAnimationFrame(renderFrame);
      return;
    }

    workCtx.clearRect(0, 0, workCanvas.width, workCanvas.height);
    workCtx.drawImage(heroLogoSource, 0, 0, workCanvas.width, workCanvas.height);
    const frame = workCtx.getImageData(0, 0, workCanvas.width, workCanvas.height);
    const pixels = frame.data;
    const width = workCanvas.width;
    const height = workCanvas.height;
    const alphaBuffer = new Uint8ClampedArray(width * height);

    const clamp01 = (value) => Math.max(0, Math.min(1, value));
    const targetHue = 122;

    const rgbToHue = (red, green, blue) => {
      const max = Math.max(red, green, blue);
      const min = Math.min(red, green, blue);
      const delta = max - min;
      if (delta === 0) return -1;

      let hue;
      if (max === red) {
        hue = ((green - blue) / delta) % 6;
      } else if (max === green) {
        hue = (blue - red) / delta + 2;
      } else {
        hue = (red - green) / delta + 4;
      }

      hue *= 60;
      if (hue < 0) hue += 360;
      return hue;
    };

    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[i + 1];
      const blue = pixels[i + 2];
      const maxChannel = Math.max(red, green, blue);
      const minChannel = Math.min(red, green, blue);
      const saturation = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel;
      const hue = rgbToHue(red, green, blue);

      let alpha = 255;
      if (hue >= 0) {
        const hueDistance = Math.min(Math.abs(hue - targetHue), 360 - Math.abs(hue - targetHue));
        const hueScore = clamp01(1 - (hueDistance / 34));
        const saturationScore = clamp01((saturation - 0.14) / 0.44);
        const greenEnergy = clamp01(((green - Math.max(red, blue)) - 10) / 70);
        const brightness = clamp01((maxChannel - 24) / 160);

        const matte = clamp01((hueScore * 0.58) + (saturationScore * 0.2) + (greenEnergy * 0.22));
        if (matte > 0.04) {
          alpha = Math.round(255 * (1 - matte));
        }
      }

      alphaBuffer[i / 4] = alpha;

      if (alpha < 255) {
        const spill = Math.round((255 - alpha) * 0.11);
        pixels[i + 1] = Math.max(0, green - spill);
        pixels[i] = Math.max(0, red - Math.round(spill * 0.22));
        pixels[i + 2] = Math.max(0, blue - Math.round(spill * 0.22));
      }
    }

    const featheredAlpha = new Uint8ClampedArray(alphaBuffer);
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const idx = y * width + x;
        const center = alphaBuffer[idx];
        if (center === 255 || center === 0) continue;

        const sum =
          alphaBuffer[idx - width - 1] + alphaBuffer[idx - width] + alphaBuffer[idx - width + 1] +
          alphaBuffer[idx - 1] + center + alphaBuffer[idx + 1] +
          alphaBuffer[idx + width - 1] + alphaBuffer[idx + width] + alphaBuffer[idx + width + 1];

        featheredAlpha[idx] = Math.min(255, Math.round((sum / 9) * 0.78));
      }
    }

    for (let i = 0; i < featheredAlpha.length; i += 1) {
      if (featheredAlpha[i] < 28) {
        featheredAlpha[i] = 0;
      }
    }

    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i + 3] = featheredAlpha[i / 4];
    }

    displayCtx.clearRect(0, 0, heroLogoDisplay.width, heroLogoDisplay.height);
    displayCtx.putImageData(frame, 0, 0);
    heroTitle.classList.add('is-chroma-ready');

    rafId = window.requestAnimationFrame(renderFrame);
  };

  const startRender = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(renderFrame);
  };

  const stopRender = () => {
    if (rafId === null) return;
    window.cancelAnimationFrame(rafId);
    rafId = null;
  };

  heroLogoSource.addEventListener('loadedmetadata', syncCanvasSize);
  isMobileLike.addEventListener?.('change', syncCanvasSize);
  heroLogoSource.addEventListener('play', startRender);
  heroLogoSource.addEventListener('pause', stopRender);
  heroLogoSource.addEventListener('ended', stopRender);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopRender();
      return;
    }
    if (!heroLogoSource.paused) startRender();
  });

  const playPromise = heroLogoSource.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      // Keep fallback video visible if autoplay is blocked.
    });
  }

  if (!heroLogoSource.paused) startRender();
};

setupHeroLogoChromaKey();

if (!prefersReducedMotion.matches) {
  heroLogoSource?.classList.add('trippin-flicker');
  heroLogoDisplay?.classList.add('trippin-flicker');

  let ticking = false;
  const updateHeroParallax = () => {
    ticking = false;
    if (!heroSection || !heroBackground) return;

    const rect = heroSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const isVisible = rect.bottom > 0 && rect.top < viewportHeight;
    if (!isVisible) return;

    const bgOffset = Math.max(-30, Math.min(30, rect.top * -0.06));
    heroBackground.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
  };

  const onParallaxScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateHeroParallax);
  };

  updateHeroParallax();
  window.addEventListener('scroll', onParallaxScroll, { passive: true });
  window.addEventListener('resize', onParallaxScroll);
}

// MOBILE NAV
const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');
const navBackdrop = document.getElementById('navBackdrop');
const mobileMenu = document.getElementById('mobileMenu');
const navDrawerLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
let navBackdropTimer = null;

const openNav = () => {
  if (navBackdropTimer) {
    window.clearTimeout(navBackdropTimer);
    navBackdropTimer = null;
  }
  document.body.classList.add('nav-open');
  if (navToggle) {
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Tutup menu');
  }
  if (navBackdrop) navBackdrop.hidden = false;
  if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'false');
};

const closeNav = () => {
  document.body.classList.remove('nav-open');
  if (navToggle) {
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Buka menu');
  }
  if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
  if (navBackdropTimer) {
    window.clearTimeout(navBackdropTimer);
  }
  navBackdropTimer = window.setTimeout(() => {
    if (!document.body.classList.contains('nav-open')) {
      if (navBackdrop) navBackdrop.hidden = true;
    }
    navBackdropTimer = null;
  }, 250);
};

if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  });
}

if (navClose) navClose.addEventListener('click', closeNav);
if (navBackdrop) navBackdrop.addEventListener('click', closeNav);
if (navDrawerLinks && navDrawerLinks.length) {
  navDrawerLinks.forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
    closeNav();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && document.body.classList.contains('nav-open')) {
    closeNav();
  }
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

// MERCH GALLERY
const merchGalleries = document.querySelectorAll('[data-merch-gallery]');
merchGalleries.forEach((gallery) => {
  const track = gallery.querySelector('.merch-track');
  const prev = gallery.querySelector('.merch-nav.prev');
  const next = gallery.querySelector('.merch-nav.next');
  const dots = Array.from(gallery.querySelectorAll('.merch-dot'));
  let index = 0;

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  };

  prev.addEventListener('click', () => {
    index = index === 0 ? dots.length - 1 : index - 1;
    render();
  });

  next.addEventListener('click', () => {
    index = index === dots.length - 1 ? 0 : index + 1;
    render();
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      index = dotIndex;
      render();
    });
  });

  render();
});
