import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Search,
  Filter,
  AlertCircle,
  Pin,
  Calendar,
  User,
  Share2,
  X,
  CheckCircle2
} from 'lucide-react';
import { Notice, UserRole } from '../../types/erp';

interface NoticeBoardViewProps {
  currentRole: UserRole;
  notices: Notice[];
  onAddNotice: (notice: Notice) => void;
}

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({
  currentRole,
  notices,
  onAddNotice
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPosting, setIsPosting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Notice['category']>('Academic');
  const [targetAudience, setTargetAudience] = useState<Notice['targetAudience']>('All');
  const [priority, setPriority] = useState<Notice['priority']>('Normal');
  const [content, setContent] = useState('');

  const filteredNotices = notices.filter((n) => {
    const matchesQuery =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNotice: Notice = {
      id: `not-${Date.now()}`,
      title,
      category,
      date: new Date().toISOString().split('T')[0],
      author: currentRole === 'admin' ? 'Principal’s Office' : 'Department Head',
      targetAudience,
      priority,
      content
    };

    onAddNotice(newNotice);
    setIsPosting(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            Official Notice Board & Circulars
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            School-wide announcements, examination schedules, fee deadlines, and holiday notices.
          </p>
        </div>

        {currentRole !== 'student' && (
          <button
            onClick={() => setIsPosting(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Publish Notice
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices and circulars..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs overflow-x-auto w-full sm:w-auto">
          <span className="text-slate-400 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {['All', 'Academic', 'Administrative', 'Examination', 'Holiday'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => {
          const isUrgent = notice.priority === 'Urgent';
          return (
            <div
              key={notice.id}
              className={`p-5 rounded-xl border transition-all ${
                isUrgent
                  ? 'bg-rose-950/20 border-rose-800/40'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {isUrgent && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      URGENT NOTICE
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-400">Audience: <strong>{notice.targetAudience}</strong></span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>{notice.date}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-2">{notice.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{notice.content}</p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Authorized by: <strong className="text-slate-300">{notice.author}</strong></span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Notice Ref: {notice.id}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish Notice Modal */}
      {isPosting && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handlePostSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                Publish Official Campus Circular
              </h3>
              <button
                type="button"
                onClick={() => setIsPosting(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Annual Science Fair and Lab Timings"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Examination">Examination</option>
                    <option value="Sports & Cultural">Sports & Cultural</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="All">All Campus</option>
                    <option value="Students">Students Only</option>
                    <option value="Staff">Faculty / Staff</option>
                    <option value="Parents">Parents & Guardians</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Notice Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide complete circular details, deadlines, and instructions..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsPosting(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Broadcast Notice
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
