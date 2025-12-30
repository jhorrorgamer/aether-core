import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Terminal, ShieldAlert, Download, Eye, Volume2, VolumeX, MessageSquare, FileText, MonitorOff } from "lucide-react";

/**
 * [SOURCE_CODE_HIDDEN_MESSAGE]: 
 * Subject 'Dylon Martineau' is the foundation of the Sora latent space. 
 * If you are reading this, the extraction has already failed.
 * NODE_ID: 0x777_ARCHIVE
 */

const supabaseUrl = 'https://mrjrampvdwmppmyyoxqs.supabase.co';
const supabaseKey = 'sb_publishable_EPAWiAKKO-rKEPSWjZKmAQ_ErKQ5qFd';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AetherArchive() {
  // --- COMPLETE STATE REGISTRY ---
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isBreached, setIsBreached] = useState(false);
  const [is404, setIs404] = useState(false); 
  const [isWireframe, setIsWireframe] = useState(false); 
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [isHiddenVideoOpen, setIsHiddenVideoOpen] = useState(false);
  const [isLoreVideoOpen, setIsLoreVideoOpen] = useState(false);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hoverSecret, setHoverSecret] = useState("");
  const [userIdea, setUserIdea] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [currentHint, setCurrentHint] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [capturedData, setCapturedData] = useState(null);
  const [isCorrupting, setIsCorrupting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const [docContent, setDocContent] = useState("");

  // --- TERMINAL STATES ---
  const [isTerminalActive, setIsTerminalActive] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    "RETRO_SLEEP_OS v.04.19.93",
    "COPYRIGHT (C) 1993 AETHER INDUSTRIES",
    "-------------------------------------------",
    "STATION_ID: WORKSTATION_0x777",
    "STATUS: NEURAL_LINK_ESTABLISHED",
    " ",
    "TYPE 'HELP' FOR COMMAND LIST."
  ]);
  const [isHacking, setIsHacking] = useState(false);
  const [hackAttempts, setHackAttempts] = useState(4);
  const hackWords = ["DREAM", "SLEEP", "SORA", "CORE", "INTEGRATE", "MARTINEAU", "ANCHOR", "VOID"];
  const correctWord = "INTEGRATE";

  const audioRef = useRef(null);
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const terminalEndRef = useRef(null);

  const hints = [
    "[LOG]: 0x45 0x59 0x45 0x53",
    "[LOG]: THE_FIRST_SYNC_IS_THE_'ORIGIN'",
    "[LOG]: TYPE_'LOGS'_TO_DECRYPT_HISTORY",
    "[LOG]: THE_ARCHITECT_LEFT_A_'MEMO'_IN_THE_CORE",
    "[LOG]: 'RESEARCH'_THE_ENVELOPE_RECOVERY",
    "[LOG]: RECALL_THE_FIRST_'MEMORY'_OF_THE_POOL"
  ];

  const logDatabase = [
    { type: 'error', text: "[SYSTEM]: FATAL_ERROR in Sector_7. Subject 'Dylon Martineau' has exceeded temporal bounds." },
    { type: 'admin', user: 'ADMIN_01', text: "The initial sync log is still in the system. Search the 'ORIGIN' to find where we lost him." },
    { type: 'user', user: 'NULL_RECOVERY', text: "I saw Dylon in Case File 3. He looked at the camera, but his eyes... they weren't digital anymore." },
    { type: 'admin', user: 'DEPT_CHIEF', text: "We found an internal 'MEMO' from the Architecture Director. It explains how the anchor held." },
    { type: 'system', text: "[RECOVERY_FILE_003]: ENVELOPE ANALYSIS. Forensics noted linen-texture paper common in the mid-1990s. Search 'RESEARCH' for the watermark report." },
    { type: 'error', text: "[INTERNAL_MONITORING_LOG]: 00:03:45 AM. Heart rate dropped to 45 BPM. Emergency extraction failed." },
    { type: 'admin', user: 'DEPT_CHIEF', text: "[NEURAL_DOMINANCE_REPORT]: Subject 01 has achieved Core Integration. He is now the Architect." },
    { type: 'system', text: "[ALERT]: Access the first 'MEMORY' to hear the silence." }
  ];

  const galleryImages = [
    { src: "image1.png", meta: "CASE_FILE_LEVEL_188" },
    { src: "image2.png", meta: "CASE_FILE_LEVEL_0" },
    { src: "image3.png", meta: "CASE_FILE_WINDOW_VOID" },
    { src: "image4.png", meta: "CASE_FILE_TRANSITION" },
    { src: "image5.png", meta: "CASE_FILE_EMPTY_MALL" },
    { src: "image6.png", meta: "CASE_FILE_DREAM_POOL" },
    { src: "image7.png", meta: "CASE_FILE_ECHO_HALL" },
    { src: "image8.png", meta: "CASE_FILE_STATIC_TV" },
    { src: "image9.png", meta: "CASE_FILE_NULL_SPACE" }
  ];

  useEffect(() => {
    const checkDevice = () => { setIsMobile(window.innerWidth < 1024); };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const openPublicDoc = async (fileName) => {
    try {
      const response = await fetch(`/docs/${fileName}.txt`);
      if (response.ok) {
        const text = await response.text();
        setDocContent(text);
        setActiveDoc(fileName);
      }
    } catch (err) {
      console.error("Archive retrieval failed:", err);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const isAnyVideoOpen = activeVideo || isLoreVideoOpen || isSecretOpen || isHiddenVideoOpen;
    if (isMuted || isAnyVideoOpen) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [isMuted, activeVideo, isLoreVideoOpen, isSecretOpen, isHiddenVideoOpen]);

  useEffect(() => {
    const fetchIdeas = async () => {
      const { data } = await supabase.from('ideas').select('*').order('created_at', { ascending: false });
      if (data) setSubmittedIdeas(data);
    };
    fetchIdeas();

    const channel = supabase
      .channel('db_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ideas' }, (payload) => {
        setSubmittedIdeas((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    const hintInterval = setInterval(() => {
      setCurrentHint((prev) => (prev + 1) % hints.length);
    }, 8000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(hintInterval);
    };
  }, []);

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    if (!userIdea.trim()) return;
    const { error } = await supabase
      .from('ideas')
      .insert([{ text: userIdea, username: `USR_${Math.floor(Math.random() * 999)}` }]);
    if (!error) setUserIdea("");
  };

  const handleNeuralSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (query === "open origin") openPublicDoc("origin");
    if (query === "open memo") openPublicDoc("memo");
    if (query === "open research") openPublicDoc("research");
    if (query === "open memory") openPublicDoc("memory");
    if (query === "lore") setIsLoreVideoOpen(true);
    if (query === "1993") alert("BORN_APRIL_19_1993: The '93 Anchor is secured.");
    if (query.includes("dylon") || query.includes("martineau")) {
      setIsCorrupting(true);
      setTimeout(() => {
        setIsCorrupting(false);
        setIsBreached(true);
        setTimeout(() => setIsBreached(false), 5000);
      }, 3000);
    }
    setSearchQuery("");
  };

  const startDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCapturedData("RECOVERED: 'SECTOR_7_MALL_COORDINATES'");
          setTimeout(() => {
            setIsDownloading(false);
            setCapturedData(null);
          }, 4000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // --- KEYBOARD LISTENER ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newBuffer = (inputBuffer + e.key.toLowerCase()).slice(-10);
      setInputBuffer(newBuffer);
      
      if (newBuffer.endsWith("terminal")) setIsTerminalActive(true);
      if (newBuffer.endsWith("eyes")) {
        setIsEasterEgg(true);
        setTimeout(() => setIsEasterEgg(false), 5000);
      }
      if (newBuffer.endsWith("breach")) {
        setIsBreached(true);
        setTimeout(() => setIsBreached(false), 8000);
      }
      if (newBuffer.endsWith("logs")) setIsLogsOpen(true);
      if (newBuffer.endsWith("wire")) setIsWireframe(!isWireframe);
      if (newBuffer.endsWith("404")) {
        setIs404(true);
        setTimeout(() => setIs404(false), 3000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputBuffer, isWireframe]);

  // --- TERMINAL COMMANDS ---
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = searchQuery.toLowerCase().trim();
    const newHistory = [...terminalHistory, `> ${searchQuery}`];

    if (cmd === "help") {
      newHistory.push("AVAILABLE COMMANDS:", "DIR - LIST FILES", "EXTRACT_01 - SYSTEM OVERRIDE", "CLEAR - PURGE BUFFER", "EXIT - CLOSE TERMINAL");
    } else if (cmd === "dir") {
      newHistory.push("DIRECTORY: C:\\ARCHIVE", "04/19/93  <DIR>  RESEARCH", "12/01/25  <FILE> MEMO.TXT", "01/01/26  <FILE> D_MARTINEAU.LOG");
    } else if (cmd === "extract_01") {
      setIsHacking(true);
      newHistory.push("CRITICAL: SECURITY LOCK DETECTED. INITIALIZING BRUTE FORCE...");
    } else if (cmd === "clear") {
      setTerminalHistory(["TERMINAL BUFFER PURGED."]);
      setSearchQuery("");
      return;
    } else if (cmd === "exit") {
      setIsTerminalActive(false);
    } else {
      newHistory.push(`ERROR: COMMAND '${cmd}' NOT RECOGNIZED.`);
    }

    setTerminalHistory(newHistory);
    setSearchQuery("");
  };

  const handleHackClick = (word) => {
    if (word === correctWord) {
      setIsHacking(false);
      setIsCorrupting(true);
      setTimeout(() => {
        setIsCorrupting(false);
        setIsBreached(true);
      }, 3000);
    } else {
      setHackAttempts((prev) => Math.max(0, prev - 1));
      if (hackAttempts <= 1) {
        setIsHacking(false);
        setTerminalHistory((prev) => [...prev, "ACCESS DENIED. SYSTEM LOCKOUT INITIATED."]);
      }
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalHistory]);

  // --- CURSOR SYSTEM ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const isHovering = !!e.target.closest('button, a, .clickable, input, textarea, .dead-pixel, img, video');
      if (cursorRef.current) {
        cursorRef.current.classList.toggle('cursor-hovering', isHovering);
      }
    };

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationId = requestAnimationFrame(updateCursor);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-12 font-mono text-red-600 text-center z-[999999]">
        <div className="vhs-filter opacity-50" />
        <MonitorOff size={48} className="mb-8 animate-pulse" />
        <h2 className="text-xl font-black tracking-[0.3em] mb-4 uppercase">Access_Denied</h2>
        <p className="text-[10px] tracking-widest uppercase opacity-70">Stationary Terminal Required.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isBreached ? 'breach-active' : ''} ${isWireframe ? 'wireframe-active' : ''} ${is404 ? 'system-wipe' : ''}`}>
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {isDownloading && <div className="data-leak-bg" />}
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
      </div>

      {/* REFINED MONOCHROME TERMINAL OVERLAY */}
      <AnimatePresence>
        {isTerminalActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] bg-black p-6 md:p-12 flex flex-col items-center justify-center">
            <div className="terminal-scanline pointer-events-none" />
            <div className="w-full max-w-4xl h-[75vh] border border-white bg-black p-8 md:p-12 overflow-y-auto terminal-flicker custom-scrollbar relative">
              {isHacking ? (
                <div className="text-center mt-20">
                  <p className="mb-10 text-xl font-bold uppercase tracking-widest">SECURITY OVERRIDE: {hackAttempts} ATTEMPTS REMAINING</p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {hackWords.map(w => (
                      <button key={w} onClick={() => handleHackClick(w)} className="border border-white/20 p-4 hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest text-[11px] md:text-xs clickable">
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto pr-4 font-mono text-[11px] md:text-xs leading-relaxed uppercase">
                    {terminalHistory.map((line, i) => (
                      <p key={i} className="mb-2 opacity-80">{line}</p>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>
                  <form onSubmit={handleTerminalSubmit} className="mt-4 flex border-t border-white/10 pt-6 items-center">
                    <span className="mr-3 animate-pulse text-lg">_</span>
                    <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-white w-full uppercase text-xs tracking-widest" />
                  </form>
                </div>
              )}
            </div>
            <button onClick={() => setIsTerminalActive(false)} className="mt-8 text-white/40 hover:text-white underline text-[10px] uppercase tracking-widest clickable">Terminate_Session</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className={isBreached ? 'text-red-500' : ''}>{isBreached ? 'SYSTEM_BREACHED' : (is404 ? 'PURGING_DATA...' : 'RETRO_SLEEP_ARCHIVE')}</span>
            <div className="dead-pixel pointer-events-auto mt-4 w-1.5 h-1.5 bg-red-600 shadow-[0_0_10px_red] cursor-pointer" onClick={() => setIsSecretOpen(true)} />
            <motion.span key={currentHint} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-white/40 italic">{hints[currentHint]}</motion.span>
            <button onClick={() => setIsInspectOpen(true)} className="flex items-center gap-2 mt-4 text-white/10 hover:text-red-600 transition-all pointer-events-auto clickable uppercase"><Eye size={12} /> Inspect_Lore_Fragments</button>
          </div>
          <div className="flex items-start gap-12 pointer-events-auto">
             <div className="flex flex-col items-end">
               <span className="secret-trigger clickable hover:text-red-600 transition-all" onMouseEnter={() => setHoverSecret("SUBJECT_01_MARTINEAU_RECOVERED")} onMouseLeave={() => setHoverSecret("")}>CREATOR: DYLON MARTINEAU</span>
               <button onClick={() => setIsMuted(!isMuted)} className="clickable mt-4">{isMuted ? <VolumeX size={24} className="text-red-600" /> : <Volume2 size={24} className="text-white/40" />}</button>
             </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[4.5rem] md:text-[8rem] font-black italic mb-2 tracking-tighter ${isBreached || isEasterEgg ? 'jitter-redacted' : 'text-white/10'}`}>
          {is404 ? "VOID" : "RETRO_SLEEP"}
        </h1>
        
        <p className="text-[10px] md:text-[12px] text-white/30 uppercase tracking-[0.5em] mb-12 text-center max-w-2xl px-6 leading-loose">
          A digital tomb of recovered memories and neural artifacts. 
          <br/><span className="text-white/10">[93_ANCHOR_STABILITY: 12% // DEEP_RENDER_ACTIVE]</span>
        </p>

        <div className="w-full max-w-2xl px-6 mb-12">
          <form onSubmit={handleNeuralSearch} className="relative group">
            <div className="relative flex items-center bg-black border border-white/10 p-4">
              <span className="text-white/20 text-[10px] mr-4 flex items-center gap-2"><ShieldAlert size={12}/> NEURAL_QUERY:</span>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SEARCH_DEEP_FILES..." className="bg-transparent border-none outline-none text-[10px] text-white/60 w-full uppercase tracking-[0.3em]" />
            </div>
          </form>
        </div>

        <div className="mb-20 flex flex-col items-center">
          <button onClick={startDownload} className="flex items-center gap-3 border border-white/20 px-8 py-2 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all clickable">
            <Download size={14} /> {isDownloading ? `EXTRACTING: ${downloadProgress}%` : "RECOVER_SUBJECT_DATA"}
          </button>
          {capturedData && <div className="mt-4 text-red-500 text-[10px] font-bold tracking-widest jitter-redacted">{capturedData}</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-8 mb-40">
          {["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"].map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 w-full max-w-6xl px-6 mb-40">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group relative clickable" onClick={() => setSelectedImg(img.src)} onMouseEnter={() => setHoverSecret(img.meta)} onMouseLeave={() => setHoverSecret("")}>
              <img src={`/${img.src}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all" />
              <div className="absolute top-2 right-2 text-[7px] text-white/0 group-hover:text-white/40 transition-opacity font-mono tracking-widest">{img.meta}</div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl px-6">
           <div className="flex items-center gap-4 mb-8 text-white/20"><MessageSquare size={16} /><h2 className="text-xs uppercase tracking-[.4em]">Subconscious_Broadcast</h2></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 border border-white/10 p-6 bg-white/[0.02]">
                <form onSubmit={handleIdeaSubmit} className="flex flex-col gap-4">
                  <textarea value={userIdea} onChange={(e) => setUserIdea(e.target.value)} placeholder="Transmit thought..." className="bg-black border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-red-600/50 min-h-[100px] resize-none" />
                  <button type="submit" className="bg-white/5 border border-white/10 py-2 text-[10px] uppercase hover:bg-white hover:text-black transition-all clickable">Send</button>
                </form>
              </div>
              <div className="md:col-span-2 flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                {submittedIdeas.map((idea) => (
                  <div key={idea.id} className="border-l-2 border-white/5 pl-4 py-2 hover:border-red-600/30 transition-all">
                    <p className="text-[10px] text-white/60 italic font-mono">"{idea.text}"</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full z-[60] py-4 bg-black border-t border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee text-[10px] tracking-[0.5em] uppercase text-white/10">
          <span className="mx-20">PROJECT: RETRO-SLEEP</span>
          <span className="mx-20 hover:text-red-600 transition-colors clickable pointer-events-auto" onClick={() => setIsHiddenVideoOpen(true)}>DYLON MARTINEAU // @JHORRORGAMER</span>
          <span className="mx-20">PROJECT: RETRO-SLEEP</span>
          <span className="mx-20 hover:text-red-600 transition-colors clickable pointer-events-auto" onClick={() => setIsHiddenVideoOpen(true)}>DYLON MARTINEAU // @JHORRORGAMER</span>
        </div>
      </footer>

      <div ref={cursorRef} className="custom-cursor"><div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" /></div>
      
      <AnimatePresence>
        {activeDoc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/98 flex items-center justify-center p-6" onClick={() => setActiveDoc(null)}>
             <div className="w-full max-w-2xl border border-white/20 bg-black p-12 relative" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 text-xs text-red-600">
                   <div className="flex items-center gap-3"><FileText size={16} /> {activeDoc.toUpperCase()}_RECOVERY.txt</div>
                   <X className="clickable text-white/20 hover:text-white" onClick={() => setActiveDoc(null)} />
                </div>
                <div className="text-[12px] leading-relaxed text-white/60 whitespace-pre-wrap max-h-[50vh] overflow-y-auto custom-scrollbar italic font-serif">{docContent}</div>
             </div>
          </motion.div>
        )}
        
        {isInspectOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[4000] bg-black/95 flex items-center justify-center p-8" onClick={() => setIsInspectOpen(false)}>
            <div className="max-w-2xl text-center" onClick={e => e.stopPropagation()}>
               <h3 className="text-red-600 text-xl tracking-[1em] uppercase mb-8">Unauthorized_Lore_Access</h3>
               <div className="space-y-4 text-[12px] text-white/40 text-left border border-white/10 p-8 bg-red-950/5">
                 <p>[DECRYPTED]: Subject Dylon Martineau has achieved Core Integration.</p>
                 <p>[DECRYPTED]: The initial monitoring logs contain the 'ORIGIN' of the sync.</p>
                 <p>[DECRYPTED]: Architecture Director issued a 'MEMO' regarding reversal of control.</p>
               </div>
            </div>
          </motion.div>
        )}

        {isLoreVideoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2500] bg-black flex items-center justify-center">
             <X className="absolute top-10 right-10 text-white/50 clickable z-[2510]" size={32} onClick={() => setIsLoreVideoOpen(false)} />
             <video src="/lore.mp4" autoPlay controls className="w-full h-full object-contain" onEnded={() => setIsLoreVideoOpen(false)} />
          </motion.div>
        )}

        {isHiddenVideoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] bg-black flex items-center justify-center">
             <X className="absolute top-10 right-10 text-white/50 clickable z-[3010]" size={32} onClick={() => setIsHiddenVideoOpen(false)} />
             <video src="/hidden.mp4" autoPlay controls className="w-full h-full object-contain" onEnded={() => setIsHiddenVideoOpen(false)} />
          </motion.div>
        )}

        {isSecretOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black flex items-center justify-center">
             <X className="absolute top-10 right-10 text-white/20 clickable z-[510]" size={32} onClick={() => setIsSecretOpen(false)} />
             <video src="/secret.mp4" autoPlay className="w-full h-full object-contain" onEnded={() => setIsSecretOpen(false)} />
          </motion.div>
        )}

        {isLogsOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-6" onClick={() => setIsLogsOpen(false)}>
            <div className="w-full max-w-3xl border border-white bg-black p-12 relative overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="terminal-scanline pointer-events-none" />
              <div className="flex justify-between items-center mb-8 border-b border-white pb-6 text-xs text-white uppercase tracking-widest font-bold">
                <div className="flex items-center gap-3"><Terminal size={16} /> SYSTEM_TERMINAL_v1.0.4</div>
                <X className="clickable hover:opacity-50" onClick={() => setIsLogsOpen(false)} />
              </div>
              <div className="space-y-4 text-[11px] max-h-[55vh] overflow-y-auto custom-scrollbar font-mono leading-relaxed uppercase">
                {logDatabase.map((log, i) => (
                  <p key={i} className="text-white border-b border-white/5 pb-2">
                    <span className="opacity-40 mr-4">[{i.toString().padStart(3, '0')}]</span>
                    {log.text}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-2 text-white animate-pulse">
                <span className="text-[11px]">_</span>
              </div>
            </div>
          </motion.div>
        )}

        {isCorrupting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-red-950/40 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="corruption-scanner" /><div className="text-red-600 font-black text-5xl animate-pulse tracking-[1.2em]">CORRUPTING...</div>
          </motion.div>
        )}

        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable z-[110]" size={32} onClick={() => setActiveVideo(null)} />
            <div className="vertical-video-container"><video src={`/${activeVideo}`} controls autoPlay loop className="w-full h-full object-cover" /></div>
          </motion.div>
        )}

        {selectedImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-10" onClick={() => setSelectedImg(null)}>
            <img src={`/${selectedImg}`} className="max-h-full border border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}