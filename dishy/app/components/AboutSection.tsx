import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="grid grid-cols-[minmax(320px,440px)_minmax(0,1fr)] items-center gap-[clamp(40px,6vw,90px)] border-t border-[rgba(255,255,255,0.07)] bg-[#111111] px-12 py-[120px] max-[900px]:grid-cols-1 max-[900px]:px-6 max-[640px]:gap-[30px] max-[640px]:px-4 max-[640px]:py-[88px]">
      <div className="about-visual reveal relative aspect-3/4 w-full max-[900px]:aspect-4/3 max-[640px]:aspect-5/4">
        <div className="about-img-placeholder flex h-full w-full items-center justify-center overflow-hidden border border-[rgba(255,255,255,0.07)] bg-[linear-gradient(135deg,#1a1010,#0d0d0d)] p-[14px]">
          <Image src="/roster.jpeg" alt="Foto personel Dishy" width={1000} height={1000} className="h-full w-full object-cover object-[center_20%] saturate-[0.92] contrast-[1.02]" />
        </div>
        <div className="about-frame" />
      </div>
      <div className="about-text reveal">
        <p className="mb-3 font-['Barlow_Condensed',sans-serif] text-[0.86rem] uppercase tracking-[0.26em] text-white font-bold">The Band</p>
        <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(2.6rem,6.1vw,4.8rem)] text-white font-bold tracking-[0.04em]">Dishy</h2>
        <p className="text-[0.95rem] leading-8 text-[#d7d1c8] text-justify">Dishy terbentuk di ruang kecil-bukan hanya secara fisik, tapi juga secara keadaan. Di tempat di mana suara mereka sering dianggap tidak penting, di mana usaha mereka sering terlihat kecil, dan di mana keberadaan mereka terasa seperti sesuatu yang bisa diabaikan.</p>
        <p className="text-[0.95rem] leading-8 text-[#d7d1c8] text-justify">Dengan menyusun atmosfer yang gelap, sempit, dan emosional-seperti berada di tempat yang tidak pernah benar-benar menerima kamu, tapi kamu tetap bertahan di dalamnya.</p>
      </div>
    </section>
  );
}