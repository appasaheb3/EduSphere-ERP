import React, { useState } from 'react';
import {
  School,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Users,
  DollarSign,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { AuthUser, UserRole } from '../types/erp';
import { PRESET_USERS } from '../data/mockData';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@oakridge.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = PRESET_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      onLogin(matched);
    } else {
      // Create guest session based on domain or default to admin
      const guestRole: UserRole = email.includes('student')
        ? 'student'
        : email.includes('account')
        ? 'accountant'
        : email.includes('faculty') || email.includes('staff')
        ? 'staff'
        : 'admin';

      onLogin({
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: guestRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        title: `${guestRole.toUpperCase()} User`
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Branding & Features overview */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            REA Cleanroom Architecture v2.8
          </div>

          <div>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <School className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">Oakridge Academy</h1>
                <p className="text-xs text-indigo-300 font-medium">Enterprise Campus ERP & Learning Cloud</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unified institutional management platform connecting Administration, Bursar & Accounts, Faculty, and Students with dedicated operational portals.
            </p>
          </div>

          <div className="space-y-2.5 pt-2 hidden sm:block">
            {[
              { icon: DollarSign, text: 'Tuition Fee Installment Plans & Receipts' },
              { icon: GraduationCap, text: 'Continuous Examination, Marks & Report Cards' },
              { icon: Users, text: 'Daily Roll-Call & Direct Student Registration' },
              { icon: BookOpen, text: 'Live Video Lectures with Synchronized Q&A' }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <div className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Login Card & One-Click Role Switcher */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Sign In to Your Campus Portal</h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your role preset for instant 1-click access, or log in with credentials.
            </p>
          </div>

          {/* Quick 1-Click Role Presets */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
              1-Click Fast Login by Role:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {PRESET_USERS.map((user) => {
                const roleColors: Record<UserRole, { border: string; bg: string; text: string }> = {
                  admin: { border: 'hover:border-purple-500/60', bg: 'hover:bg-purple-950/20', text: 'text-purple-400' },
                  accountant: { border: 'hover:border-emerald-500/60', bg: 'hover:bg-emerald-950/20', text: 'text-emerald-400' },
                  staff: { border: 'hover:border-blue-500/60', bg: 'hover:bg-blue-950/20', text: 'text-blue-400' },
                  student: { border: 'hover:border-amber-500/60', bg: 'hover:bg-amber-950/20', text: 'text-amber-400' }
                };

                const colors = roleColors[user.role];

                return (
                  <button
                    key={user.id}
                    onClick={() => onLogin(user)}
                    className={`p-3 rounded-xl bg-slate-950 border border-slate-800/90 text-left transition-all ${colors.border} ${colors.bg} group flex items-center gap-3`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
                          {user.role}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-slate-900 px-3 text-[11px] font-medium text-slate-500 uppercase tracking-wider absolute">
              or enter credentials
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleManualLogin} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="text-slate-300 font-medium block mb-1.5">Campus Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@oakridge.edu"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-300 font-medium">Password</label>
                <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded bg-slate-950 border-slate-800 text-indigo-600" />
                <span>Keep me signed in on this workstation</span>
              </label>
              <span className="font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <span>Authenticate & Access Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-slate-500 z-10">
        Oakridge International Academy &bull; Multi-Role Campus ERP &bull; 2026 Academic Session
      </footer>
    </div>
  );
};
