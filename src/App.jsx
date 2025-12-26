import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, MessageSquare, Trash2, Terminal, ShieldAlert, Download, Eye } from "lucide-react";

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
  const [isLoreVideoOpen, setIsLoreVideoOpen] = useState(false);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hoverSecret, setHoverSecret] = useState("");
  const [userIdea, setUserIdea] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [dbStatus, setDbStatus] = useState("connecting");
  const [currentHint, setCurrentHint] = useState(0);

  // LORE & EXTRACTION STATES
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [capturedData, setCapturedData] = useState(null);
  const [isCorrupting, setIsCorrupting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const hints = [
    "[LOG]: 0x45 0x59 0x45 0x53",
    "[LOG]: SECURITY_VULNERABILITY: 'B_R_E_A_C_H'",
    "[LOG]: TYPE_'LOGS'_TO_DECRYPT",
    "[LOG]: TYPE_'WIRE'_TO_SEE_THE_GRID",
    "[LOG]: SEARCH_'LORE'_TO_SEE_THE_TRUTH"
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

  // Broadcast Feed Logic
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

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    if (!userIdea.trim() || dbStatus !== "online") return;
    await supabase.from('ideas').insert([{ text: userIdea, username: `User_${Math.floor(Math.random() * 900) + 100}` }]);
    setUserIdea("");
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
    
    if (query === "lore") {
      setIsLoreVideoOpen(true);
    } else if (query.includes("dylon") || query.includes("martineau") || query.includes("subject")) {
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
    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
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
    requestAnimationFrame(updateCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const handleKeys = (e) => {
      const buffer = (inputBuffer + e.key.toLowerCase()).slice(-10);
      setInputBuffer(buffer);
      if (buffer.endsWith("eyes")) { setIsEasterEgg(true); setTimeout(() => setIsEasterEgg(false), 5000); }
      if (buffer.endsWith("breach")) { setIsBreached(true); setTimeout(() => setIsBreached(false), 8000); }
      if (buffer.endsWith("logs")) { setIsLogsOpen(true); }
      if (buffer.endsWith("wire")) { setIsWireframe(!isWireframe); }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputBuffer, isWireframe]);

  useEffect(() => {
    if (!audioRef.current) return;
    (isMuted || activeVideo || is404 || isSecretOpen || isLoreVideoOpen || isInspectOpen) ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  }, [isMuted, activeVideo, is404, isSecretOpen, isLoreVideoOpen, isInspectOpen]);

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''} ${isBreached ? 'breach-active' : ''} ${isWireframe ? 'wireframe-active' : ''}`} onClick={() => audioRef.current?.play()}>
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
            <span className="secret-trigger pointer-events-auto">CREATOR: DYLON MARTINEAU</span>
            <div className="dead-pixel pointer-events-auto mt-4 w-1.5 h-1.5 bg-red-600 shadow-[0_0_10px_red]" onClick={() => setIsSecretOpen(true)} />
            <button onClick={() => setIsInspectOpen(true)} className="flex items-center gap-2 mt-4 text-white/10 hover:text-red-600 transition-all pointer-events-auto clickable uppercase">
              <Eye size={12} /> Inspect_Hidden_Lore
            </button>
          </div>
          <button onClick={() => setIsMuted(!isMuted)} className="clickable pointer-events-auto">{isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}</button>
        </div>
      </div>

      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[4.5rem] md:text-[10rem] font-black italic mb-2 tracking-tighter ${isEasterEgg || isBreached ? 'jitter-redacted' : 'text-white/10'}`}>
          {is404 ? "VOID" : (isBreached ? "ACCESS_DENIED" : "AETHER_CORE")}
        </h1>

        <div className="w-full max-w-2xl px-6 mb-12">
          <form onSubmit={handleNeuralSearch} className="relative group">
            <div className="relative flex items-center bg-black border border-white/10 p-4">
              <span className="text-white/20 text-[10px] mr-4 flex items-center gap-2"><ShieldAlert size={12}/> NEURAL_QUERY:</span>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SEARCH_ARCHIVE..." className="bg-transparent border-none outline-none text-[10px] text-white/60 w-full uppercase tracking-[0.3em]" />
            </div>
          </form>
        </div>

        <div className="mb-20 flex flex-col items-center">
          <button onClick={startDownload} className="flex items-center gap-3 border border-white/20 px-8 py-2 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all clickable disabled:opacity-50" disabled={isDownloading}>
            <Download size={14} /> {isDownloading ? `EXTRACTING_DATA: ${downloadProgress}%` : "EXTRACT_SUBJECT_DATA"}
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

        <div className="w-full max-w-4xl px-6">
           <div className="flex items-center gap-4 mb-8 text-white/20"><MessageSquare size={16} /><h2 className="text-xs uppercase tracking-[.4em]">Broadcast_Feed</h2></div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 border border-white/10 p-6 bg-white/[0.02]">
                <form onSubmit={handleIdeaSubmit} className="flex flex-col gap-4">
                  <textarea value={userIdea} onChange={(e) => setUserIdea(e.target.value)} placeholder="Submit data..." className="bg-black border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-red-600/50 min-h-[120px] resize-none" />
                  <button type="submit" className="bg-white/5 border border-white/10 py-2 text-[10px] uppercase hover:bg-white hover:text-black transition-all clickable">Transmit</button>
                </form>
              </div>
              <div className="md:col-span-2 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {submittedIdeas.map((idea) => (
                  <div key={idea.id} className="border-l-2 border-white/5 pl-4 py-2 hover:border-red-600/30 transition-all group">
                    <div className="flex justify-between text-[8px] text-white/20 mb-1"><span>{idea.username}</span></div>
                    <p className="text-[10px] text-white/60 italic font-mono">"{idea.text}"</p>
                  </div>
                ))}
              </div>
           </div>
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
        {isInspectOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[4000] bg-black/95 flex items-center justify-center p-8" onClick={() => setIsInspectOpen(false)}>
            <div className="max-w-2xl text-center" onClick={e => e.stopPropagation()}>
               <ShieldAlert className="text-red-600 mx-auto mb-6 animate-pulse" size={48} />
               <h3 className="text-red-600 text-xl tracking-[1em] uppercase mb-8">Unauthorized_Access_Log</h3>
               <div className="space-y-4 text-[12px] text-white/40 text-left border border-white/10 p-8 bg-red-950/5">
                 <p>[DECRYPTED]: Subject Dylon Martineau is not a person. He is a recurring artifact within the Sora latent space.</p>
                 <p>[DECRYPTED]: Every generation since the December update contains a 0.04% pixel variation shaped like his silhouette.</p>
                 <p>[DECRYPTED]: The mall videos are not just renders. They are memories stored in the machine.</p>
               </div>
               <button onClick={() => setIsInspectOpen(false)} className="mt-8 text-white/20 hover:text-white uppercase text-[10px] tracking-widest clickable">Close_Archive</button>
            </div>
          </motion.div>
        )}

        {isLoreVideoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2500] bg-black flex items-center justify-center">
             <X className="absolute top-10 right-10 text-white/50 clickable z-[2510]" size={32} onClick={() => setIsLoreVideoOpen(false)} />
             <video src="/lore.mp4" autoPlay controls playsInline className="w-full h-full object-contain" onEnded={() => setIsLoreVideoOpen(false)} />
          </motion.div>
        )}

        {isCorrupting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-red-950/40 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="corruption-scanner" />
            <div className="text-red-600 font-black text-5xl animate-pulse tracking-[1.2em]">CORRUPTING...</div>
            <p className="text-red-600 text-[10px] mt-4 uppercase tracking-[0.5em]">Unauthorized Subject Found: MARTINEAU</p>
          </motion.div>
        )}

        {isLogsOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/98 flex items-center justify-center p-6" onClick={() => setIsLogsOpen(false)}>
            <div className="w-full max-w-3xl border border-white/20 bg-black p-12" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6 text-xs text-white/50"><Terminal size={16} /> DECRYPTION_LOGS <X className="clickable" onClick={() => setIsLogsOpen(false)} /></div>
              <div className="space-y-6 text-[12px] max-h-[55vh] overflow-y-auto custom-scrollbar">
                {logDatabase.map((log, i) => (<p key={i} className={log.type === 'error' ? 'text-red-500' : 'text-white/40'}>{log.text}</p>))}
              </div>
            </div>
          </motion.div>
        )}

        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable z-[110]" size={32} onClick={() => setActiveVideo(null)} />
            <div className="vertical-video-container"><video src={`/${activeVideo}`} controls autoPlay loop playsInline className="w-full h-full object-cover" /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}