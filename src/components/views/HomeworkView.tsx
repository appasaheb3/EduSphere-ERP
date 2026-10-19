import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Calendar,
  Paperclip,
  CheckCircle2,
  Clock,
  Send,
  Upload,
  FileText,
  UserCheck,
  X
} from 'lucide-react';
import { HomeworkAssignment, UserRole } from '../../types/erp';

interface HomeworkViewProps {
  currentRole: UserRole;
  assignments: HomeworkAssignment[];
  onAddAssignment: (assignment: HomeworkAssignment) => void;
}

export const HomeworkView: React.FC<HomeworkViewProps> = ({
  currentRole,
  assignments,
  onAddAssignment
}) => {
  const [selectedAssignment, setSelectedAssignment] = useState<HomeworkAssignment | null>(
    assignments[0] || null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>({
    'hw-2': true
  });
  const [submissionFile, setSubmissionFile] = useState<string>('My_Assignment_Solution.pdf');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New Homework Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [grade, setGrade] = useState('Grade 10 A');
  const [dueDate, setDueDate] = useState('2026-10-30');
  const [maxPoints, setMaxPoints] = useState(50);
  const [description, setDescription] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newHw: HomeworkAssignment = {
      id: `hw-${Date.now()}`,
      title,
      subject,
      grade,
      assignedBy: 'Prof. Faculty User',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate,
      description,
      maxPoints,
      submissionsCount: 0,
      totalStudents: 32,
      attachments: ['Assignment_Guide.pdf']
    };

    onAddAssignment(newHw);
    setSelectedAssignment(newHw);
    setIsCreating(false);
    setTitle('');
    setDescription('');
  };

  const handleStudentSubmit = (hwId: string) => {
    setSubmittedTasks((prev) => ({ ...prev, [hwId]: true }));
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            Homework & Academic Tasks
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Assign digital coursework, track student submissions, and grade problem sets with rubric standards.
          </p>
        </div>

        {currentRole !== 'student' && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Create Assignment
          </button>
        )}
      </div>

      {/* Main Grid: Homework List and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of Assignments */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Assignments ({assignments.length})
          </div>

          {assignments.map((hw) => {
            const isSelected = selectedAssignment?.id === hw.id;
            const isDone = submittedTasks[hw.id];
            return (
              <div
                key={hw.id}
                onClick={() => setSelectedAssignment(hw)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-indigo-400 font-semibold">{hw.subject}</span>
                  <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Due {hw.dueDate}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{hw.title}</h4>
                <div className="text-xs text-slate-400 mt-1">Class: {hw.grade} &bull; Max: {hw.maxPoints} pts</div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    {hw.submissionsCount} / {hw.totalStudents} Submitted
                  </span>
                  {isDone ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Turned In
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium">Pending Submission</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Assignment Details & Submission */}
        {selectedAssignment && (
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {selectedAssignment.subject}
                    </span>
                    <span className="text-xs text-slate-400">{selectedAssignment.grade}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedAssignment.title}</h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Due Date</span>
                  <span className="text-sm font-mono font-bold text-rose-400">{selectedAssignment.dueDate}</span>
                </div>
              </div>

              {/* Assignment Specs */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 mb-1">Task Instructions</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {selectedAssignment.description}
                </p>
              </div>

              {/* Attachments */}
              {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 mb-2">Teacher Resources & Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssignment.attachments.map((file, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2"
                      >
                        <Paperclip className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submission Drawer for Students */}
            <div className="pt-4 border-t border-slate-800">
              {submittedTasks[selectedAssignment.id] ? (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div>
                      <strong>Assignment Successfully Turned In!</strong>
                      <div className="text-[11px] text-slate-400">File: {submissionFile} &bull; Timestamp: Today 10:14 AM</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    Awaiting Grading
                  </span>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-indigo-400" />
                      Submit Coursework Solution
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Upload PDF, source code ZIP, or document scan. Max file size: 25MB.
                    </p>
                  </div>

                  <button
                    onClick={() => handleStudentSubmit(selectedAssignment.id)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Upload & Turn In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Assignment Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Assign Coursework / Homework
              </h3>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 6: Kinetic Energy & Work-Energy Theorem"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English Literature">English Literature</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Target Class</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Grade 10 A">Grade 10 A</option>
                    <option value="Grade 10 B">Grade 10 B</option>
                    <option value="Grade 11 Sci">Grade 11 Sci</option>
                    <option value="Grade 12 A">Grade 12 A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Submission Deadline</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Max Points</label>
                  <input
                    type="number"
                    value={maxPoints}
                    onChange={(e) => setMaxPoints(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Instructions & Rubrics</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail step requirements, equations to show, or formatting guidelines..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Publish Homework
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
