import Image from "next/image";

export function MerchSection() {
  return (
    <section id="list" className="border-t border-[rgba(255,255,255,0.07)] bg-[linear-gradient(to_bottom,#0a0a0a,#120808)] px-12 py-17 max-[900px]:px-6 max-[640px]:px-4 max-[640px]:py-[72px]">
      <p className="reveal mb-3 font-['Barlow_Condensed',sans-serif] text-[0.86rem] font-bold uppercase tracking-[0.26em] text-white">Official Merch</p>
      <h2 className="reveal mb-12 font-['Bebas_Neue',sans-serif] text-[clamp(2.6rem,6.1vw,4.8rem)] text-white font-bold tracking-[0.04em]">MERCH</h2>
      
      <div className="merch-grid grid grid-cols-[minmax(260px,360px)] gap-6">
       <div className="merch-card reveal border border-[rgba(255,255,255,0.07)] bg-[#161616]">
  
  {/* Bagian Foto: Ubah aspect-square menjadi aspect-[4/3] atau sesuai selera */}
  <div className="merch-gallery relative overflow-hidden border-b border-[rgba(255,255,255,0.07)] aspect-[4/4] ">
    <Image 
      src="/merch.jpeg" 
      alt="Attached to Decay Tee" 
      width={600} 
      height={450} // Sesuaikan height agar proporsional
      className="h-full w-full object-cover blur-sm" 
    />
    
    {/* Stempel SOLD OUT miring */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="inline-block border-4 border-[#b02a33] bg-[rgba(10,10,10,0.4)] px-6 py-2 font-['Bebas_Neue',sans-serif] text-[3rem] uppercase tracking-[0.1em] text-[#b02a33] [transform:rotate(-15deg)] [filter:drop-shadow(0_4px_12px_rgba(208,42,51,0.3))]">
        SOLD OUT
      </span>
    </div>
  </div>

          {/* Bagian Body */}
          <div className="merch-body p-6">
            <p className="mb-3 font-['Barlow_Condensed',sans-serif] text-[0.78rem] font-bold uppercase tracking-[0.24em] text-white font-bold">T-Shirt</p>
            <h3 className="mb-[10px] font-['Bebas_Neue',sans-serif] text-[2rem] text-white font-bold tracking-[0.05em]">ATTACHED TO DECAY TEE</h3>
            <p className="mb-[18px] text-[0.9rem] text-[#d2cbc1]">T-Shirt official dengan artwork Attached to Decay.</p>
            <span className="mb-5 block font-['Barlow_Condensed',sans-serif] text-[0.8rem] uppercase tracking-[0.2em] text-[#f0ede8]">Rp 150.000</span>
            
            <button 
              className="inline-flex items-center justify-center border border-[#666] px-5 py-3 font-['Barlow_Condensed',sans-serif] text-[0.72rem] uppercase tracking-[0.2em] text-[#999] opacity-60 cursor-not-allowed" 
              type="button" 
              disabled
            >
              Sold Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}