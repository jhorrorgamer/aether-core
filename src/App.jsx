import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, MessageSquare, Trash2, Terminal, ShieldAlert, Download } from "lucide-react";

const supabaseUrl = 'https://mrjrampvdwmppmyyoxqs.supabase.co';
const supabaseKey = 'sb_publishable_EPAWiAKKO-rKEPSWjZKmAQ_ErKQ5qFd';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isBreached, setIsBreached] = useState(false);
  const [is404, setIs404] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false); 
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [randomLogs, setRandomLogs] = useState([]);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [isHiddenOpen, setIsHiddenOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hoverSecret, setHoverSecret] = useState("");
  const [userIdea, setUserIdea] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [dbStatus, setDbStatus] = useState("connecting");
  const [currentHint, setCurrentHint] = useState(0);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [capturedData, setCapturedData] = useState(null);
  const [isCorrupting, setIsCorrupting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const hints = [
    "[LOG]: 0x45 0x59 0x45 0x53",
    "[LOG]: SECURITY_VULNERABILITY: 'B_R_E_A_C_H'",
    "[LOG]: ERR_NOT_FOUND: 4_0_4",
    "[LOG]: TYPE_'LOGS'_TO_DECRYPT",
    "[LOG]: TYPE_'WIRE'_TO_SEE_THE_GRID",
    "[LOG]: ACCELERATION_BREAKS_REALITY",
    "[LOG]: SUBJECT_MARTINEAU_FOUND_IN_SECTOR_7"
  ];

  const logDatabase = [
    { type: 'error', text: "[SYSTEM]: FATAL_ERROR in Sector_7. Subject 'Dylon Martineau' has exceeded temporal bounds." },
    { type: 'admin', user: 'ADMIN_01', text: "He wasn't supposed to stay in the render. Why is the Sora engine keeping Dylon?" },
    { type: 'user', user: 'NULL_RECOVERY', text: "I saw Dylon in Case File 3. He looked at the camera, but his eyes... they weren't digital anymore." },
    { type: 'admin', user: 'DEPT_CHIEF', text: "Stop the extraction. If we pull Dylon Martineau out now, the entire archive collapses." },
    { type: 'system', text: "[ALERT]: subject_martineau_01 status: LOST_IN_TRANSITION." },
    { type: 'error', text: "[CRITICAL]: Subject 'Dylon Martineau' found in non-indexed coordinate: NULL_SPACE." }
  ];

  const downloadLore = [
    "DECRYPTING: 'THE_MALL_INCIDENT_REPORT'",
    "RETRIEVING: 'MARTINEAU_BRAIN_SCAN_01'",
    "WARNING: RENDER_ENGINE_SELF_AWARENESS_DETECTED",
    "LOG: 'HE_IS_THE_CODE_NOW'",
    "RECOVERED: 'SECTOR_7_NULL_COORDINATES'"
  ];

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

  // Console Surveillance
  useEffect(() => {
    console.log("%c [SYSTEM_NOTICE]: Unauthorized Inspector Access Detected. Monitoring keystrokes... ", "color: yellow; background: black; font-weight: bold; border: 1px solid yellow; padding: 4px;");
    const devInterval = setInterval(() => {
      console.log(`%c [TRACE]: Dylon Martineau status remains 'STATIONARY'. `, "color: #444; font-size: 9px;");
    }, 15000);
    return () => clearInterval(devInterval);
  }, []);

  // Audio & Whisper Logic
  const playWhisper = () => {
    if (isMuted) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 3);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 4);
    } catch (e) {}
  };

  const resetIdleTimer = () => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (!isMuted && !activeVideo && !isSecretOpen) {
        playWhisper();
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 400);
      }
    }, 30000);
  };

  const startDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCapturedData(downloadLore[Math.floor(Math.random() * downloadLore.length)]);
          setTimeout(() => { setIsDownloading(false); setCapturedData(null); }, 4000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleNeuralSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    if (query.includes("dylon") || query.includes("martineau") || query.includes("subject")) {
      setIsCorrupting(true);
      setTimeout(() => {
        setIsCorrupting(false);
        setIsBreached(true);
        setTimeout(() => setIsBreached(false), 5000);
      }, 3000);
    }
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const { data } = await supabase.from('ideas').select('*').order('created_at', { ascending: false });
        if (data) { setSubmittedIdeas(data); setDbStatus("online"); }
      } catch (err) { setDbStatus("offline"); }
    };
    fetchIdeas();
    const channel = supabase.channel('db').on('postgres_changes', { event: '*', schema: 'public', table: 'ideas' }, (p) => {
      if (p.eventType === 'INSERT') setSubmittedIdeas(prev => [p.new, ...prev]);
    }).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      resetIdleTimer();
      const hovered = !!e.target.closest('button, a, .clickable, input, textarea, .dead-pixel, img, video');
      if (hovered) cursorRef.current?.classList.add('cursor-hovering');
      else cursorRef.current?.classList.remove('cursor-hovering');
      
      if (Math.abs(e.movementX) > 130) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }
    };
    const updateCursor = () => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      requestAnimationFrame(updateCursor);
    };
    window.addEventListener("mousemove", moveCursor);
    const animFrame = requestAnimationFrame(updateCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    (isMuted || activeVideo || is404 || isSecretOpen || isHiddenOpen) ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  }, [isMuted, activeVideo, is404, isSecretOpen, isHiddenOpen]);

  useEffect(() => {
    const handleKeys = (e) => {
      const buffer = (inputBuffer + e.key.toLowerCase()).slice(-10);
      setInputBuffer(buffer);
      if (buffer.endsWith("eyes")) { setIsEasterEgg(true); setTimeout(() => setIsEasterEgg(false), 5000); }
      if (buffer.endsWith("breach")) { setIsBreached(true); setTimeout(() => setIsBreached(false), 8000); }
      if (buffer.endsWith("404")) { setIs404(true); setTimeout(() => setIs404(false), 3000); }
      if (buffer.endsWith("logs")) { setIsLogsOpen(true); }
      if (buffer.endsWith("wire")) { setIsWireframe(!isWireframe); }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputBuffer, isWireframe]);

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''} ${isBreached ? 'breach-active' : ''} ${is404 ? 'system-wipe' : ''} ${isWireframe ? 'wireframe-active' : ''}`} onClick={() => audioRef.current?.play()}>
      <audio ref={audioRef} src="/music.mp3" loop />
      {isDownloading && <div className="data-leak-bg" />}
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className={isBreached ? 'text-red-500' : ''}>{isBreached ? 'SYSTEM_BREACHED' : 'AETHER_CORE_STATION'}</span>
            <span onMouseEnter={() => setHoverSecret("DYLON_M_NULL")} onMouseLeave={() => setHoverSecret("")} className="secret-trigger pointer-events-auto">CREATOR: DYLON MARTINEAU</span>
            <div className="flex flex-col mt-4 gap-2 opacity-60">
               <motion.span key={currentHint} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/40 italic">
                {hints[currentHint]}
               </motion.span>
            </div>
            <div className="dead-pixel pointer-events-auto mt-4 w-1.5 h-1.5 bg-red-600 shadow-[0_0_10px_red]" onClick={(e) => { e.stopPropagation(); setIsSecretOpen(true); }} />
          </div>
          <button onClick={() => setIsMuted(!isMuted)} className="clickable pointer-events-auto">{isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}</button>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[4.5rem] md:text-[10rem] font-black italic mb-2 tracking-tighter ${isEasterEgg || isBreached ? 'jitter-redacted' : 'text-white/10'}`}>
          {is404 ? "VOID" : (isBreached ? "ACCESS_DENIED" : (isEasterEgg ? "REDACTED" : "AETHER_CORE"))}
        </h1>

        <p className="text-[10px] md:text-[12px] text-white/30 uppercase tracking-[0.5em] mb-12 text-center max-w-2xl px-6 leading-loose">
          A digital archive of recovered generative visuals, dreamcore aesthetics, and encrypted short-film sequences. 
          <br/><span className="text-white/10">[STABILITY: 42% // SECTOR: DECEMBER_2025]</span>
        </p>

        <div className="w-full max-w-2xl px-6 mb-12">
          <form onSubmit={handleNeuralSearch} className="relative group">
            <div className="relative flex items-center bg-black border border-white/10 p-4">
              <span className="text-white/20 text-[10px] mr-4 flex items-center gap-2"><ShieldAlert size={12}/> NEURAL_QUERY:</span>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SEARCH_ARCHIVE..." className="bg-transparent border-none outline-none text-[10px] text-white/60 w-full uppercase tracking-[0.3em]" />
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-8 mb-32">
          {soraVideos.map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-7xl px-8 mb-40">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group relative clickable" onClick={() => setSelectedImg(img.src)}>
              <img src={`/${img.src}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 w-full z-[60] py-4 bg-black border-t border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-[10px] tracking-[0.5em] uppercase text-white/10">
          <span className="mx-20">SYSTEM_STABILITY: {isGlitching ? "CRITICAL" : "NOMINAL"}</span>
          <span className="mx-20 clickable hover:text-white transition-colors" onClick={() => setIsHiddenOpen(true)}>DYLON MARTINEAU // @JHORRORGAMER</span>
        </div>
      </footer>

      <div ref={cursorRef} className="custom-cursor"><div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" /></div>
      
      <AnimatePresence>
        {isLogsOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/98 flex items-center justify-center p-6" onClick={() => setIsLogsOpen(false)}>
            <div className="w-full max-w-3xl border border-white/20 bg-black p-12" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 text-xs text-white/50"><Terminal size={16} /> DECRYPTION_LOGS <X className="clickable" onClick={() => setIsLogsOpen(false)} /></div>
              <div className="space-y-6 text-[12px] max-h-[55vh] overflow-y-auto custom-scrollbar">
                {logDatabase.map((log, i) => (
                  <p key={i} className={log.type === 'error' ? 'text-red-500' : 'text-white/40'}>{log.text}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {isCorrupting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-red-950/30 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="corruption-scanner" />
            <div className="text-red-600 font-black text-5xl animate-pulse tracking-[1.2em]">CORRUPTING...</div>
          </motion.div>
        )}

        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable z-[110]" size={32} onClick={() => setActiveVideo(null)} />
            <div className="vertical-video-container"><video src={`/${activeVideo}`} controls autoPlay loop playsInline className="w-full h-full object-cover" /></div>
          </motion.div>
        )}

        {isHiddenOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-black flex items-center justify-center">
             <X className="absolute top-10 right-10 text-white/20 clickable z-[3010]" size={32} onClick={() => setIsHiddenOpen(false)} />
             <video src="/hidden.mp4" autoPlay playsInline className="w-full h-full object-contain" onEnded={() => setIsHiddenOpen(false)} />
          </motion.div>
        )}

        {isSecretOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex items-center justify-center">
             <X className="absolute top-10 right-10 text-white/20 clickable z-[510]" size={32} onClick={() => setIsSecretOpen(false)} />
             <video src="/secret.mp4" autoPlay playsInline className="w-full h-full object-contain" onEnded={() => setIsSecretOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}