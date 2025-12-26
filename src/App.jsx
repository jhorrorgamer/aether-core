import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { X, Youtube, MonitorPlay, Volume2, VolumeX, Terminal, FileText, Database, MessageSquare, Send, Trash2 } from "lucide-react";

// Initialize Supabase with your credentials
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
  const [terminalLogs, setTerminalLogs] = useState(["[SYSTEM]: INITIALIZING...", "[LOAD]: VECTORS_STABLE"]);
  
  // Realtime Database States
  const [userIdea, setUserIdea] = useState("");
  const [submittedIdeas, setSubmittedIdeas] = useState([]);

  const audioRef = useRef(null);
  const cursorRef = useRef(null);

  const galleryImages = ["image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png", "image7.png", "image8.png", "image9.png"];
  const soraVideos = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4", "video5.mp4", "video6.mp4"];
  const transmissions = [
    { id: "01", title: "THE_VOID_PROTOCOL", body: "Initial testing of Sora generative vectors. Reality stability at 42%." },
    { id: "02", title: "DREAM_LOG_SEQUENCE", body: "Visual sequences recovered from the December 2025 batch. High grain detected." }
  ];

  // 1. Fetch & Subscribe to Supabase
  useEffect(() => {
    const fetchIdeas = async () => {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setSubmittedIdeas(data);
    };

    fetchIdeas();

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ideas' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setSubmittedIdeas(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'DELETE') {
          setSubmittedIdeas(prev => prev.filter(item => item.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // 2. Submit Logic
  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    if (!userIdea.trim()) return;
    const { error } = await supabase
      .from('ideas')
      .insert([{ text: userIdea, username: `User_${Math.floor(Math.random() * 900) + 100}` }]);
    if (!error) setUserIdea("");
  };

  // 3. Admin Delete Logic (Hidden: Hold Alt Key + Click)
  const handleDelete = async (id, e) => {
    if (e.altKey) {
      const { error } = await supabase.from('ideas').delete().eq('id', id);
      if (error) console.error("Moderation failed:", error);
    }
  };

  // Rest of your logic (Audio, Keyboard, Cursor)...
  useEffect(() => {
    if (audioRef.current) {
      if (activeVideo || isSecretOpen) audioRef.current.pause();
      else if (!isMuted) audioRef.current.play().catch(() => {});
    }
  }, [activeVideo, isSecretOpen, isMuted]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    const moveCursor = (e) => {
      requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
      const hovered = !!e.target.closest('button, a, .clickable, input, textarea, .dead-pixel, img, video');
      if (hovered) cursor.classList.add('cursor-hovering');
      else cursor.classList.remove('cursor-hovering');
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-black font-mono text-white overflow-x-hidden ${isGlitching ? 'screen-shake' : ''}`} onClick={() => !activeVideo && audioRef.current?.play()}>
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* Background & HUD */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[url('/dreamcore.jpg')] bg-cover bg-center transition-opacity duration-1000 ${isEasterEgg ? 'opacity-0' : 'opacity-20'}`} />
        <div className="vhs-filter" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-50 p-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span>STATION: AETHER_CORE</span>
            <span>CREATOR: DYLON MARTINEAU</span>
            <div className="dead-pixel pointer-events-auto mt-4 cursor-none w-2 h-2 bg-red-600 shadow-[0_0_10px_red]" onClick={(e) => { e.stopPropagation(); setIsSecretOpen(true); }} />
          </div>
          <button onClick={() => setIsMuted(!isMuted)} className="clickable pointer-events-auto transition-colors hover:text-white">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
        <div className="scanline" />
      </div>

      <main className="relative z-10 flex flex-col items-center pt-40 pb-60">
        <h1 className="text-[4.5rem] md:text-[9rem] font-black italic mb-4 text-white/10 select-none tracking-tighter">
          AETHER_CORE
        </h1>

        {/* --- LIVE IDEA TERMINAL --- */}
        <div className="w-full max-w-4xl px-6 mb-32">
           <div className="flex items-center gap-4 mb-8 text-white/20">
              <MessageSquare size={16} />
              <h2 className="text-xs uppercase tracking-[.4em]">Live_Collaboration_Feed</h2>
              <div className="h-[1px] flex-grow bg-white/5" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 border border-white/10 p-6 bg-white/[0.02]">
                <p className="text-[9px] text-white/40 uppercase mb-4 tracking-widest">Transmit Concept:</p>
                <form onSubmit={handleIdeaSubmit} className="flex flex-col gap-4">
                  <textarea 
                    value={userIdea}
                    onChange={(e) => setUserIdea(e.target.value)}
                    placeholder="Input idea..."
                    className="bg-black border border-white/10 p-3 text-[10px] text-white focus:outline-none focus:border-red-600/50 min-h-[100px] resize-none font-mono"
                  />
                  <button type="submit" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2 text-[10px] uppercase hover:bg-white hover:text-black transition-all clickable">
                    <Send size={12} /> Broadcast
                  </button>
                </form>
                <p className="text-[7px] text-white/10 mt-4 italic uppercase tracking-widest">Data is permanent once sent.</p>
              </div>

              <div className="md:col-span-2 flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {submittedIdeas.map((idea) => (
                  <div 
                    key={idea.id} 
                    onClick={(e) => handleDelete(idea.id, e)}
                    className="border-l-2 border-white/5 pl-4 py-2 hover:border-red-600/30 transition-all group clickable"
                  >
                    <div className="flex justify-between text-[8px] text-white/20 mb-1">
                      <span>{idea.username}</span>
                      <div className="flex items-center gap-2">
                         <span>{new Date(idea.created_at).toLocaleTimeString()}</span>
                         <Trash2 size={8} className="opacity-0 group-hover:opacity-10 transition-opacity" />
                      </div>
                    </div>
                    <p className="text-[10px] text-white/60 font-mono italic">"{idea.text}"</p>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Video & Image Grids go here... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 mb-20">
          {soraVideos.map((vid, idx) => (
            <div key={idx} onClick={() => setActiveVideo(vid)} className="aspect-video bg-white/5 border border-white/10 group overflow-hidden clickable">
              <video src={`/${vid}`} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      </main>

      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-line-v" /><div className="cursor-line-h" /><div className="cursor-dot" />
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
            <X className="absolute top-10 right-10 text-white/50 clickable z-[110]" size={32} onClick={() => setActiveVideo(null)} />
            <div className="vertical-video-container border border-white/10">
               <video src={`/${activeVideo}`} controls autoPlay loop playsInline className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}