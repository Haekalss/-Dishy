"use client";

import { useEffect } from "react";
import Image from "next/image";

export function SiteNav() {
  const linkClassName = "font-['Barlow_Condensed',sans-serif] text-[0.86rem] uppercase tracking-[0.14em] text-[#beb8ae] no-underline relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-[#b02a33] after:opacity-0 hover:text-[#f0ede8] hover:after:opacity-100 transition-all duration-300";
  const drawerLinkClassName = "font-['Barlow_Condensed',sans-serif] text-[1.15rem] uppercase tracking-[0.18em] text-[#d2ccc3] no-underline hover:text-[#f0ede8] transition-colors";

  const toggleMenu = (isOpen: boolean) => {
    const menu = document.getElementById("mobileMenu");
    const backdrop = document.getElementById("navBackdrop");
    if (!menu || !backdrop) return;
    menu.classList.toggle("translate-x-full", !isOpen);
    backdrop.classList.toggle("hidden", !isOpen);
    backdrop.classList.toggle("opacity-0", !isOpen);
    document.body.classList.toggle("overflow-hidden", isOpen);
  };

  useEffect(() => {
    document.getElementById("navToggle")?.addEventListener("click", () => toggleMenu(true));
    document.getElementById("navClose")?.addEventListener("click", () => toggleMenu(false));
    document.getElementById("navBackdrop")?.addEventListener("click", () => toggleMenu(false));
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 grid h-[72px] w-full grid-cols-[1fr_auto] items-center px-[48px] bg-[linear-gradient(to_bottom,rgba(10,10,10,0.95),transparent)] transition-all duration-300 max-[900px]:px-6 max-[640px]:h-16 max-[640px]:px-3">
        <a href="#home" className="inline-flex items-center justify-self-start no-underline" aria-label="Dishy home">
          <Image src="/logoD.png" alt="Dishy" width={120} height={40} priority className="h-[46px] w-auto max-[640px]:max-w-[110px]" />
        </a>
        <ul className="flex justify-self-end gap-9 list-none max-[900px]:hidden">
          <li><a href="#music" className={linkClassName}>Music</a></li>
          <li><a href="#tour" className={linkClassName}>Tour</a></li>
          <li><a href="#about" className={linkClassName}>About</a></li>
          <li><a href="#list" className={linkClassName}>Merch</a></li>
        </ul>
        <button className="hidden h-10 w-10 items-center justify-center bg-transparent p-2 text-white max-[900px]:inline-flex" id="navToggle" type="button">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor"><rect y="0" width="22" height="2" rx="1"/><rect y="7" width="16" height="2" rx="1"/><rect y="14" width="22" height="2" rx="1"/></svg>
        </button>
      </nav>

      <div className="fixed inset-0 z-[1180] hidden bg-black/50 backdrop-blur-[4px] transition-opacity duration-300" id="navBackdrop" />
      <aside className="fixed top-0 right-0 z-[1190] flex h-dvh w-[min(84vw,320px)] translate-x-full flex-col overflow-y-auto border-l border-[rgba(255,255,255,0.07)] bg-[#0c0c0c]/98 px-6 pt-[88px] shadow-[-18px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-300" id="mobileMenu">
        <button className="absolute top-6 right-6 p-2 text-white/50" id="navClose">✕</button>
        <ul className="flex flex-col gap-[18px]">
          {['Music', 'Tour', 'About', 'Merch'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase() === 'merch' ? 'list' : item.toLowerCase()}`} className={drawerLinkClassName} onClick={() => toggleMenu(false)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}