import Image from "next/image";

type HeroSlide = {
  src: string;
  alt: string;
};

type HeroSectionProps = {
  slides: HeroSlide[];
};

export function HeroSection({ slides }: HeroSectionProps) {
  const infiniteSlides = [...slides, ...slides];

  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[480px] items-center justify-center overflow-hidden bg-black max-[640px]:h-svh"
    >
      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden bg-black will-change-transform max-[640px]:-left-[1px] max-[640px]:w-[calc(100%+2px)]">
        <div className="absolute inset-0 flex h-full w-max animate-[heroSlide_46s_linear_infinite] will-change-transform [backface-visibility:hidden] max-[640px]:h-svh max-[640px]:-left-[1px] max-[640px]:w-[calc(100%+2px)] max-[640px]:items-stretch">
          {infiniteSlides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              className="relative h-full w-screen flex-[0_0_100vw] max-[640px]:max-h-[100svh]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1000}
                height={700}
                priority={index === 0}
                className="block h-full w-full object-cover saturate-[0.9] contrast-[1.02] max-[640px]:bg-black"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] max-[640px]:-left-[1px] max-[640px]:w-[calc(100%+2px)]"
          style={{
            background: `
              radial-gradient(circle at center, rgba(0,0,0,.04) 0%, rgba(0,0,0,.36) 58%, rgba(0,0,0,.72) 100%),
              linear-gradient(to right, rgba(5,5,5,.72) 0%, rgba(5,5,5,.16) 22%, rgba(5,5,5,.16) 78%, rgba(5,5,5,.72) 100%),
              linear-gradient(to bottom, rgba(5,5,5,.62) 0%, rgba(5,5,5,.34) 30%, rgba(5,5,5,.72) 100%),
              radial-gradient(ellipse 60% 80% at 70% 40%, rgba(176,42,51,.08) 0%, transparent 60%),
              radial-gradient(ellipse 40% 60% at 20% 60%, rgba(176,42,51,.05) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Noise Grid Overlay */}
      <div
        className="absolute inset-0 z-[1] bg-[length:220px_220px] opacity-[0.22] mix-blend-soft-light will-change-transform max-[640px]:-left-[1px] max-[640px]:w-[calc(100%+2px)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-[2] flex w-full translate-y-[34px] flex-col items-center px-12 pb-20 text-center max-[900px]:px-6 max-[900px]:pb-[60px] max-[640px]:translate-y-0 max-[640px]:px-5 max-[640px]:pb-0">
        {/* Eyebrow */}
        <p className="mb-3 font-['Barlow_Condensed',sans-serif] font-bold text-[0.82rem] uppercase tracking-[0.2em] text-[#b02a33] opacity-0 [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] animate-[fadeUp_0.8s_0.3s_forwards] max-[640px]:text-[0.72rem] max-[640px]:tracking-[0.16em]">
          New EP Out Now
        </p>

        {/* Logo */}
       <h1 className="relative mx-auto mt-2 flex h-[clamp(96px,16vw,190px)] w-[min(68vw,560px)] items-center justify-center opacity-0 animate-[fadeUp_0.9s_0.5s_forwards] max-[640px]:mt-1 max-[640px]:h-[clamp(72px,24vw,130px)] max-[640px]:w-[min(88vw,360px)] max-[640px]:overflow-hidden">
  <Image
    src="/logoD.png"
    alt="Dishy logo"
    width={560}
    height={190}
    priority
    className="absolute inset-0 m-auto block h-full w-full object-contain object-center drop-shadow-[0_12px_28px_rgba(0,0,0,.52)] max-[640px]:scale-[1.08]"
  />
</h1>

        {/* Tagline */}
        <p className="mx-auto mt-[18px] max-w-[440px] text-[0.9rem] tracking-[0.05em] text-[#ded7cd] opacity-0 [text-shadow:0_4px_18px_rgba(0,0,0,0.5)] animate-[fadeUp_0.8s_0.78s_forwards] max-[640px]:mt-[14px] max-[640px]:max-w-[320px] max-[640px]:text-[0.86rem]">
          ‘Attached to Decay’ has been released. Listen to it now and experience
          the atmosphere of Tinny Trippin Hardcore.
        </p>

        {/* CTA */}
        <div className="mt-[30px] opacity-0 animate-[fadeUp_0.8s_1s_forwards] max-[640px]:mt-[22px]">
          <a
            href="#music"
            className="inline-flex min-w-0 items-center justify-center gap-[10px] rounded-full border border-white/30 bg-[#080808]/56 px-[22px] py-[12px] font-['Barlow_Condensed',sans-serif] text-[0.72rem] uppercase tracking-[0.16em] text-[#f1ece4] backdrop-blur-[5px] transition-none hover:border-[#b02a33]/72 hover:bg-[#101010]/82 hover:text-[#f0ede8] max-[640px]:gap-2 max-[640px]:px-[18px] max-[640px]:py-[11px] max-[640px]:text-[0.7rem] max-[640px]:tracking-[0.14em]"
          >
            <svg
              className="text-[#b02a33] opacity-95"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Listen to the EP now
          </a>
        </div>
      </div>
    </section>
  );
}