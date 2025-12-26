import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, Terminal } from "lucide-react";

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [latency, setLatency] = useState({ gemini: "24ms", sora: "102ms" });
  
  const [audioLevel, setAudioLevel] = useState(0);
  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  const galleryImages = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];

  // AI Latency Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency({
        gemini: `${Math.floor(Math.random() * 10 + 20)}ms`,
        sora: `${Math.floor(Math.random() * 50 + 90)}ms`
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard Listener (Supports 404 and EYES simultaneously)
  useEffect(() => {
    const handleKeys = (e) => {
      const char = e.key.toLowerCase();
      setInputBuffer(prev => (prev + char).slice(-10));
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  // Buffer Watcher
  useEffect(() => {
    if (inputBuffer.endsWith("eyes")) {
      setIsEasterEgg(true);
      setTimeout(() => setIsEasterEgg(false), 5000);
      setInputBuffer(""); 
    }
    if (inputBuffer.endsWith("404")) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 800);
      setInputBuffer("");
    }
  }, [inputBuffer]);

  // Centered Cursor Engine
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const moveCursor = (e) => {
      requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
      const hovered = !!e.target.closest('button, a, .clickable, .dead-pixel, img, video');
      if (hovered) cursor.classList.add('cursor-hovering');
      else cursor.classList.remove('cursor-hovering');
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const handleInteraction = () => {
    if (!isMuted && audioRef.current) audioRef.current.play().catch(() => {});
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) audioRef.current.muted = newMuted;
  };

  return (
    <div 
      className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''}`} 
      onClick={handleInteraction}
    >
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
      </div>

      {/* HUD Header */}
      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span>STATION: AETHER_CORE</span>
            <span>CREATOR: DYLON MARTINEAU</span>
            <div 
              className="dead-pixel pointer-events-auto mt-4 cursor-none w-2 h-2 bg-red-600 shadow-[0_0_10px_red]" 
              onClick={(e) => { e.stopPropagation(); setIsSecretOpen(true); }} 
            />
          </div>
          <div className="flex flex-col items-end gap-4 pointer-events-auto">
            <button onClick={toggleMute} className="clickable transition-colors hover:text-white">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <div className="flex gap-4 text-[8px]">
              <span>GEMINI: {latency.gemini}</span>
              <span>SORA: {latency.sora}</span>
            </div>
          </div>
        </div>
        <div className="scanline" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[4.5rem] md:text-[9rem] font-black italic mb-4 transition-all select-none tracking-tighter ${isEasterEgg ? 'jitter-redacted' : 'text-white/10'}`}>
          {isEasterEgg ? "REDACTED" : "AETHER_CORE"}
        </h1>

        <div className="flex gap-8 mb-10">
          <a href="https://sora.chatgpt.com/profile/jhorrorgamer" target="_blank" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-white clickable uppercase tracking-widest">
            <MonitorPlay size={14} /> Sora Profile
          </a>
          <a href="https://www.youtube.com/@JhorrorGamer" target="_blank" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-red-500 clickable uppercase tracking-widest">
            <Youtube size={14} /> YouTube
          </a>
        </div>

        <div className="max-w-xl text-center mb-20 px-6">
          <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-[0.2em] italic">
            "Recovered data from a fragmented reality. This archive serves as a digital vessel for visual experiments, 
            AI-driven narratives, and the exploration of the uncanny. Synchronizing with Aether Core..."
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 mb-20">
          {soraVideos.map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>

        {/* Data Logs */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-6xl px-6">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group clickable" onClick={() => setSelectedImg(img)}>
              <img src={`/${img}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer Marquee */}
      <footer className="fixed bottom-0 w-full z-[60] py-3 bg-black border-t border-white/5 overflow-hidden">
        <div className={`flex whitespace-nowrap animate-marquee text-[9px] tracking-[0.4em] uppercase ${isEasterEgg ? 'text-red-600' : 'text-white/10'}`}>
          <span className="mx-8">DYLON MARTINEAU // @JHORRORGAMER</span> • 
          <span className="mx-8">SYSTEM_STABILITY: {isGlitching ? "ERROR" : "NOMINAL"}</span> • 
          <span className="mx-8">AETHER_ARCHIVE_2025</span>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable z-[110]" size={32} onClick={() => setActiveVideo(null)} />
            <video src={`/${activeVideo}`} controls autoPlay className="max-w-4xl w-full border border-white/10" />
          </motion.div>
        )}
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-10" onClick={() => setSelectedImg(null)}>
            <img src={`/${selectedImg}`} className="max-w-full max-h-full border border-white/10" />
          </motion.div>
        )}
        {isSecretOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex items-center justify-center">
             <X className="absolute top-10 right-10 text-white/20 clickable z-[510]" size={32} onClick={() => setIsSecretOpen(false)} />
             <video src="/secret.mp4" autoPlay className="w-full h-full object-contain" onEnded={() => setIsSecretOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor */}
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" />
      </div>
    </div>
  );
}