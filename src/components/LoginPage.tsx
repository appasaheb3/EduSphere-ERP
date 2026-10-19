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
  BookOpen,
  Globe,
  Building2,
  ChevronDown,
  Cpu,
  Layers,
  Palette
} from 'lucide-react';
import { AuthUser, UserRole, Organization, CampusTheme } from '../types/erp';
import { PRESET_USERS, CAMPUS_THEMES } from '../data/mockData';
import { Language, translations } from '../i18n/translations';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  organizations?: Organization[];
  currentOrganization?: Organization;
  onSelectOrganization?: (org: Organization) => void;
  currentTheme?: CampusTheme;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  currentLang,
  onLanguageChange,
  organizations = [],
  currentOrganization,
  onSelectOrganization,
  currentTheme = CAMPUS_THEMES.indigo
}) => {
  const t = translations[currentLang];
  const [email, setEmail] = useState('admin@edusphere.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const crestIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    School,
    Cpu,
    GraduationCap,
    Layers,
    DollarSign,
    Building2
  };

  const CrestIcon = currentOrganization
    ? crestIconMap[currentOrganization.crestIcon] || School
    : School;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = PRESET_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      onLogin(matched);
    } else {
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
      {/* Background ambient lights styled by current theme */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: currentTheme.primaryHex }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: currentTheme.primaryHex }}
      />

      {/* Language Selector Top Right */}
      <div className="absolute top-4 right-4 z-20 flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
        <Globe className="w-3.5 h-3.5 mx-1.5" style={{ color: currentTheme.primaryHex }} />
        {(['en', 'hi', 'mr'] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              currentLang === lang
                ? `${currentTheme.btnPrimaryClass} text-white shadow-sm`
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
          </button>
        ))}
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Branding, Active College & Features */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">Multi-College Institutional ERP</span>
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: currentTheme.primaryHex }}
            />
          </div>

          <div>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentTheme.gradientFrom} ${currentTheme.gradientTo} flex items-center justify-center shadow-lg text-white transition-all duration-300`}
              >
                <CrestIcon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">{t.appName}</h1>
                <p className="text-xs font-medium text-slate-300">{t.campusCloud}</p>
              </div>
            </div>

            {/* Active College Banner Pill */}
            {currentOrganization && (
              <div className={`mt-2 p-2.5 rounded-xl border ${currentTheme.borderClass} ${currentTheme.badgeBg} text-left`}>
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                  <span>{t.activeCampus}</span>
                  <span className={`font-bold ${currentTheme.accentClass}`}>
                    Theme: {currentTheme.name}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {currentOrganization.name} ({currentOrganization.code})
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {currentOrganization.tagline}
                </div>
              </div>
            )}

            <p className="text-xs text-slate-400 leading-relaxed mt-3">
              Unified institutional management platform connecting Administration, Bursar & Accounts, Faculty, and Students with isolated operational portals and college-specific brand theming.
            </p>
          </div>

          {/* College Selector on Login Page */}
          {organizations.length > 0 && onSelectOrganization && currentOrganization && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-slate-300" />
                <span>{t.switchCollege}:</span>
              </label>
              <select
                value={currentOrganization.id}
                onChange={(e) => {
                  const found = organizations.find((o) => o.id === e.target.value);
                  if (found) onSelectOrganization(found);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {organizations.map((org) => {
                  const th = CAMPUS_THEMES[org.themeId] || currentTheme;
                  return (
                    <option key={org.id} value={org.id}>
                      {org.name} ({org.code}) — {th.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div className="space-y-2.5 pt-1 hidden sm:block">
            {[
              { icon: DollarSign, text: 'Flexible Fee Installments & Printable Receipts' },
              { icon: GraduationCap, text: 'Exams, Schedules & Automated Report Cards' },
              { icon: Users, text: 'Direct Student Registration (Admin & Accountant)' },
              { icon: BookOpen, text: 'Online Streaming Video Lectures with Whiteboard' }
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

        {/* Right Column: Login Card & 1-Click Role Presets */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{t.signInTitle}</h2>
            <p className="text-xs text-slate-400 mt-1">{t.signInSubtitle}</p>
          </div>

          {/* Quick 1-Click Role Presets */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
              {t.quickLogin}
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

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] font-mono uppercase text-slate-500 shrink-0">
              or enter custom credentials
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          {/* Manual Credential Login Form */}
          <form onSubmit={handleManualLogin} className="space-y-3.5">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Institutional Email ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-10 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                />
                <span>{t.keepSignedIn}</span>
              </label>
              <span className={`text-[11px] ${currentTheme.accentClass} cursor-pointer hover:underline`}>
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 px-4 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${currentTheme.btnPrimaryClass}`}
            >
              <span>{t.loginButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Student Privacy Note */}
          <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Role Privacy Isolation:</strong> Students log into a strictly isolated dossier without access to peer financial or academic records.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
