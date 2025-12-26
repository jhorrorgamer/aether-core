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
  const [terminalLogs, setTerminalLogs] = useState(["[SYSTEM]: INITIALIZING...", "[LOAD]: VECTORS_STABLE"]);
  
  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  const galleryImages = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];

  // Cryptic log generator (The CMD Effect)
  useEffect(() => {
    const messages = ["[WARN]: DATA_LEAK", "[INFO]: SCANNING_VOID...", "[SYSTEM]: ENTITY_DETECTED", "[LOG]: MEMORY_404", "[VOID]: IT_WATCHES"];
    const interval = setInterval(() => {
      setTerminalLogs(prev => [...prev.slice(-4), messages[Math.floor(Math.random() * messages.length)]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard Listener
  useEffect(() => {
    const handleKeys = (e) => {
      const char = e.key.toLowerCase();
      setInputBuffer(prev => (prev + char).slice(-10));
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

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

  // Centered Cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const moveCursor = (e) => {
      requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
      const hovered = !!e.target.closest('button, a, .clickable, .dead-pixel, img, video, .hover-trigger');
      if (hovered) cursor.classList.add('cursor-hovering');
      else cursor.classList.remove('cursor-hovering');
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (audioRef.current) audioRef.current.muted = !isMuted;
  };

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''}`} onClick={() => audioRef.current?.play()}>
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://media.giphy.com/media/oEI9uWUicLpR36C40h/giphy.gif')] pointer-events-none" />
      </div>

      {/* CMD Console Effect (Bottom Left) */}
      <div className="fixed bottom-20 left-10 z-[40] w-64 p-4 border border-white/5 bg-black/40 backdrop-blur-md hidden md:block pointer-events-none">
        <div className="flex items-center gap-2 mb-2 text-white/40">
          <Terminal size={12} />
          <span className="text-[8px] tracking-widest uppercase">System_Log</span>
        </div>
        <div className="flex flex-col gap-1">
          {terminalLogs.map((log, i) => (
            <span key={i} className="text-[7px] text-white/20 font-mono italic">{log}</span>
          ))}
        </div>
      </div>

      {/* HUD */}
      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span>STATION: AETHER_CORE</span>
            <span>CREATOR: DYLON MARTINEAU</span>
            <div className="dead-pixel pointer-events-auto mt-4 cursor-none w-2 h-2 bg-red-600 shadow-[0_0_10px_red]" onClick={(e) => { e.stopPropagation(); setIsSecretOpen(true); }} />
          </div>
          <div className="flex flex-col items-end gap-4 pointer-events-auto">
            <button onClick={toggleMute} className="clickable transition-colors hover:text-white">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
        <div className="scanline" />
      </div>

      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[4.5rem] md:text-[9rem] font-black italic mb-4 transition-all select-none tracking-tighter ${isEasterEgg ? 'jitter-redacted' : 'text-white/10'}`}>
          {isEasterEgg ? "REDACTED" : "AETHER_CORE"}
        </h1>

        {/* Cryptic Hover Description */}
        <div className="max-w-xl text-center mb-20 px-6 group hover-trigger relative">
          <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-[0.2em] italic transition-opacity group-hover:opacity-0">
            "Recovered data from a fragmented reality. This archive serves as a digital vessel for visual experiments."
          </p>
          <p className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-red-600 uppercase tracking-[0.5em] w-full">
            THE ARCHIVE IS NOT EMPTY. STOP LOOKING.
          </p>
        </div>

        {/* Grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 mb-20">
          {soraVideos.map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 w-full max-w-6xl px-6">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group clickable" onClick={() => setSelectedImg(img)}>
              <img src={`/${img}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full z-[60] py-3 bg-black border-t border-white/5 overflow-hidden">
        <div className={`flex whitespace-nowrap animate-marquee text-[9px] tracking-[0.4em] uppercase ${isEasterEgg ? 'text-red-600' : 'text-white/10'}`}>
          <span className="mx-8">DYLON MARTINEAU // @JHORRORGAMER</span> • 
          <span className="mx-8">SYSTEM_STABILITY: {isGlitching ? "ERROR" : "NOMINAL"}</span>
        </div>
      </footer>

      {/* Cursor */}
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" />
      </div>

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
    </div>
  );
}