import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, Database, MessageSquare, Send, Trash2 } from "lucide-react";

// --- CONNECTION ---
const supabaseUrl = 'https://mrjrampvdwmppmyyoxqs.supabase.co';
const supabaseKey = 'sb_publishable_EPAWiAKKO-rKEPSWjZKmAQ_ErKQ5qFd';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hoverSecret, setHoverSecret] = useState("");
  const [userIdea, setUserIdea] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [dbStatus, setDbStatus] = useState("connecting");
  const [terminalLogs] = useState(["[SYS]: VECTORS_STABLE", "[MEM]: RECOVERY_COMPLETE", "[NET]: LINK_ESTABLISHED"]);

  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  const galleryImages = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];
  const transmissions = [
    { id: "01", title: "THE_VOID_PROTOCOL", body: "Initial testing of Sora generative vectors. Reality stability at 42%. Data suggests the environment is self-aware.", secret: "IT_KNOWS_YOU_ARE_WATCHING" },
    { id: "02", title: "DREAM_LOG_SEQUENCE", body: "Visual sequences recovered from the December 2025 batch. High grain detected. The subject refused to wake up.", secret: "DO_NOT_DISTURB_THE_SLEEPER" }
  ];

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

    const channel = supabase.channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ideas' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setSubmittedIdeas(prev => [payload.new, ...prev]);
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 300);
        } else if (payload.eventType === 'DELETE') {
          setSubmittedIdeas(prev => prev.filter(item => item.id !== payload.old.id));
        }
      }).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  // Audio Logic
  useEffect(() => {
    if (!audioRef.current) return;
    if (isMuted || activeVideo || isSecretOpen) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [isMuted, activeVideo, isSecretOpen]);

  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    if (!userIdea.trim() || dbStatus !== "online") return;
    await supabase.from('ideas').insert([{ text: userIdea, username: `User_${Math.floor(Math.random() * 900) + 100}` }]);
    setUserIdea("");
  };

  const handleDelete = async (id, e) => {
    // Hidden Moderation: Only works if Alt key is held
    if (e.altKey) await supabase.from('ideas').delete().eq('id', id);
  };

  useEffect(() => {
    const handleKeys = (e) => setInputBuffer(prev => (prev + e.key.toLowerCase()).slice(-10));
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  useEffect(() => {
    if (inputBuffer.endsWith("eyes")) { setIsEasterEgg(true); setTimeout(() => setIsEasterEgg(false), 5000); }
    if (inputBuffer.endsWith("404")) { setIsGlitching(true); setTimeout(() => setIsGlitching(false), 1000); }
  }, [inputBuffer]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const moveCursor = (e) => {
      if (cursor) cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const hovered = !!e.target.closest('button, a, .clickable, input, textarea, .dead-pixel, img, video, .secret-trigger');
      if (hovered) cursor?.classList.add('cursor-hovering');
      else cursor?.classList.remove('cursor-hovering');
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''}`} onClick={() => !isMuted && !activeVideo && audioRef.current?.play()}>
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} />
        <div className={`absolute inset-0 bg-[url('/eyes.png')] bg-cover bg-center transition-opacity duration-75 ${isEasterEgg ? 'opacity-100' : 'opacity-0'}`} />
        <div className="vhs-filter" />
      </div>

      {/* HUD & TOP LOGS */}
      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span>STATION: AETHER_CORE</span>
            <span onMouseEnter={() => setHoverSecret("WHO_IS_DYLON?")} onMouseLeave={() => setHoverSecret("")} className="secret-trigger pointer-events-auto">CREATOR: DYLON MARTINEAU</span>
            <div className="flex flex-col mt-4 gap-1 opacity-50">
              {terminalLogs.map((log, i) => <span key={i}>{log}</span>)}
            </div>
            <div className="dead-pixel pointer-events-auto mt-4 w-2 h-2 bg-red-600 shadow-[0_0_10px_red]" onClick={(e) => { e.stopPropagation(); setIsSecretOpen(true); }} />
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
        <h1 className={`text-[4.5rem] md:text-[9rem] font-black italic mb-4 transition-all select-none tracking-tighter ${isEasterEgg ? 'jitter-redacted' : 'text-white/10'}`}>
          {isEasterEgg ? "REDACTED" : "AETHER_CORE"}
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

        {/* TRANSMISSIONS */}
        <div className="w-full max-w-4xl px-6 mb-32">
           <div className="flex items-center gap-4 mb-8 text-white/20">
              <Database size={16} />
              <h2 className="text-xs uppercase tracking-[.4em]">Recovered_Transmissions</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {transmissions.map((log) => (
                <div key={log.id} onMouseEnter={() => setHoverSecret(log.secret)} onMouseLeave={() => setHoverSecret("")} className="p-6 border border-white/5 bg-white/[0.02] group hover:border-white/20 transition-all secret-trigger clickable">
                  <h3 className="text-[10px] mb-2 tracking-widest group-hover:text-red-600 transition-colors uppercase">{log.title}</h3>
                  <p className="text-[9px] text-white/30 leading-relaxed font-mono italic">"{log.body}"</p>
                </div>
              ))}
           </div>
        </div>

        {/* IMAGES */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-6xl px-6 mb-40">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-square bg-white/5 border border-white/5 overflow-hidden group clickable" onClick={() => setSelectedImg(img)}>
              <img src={`/${img}`} className="w-full h-full object-cover opacity-20 group-hover:opacity-100 transition-all grayscale hover:grayscale-0" />
            </div>
          ))}
        </div>

        {/* TERMINAL (CLEAN VERSION - NO DELETE INSTRUCTIONS) */}
        <div className="w-full max-w-4xl px-6 mb-20">
           <div className="flex items-center gap-4 mb-8 text-white/20">
              <MessageSquare size={16} />
              <h2 className="text-xs uppercase tracking-[.4em]">Collaboration_Terminal</h2>
              <div className="flex items-center gap-2 ml-auto">
                <div className={`w-1.5 h-1.5 rounded-full ${dbStatus === 'online' ? 'bg-green-500 shadow-[0_0_8px_green]' : 'bg-red-500 animate-pulse'}`} />
                <span className="text-[8px] uppercase tracking-widest opacity-40">{dbStatus}</span>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 border border-white/10 p-6 bg-white/[0.02]">
                <form onSubmit={handleIdeaSubmit} className="flex flex-col gap-4">
                  <textarea value={userIdea} onChange={(e) => setUserIdea(e.target.value)} placeholder="Transmit data..." className="bg-black border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-red-600/50 min-h-[120px] resize-none font-mono" />
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
                    <p className="text-[10px] text-white/60 font-mono italic">"{idea.text}"</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </main>

      {/* FOOTER */}
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

      {/* MODALS */}
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