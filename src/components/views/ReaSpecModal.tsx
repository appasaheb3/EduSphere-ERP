import React from 'react';
import {
  Sparkles,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
  X,
  ExternalLink
} from 'lucide-react';

interface ReaSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReaSpecModal: React.FC<ReaSpecModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">REA Cleanroom Architecture Blueprint</h3>
              <p className="text-xs text-slate-400">Generated from GitHub REA (morluto/rea) framework methodology</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-semibold text-indigo-300">
            <Sparkles className="w-4 h-4" />
            School ERP Cleanroom Reverse-Engineering Pipeline
          </div>
          <p>
            This application implements the 5-stage synthesis process outlined in the official REA (Reverse Engineer Anything) open-source framework (<code className="text-indigo-300 font-mono">github.com/morluto/rea</code>), reconstructing complex institutional software behavior from scratch without legacy technical debt.
          </p>
        </div>

        {/* 5-Stage Process Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Reconstructed School Modules
          </h4>

          <div className="space-y-2 text-xs">
            {[
              {
                module: 'Accountant & Financials',
                contract: 'Tuition billing, receipt generation, outstanding balances, and online payments'
              },
              {
                module: 'Exams & Marks Registry',
                contract: 'Continuous evaluation, grading rubrics, letter grade assignment, and report card printing'
              },
              {
                module: 'Certification & TC',
                contract: 'Cryptographic verification codes, Transfer Certificates, and Bonafide document stamping'
              },
              {
                module: 'Daily Attendance',
                contract: 'Dual-register for student roll call and faculty presence with percentage analytics'
              },
              {
                module: 'Exam Scheduler',
                contract: 'Conflict-free hall allocation, clash detection for time & supervisors, and date sheets'
              },
              {
                module: 'Online Streaming Lecture',
                contract: 'Virtual classroom simulation with animated HTML5 canvas, live Q&A chat, and notes'
              },
              {
                module: 'Homework Management',
                contract: 'Digital assignment distribution, attachment bundles, and student turn-in tracking'
              },
              {
                module: 'Notice Board Circulars',
                contract: 'Target-audience broadcasting (Students, Staff, Parents) with urgent priority tags'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">{item.module}:</strong>{' '}
                  <span className="text-slate-400">{item.contract}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <GitBranch className="w-3.5 h-3.5 text-slate-400" />
            <span>Stack: React 19 &bull; Vite 8 &bull; Tailwind CSS v4 &bull; TypeScript</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
