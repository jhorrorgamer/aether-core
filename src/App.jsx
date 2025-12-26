import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, Terminal, Eye, AlertTriangle } from "lucide-react";

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [latency, setLatency] = useState({ gemini: "24ms", sora: "102ms" });
  const [terminalLogs, setTerminalLogs] = useState(["[SYSTEM]: INITIALIZING...", "[LOAD]: VECTORS_STABLE"]);
  
  const [audioLevel, setAudioLevel] = useState(0);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const cursorRef = useRef(null);

  const galleryImages = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];

  // Cryptic log generator
  useEffect(() => {
    const messages = [
      "[WARN]: DATA_LEAK_DETECTED",
      "[INFO]: SCANNING_VOID...",
      "[SYSTEM]: UNKNOWN_ENTITY_PRESENT",
      "[LOG]: MEMORY_FRAGMENT_404",
      "[VOID]: IT_LOOKS_BACK",
      "[LOAD]: RECONSTRUCTING_DREAM_STATE"
    ];
    const interval = setInterval(() => {
      setTerminalLogs(prev => [...prev.slice(-4), messages[Math.floor(Math.random() * messages.length)]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  // Music Management
  useEffect(() => {
    if (audioRef.current) {
      if (activeVideo || isSecretOpen) {
        audioRef.current.pause();
      } else if (!isMuted) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [activeVideo, isSecretOpen, isMuted]);

  // Centered Cursor Logic
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

  const toggleMute = (e) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) audioRef.current.muted = newMuted;
  };

  const handleInteraction = () => {
    if (!isMuted) audioRef.current?.play().catch(() => {});
    initAudio();
  };

  // Eyes Easter Egg
  useEffect(() => {
    const handleKeys = (e) => {
      const newBuf = (inputBuffer + e.key.toLowerCase()).slice(-4);
      setInputBuffer(newBuf);
      if (newBuf === "eyes") { 
        setIsEasterEgg(true); 
        setTimeout(() => setIsEasterEgg(false), 5000);
        setInputBuffer("");
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputBuffer]);

  return (
    <div className="relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden" onClick={handleInteraction}>
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} 
          style={{ transform: `scale(${1 + audioLevel * 0.1})` }} 
        />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://media.giphy.com/media/oEI9uWUicLpR36C40h/giphy.gif')] pointer-events-none" />
      </div>

      {/* Cryptic Terminal Window (Liminal Floating Element) */}
      <div className="fixed bottom-20 left-10 z-[40] w-64 p-4 border border-white/5 bg-black/40 backdrop-blur-md hidden md:block">
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
            <div className="flex gap-4">
              <span>GEMINI: {latency.gemini}</span>
              <span>SORA: {latency.sora}</span>
            </div>
            <span>AUDIO_SYNC: {Math.round(audioLevel * 100)}%</span>
          </div>
        </div>
        <div className="scanline" style={{ opacity: 0.1 + audioLevel * 0.2 }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[4.5rem] md:text-[9rem] font-black italic mb-4 transition-all select-none ${isEasterEgg ? 'jitter-redacted' : 'text-white/10'}`}>
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

        <div className="max-w-xl text-center mb-20 px-6 group hover-trigger">
          <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-[0.2em] italic transition-opacity group-hover:opacity-0">
            "Recovered data from a fragmented reality. This archive serves as a digital vessel for visual experiments, 
            AI-driven narratives, and the exploration of the uncanny."
          </p>
          {/* Cryptic message revealed on hover */}
          <p className="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-red-600 uppercase tracking-[0.5em] w-full">
            THE ARCHIVE IS NOT EMPTY. STOP LOOKING.
          </p>
        </div>

        {/* Sora Creations */}
        <section className="w-full max-w-6xl px-6 mb-32">
          <h2 className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-8 border-b border-white/5 pb-2">Sora Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {soraVideos.map((vid, idx) => (
              <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable relative">
                <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all scale-[1.01]" />
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 text-[8px] text-white/40">FRAG_{idx}_LOC_UNCERTAIN</div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Logs */}
        <section className="w-full max-w-6xl px-6">
          <h2 className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-8 border-b border-white/5 pb-2 flex justify-between items-center">
            <span>Data Logs</span>
            <span className="text-red-900 animate-pulse text-[8px]">UNAUTHORIZED_ACCESS</span>
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group clickable relative" onClick={() => setSelectedImg(img)}>
                <img src={`/${img}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all" />
                <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Scrolling Footer */}
      <footer className="fixed bottom-0 w-full z-[60] py-3 bg-black border-t border-white/5 overflow-hidden">
        <div className={`flex whitespace-nowrap animate-marquee text-[9px] tracking-[0.4em] uppercase ${isEasterEgg ? 'text-red-600' : 'text-white/10'}`}>
          <span className="mx-8">DYLON MARTINEAU // @JHORRORGAMER</span> • 
          <span className="mx-8">SORA_ENGINE_LATENCY: {latency.sora}</span> • 
          <span className="mx-8">GEMINI_CORE_SYNC: {latency.gemini}</span> • 
          <span className="mx-8">AETHER_ARCHIVE_2025</span>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable z-[110]" size={32} onClick={() => setActiveVideo(null)} />
            <video src={`/${activeVideo}`} controls autoPlay className="max-w-4xl w-full border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]" />
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

      {/* Centered Cursor */}
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" />
      </div>
    </div>
  );
}