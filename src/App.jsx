import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { X, Maximize2, Youtube, MonitorPlay } from "lucide-react";

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [latency, setLatency] = useState({ gemini: "24ms", sora: "102ms" });
  
  const [audioLevel, setAudioLevel] = useState(0);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const cursorRef = useRef(null);

  const galleryImages = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];

  // --- THE BULLETPROOF CURSOR ENGINE ---
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      // e.clientX/Y is the absolute position on the screen monitor
      // We use translate3d to ensure the GPU handles the movement
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      
      // Update hovering state
      const hovered = !!e.target.closest('button, a, .clickable, .dead-pixel, img, video');
      if (hovered) {
        cursor.classList.add('cursor-hovering');
      } else {
        cursor.classList.remove('cursor-hovering');
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const initAudio = () => {
    if (analyserRef.current) return;
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const src = context.createMediaElementSource(audioRef.current);
    const analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 64;
    analyserRef.current = analyser;

    const update = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average / 255);
      requestAnimationFrame(update);
    };
    update();
  };

  const handleInteraction = () => {
    audioRef.current?.play().catch(() => {});
    initAudio();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency({
        gemini: `${Math.floor(Math.random() * 10 + 20)}ms`,
        sora: `${Math.floor(Math.random() * 50 + 90)}ms`
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
    <div 
      className="relative min-h-screen w-full bg-black font-mono text-white" 
      onClick={handleInteraction}
    >
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* BACKGROUNDS (Wrapped in a separate div to prevent layout shifts) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-500 ${isEasterEgg ? 'opacity-0' : 'opacity-25'}`} 
          style={{ transform: `scale(${1 + audioLevel * 0.05})` }}
        />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
      </div>

      {/* HUD (Fixed at the top) */}
      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span>STATION: AETHER_CORE</span>
            <span>USER: DYLON_M</span>
            <div className="dead-pixel pointer-events-auto mt-4" onClick={() => setIsSecretOpen(true)} />
          </div>
          <div className="text-right">
            <span>AUDIO_SYNC: {Math.round(audioLevel * 100)}%</span>
          </div>
        </div>
        <div className="scanline" style={{ opacity: 0.05 + audioLevel * 0.1 }} />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[5rem] md:text-[9rem] font-black italic mb-10 transition-all ${isEasterEgg ? 'jitter-redacted' : 'text-white/10'}`}>
          {isEasterEgg ? "REDACTED" : "AETHER_CORE"}
        </h1>

        {/* VIDEOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 mb-20">
          {soraVideos.map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* IMAGES */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-6xl px-6">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group clickable" onClick={() => setSelectedImg(img)}>
              <img src={`/${img}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 w-full z-[60] py-3 bg-black border-t border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-[9px] text-white/10 tracking-[0.4em] uppercase">
          <span className="mx-8">AETHER_ARCHIVE // 2025</span> • <span className="mx-8">SIGNAL_STRENGTH: {latency.sora}</span> • <span className="mx-8">AETHER_ARCHIVE // 2025</span>
        </div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable" size={32} onClick={() => setActiveVideo(null)} />
            <video src={`/${activeVideo}`} controls autoPlay className="max-w-4xl w-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE CURSOR - PLACED AT THE VERY END TO OVERRIDE EVERYTHING */}
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" />
      </div>
    </div>
  );
}