"use client";

import { heroSlides, tracks } from "./home-data";
import { AboutSection } from "./components/AboutSection";
import { HeroSection } from "./components/HeroSection";
import { MerchSection } from "./components/MerchSection";
import { MusicSection } from "./components/MusicSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import { TourSection } from "./components/TourSection";
import { useHomeInteractions } from "./use-home-interactions";

export default function Home() {
  useHomeInteractions();

  return (
    <>
      <div className="cursor" id="cursor" />
      <SiteNav />
      <HeroSection slides={heroSlides} />
      <MusicSection tracks={tracks} />
      <TourSection />
      <AboutSection />
      <MerchSection />
      <SiteFooter />
    </>
  );
}
