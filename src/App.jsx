import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, MessageSquare, Trash2, Terminal, ShieldAlert, Download, FileText } from "lucide-react";

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
  const [isScientistOpen, setIsScientistOpen] = useState(false); 
  const [isNotesOpen, setIsNotesOpen] = useState(false); 
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
    "[LOG]: SEARCH_'ANALYSIS'_FOR_LAB_RECORDS",
    "[LOG]: TYPE_'NOTES'_FOR_RESEARCH_FILES"
  ];

  const logDatabase = [
    { type: 'error', text: "[SYSTEM]: FATAL_ERROR in Sector_7. Subject 'Dylon Martineau' has exceeded temporal bounds." },
    { type: 'admin', user: 'ADMIN_01', text: "He wasn't supposed to stay in the render. Why is the Sora engine keeping Dylon? It's like the architecture is feeding off his presence." },
    { type: 'user', user: 'NULL_RECOVERY', text: "I saw Dylon in Case File 3. He looked at the camera, but his eyes... they weren't digital anymore." },
    { type: 'admin', user: 'DEPT_CHIEF', text: "Stop the extraction. If we pull Dylon Martineau out now, the entire liminal archive collapses. He's the anchor." },
    { type: 'system', text: "[ALERT]: subject_martineau_01 status: LOST_IN_TRANSITION." },
    { type: 'user', user: 'VOICE_09', text: "The mall isn't empty. Dylon is there. He’s been there since the first 2025 generation." },
    { type: 'admin', user: 'ADMIN_02', text: "We didn't prompt him to be in these videos. The AI is dreaming about Dylon Martineau on its own." },
    { type: 'error', text: "[CRITICAL]: Subject 'Dylon Martineau' found in non-indexed coordinate: NULL_SPACE." }
  ];

  const downloadLore = [
    "DECRYPTING: 'THE_MALL_INCIDENT_REPORT'",
    "RETRIEVING: 'MARTINEAU_BRAIN_SCAN_01'",
    "ERROR: SUBJECT_NOT_FOUND_IN_PHYSICAL_PLANE",
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
      if (!isMuted && !activeVideo && !isSecretOpen && !isHiddenOpen && !isScientistOpen) {
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

    if (query.includes("analysis") || query.includes("scientist") || query.includes("experiment")) {
        setIsCorrupting(true);
        setTimeout(() => {
          setIsCorrupting(false);
          setIsScientistOpen(true);
        }, 3000);
    } 
    else if (query.includes("dylon") || query.includes("martineau") || query.includes("subject")) {
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
    // SECURITY: Block Inspect shortcuts and right-click
    const blockContext = (e) => e.preventDefault();
    const blockInspect = (e) => {
        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || (e.ctrlKey && e.key === "U")) {
            e.preventDefault();
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 300);
        }
    };
    window.addEventListener("contextmenu", blockContext);
    window.addEventListener("keydown", blockInspect);
    return () => {
        window.removeEventListener("contextmenu", blockContext);
        window.removeEventListener("keydown", blockInspect);
    };
  }, []);

  useEffect(() => {
    if (isLogsOpen) {
      const shuffled = [...logDatabase].sort(() => 0.5 - Math.random());
      setRandomLogs(shuffled.slice(0, 5));
    }
  }, [isLogsOpen]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentHint(p => (p + 1) % hints.length), 7000);
    return () => clearInterval(interval);
  }, []);

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
      
      // RESTORED: Mouse glitch on fast movement
      if (Math.abs(e.movementX) > 130) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }
    };

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
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
    (isMuted || activeVideo || is404 || isSecretOpen || isHiddenOpen || isScientistOpen || isNotesOpen) ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  }, [isMuted, activeVideo, is404, isSecretOpen, isHiddenOpen, isScientistOpen, isNotesOpen]);

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    if (!userIdea.trim() || dbStatus !== "online") return;
    await supabase.from('ideas').insert([{ text: userIdea, username: `User_${Math.floor(Math.random() * 900) + 100}` }]);
    setUserIdea("");
  };

  const handleDelete = async (id, e) => {
    if (e.altKey) await supabase.from('ideas').delete().eq('id', id);
  };

  useEffect(() => {
    const handleKeys = (e) => {
      const buffer = (inputBuffer + e.key.toLowerCase()).slice(-10);
      setInputBuffer(buffer);
      if (buffer.endsWith("eyes")) { setIsEasterEgg(true); setTimeout(() => setIsEasterEgg(false), 5000); }
      if (buffer.endsWith("breach")) { setIsBreached(true); setTimeout(() => setIsBreached(false), 8000); }
      if (buffer.endsWith("404")) { setIs404(true); setTimeout(() => setIs404(false), 3000); }
      if (buffer.endsWith("logs")) { setIsLogsOpen(true); }
      if (buffer.endsWith("wire")) { setIsWireframe(!isWireframe); }
      if (buffer.endsWith("notes")) { setIsNotesOpen(true); } 
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputBuffer, isWireframe]);

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''} ${isBreached ? 'breach-active' : ''} ${is404 ? 'system-wipe' : ''} ${isWireframe ? 'wireframe-active' : ''}`} onClick={() => !isMuted && !activeVideo && audioRef.current?.play()}>
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
          <button onClick={() => setIsMuted(!isMuted)} className="clickable pointer-events-auto hover:text-white transition-colors">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {hoverSecret && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-20 left-10 text-red-600 text-[12px] font-bold tracking-[0.5em] jitter-redacted">
              {hoverSecret}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[4.5rem] md:text-[9rem] font-black italic mb-2 transition-all tracking-tighter ${isEasterEgg || isBreached ? 'jitter-redacted' : 'text-white/10'}`}>
          {is404 ? "VOID" : (isBreached ? "ACCESS_DENIED" : (isEasterEgg ? "REDACTED" : "AETHER_CORE"))}
        </h1>

        <p className="text-[10px] md:text-[12px] text-white/30 uppercase tracking-[0.5em] mb-4 text-center max-w-2xl px-6 leading-loose">
          A digital archive of recovered generative visuals, dreamcore aesthetics, and encrypted short-film sequences. 
          <br/><span className="text-white/10">[STABILITY: 42% // SECTOR: DECEMBER_2025]</span>
        </p>

        <div className="mb-12 text-[10px] tracking-widest text-white/20 uppercase">
          Status: <span className="corrupted-text">DYLON_IS_THE_RENDER_ENGINE</span>
        </div>

        <div className="flex gap-8 mb-12">
          <a href="https://sora.chatgpt.com/profile/jhorrorgamer" target="_blank" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-white clickable uppercase tracking-widest"><MonitorPlay size={14} /> Sora</a>
          <a href="https://www.youtube.com/@JhorrorGamer" target="_blank" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-red-500 clickable uppercase tracking-widest"><Youtube size={14} /> YouTube</a>
        </div>

        <div className="w-full max-w-xl px-6 mb-12">
          <form onSubmit={handleNeuralSearch} className="relative group">
            <div className="absolute -inset-0.5 bg-red-600/20 blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative flex items-center bg-black border border-white/10 p-2">
              <span className="text-white/20 text-[10px] ml-2 mr-4 flex items-center gap-2"><ShieldAlert size={12}/> NEURAL_QUERY:</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH_ARCHIVE..." 
                className="bg-transparent border-none outline-none text-[10px] text-white/60 w-full placeholder:text-white/10 uppercase tracking-[0.3em]"
              />
            </div>
          </form>
          <p className="text-[8px] text-white/10 mt-2 uppercase tracking-widest text-right italic">
            {isCorrupting ? "CRITICAL_MEMORY_LEAK_DETECTED" : "Direct access to Sector_7 is restricted."}
          </p>
        </div>

        <div className="mb-20 flex flex-col items-center">
          <button onClick={startDownload} disabled={isDownloading} className="flex items-center gap-3 border border-white/20 px-8 py-2 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all clickable">
            <Download size={14} /> {isDownloading ? `EXTRACTING_DATA: ${downloadProgress}%` : "EXTRACT_SUBJECT_DATA"}
          </button>
          
          <AnimatePresence>
            {capturedData && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-red-500 text-[10px] font-bold tracking-widest jitter-redacted">
                {capturedData}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 mb-32">
          {soraVideos.map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 w-full max-w-6xl px-6 mb-40">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group relative clickable" onClick={() => setSelectedImg(img.src)} onMouseEnter={() => setHoverSecret(img.meta)} onMouseLeave={() => setHoverSecret("")}>
              <img src={`/${img.src}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all" />
              <div className="absolute top-2 right-2 text-[7px] text-white/0 group-hover:text-white/40 transition-opacity font-mono">
                {img.meta}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl px-6">
           <div className="flex items-center gap-4 mb-8 text-white/20">
              <MessageSquare size={16} />
              <h2 className="text-xs uppercase tracking-[.4em]">Broadcast_Feed</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 border border-white/10 p-6 bg-white/[0.02]">
                <form onSubmit={handleIdeaSubmit} className="flex flex-col gap-4">
                  <textarea value={userIdea} onChange={(e) => setUserIdea(e.target.value)} placeholder="Submit data..." className="bg-black border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-red-600/50 min-h-[120px] resize-none" />
                  <button type="submit" className="bg-white/5 border border-white/10 py-2 text-[10px] uppercase hover:bg-white hover:text-black transition-all clickable">Transmit</button>
                </form>
              </div>
              <div className="md:col-span-2 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {submittedIdeas.map((idea) => (
                  <div key={idea.id} onClick={(e) => handleDelete(idea.id, e)} className="border-l-2 border-white/5 pl-4 py-2 hover:border-red-600/30 transition-all group clickable">
                    <div className="flex justify-between text-[8px] text-white/20 mb-1">
                      <span>{idea.username}</span>
                      <Trash2 size={8} className="opacity-0 group-hover:opacity-10" />
                    </div>
                    <p className="text-[10px] text-white/60 italic font-mono">"{idea.text}"</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full z-[60] py-3 bg-black border-t border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-[9px] tracking-[0.4em] uppercase text-white/10">
          <span className="mx-12">SYSTEM_STABILITY: {isGlitching ? "ERROR" : "NOMINAL"}</span>
          <span className="mx-12">AETHER_ARCHIVE_2025 // TRANSMISSION_STABLE</span>
          <span className="mx-12 clickable hover:text-white transition-colors" onClick={() => setIsHiddenOpen(true)}>DYLON MARTINEAU // @JHORRORGAMER</span>
          <span className="mx-12">SYSTEM_STABILITY: {isGlitching ? "ERROR" : "NOMINAL"}</span>
          <span className="mx-12">AETHER_ARCHIVE_2025 // TRANSMISSION_STABLE</span>
          <span className="mx-12 clickable hover:text-white transition-colors" onClick={() => setIsHiddenOpen(true)}>DYLON MARTINEAU // @JHORRORGAMER</span>
        </div>
      </footer>

      <div ref={cursorRef} className="custom-cursor"><div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" /></div>
      
      <AnimatePresence>
        {isLogsOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6 font-mono" onClick={() => setIsLogsOpen(false)}>
            <div className="w-full max-w-2xl border border-white/20 bg-black p-8 shadow-[0_0_50px_rgba(255,255,255,0.05)]" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-white/50 text-xs"><Terminal size={14} /> ARCHIVE_DECRYPTION_LOGS</div>
                <X className="text-white/20 hover:text-white clickable" onClick={() => setIsLogsOpen(false)} />
              </div>
              <div className="space-y-4 text-[11px] leading-relaxed max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
                {randomLogs.map((log, i) => (
                  <p key={i} className={`${log.type === 'error' ? 'text-red-500/80' : ''} ${log.type === 'system' ? 'text-blue-400/60' : ''} ${log.type === 'admin' || log.type === 'user' ? 'text-white/40' : ''}`}>
                    {log.user && <span className="text-white/60">[{log.user}]: </span>}
                    {log.text}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {isNotesOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1500] bg-black/90 flex items-center justify-center p-6" onClick={() => setIsNotesOpen(false)}>
            <div className="w-full max-w-3xl border border-white/10 bg-zinc-950 p-10 relative overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50" />
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-red-600 text-xs tracking-[0.5em] font-bold uppercase mb-2">Internal_Memo // Project_Aether</h3>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest">Classification: TOP_SECRET // Level_5_Eyes_Only</p>
                </div>
                <X className="text-white/20 hover:text-white clickable" onClick={() => setIsNotesOpen(false)} />
              </div>
              <div className="space-y-6 text-[10px] text-white/70 leading-relaxed font-mono custom-scrollbar max-h-[50vh] overflow-y-auto pr-4">
                <p><span className="text-red-500">[NOTE_01]:</span> Observation of Subject D. Martineau confirms a 98% synchronization rate with the Sora engine. He is no longer processing external stimuli.</p>
                <p><span className="text-red-500">[NOTE_02]:</span> We attempted to disconnect the neural uplink at 0400 hours. The render architecture resisted. The 'Mall' geometry shifted to prevent our access. The site is protecting him.</p>
                <p><span className="text-red-500">[NOTE_03]:</span> The subject's biological vitals are now mirroring the frame rate of the archive. If the archive crashes, his heart stops.</p>
                <p className="italic text-white/40 pt-4">-- End of Decrypted Fragment --</p>
              </div>
              <div className="mt-10 flex items-center gap-4 text-white/10">
                <FileText size={16} />
                <span className="text-[8px] tracking-[0.8em]">AETHER_LABS_DIVISION</span>
              </div>
            </div>
          </motion.div>
        )}

        {isScientistOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[4000] bg-black flex items-center justify-center">
             <div className="absolute top-10 left-10 text-red-600 text-[10px] tracking-[0.5em] animate-pulse">PROJECT_AETHER // ANALYSIS_LOG_04</div>
             <X className="absolute top-10 right-10 text-white/20 clickable z-[4010]" size={32} onClick={() => setIsScientistOpen(false)} />
             <video src="/lore.mp4" autoPlay playsInline className="w-full h-full object-contain" onEnded={() => setIsScientistOpen(false)} />
          </motion.div>
        )}

        {isCorrupting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-red-950/20 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none">
            <div className="corruption-scanner" />
            <div className="text-red-600 font-black text-4xl animate-pulse mb-4 tracking-[1em]">CORRUPTION_IN_PROGRESS</div>
          </motion.div>
        )}

        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable z-[110]" size={32} onClick={() => setActiveVideo(null)} />
            <div className="vertical-video-container border border-white/10"><video src={`/${activeVideo}`} controls autoPlay loop playsInline className="w-full h-full object-cover" /></div>
          </motion.div>
        )}

        {isHiddenOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-black flex items-center justify-center">
             <X className="absolute top-10 right-10 text-white/20 clickable z-[3010]" size={32} onClick={() => setIsHiddenOpen(false)} />
             <video src="/hidden.mp4" autoPlay playsInline className="w-full h-full object-contain" onEnded={() => setIsHiddenOpen(false)} />
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
             <video src="/secret.mp4" autoPlay playsInline className="w-full h-full object-contain" onEnded={() => setIsSecretOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}