import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, Database, MessageSquare, Send, Trash2 } from "lucide-react";

const supabaseUrl = 'https://mrjrampvdwmppmyyoxqs.supabase.co';
const supabaseKey = 'sb_publishable_EPAWiAKKO-rKEPSWjZKmAQ_ErKQ5qFd';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AetherArchive() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isBreached, setIsBreached] = useState(false);
  const [is404, setIs404] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hoverSecret, setHoverSecret] = useState("");
  const [userIdea, setUserIdea] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);
  const [dbStatus, setDbStatus] = useState("connecting");
  const [currentHint, setCurrentHint] = useState(0);

  const hints = [
    "[LOG]: 0x45 0x59 0x45 0x53",
    "[LOG]: SECURITY_VULNERABILITY: 'B_R_E_A_C_H'",
    "[LOG]: ERR_NOT_FOUND: 4_0_4",
    "[LOG]: STATIC_REVEALS_LOCATION",
    "[LOG]: ACCELERATION_BREAKS_REALITY"
  ];

  const audioRef = useRef(null);
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const galleryImages = [
    { src: "image1.png", meta: "40.2525° N, 58.4398° E" }, 
    { src: "image2.png", meta: "37.3184° N, 121.9511° W" }, 
    { src: "image3.png", meta: "32.6277° N, 129.7385° E" }, 
    { src: "image4.png", meta: "SEQ: 004812" },
    { src: "image5.png", meta: "VOID_STAMP_77" }, 
    { src: "image6.png", meta: "48.8529° N, 2.3500° E" }, 
    { src: "image7.png", meta: "LAT: -24.5246" }, 
    { src: "image8.png", meta: "LONG: 15.4673" },
    { src: "image9.png", meta: "NULL_VOT_9" }
  ];

  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];

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
    const channel = supabase.channel('db').on('postgres_changes', { event: '*', schema: 'public', table: 'ideas' }, (p) => {
      if (p.eventType === 'INSERT') setSubmittedIdeas(prev => [p.new, ...prev]);
      if (p.eventType === 'DELETE') setSubmittedIdeas(prev => prev.filter(i => i.id !== p.old.id));
    }).subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  // CURSOR ENGINE (Zero Offset Fix)
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
    (isMuted || activeVideo || is404 || isSecretOpen) ? audioRef.current.pause() : audioRef.current.play().catch(() => {});
  }, [isMuted, activeVideo, is404, isSecretOpen]);

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
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [inputBuffer]);

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''} ${isBreached ? 'breach-active' : ''} ${is404 ? 'system-wipe' : ''}`} onClick={() => !isMuted && !activeVideo && audioRef.current?.play()}>
      <audio ref={audioRef} src="/music.mp3" loop />
      
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
        {/* MAIN TITLE */}
        <h1 className={`text-[4.5rem] md:text-[9rem] font-black italic mb-2 transition-all tracking-tighter ${isEasterEgg || isBreached ? 'jitter-redacted' : 'text-white/10'}`}>
          {is404 ? "VOID" : (isBreached ? "ACCESS_DENIED" : (isEasterEgg ? "REDACTED" : "AETHER_CORE"))}
        </h1>

        {/* RESTORED DESCRIPTION */}
        <p className="text-[10px] md:text-[12px] text-white/30 uppercase tracking-[0.5em] mb-12 text-center max-w-2xl px-6 leading-loose">
          A digital archive of recovered generative visuals, dreamcore aesthetics, and encrypted short-film sequences. 
          <br/><span className="text-white/10">[STABILITY: 42% // SECTOR: DECEMBER_2025]</span>
        </p>

        <div className="flex gap-8 mb-20">
          <a href="https://sora.chatgpt.com/profile/jhorrorgamer" target="_blank" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-white clickable uppercase tracking-widest"><MonitorPlay size={14} /> Sora</a>
          <a href="https://www.youtube.com/@JhorrorGamer" target="_blank" className="flex items-center gap-2 text-[10px] text-white/30 hover:text-red-500 clickable uppercase tracking-widest"><Youtube size={14} /> YouTube</a>
        </div>

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
              <div className="absolute top-2 right-2 text-[7px] text-white/0 group-hover:text-white/20 transition-opacity font-mono">
                {img.meta}
              </div>
            </div>
          ))}
        </div>

        {/* BROADCAST FEED */}
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
          <span className="mx-12">DYLON MARTINEAU // @JHORRORGAMER</span>
          <span className="mx-12">SYSTEM_STABILITY: {isGlitching ? "ERROR" : "NOMINAL"}</span>
          <span className="mx-12">AETHER_ARCHIVE_2025 // TRANSMISSION_STABLE</span>
          <span className="mx-12">DYLON MARTINEAU // @JHORRORGAMER</span>
        </div>
      </footer>

      {/* CURSOR COMPONENT */}
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