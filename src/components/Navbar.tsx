import React from 'react';
import {
  School,
  Bell,
  LogOut,
  ChevronDown,
  Sparkles,
  Globe
} from 'lucide-react';
import { UserRole, AuthUser } from '../types/erp';
import { Language, translations } from '../i18n/translations';

interface NavbarProps {
  currentUser: AuthUser | null;
  onLogout: () => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  unreadNoticesCount: number;
  onOpenNotices: () => void;
  onOpenReaSpec: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout,
  currentRole,
  setCurrentRole,
  unreadNoticesCount,
  onOpenNotices,
  onOpenReaSpec,
  currentLang,
  onLanguageChange
}) => {
  const t = translations[currentLang];

  const roleLabels: Record<UserRole, { label: string; text: string; roleColor: string }> = {
    admin: { label: t.roleAdmin, text: 'Super Administrator', roleColor: 'text-purple-400' },
    staff: { label: t.roleStaff, text: 'Teacher / Faculty', roleColor: 'text-blue-400' },
    accountant: { label: t.roleAccountant, text: 'Bursar & Accountant', roleColor: 'text-emerald-400' },
    student: { label: t.roleStudent, text: 'Student / Parent View', roleColor: 'text-amber-400' }
  };

  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
      {/* Brand & School Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-blue-600 to-sky-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
          <School className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-white">{t.appName}</span>
            <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
              REA v2.8
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{t.academicTerm}</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {roleLabels[currentRole].label}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Language Selector, Role Switcher, Notices, Profile & Logout */}
      <div className="flex items-center gap-2.5">
        {/* Language Selector (English / हिंदी / मराठी) */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
          <div className="px-1.5 py-1 text-slate-400 hidden sm:flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          {(['en', 'hi', 'mr'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                currentLang === lang
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
            </button>
          ))}
        </div>

        {/* REA Framework Blueprint Button */}
        <button
          onClick={onOpenReaSpec}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-800/60 text-xs text-indigo-300 transition-colors"
          title="Inspect the REA reverse-engineered architecture"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{t.reaBlueprint}</span>
        </button>

        {/* Notices Alert Bell */}
        <button
          onClick={onOpenNotices}
          className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Open Notice Board"
        >
          <Bell className="w-4 h-4" />
          {unreadNoticesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-[10px] font-bold text-white flex items-center justify-center">
              {unreadNoticesCount}
            </span>
          )}
        </button>

        {/* Role Portal Switcher Dropdown */}
        <div className="relative hidden md:block">
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as UserRole)}
            className="appearance-none bg-slate-950 border border-slate-700 hover:border-slate-600 text-xs text-slate-200 rounded-lg pl-3 pr-8 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer shadow-sm"
          >
            <option value="admin">{t.roleAdmin}</option>
            <option value="staff">{t.roleStaff}</option>
            <option value="accountant">{t.roleAccountant}</option>
            <option value="student">{t.roleStudent}</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Logged in User Profile Info */}
        {currentUser && (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-700"
            />
            <div className="text-left hidden lg:block">
              <div className="text-xs font-semibold text-white leading-tight">{currentUser.name}</div>
              <div className={`text-[10px] font-mono ${roleLabels[currentRole].roleColor}`}>
                {currentUser.title || currentUser.role.toUpperCase()}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 transition-colors ml-1"
              title={t.signOut}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
