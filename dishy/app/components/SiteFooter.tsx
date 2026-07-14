export function SiteFooter() {
  return (
    <footer className="flex flex-col items-center gap-5 border-t border-[rgba(255,255,255,0.07)] bg-[#0a0a0a] px-12 py-14 text-white max-[900px]:gap-5 max-[900px]:px-6 max-[640px]:px-4 max-[640px]:py-7">
      
      {/* Contact Section */}
      <div className="footer-contact flex flex-col items-center gap-4">
        <div className="inline-flex items-center justify-center px-3 py-2 font-['Barlow_Condensed',sans-serif] text-[0.9rem] font-bold uppercase tracking-[0.2em] text-[#b02a33]">
          Contact Us
        </div>
        <div className="contact-options flex flex-row items-center justify-center gap-8 max-[640px]:flex-col max-[640px]:gap-2">
          <a 
            className="border border-transparent px-[14px] py-[6px] text-center font-['Barlow_Condensed',sans-serif] text-[0.85rem] tracking-[0.1em] text-[#d6d0c7] no-underline transition-all duration-500 hover:text-white hover:border-[#b02a33] hover:bg-[rgba(209,37,37,0.08)] rounded-[4px]" 
            href="mailto:dishyhc@gmail.com"
          >
            dishyhc@gmail.com
          </a>
          <a 
            className="border border-transparent px-[14px] py-[6px] text-center font-['Barlow_Condensed',sans-serif] text-[0.85rem] tracking-[0.1em] text-[#d6d0c7] no-underline transition-all duration-500 hover:text-white hover:border-[#b02a33] hover:bg-[rgba(209,37,37,0.08)] rounded-[4px]" 
            href="https://api.whatsapp.com/send?phone=6285777568077" 
            target="_blank" 
            rel="noreferrer"
          >
            +62 857-7756-8077
          </a>
        </div>
      </div>

      {/* Social Links */}
      <div className="footer-social flex items-center gap-[22px]">
        <a className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#c8c1b7] transition-colors hover:text-[#b02a33]" href="https://open.spotify.com/artist/2V2jfiV79A7aHVWAbissUh?si=q3BC5wywReqvzUMsUk1SPA" target="_blank" rel="noreferrer" title="Spotify">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
        </a>
        <a className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#c8c1b7] transition-colors hover:text-[#b02a33]" href="https://www.instagram.com/dishytrippinz" target="_blank" rel="noreferrer" title="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
        </a>
        <a className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#c8c1b7] transition-colors hover:text-[#b02a33]" href="https://youtube.com/channel/UCqksDw5WGWnB6sCflhX22jw" target="_blank" rel="noreferrer" title="YouTube">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
        </a>
        <a className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[#c8c1b7] transition-colors hover:text-[#b02a33]" href="https://music.apple.com/us/artist/dishy/1837698766" target="_blank" rel="noreferrer" title="Apple Music">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3v10.55a4 4 0 1 0 2 3.45V7h3V3h-5zM7 13a4 4 0 1 0 2 3.45V6h6V3H7v10z" /></svg>
        </a>
      </div>

      <div className="footer-copy text-center text-[0.75rem] tracking-[0.08em] text-[#a8a29a]">© 2026 Dishy. All Rights Reserved.</div>
      <div className="footer-credit text-center text-[0.7rem] tracking-[0.08em] text-[#7e786f]">
        Design & Development by 
        <a className="ml-1 text-[#a8a29a] no-underline transition-colors hover:text-[#b02a33]" href="https://github.com/Haekalss" target="_blank" rel="noreferrer">Kall</a>
      </div>
    </footer>
  );
}