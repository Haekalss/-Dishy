import { tourDates } from "../home-data";

export function TourSection() {
  return (
    <section
      id="tour"
      className="relative border-t border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] px-12 py-[120px] text-white max-[900px]:px-6 max-[640px]:px-4 max-[640px]:py-[88px]"
    >
      <div className="tour-header reveal mb-14 max-[900px]:mb-[56px]">
        <p className="mb-3 font-['Barlow_Condensed',sans-serif] text-[0.86rem] font-bold uppercase tracking-[0.26em] text-[#b02a33] [text-shadow:0_2px_14px_rgba(0,0,0,0.28)]">
          Live
        </p>
        <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(2.6rem,6.1vw,4.8rem)] leading-none tracking-[0.04em] text-white max-[640px]:text-[clamp(1.9rem,10.8vw,2.7rem)]">
          Tour Dates
        </h2>
      </div>

      <div className="tour-list flex flex-col gap-0">
        {tourDates.map((tourDate) => (
          <div
            className="tour-item reveal relative grid grid-cols-[140px_1fr_auto] items-center gap-8 border-b border-[rgba(255,255,255,0.07)] py-6 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.02)] max-[900px]:grid-cols-[92px_1fr] max-[900px]:gap-[14px] max-[900px]:py-[18px]"
            key={`${tourDate.date}-${tourDate.venue}`}
          >
            {/* Date - Dicoret */}
            <div className="tour-date font-['Bebas_Neue',sans-serif] text-[2rem] leading-none tracking-[0.05em] opacity-50 line-through max-[900px]:text-[1.5rem]">
              {tourDate.date}
              <span className="mt-[2px] block font-['Barlow_Condensed',sans-serif] text-[0.72rem] uppercase tracking-[0.2em] text-[#a7a29b] max-[900px]:text-[0.64rem] max-[900px]:tracking-[0.15em]">
                {tourDate.year}
              </span>
            </div>

            {/* Venue & City - Dicoret */}
            <div className="tour-venue opacity-50 line-through">
              <h4 className="font-['Barlow_Condensed',sans-serif] text-[1.1rem] font-semibold uppercase tracking-[0.05em] text-white max-[900px]:text-[0.95rem]">
                {tourDate.venue}
              </h4>
              <p className="mt-1 text-[0.8rem] text-[#c9c3ba]">Indonesia</p>
            </div>

            {/* Text SOLD OUT (Tanpa tombol) */}
            <span className="font-['Barlow_Condensed',sans-serif] text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#a7a29b] opacity-40 max-[900px]:col-span-full max-[900px]:mt-2">
              SOLD OUT
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}