import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, Database, MessageSquare, Send, Trash2, ShieldAlert } from "lucide-react";

// --- SUPABASE CONNECTION ---
const supabaseUrl = 'https://mrjrampvdwmppmyyoxqs.supabase.co';
const supabaseKey = 'sb_publishable_EPAWiAKKO-rKEPSWjZKmAQ_ErKQ5qFd';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isBreached, setIsBreached] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hoverSecret, setHoverSecret] = useState("");
  const [userIdea, setUserIdea] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [dbStatus, setDbStatus] = useState("connecting");
  
  // Rotating Hints for the user
  const [currentHint, setCurrentHint] = useState(0);
  const hints = [
    "[SYS]: TYPE 'EYES' TO OBSERVE",
    "[SYS]: TYPE 'BREACH' FOR ACCESS",
    "[SYS]: ALT+CLICK TO PURGE DATA",
    "[SYS]: RAPID MOVEMENT DETECTED",
    "[SYS]: METADATA HIDDEN IN IMAGES"
  ];

  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  const galleryImages = [
    { src: "image1.png", meta: "COORD: 45.4215° N" }, { src: "image2.png", meta: "TIME: 03:14:07" },
    { src: "image3.png", meta: "LOC: SECTOR_7" }, { src: "image4.png", meta: "RECOVERED_FILE_B" },
    { src: "image5.png", meta: "STABILITY: 12%" }, { src: "image6.png", meta: "ENCRYPTED" },
    { src: "image7.png", meta: "VOID_SIGNAL" }, { src: "image8.png", meta: "DATA_GHOST" },
    { src: "image9.png", meta: "FINAL_LOG" }
  ];

  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];
  const transmissions = [
    { id: "01", title: "THE_VOID_PROTOCOL", body: "Initial testing of Sora generative vectors. Reality stability at 42%.", secret: "INPUT_ACCEPTED: 'EYES'" },
    { id: "02", title: "DREAM_LOG_SEQUENCE", body: "Visual sequences recovered from the December 2025 batch. High grain detected.", secret: "HINT: SYSTEM_IS_VULNERABLE_TO_BREACH" }
  ];

  // Hint Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHint((prev) => (prev + 1) % hints.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Database Connection
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

    const channel = supabase.channel('db-sync').on('postgres_changes', { event: '*', schema: 'public', table: 'ideas' }, (payload) => {
      if (payload.eventType === 'INSERT') setSubmittedIdeas(prev => [payload.new, ...prev]);
      if (payload.eventType === 'DELETE') setSubmittedIdeas(prev => prev.filter(item => item.id !== payload.old.id));
    }).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  // Audio Handler
  useEffect(() => {
    if (!audioRef.current) return;
    (isMuted || activeVideo || isSecretOpen) ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  }, [isMuted, activeVideo, isSecretOpen]);

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    if (!userIdea.trim() || dbStatus !== "online") return;
    await supabase.from('ideas').insert([{ text: userIdea, username: `User_${Math.floor(Math.random() * 900) + 100}` }]);
    setUserIdea("");
  };

  const handleDelete = async (id, e) => {
    if (e.altKey) await supabase.from('ideas').delete().eq('id', id);
  };

  // Keyboard Commands
  useEffect(() => {
    const handleKeys = (e) => {
      const newBuffer = (inputBuffer + e.key.toLowerCase()).slice(-10);
      setInputBuffer(newBuffer);
      if (newBuffer.endsWith("eyes")) { setIsEasterEgg(true); setTimeout(() => setIsEasterEgg(false), 5000); }
      if (newBuffer.endsWith("breach")) { setIsBreached(true); setTimeout(() => setIsBreached(false), 8000); }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputBuffer]);

  // Cursor & Movement Glitch
  useEffect(() => {
    const cursor = cursorRef.current;
    const moveCursor = (e) => {
      if (cursor) cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (Math.abs(e.movementX) > 120 || Math.abs(e.movementY) > 120) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 80);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''} ${isBreached ? 'breach-active' : ''}`} onClick={() => !isMuted && !activeVideo && audioRef.current?.play()}>
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {/* ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
        {isBreached && <div className="absolute inset-0 bg-red-900/30 animate-pulse z-10" />}
      </div>

      {/* TOP HUD WITH ROTATING HINTS */}
      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className={isBreached ? 'text-red-500 font-bold' : ''}>{isBreached ? '!! BREACH DETECTED !!' : 'STATION: AETHER_CORE'}</span>
            <span onMouseEnter={() => setHoverSecret("DYLON_M_FOUNDER")} onMouseLeave={() => setHoverSecret("")} className="secret-trigger pointer-events-auto">CREATOR: DYLON MARTINEAU</span>
            <div className="flex flex-col mt-4 gap-2 opacity-60">
               <motion.span key={currentHint} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-white/40">
                {hints[currentHint]}
               </motion.span>
               <span className="text-[8px]">DB_STABILITY: {dbStatus === 'online' ? '99.8%' : 'FAILED'}</span>
            </div>
          </div>
          <button onClick={() => setIsMuted(!isMuted)} className="clickable pointer-events-auto transition-colors hover:text-white">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {hoverSecret && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-20 left-10 text-red-600 text-[12px] font-bold tracking-[0.5em] jitter-redacted">
              {hoverSecret}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="scanline" />
      </div>

      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className={`text-[4.5rem] md:text-[9rem] font-black italic mb-4 transition-all select-none tracking-tighter ${isEasterEgg || isBreached ? 'jitter-redacted' : 'text-white/10'}`}>
          {isBreached ? "ERROR_403" : (isEasterEgg ? "REDACTED" : "AETHER_CORE")}
        </h1>

        <div className="flex gap-8 mb-20">
          <a href="https://sora.chatgpt.com/profile/jhorrorgamer" target="_blank" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-white clickable uppercase tracking-widest"><MonitorPlay size={14} /> Sora Profile</a>
          <a href="https://www.youtube.com/@JhorrorGamer" target="_blank" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-red-500 clickable uppercase tracking-widest"><Youtube size={14} /> YouTube</a>
        </div>

        {/* VIDEOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 mb-32">
          {soraVideos.map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>

        {/* LOGS */}
        <div className="w-full max-w-4xl px-6 mb-32">
           <div className="flex items-center gap-4 mb-8 text-white/20">
              <Database size={16} />
              <h2 className="text-xs uppercase tracking-[.4em]">Encrypted_Logs</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transmissions.map((log) => (
                <div key={log.id} onMouseEnter={() => setHoverSecret(log.secret)} onMouseLeave={() => setHoverSecret("")} className="p-6 border border-white/5 bg-white/[0.02] group hover:border-white/20 transition-all secret-trigger clickable">
                  <h3 className="text-[10px] mb-2 tracking-widest group-hover:text-red-600 uppercase">{log.title}</h3>
                  <p className="text-[9px] text-white/30 italic">"{log.body}"</p>
                </div>
              ))}
           </div>
        </div>

        {/* IMAGE GALLERY WITH METADATA HINTS */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-6xl px-6 mb-40">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group relative clickable" onClick={() => setSelectedImg(img.src)} onMouseEnter={() => setHoverSecret(img.meta)} onMouseLeave={() => setHoverSecret("")}>
              <img src={`/${img.src}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all grayscale hover:grayscale-0" />
              <div className="absolute top-2 right-2 text-[7px] text-white/0 group-hover:text-white/40 transition-opacity uppercase tracking-tighter">
                {img.meta}
              </div>
            </div>
          ))}
        </div>

        {/* IDEA FEED */}
        <div className="w-full max-w-4xl px-6 mb-20">
           <div className="flex items-center gap-4 mb-8 text-white/20">
              <MessageSquare size={16} />
              <h2 className="text-xs uppercase tracking-[.4em]">Global_Collab</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 border border-white/10 p-6 bg-white/[0.02]">
                <form onSubmit={handleIdeaSubmit} className="flex flex-col gap-4">
                  <textarea value={userIdea} onChange={(e) => setUserIdea(e.target.value)} placeholder="Submit data stream..." className="bg-black border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-red-600/50 min-h-[120px] resize-none" />
                  <button type="submit" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2 text-[10px] uppercase hover:bg-white hover:text-black transition-all clickable"><Send size={12} /> Broadcast</button>
                </form>
              </div>
              <div className="md:col-span-2 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {submittedIdeas.map((idea) => (
                  <div key={idea.id} onClick={(e) => handleDelete(idea.id, e)} className="border-l-2 border-white/5 pl-4 py-2 hover:border-red-600/30 transition-all group clickable">
                    <div className="flex justify-between text-[8px] text-white/20 mb-1">
                      <span>{idea.username}</span>
                      <Trash2 size={8} className="opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>
                    <p className="text-[10px] text-white/60 italic">"{idea.text}"</p>
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
          <span className="mx-12">DYLON MARTINEAU // @JHORRORGAMER</span>
          <span className="mx-12">SYSTEM_STABILITY: {isGlitching ? "ERROR" : "NOMINAL"}</span>
          <span className="mx-12">AETHER_ARCHIVE_2025 // TRANSMISSION_STABLE</span>
          <span className="mx-12">DYLON MARTINEAU // @JHORRORGAMER</span>
        </div>
      </footer>

      <div ref={cursorRef} className="custom-cursor"><div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" /></div>

      <AnimatePresence>
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