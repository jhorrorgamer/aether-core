import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, MessageSquare, Trash2, Terminal, ShieldAlert } from "lucide-react";

const supabaseUrl = 'https://mrjrampvdwmppmyyoxqs.supabase.co';
const supabaseKey = 'sb_publishable_EPAWiAKKO-rKEPSWjZKmAQ_ErKQ5qFd';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isBreached, setIsBreached] = useState(false);
  const [is404, setIs404] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hoverSecret, setHoverSecret] = useState("");
  const [userIdea, setUserIdea] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [dbStatus, setDbStatus] = useState("connecting");
  const [currentHint, setCurrentHint] = useState(0);

  const hints = ["[LOG]: 0x45 0x59 0x45 0x53", "[LOG]: SECURITY_VULNERABILITY: 'B_R_E_A_C_H'", "[LOG]: TYPE_'LOGS'_FOR_HISTORY"];
  const audioRef = useRef(null);
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const idleTimer = useRef(null);

  const galleryImages = [
    { src: "image1.png", meta: "SEARCH: CASE_FILE_LEVEL_188" }, 
    { src: "image2.png", meta: "SEARCH: CASE_FILE_LEVEL_0" }, 
    { src: "image3.png", meta: "SEARCH: CASE_FILE_WINDOW_VOID" }, 
    { src: "image4.png", meta: "SEARCH: CASE_FILE_TRANSITION" },
    { src: "image5.png", meta: "SEARCH: CASE_FILE_EMPTY_MALL" }, 
    { src: "image6.png", meta: "SEARCH: CASE_FILE_DREAM_POOL" }, 
    { src: "image7.png", meta: "SEARCH: CASE_FILE_ECHO_HALL" }, 
    { src: "image8.png", meta: "SEARCH: CASE_FILE_STATIC_TV" },
    { src: "image9.png", meta: "SEARCH: CASE_FILE_NULL_SPACE" }
  ];

  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];

  // --- AUDIO WHISPER SYNTHESIS (No file needed) ---
  const playWhisper = () => {
    if (isMuted) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 2);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 3);
  };

  // --- IDLE LOGIC ---
  const resetIdleTimer = () => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
        if (!isMuted) playWhisper();
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 500);
    }, 30000); // Trigger after 30 seconds of no movement
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const { data, error } = await supabase.from('ideas').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setSubmittedIdeas(data);
        setDbStatus("online");
      } catch (err) { setDbStatus("offline"); }
    };
    fetchIdeas();
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      resetIdleTimer();
      const hovered = !!e.target.closest('button, a, .clickable, input, textarea, .dead-pixel, img, video');
      if (hovered) cursorRef.current?.classList.add('cursor-hovering');
      else cursorRef.current?.classList.remove('cursor-hovering');
    };
    const updateCursor = () => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      requestAnimationFrame(updateCursor);
    };
    window.addEventListener("mousemove", moveCursor);
    const animFrame = requestAnimationFrame(updateCursor);
    return () => { window.removeEventListener("mousemove", moveCursor); cancelAnimationFrame(animFrame); };
  }, []);

  useEffect(() => {
    const handleKeys = (e) => {
      const buffer = (inputBuffer + e.key.toLowerCase()).slice(-10);
      setInputBuffer(buffer);
      if (buffer.endsWith("eyes")) { setIsEasterEgg(true); setTimeout(() => setIsEasterEgg(false), 5000); }
      if (buffer.endsWith("breach")) { setIsBreached(true); setTimeout(() => setIsBreached(false), 8000); }
      if (buffer.endsWith("404")) { setIs404(true); setTimeout(() => setIs404(false), 3000); }
      if (buffer.endsWith("logs")) { setIsLogsOpen(true); }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputBuffer]);

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''} ${isBreached ? 'breach-active' : ''} ${is404 ? 'system-wipe' : ''}`} onClick={() => audioRef.current?.play()}>
      <audio ref={audioRef} src="/music.mp3" loop />
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span>{isBreached ? 'SYSTEM_BREACHED' : 'AETHER_CORE_STATION'}</span>
            <span className="pointer-events-auto">CREATOR: DYLON MARTINEAU</span>
            <div className="dead-pixel pointer-events-auto mt-4 w-1.5 h-1.5 bg-red-600 shadow-[0_0_10px_red]" onClick={(e) => { e.stopPropagation(); setIsSecretOpen(true); }} />
          </div>
          <button onClick={() => setIsMuted(!isMuted)} className="clickable pointer-events-auto">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className="text-[4.5rem] md:text-[9rem] font-black italic mb-2 tracking-tighter text-white/10">AETHER_CORE</h1>
        <p className="text-[10px] md:text-[12px] text-white/30 uppercase tracking-[0.5em] mb-12 text-center max-w-2xl px-6 leading-loose">
          A digital archive of recovered generative visuals, dreamcore aesthetics, and encrypted short-film sequences. 
        </p>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 mb-32">
          {soraVideos.map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-6xl px-6 mb-40">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group relative clickable" onClick={() => setSelectedImg(img.src)} onMouseEnter={() => setHoverSecret(img.meta)} onMouseLeave={() => setHoverSecret("")}>
              <img src={`/${img.src}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all" />
              <div className="absolute top-2 right-2 text-[7px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                {img.meta}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CURSOR COMPONENT */}
      <div ref={cursorRef} className="custom-cursor"><div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" /></div>
      
      <AnimatePresence>
        {/* LOG TERMINAL MODAL */}
        {isLogsOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6 font-mono">
            <div className="w-full max-w-2xl border border-white/20 bg-black p-8 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white/50 text-xs">
                    <Terminal size={14} /> ARCHIVE_DECRYPTION_LOGS
                </div>
                <X className="text-white/20 hover:text-white clickable" onClick={() => setIsLogsOpen(false)} />
              </div>
              <div className="space-y-4 text-[11px] leading-relaxed max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
                <p className="text-red-500/80">[SYSTEM]: Warning - unauthorized access to sector_77</p>
                <p className="text-white/40"><span className="text-white/60">[ADMIN_01]:</span> Found a new sequence. It looks like a hotel, but the geometry is bleeding. Coordinates don't match any known maps.</p>
                <p className="text-white/40"><span className="text-white/60">[USER_NULL]:</span> Don't look at the eyes in the wallpaper. I did, and now the static won't stop when I close my laptop.</p>
                <p className="text-white/40"><span className="text-white/60">[ADMIN_01]:</span> The Sora generation is becoming... autonomous. It’s making things we didn't prompt.</p>
                <p className="text-blue-400/60">[SYSTEM]: Data packet 'CASE_FILE_LEVEL_0' restored successfully.</p>
                <p className="text-white/40"><span className="text-white/60">[USER_NULL]:</span> I'm leaving this here in case I don't come back. The exit isn't a door, it's a glitch. Accelerate into the wall.</p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-[9px] text-white/20 flex justify-between">
                <span>SECURE_CONNECTION_STABLE</span>
                <span>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable z-[110]" size={32} onClick={() => setActiveVideo(null)} />
            <div className="vertical-video-container border border-white/10"><video src={`/${activeVideo}`} controls autoPlay loop playsInline className="w-full h-full object-cover" /></div>
          </motion.div>
        )}

        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-10" onClick={() => setSelectedImg(null)}>
            <img src={`/${selectedImg}`} className="max-w-full max-h-full border border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}