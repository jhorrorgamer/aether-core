import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { X, Maximize2, Youtube, MonitorPlay } from "lucide-react";

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null); // Tracks which Sora video is fullscreen
  const [isHovering, setIsHovering] = useState(false);
  const [latency, setLatency] = useState({ gemini: "24ms", sora: "102ms" });
  
  const audioRef = useRef(null);

  // Asset Arrays
  const galleryImages = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];

  // --- CURSOR TRACKING ---
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 500 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 500 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX); mouseY.set(e.clientY);
      setIsHovering(!!e.target.closest('button, a, .clickable, .dead-pixel, img, video'));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // --- AI LATENCY SIMULATION ---
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency({
        gemini: `${Math.floor(Math.random() * 10 + 20)}ms`,
        sora: `${Math.floor(Math.random() * 50 + 90)}ms`
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- AUDIO LOGIC (Pauses music for secrets or Sora videos) ---
  useEffect(() => {
    if (audioRef.current) {
      (isSecretOpen || activeVideo) ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
    }
  }, [isSecretOpen, activeVideo]);

  // --- EYES EASTER EGG ---
  useEffect(() => {
    const handleKeys = (e) => {
      const buf = (inputBuffer + e.key.toLowerCase()).slice(-4);
      setInputBuffer(buf);
      if (buf === "eyes") { 
        setIsEasterEgg(true); 
        setTimeout(() => setIsEasterEgg(false), 3000); 
        setInputBuffer("");
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputBuffer]);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-mono text-white" onClick={() => audioRef.current?.play()}>
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* BACKGROUNDS */}
      <div className="fixed inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center breathing-room transition-opacity duration-500 ${isEasterEgg ? 'opacity-0' : 'opacity-100'}`} 
          style={{ filter: 'brightness(0.25)' }} 
        />
        <div 
          className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div className="vhs-filter" />
      </div>

      {/* CURSOR */}
      <motion.div className={`custom-cursor ${isHovering ? 'cursor-hovering' : ''}`} style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}>
        <div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" />
      </motion.div>

      {/* HUD */}
      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-white/40">CREATOR: DYLON MARTINEAU</span>
              <span className="text-[8px]">@JHORRORGAMER // STATION_09</span>
            </div>
            <div className="dead-pixel pointer-events-auto ml-4" onClick={() => setIsSecretOpen(true)} />
          </div>
          <div className="text-right flex flex-col gap-1 border-r border-white/10 pr-4">
            <div className="flex justify-end gap-4">
              <span>GEMINI_FLASH: <span className="text-white/40">{latency.gemini}</span></span>
              <span>SORA_ENGINE: <span className="text-white/40">{latency.sora}</span></span>
            </div>
            <span className="text-[8px] opacity-40">AI_SYNTHESIS_ACTIVE</span>
          </div>
        </div>
        <div className="scanline" />
      </div>

      <main className="relative z-10 flex flex-col items-center pt-32">
        <h1 className={`text-[5rem] md:text-[9rem] font-black italic select-none transition-all ${isEasterEgg ? 'jitter-redacted' : 'text-white/10'}`}>
          {isEasterEgg ? "REDACTED" : "AETHER_CORE"}
        </h1>

        <div className="max-w-xl text-center px-6 mb-12">
          <p className="text-white/40 text-[10px] md:text-xs leading-relaxed uppercase tracking-[0.2em]">
            Synthetic content archive curated by Dylon Martineau. Generated using 
            <span className="text-white/80 mx-1">Gemini</span>, 
            <span className="text-white/80 mx-1">Sora</span>, and 
            <span className="text-white/80 mx-1">ChatGPT</span>.
          </p>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex gap-8 mb-20 z-20">
          <a href="https://sora.chatgpt.com/profile/jhorrorgamer" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-white transition-colors tracking-widest clickable cursor-none">
            <MonitorPlay size={14} /> SORA_PROFILE
          </a>
          <a href="https://www.youtube.com/@JhorrorGamer" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-red-500 transition-colors tracking-widest clickable cursor-none">
            <Youtube size={14} /> YOUTUBE
          </a>
        </div>

        {/* NEW: SORA CREATIONS SECTION */}
        <section className="w-full max-w-6xl px-6 mb-32">
          <h2 className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-8 border-b border-white/5 pb-2">Sora Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {soraVideos.map((vid, idx) => (
              <Card key={idx} onClick={() => setActiveVideo(vid)} className="bg-black/40 border-white/5 hover:border-white/20 transition-all group overflow-hidden clickable">
                <CardContent className="p-0 aspect-video relative">
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                    <Maximize2 className="text-white" />
                  </div>
                  <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover saturate-[0.1] opacity-30 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-1000" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* IMAGE GALLERY SECTION */}
        <section className="w-full max-w-6xl px-6 pb-60">
          <h2 className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-8 border-b border-white/5 pb-2">Data Logs</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-square bg-zinc-950/50 border border-white/5 overflow-hidden group clickable cursor-none" onClick={() => setSelectedImg(img)}>
                <img src={`/${img}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" alt="Synthetic Data" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER MARQUEE */}
      <footer className="fixed bottom-0 w-full z-50 py-3 bg-black/90 backdrop-blur-lg border-t border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-[9px] text-white/20 tracking-[0.4em] uppercase">
          <span className="mx-8">DYLON MARTINEAU // @JHORRORGAMER</span> • <span className="mx-8">VISUALS BY SORA</span> • <span className="mx-8">LOGIC BY CHATGPT</span> • <span className="mx-8">LIMINAL ARCHIVE</span> •
          <span className="mx-8">DYLON MARTINEAU // @JHORRORGAMER</span> • <span className="mx-8">VISUALS BY SORA</span> • <span className="mx-8">LOGIC BY CHATGPT</span> • <span className="mx-8">LIMINAL ARCHIVE</span>
        </div>
      </footer>

      {/* OVERLAYS */}
      <AnimatePresence>
        {/* Fullscreen Sora Video */}
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] bg-black/95 flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/40 hover:text-white clickable" size={40} onClick={() => setActiveVideo(null)} />
            <video src={`/${activeVideo}`} controls autoPlay className="max-w-5xl w-full h-auto shadow-2xl border border-white/10" />
          </motion.div>
        )}
        {/* Image Lightbox */}
        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-10" onClick={() => setSelectedImg(null)}>
            <img src={`/${selectedImg}`} className="max-w-full max-h-full border border-white/10 shadow-2xl" alt="Full view" />
          </motion.div>
        )}
        {/* Secret Video */}
        {isSecretOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex items-center justify-center">
            <X className="absolute top-10 right-10 text-white/20 hover:text-red-600 clickable transition-colors z-[510]" size={40} onClick={() => setIsSecretOpen(false)} />
            <video src="/secret.mp4" autoPlay className="w-full h-full object-contain" onEnded={() => setIsSecretOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}