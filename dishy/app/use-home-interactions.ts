"use client";

import { useEffect } from "react";

export function useHomeInteractions() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const navbar = document.getElementById("navbar");
    const heroSection = document.getElementById("home");
    const heroTitle = heroSection?.querySelector(".hero-title") as HTMLElement | null;
    const heroBackground = heroSection?.querySelector(".hero-bg") as HTMLElement | null;
    const heroLogoSource = heroSection?.querySelector(".hero-logo-source") as HTMLVideoElement | null;
    const heroLogoDisplay = heroSection?.querySelector(".hero-logo-display") as HTMLCanvasElement | null;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobileLike = window.matchMedia("(max-width: 640px), (hover: none), (pointer: coarse)");

    const cleanupFns: Array<() => void> = [];

    if (cursor) {
      const handleCursorMove = (event: MouseEvent) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      };

      document.addEventListener("mousemove", handleCursorMove);
      cleanupFns.push(() => document.removeEventListener("mousemove", handleCursorMove));
    }

    if (navbar) {
      const handleScroll = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      cleanupFns.push(() => window.removeEventListener("scroll", handleScroll));
    }

    if (heroTitle && heroLogoSource && heroLogoDisplay) {
      const displayCtx = heroLogoDisplay.getContext("2d", { willReadFrequently: true });

      if (displayCtx) {
        const workCanvas = document.createElement("canvas");
        const workCtx = workCanvas.getContext("2d", { willReadFrequently: true });

        if (workCtx) {
          let rafId: number | null = null;
          let renderTick = 0;
          let activeScale = 1;

          const syncCanvasSize = () => {
            if (!heroLogoSource.videoWidth || !heroLogoSource.videoHeight) {
              return false;
            }

            const nextScale = isMobileLike.matches ? 0.6 : 1;
            const nextWidth = Math.max(1, Math.round(heroLogoSource.videoWidth * nextScale));
            const nextHeight = Math.max(1, Math.round(heroLogoSource.videoHeight * nextScale));

            if (
              activeScale !== nextScale ||
              heroLogoDisplay.width !== nextWidth ||
              heroLogoDisplay.height !== nextHeight
            ) {
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

            if (heroLogoSource.paused || heroLogoSource.ended) {
              return;
            }

            const frameStep = isMobileLike.matches ? 2 : 1;
            if (renderTick % frameStep !== 0) {
              renderTick += 1;
              rafId = window.requestAnimationFrame(renderFrame);
              return;
            }

            renderTick += 1;

            if (heroLogoSource.readyState < 2 || !syncCanvasSize()) {
              rafId = window.requestAnimationFrame(renderFrame);
              return;
            }

            workCtx.clearRect(0, 0, workCanvas.width, workCanvas.height);
            workCtx.drawImage(heroLogoSource, 0, 0, workCanvas.width, workCanvas.height);

            const frame = workCtx.getImageData(0, 0, workCanvas.width, workCanvas.height);
            const { data: pixels } = frame;
            const { width, height } = workCanvas;
            const alphaBuffer = new Uint8ClampedArray(width * height);

            const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
            const targetHue = 122;

            const rgbToHue = (red: number, green: number, blue: number) => {
              const normalizedRed = red / 255;
              const normalizedGreen = green / 255;
              const normalizedBlue = blue / 255;
              const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
              const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
              const delta = max - min;

              if (delta === 0) return 0;

              let hue = 0;
              if (max === normalizedRed) {
                hue = ((normalizedGreen - normalizedBlue) / delta) % 6;
              } else if (max === normalizedGreen) {
                hue = (normalizedBlue - normalizedRed) / delta + 2;
              } else {
                hue = (normalizedRed - normalizedGreen) / delta + 4;
              }

              return (hue * 60 + 360) % 360;
            };

            for (let index = 0; index < pixels.length; index += 4) {
              const red = pixels[index];
              const green = pixels[index + 1];
              const blue = pixels[index + 2];
              const pixelIndex = index / 4;

              const brightness = (red + green + blue) / (255 * 3);
              const hue = rgbToHue(red, green, blue);
              const hueDistance = Math.min(Math.abs(hue - targetHue), 360 - Math.abs(hue - targetHue)) / 180;
              const saturation = Math.max(red, green, blue) - Math.min(red, green, blue);

              let alpha = 255;

              if (brightness > 0.62 && hueDistance < 0.2) {
                alpha = 0;
              } else if (brightness > 0.5 && hueDistance < 0.3) {
                alpha = 48;
              } else if (brightness > 0.38 && saturation < 70) {
                alpha = 160;
              } else if (brightness < 0.18) {
                alpha = 235;
              } else {
                const shadeBoost = clamp01((0.48 - brightness) / 0.48);
                alpha = 255 - shadeBoost * 90;
              }

              alphaBuffer[pixelIndex] = alpha;
            }

            const featheredAlpha = new Uint8ClampedArray(alphaBuffer);
            for (let y = 1; y < height - 1; y += 1) {
              for (let x = 1; x < width - 1; x += 1) {
                const pixelIndex = y * width + x;
                if (alphaBuffer[pixelIndex] > 18) continue;

                const surroundingAverage =
                  alphaBuffer[pixelIndex - 1] +
                  alphaBuffer[pixelIndex + 1] +
                  alphaBuffer[pixelIndex - width] +
                  alphaBuffer[pixelIndex + width];

                featheredAlpha[pixelIndex] = surroundingAverage / 4;
              }
            }

            for (let index = 0; index < featheredAlpha.length; index += 1) {
              pixels[index * 4 + 3] = featheredAlpha[index];
            }

            for (let index = 0; index < pixels.length; index += 4) {
              if (pixels[index + 3] === 0) continue;
              const boost = pixels[index + 3] / 255;
              pixels[index] = Math.min(255, pixels[index] + boost * 25);
              pixels[index + 1] = Math.min(255, pixels[index + 1] + boost * 25);
              pixels[index + 2] = Math.min(255, pixels[index + 2] + boost * 25);
            }

            displayCtx.clearRect(0, 0, heroLogoDisplay.width, heroLogoDisplay.height);
            displayCtx.putImageData(frame, 0, 0);
            heroTitle.classList.add("is-chroma-ready");

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

          const handleLoadedMetadata = () => {
            syncCanvasSize();
          };

          const handlePlay = () => {
            startRender();
          };

          const handlePause = () => {
            stopRender();
          };

          heroLogoSource.addEventListener("loadedmetadata", handleLoadedMetadata);
          heroLogoSource.addEventListener("play", handlePlay);
          heroLogoSource.addEventListener("pause", handlePause);
          heroLogoSource.addEventListener("ended", handlePause);
          cleanupFns.push(() => heroLogoSource.removeEventListener("loadedmetadata", handleLoadedMetadata));
          cleanupFns.push(() => heroLogoSource.removeEventListener("play", handlePlay));
          cleanupFns.push(() => heroLogoSource.removeEventListener("pause", handlePause));
          cleanupFns.push(() => heroLogoSource.removeEventListener("ended", handlePause));

          const handleVisibilityChange = () => {
            if (document.hidden) {
              stopRender();
              return;
            }

            if (!heroLogoSource.paused) {
              startRender();
            }
          };

          document.addEventListener("visibilitychange", handleVisibilityChange);
          cleanupFns.push(() => document.removeEventListener("visibilitychange", handleVisibilityChange));

          const handleMotionChange = () => {
            syncCanvasSize();
          };

          isMobileLike.addEventListener?.("change", handleMotionChange);
          cleanupFns.push(() => isMobileLike.removeEventListener?.("change", handleMotionChange));

          const playPromise = heroLogoSource.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
              return;
            });
          }

          if (!heroLogoSource.paused) {
            startRender();
          }

          cleanupFns.push(() => {
            stopRender();
          });
        }
      }
    }

    if (!prefersReducedMotion.matches) {
      heroLogoSource?.classList.add("trippin-flicker");
      heroLogoDisplay?.classList.add("trippin-flicker");

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
      window.addEventListener("scroll", onParallaxScroll, { passive: true });
      window.addEventListener("resize", onParallaxScroll);
      cleanupFns.push(() => window.removeEventListener("scroll", onParallaxScroll));
      cleanupFns.push(() => window.removeEventListener("resize", onParallaxScroll));
    }

    const navToggle = document.getElementById("navToggle");
    const navClose = document.getElementById("navClose");
    const navBackdrop = document.getElementById("navBackdrop");
    const mobileMenu = document.getElementById("mobileMenu");
    const navDrawerLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
    let navBackdropTimer: number | null = null;

    const openNav = () => {
      if (navBackdropTimer) {
        window.clearTimeout(navBackdropTimer);
        navBackdropTimer = null;
      }

      document.body.classList.add("nav-open");

      if (navToggle) {
        navToggle.classList.add("is-active");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Tutup menu");
      }

      if (navBackdrop) navBackdrop.hidden = false;
      if (mobileMenu) mobileMenu.setAttribute("aria-hidden", "false");
    };

    const closeNav = () => {
      document.body.classList.remove("nav-open");

      if (navToggle) {
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Buka menu");
      }

      if (mobileMenu) mobileMenu.setAttribute("aria-hidden", "true");

      if (navBackdropTimer) {
        window.clearTimeout(navBackdropTimer);
      }

      navBackdropTimer = window.setTimeout(() => {
        if (!document.body.classList.contains("nav-open") && navBackdrop) {
          navBackdrop.hidden = true;
        }

        navBackdropTimer = null;
      }, 250);
    };

    if (navToggle) {
      const handleToggle = () => {
        if (document.body.classList.contains("nav-open")) {
          closeNav();
          return;
        }

        openNav();
      };

      navToggle.addEventListener("click", handleToggle);
      cleanupFns.push(() => navToggle.removeEventListener("click", handleToggle));
    }

    if (navClose) {
      navClose.addEventListener("click", closeNav);
      cleanupFns.push(() => navClose.removeEventListener("click", closeNav));
    }

    if (navBackdrop) {
      navBackdrop.addEventListener("click", closeNav);
      cleanupFns.push(() => navBackdrop.removeEventListener("click", closeNav));
    }

    if (navDrawerLinks && navDrawerLinks.length) {
      navDrawerLinks.forEach((link) => {
        link.addEventListener("click", closeNav);
        cleanupFns.push(() => link.removeEventListener("click", closeNav));
      });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
        closeNav();
      }
    };

    const handleWindowResize = () => {
      if (window.innerWidth > 900 && document.body.classList.contains("nav-open")) {
        closeNav();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleWindowResize);
    cleanupFns.push(() => window.removeEventListener("keydown", handleKeyDown));
    cleanupFns.push(() => window.removeEventListener("resize", handleWindowResize));

    const reveals = document.querySelectorAll<HTMLElement>(".reveal");

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );

      reveals.forEach((element) => observer.observe(element));
      cleanupFns.push(() => observer.disconnect());
    }

    const merchGalleries = document.querySelectorAll<HTMLElement>("[data-merch-gallery]");
    merchGalleries.forEach((gallery) => {
      const track = gallery.querySelector<HTMLElement>(".merch-track");
      const prev = gallery.querySelector<HTMLButtonElement>(".merch-nav.prev");
      const next = gallery.querySelector<HTMLButtonElement>(".merch-nav.next");
      const dots = Array.from(gallery.querySelectorAll<HTMLButtonElement>(".merch-dot"));
      let index = 0;

      if (!track || !prev || !next || !dots.length) return;

      const render = () => {
        track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
        dots.forEach((dot, dotIndex) => {
          dot.classList.toggle("active", dotIndex === index);
        });
      };

      const handlePrev = () => {
        index = (index - 1 + dots.length) % dots.length;
        render();
      };

      const handleNext = () => {
        index = (index + 1) % dots.length;
        render();
      };

      const dotHandlers = dots.map((dot, dotIndex) => {
        const handleDotClick = () => {
          index = dotIndex;
          render();
        };

        dot.addEventListener("click", handleDotClick);
        return () => dot.removeEventListener("click", handleDotClick);
      });

      prev.addEventListener("click", handlePrev);
      next.addEventListener("click", handleNext);
      cleanupFns.push(() => prev.removeEventListener("click", handlePrev));
      cleanupFns.push(() => next.removeEventListener("click", handleNext));
      cleanupFns.push(() => dotHandlers.forEach((cleanup) => cleanup()));

      render();
    });

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
      if (navBackdropTimer) {
        window.clearTimeout(navBackdropTimer);
      }
    };
  }, []);
}