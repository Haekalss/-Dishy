import Image from "next/image";

type Track = {
  num: string;
  title: string;
  dur: string;
};

type MusicSectionProps = {
  tracks: Track[];
};

export function MusicSection({ tracks }: MusicSectionProps) {
  return (
    <section
      id="music"
      className="relative border-t border-[rgba(255,255,255,0.07)] bg-[#111111] px-12 py-[120px] max-[900px]:px-6 max-[640px]:px-4 max-[640px]:pb-[88px] max-[640px]:pt-16"
    >
      {/* HEADER */}
      <div className="music-header reveal mb-16 flex items-end justify-between max-[900px]:mb-10 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-[18px]">
        <div>
          <p className="mb-3 font-['Barlow_Condensed',sans-serif] text-[0.86rem] font-bold uppercase tracking-[0.26em] text-[#b02a33] [text-shadow:0_2px_14px_rgba(0,0,0,0.28)] max-[640px]:text-[0.78rem] max-[640px]:tracking-[0.2em]">
            Discography
          </p>
          <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(2.6rem,6.1vw,4.8rem)] text-white font-bold tracking-[0.04em] max-[640px]:text-[clamp(1.9rem,10.8vw,2.7rem)]">
            Releases
          </h2>
        </div>
      </div>

      {/* FEATURED RELEASE */}
      <div className="featured-release reveal relative mb-12 grid grid-cols-[320px_1fr] items-center gap-12 overflow-hidden border border-[rgba(255,255,255,0.07)] bg-[#161616] p-10 max-[900px]:grid-cols-1 max-[900px]:gap-7 max-[900px]:p-7 max-[640px]:mb-[38px] max-[640px]:gap-5 max-[640px]:p-5">
        {/* Garis Merah di Kiri */}
        <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-[#b02a33]" />

        {/* Label NEW */}
        <div className="absolute right-5 top-5 border border-[#b02a33] px-[10px] py-1 font-['Barlow_Condensed',sans-serif] text-[0.72rem] font-bold uppercase tracking-[0.3em] text-[#b02a33] max-[900px]:right-[14px] max-[900px]:top-[14px]">
          NEW
        </div>

        {/* Cover with Play Button Animation */}
        <a
          href="https://open.spotify.com/album/30n1Ip7WbAsKv7wgsAYzX4?si=gnXbQECsRFaskwSKApN2Ew"
          target="_blank"
          rel="noreferrer"
          className="group relative block aspect-square overflow-hidden"
        >
          <Image
            src="/attached-to-decay-cover.webp"
            alt="Attached to Decay EP Cover"
            width={1000}
            height={1000}
            className="block h-full w-full object-cover grayscale-[20%] transition-all duration-400 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-300 group-hover:bg-[rgba(0,0,0,0.28)]">
            {/* Play Icon CSS Pure Migration */}
            <div className="flex h-14 w-14 scale-80 items-center justify-center rounded-full border-2 border-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
            </div>
          </div>
        </a>

        {/* Release Details */}
        <div className="release-info">
          <p className="mb-3 font-['Barlow_Condensed',sans-serif] text-[0.84rem] font-bold uppercase tracking-[0.24em] text-[#b02a33] max-[640px]:text-[0.76rem] max-[640px]:tracking-[0.18em]">
            ● Latest EP
          </p>
          <h3 className="mb-2 font-['Bebas_Neue',sans-serif] text-[3.5rem]  text-white font-bold tracking-[0.05em] max-[900px]:text-[clamp(2.2rem,10vw,3rem)]">
            Attached to Decay
          </h3>
          <p className="mb-6 text-[0.85rem] text-[#c6c0b6] max-[640px]:mb-[18px]">
            29 March 2026 · 5 Tracks
          </p>

          <ul className="mb-8 list-none max-[640px]:mb-6">
            {tracks.map((track) => (
              <li
                key={track.num}
                className="flex items-center gap-4 border-b border-[rgba(255,255,255,0.07)] py-[10px] text-[0.9rem] text-[#d2ccc3] transition-colors hover:text-[#f0ede8] max-[900px]:gap-3 max-[900px]:text-[0.85rem] max-[640px]:gap-2 max-[640px]:py-2 max-[640px]:text-[0.84rem]"
              >
                <span className="w-5 font-['Barlow_Condensed',sans-serif] text-[0.76rem] text-[#a7a29b]">
                  {track.num}
                </span>
                {track.title}
                <span className="ml-auto font-['Barlow_Condensed',sans-serif] text-[0.8rem] text-[#a7a29b] max-[640px]:text-[0.74rem]">
                  {track.dur}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="https://open.spotify.com/album/30n1Ip7WbAsKv7wgsAYzX4?si=7ujTgcsrR3uX-IebwHlUzQ"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-[10px] border border-[rgba(29,185,84,0.4)] px-7 py-3 font-['Barlow_Condensed',sans-serif] text-[0.75rem] uppercase tracking-[0.2em] text-[#1db954] no-underline transition-none hover:border-[#1db954] hover:bg-[rgba(29,185,84,0.1)] max-[640px]:w-full max-[640px]:justify-center max-[640px]:px-4 max-[640px]:py-[11px] max-[640px]:tracking-[0.12em]"
          >
            <span className="text-[1.2rem]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </span>
            Listen on Spotify
          </a>
        </div>
      </div>

      {/* SINGLE SECTION */}
      <div className="single-section reveal mt-16">
        <p className="mb-3 font-['Barlow_Condensed',sans-serif] text-[0.86rem] font-bold uppercase tracking-[0.26em] text-[#b02a33] [text-shadow:0_2px_14px_rgba(0,0,0,0.28)] max-[640px]:text-[0.78rem] max-[640px]:tracking-[0.2em]">
          Single
        </p>
        <h2 className="mb-3 font-['Bebas_Neue',sans-serif] text-[clamp(2.6rem,6.1vw,4.8rem)]  text-white font-bold tracking-[0.04em] max-[640px]:text-[clamp(1.9rem,10.8vw,2.7rem)]">
          SQUARE UP!
        </h2>
    <p className="mb-7 max-w-[520px] text-[0.9rem] text-[#d4cdc3] leading-snug text-justify">
  Sebuah sikap untuk berdiri menghadapi apa pun di depan mata tanpa
  takut, tanpa mundur. Tentang keberanian untuk melawan, bertahan, dan
  membuktikan diri saat dalam tekanan hanya ada dalam benak, lawan.
</p>

        <div className="singles-grid grid grid-cols-[minmax(260px,360px)] gap-[2px] max-[900px]:grid-cols-1">
          <a
            href="https://open.spotify.com/album/6Dm2kVxs4srm23BSsqMba0?si=7Kus8xLIQCO83qAwO_fKew"
            target="_blank"
            rel="noreferrer"
            className="single-card-link group block w-fit text-inherit no-underline max-[900px]:w-full"
          >
            <div className="single-card relative aspect-square overflow-hidden bg-[#161616]">
              <Image
                src="/square-up.jpg"
                alt="Square Up"
                width={1000}
                height={1000}
                className="h-full w-full object-cover grayscale-[60%] brightness-[0.7] transition-all duration-400 ease-out group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-[0.9]"
              />

              {/* Tag di sudut kiri atas */}
              <span className="absolute left-3 top-3 z-10 border border-[rgba(255,255,255,0.15)] px-2 py-[3px] font-['Barlow_Condensed',sans-serif] text-[0.63rem] uppercase tracking-[0.25em] text-[#d8d2c9]">
                Listen on Spotify
              </span>

              {/* Overlay Gradient dari bawah ke atas */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent to-[60%] p-4">
                <p className="mb-1 font-['Barlow_Condensed',sans-serif] text-[1rem] font-semibold uppercase tracking-[0.05em]">
                  SQUARE UP!
                </p>
                <p className="text-[0.82rem] text-[#d0c9bf]">2025 · Single</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}