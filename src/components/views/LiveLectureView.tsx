import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Radio,
  Send,
  Users,
  MessageSquare,
  FileText,
  Hand,
  Settings,
  Sparkles,
  CheckCircle2,
  Layers,
  MonitorPlay
} from 'lucide-react';
import { LectureStream, UserRole } from '../../types/erp';

interface LiveLectureViewProps {
  currentRole: UserRole;
  lectures: LectureStream[];
}

interface ChatMessage {
  id: string;
  sender: string;
  role: string;
  text: string;
  time: string;
}

export const LiveLectureView: React.FC<LiveLectureViewProps> = ({
  currentRole,
  lectures
}) => {
  const [selectedLecture, setSelectedLecture] = useState<LectureStream>(
    lectures.find((l) => l.status === 'Live') || lectures[0]
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [videoMode, setVideoMode] = useState<'video' | 'canvas'>('video');

  const [isHandRaised, setIsHandRaised] = useState(false);
  const [chatTab, setChatTab] = useState<'chat' | 'notes' | 'participants'>('chat');
  const [inputMessage, setInputMessage] = useState('');

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'c1',
      sender: 'Dr. Alistair Finch',
      role: 'Instructor',
      text: 'Good morning scholars! Welcome to today’s lecture on Electromagnetic Induction and Lenz’s Law.',
      time: '10:02 AM'
    },
    {
      id: 'c2',
      sender: 'Sophia Chen',
      role: 'Student',
      text: 'Good morning Professor! Will we cover the transformer turns ratio calculation today?',
      time: '10:04 AM'
    },
    {
      id: 'c3',
      sender: 'Dr. Alistair Finch',
      role: 'Instructor',
      text: 'Yes Sophia, watch the experimental demonstration on screen right now.',
      time: '10:06 AM'
    },
    {
      id: 'c4',
      sender: 'Aarav Sharma',
      role: 'Student',
      text: 'The induced magnetic field opposes the primary flux change! Energy conservation in action.',
      time: '10:08 AM'
    }
  ]);

  // Video play/pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = Number(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: currentRole === 'student' ? 'Aarav Sharma' : currentRole === 'staff' ? 'Instructor (You)' : 'Robert Thornton (Admin)',
      role: currentRole === 'staff' ? 'Instructor' : currentRole === 'student' ? 'Student' : 'Admin',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
  };

  // Canvas simulation fallback if requested
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (videoMode !== 'canvas') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const render = () => {
      t += 0.04;
      ctx.fillStyle = '#0a0f1d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + t) * 60;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('EMF = -N · dΦ/dt', 30, 50);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [videoMode]);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
            Live Online Lecture Stream & Virtual Classroom
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Stream high-definition instructional video lectures with real-time student interaction, live Q&A, and notes.
          </p>
        </div>

        {/* Video Mode and Lecture Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setVideoMode('video')}
              className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                videoMode === 'video' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MonitorPlay className="w-3.5 h-3.5" />
              Video Feed
            </button>
            <button
              onClick={() => setVideoMode('canvas')}
              className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                videoMode === 'canvas' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Whiteboard Wave
            </button>
          </div>

          <select
            value={selectedLecture.id}
            onChange={(e) => {
              const lec = lectures.find((l) => l.id === e.target.value);
              if (lec) setSelectedLecture(lec);
            }}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none"
          >
            {lectures.map((l) => (
              <option key={l.id} value={l.id}>
                {l.status === 'Live' ? '🔴 [LIVE] ' : ''}{l.title} ({l.grade})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Streaming Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video Player Stage */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl">
            {/* Real Video Player Container */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
              {videoMode === 'video' ? (
                <video
                  ref={videoRef}
                  src={selectedLecture.videoUrl}
                  poster={selectedLecture.posterImage}
                  autoPlay
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="w-full h-full object-cover"
                />
              ) : (
                <canvas ref={canvasRef} width={800} height={450} className="w-full h-full object-cover" />
              )}

              {/* Status Tags */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="px-2.5 py-1 rounded bg-red-600 text-white font-mono font-bold text-[11px] flex items-center gap-1.5 backdrop-blur-md shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  BROADCASTING LIVE
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-950/80 text-slate-300 font-mono text-[11px] backdrop-blur-md border border-slate-800">
                  {selectedLecture.viewerCount} Connected Viewers
                </span>
              </div>

              {/* Instructor Floating Card */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-2 rounded-xl flex items-center gap-2.5 pointer-events-none">
                <img
                  src={selectedLecture.teacherAvatar}
                  alt={selectedLecture.teacherName}
                  className="w-8 h-8 rounded-full object-cover border border-indigo-400"
                />
                <div className="text-left text-xs">
                  <div className="font-semibold text-white">{selectedLecture.teacherName}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Audio & Video Active</div>
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="p-3.5 bg-slate-950 border-t border-slate-800 space-y-2">
              {/* Scrub Bar */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-10 text-right">{formatSeconds(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 rounded-lg bg-slate-800"
                />
                <span className="w-10">{formatSeconds(duration || 180)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pause' : 'Play Video'}</span>
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsHandRaised(!isHandRaised)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isHandRaised
                        ? 'bg-amber-600 text-white animate-bounce'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Hand className="w-3.5 h-3.5" />
                    <span>{isHandRaised ? 'Hand Raised!' : 'Raise Hand'}</span>
                  </button>
                </div>

                {/* Speed & Fullscreen Controls */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                    {[1, 1.25, 1.5].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => handleSpeedChange(spd)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-colors ${
                          playbackSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lecture Topic & Whiteboard Details */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-semibold">
                  {selectedLecture.grade} &bull; {selectedLecture.subject}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedLecture.title}</h3>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-semibold">
                Status: {selectedLecture.status}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedLecture.meetingTopic}</p>
          </div>
        </div>

        {/* Right Column: Interactive Chat, Notes & Participants */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[580px] overflow-hidden">
          {/* Subtabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950 p-1">
            <button
              onClick={() => setChatTab('chat')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                chatTab === 'chat' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Live Q&A
            </button>
            <button
              onClick={() => setChatTab('notes')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                chatTab === 'notes' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Notes
            </button>
            <button
              onClick={() => setChatTab('participants')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                chatTab === 'participants' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Roster ({selectedLecture.viewerCount})
            </button>
          </div>

          {/* Chat Messages */}
          {chatTab === 'chat' && (
            <>
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white">{msg.sender}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            msg.role === 'Instructor'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {msg.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{msg.time}</span>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 text-slate-200 leading-normal">
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Post question or comment..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          )}

          {/* Blackboard Notes */}
          {chatTab === 'notes' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="text-xs font-semibold text-slate-300">Live Faculty Lecture Notes:</div>
              {selectedLecture.whiteboardNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 leading-relaxed"
                >
                  {note}
                </div>
              ))}
            </div>
          )}

          {/* Connected Participants */}
          {chatTab === 'participants' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              <div className="text-xs font-semibold text-slate-300 mb-2">Connected Scholars ({selectedLecture.viewerCount}):</div>
              {[
                { name: selectedLecture.teacherName, role: 'Teacher / Host', status: 'Broadcasting' },
                { name: 'Sophia Chen', role: 'Grade 10 Scholar', status: 'Online' },
                { name: 'Aarav Sharma', role: 'Grade 10 Scholar', status: 'Online' },
                { name: 'Liam Vance', role: 'Grade 10 Scholar', status: 'Online' },
                { name: 'Chloe Dubois', role: 'Grade 12 Scholar', status: 'Online' }
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <div>
                    <span className="font-semibold text-white block">{p.name}</span>
                    <span className="text-[10px] text-slate-500">{p.role}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
