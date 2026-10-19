import React, { useState, useRef, useEffect } from 'react';
import {
  School,
  Cpu,
  GraduationCap,
  Layers,
  DollarSign,
  Award,
  BookOpen,
  ShieldCheck,
  Building2,
  Bell,
  LogOut,
  ChevronDown,
  Sparkles,
  Globe,
  Palette,
  Plus,
  Check,
  Building
} from 'lucide-react';
import { UserRole, AuthUser, Organization, CampusTheme, ThemeColorId } from '../types/erp';
import { Language, translations } from '../i18n/translations';
import { CAMPUS_THEMES } from '../data/mockData';

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
  currentOrganization: Organization;
  organizations: Organization[];
  onSelectOrganization: (org: Organization) => void;
  onOpenAddOrganization: () => void;
  currentTheme: CampusTheme;
  onChangeTheme: (themeId: ThemeColorId) => void;
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
  onLanguageChange,
  currentOrganization,
  organizations,
  onSelectOrganization,
  onOpenAddOrganization,
  currentTheme,
  onChangeTheme
}) => {
  const t = translations[currentLang];
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const orgDropdownRef = useRef<HTMLDivElement>(null);
  const themePickerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (orgDropdownRef.current && !orgDropdownRef.current.contains(event.target as Node)) {
        setIsOrgDropdownOpen(false);
      }
      if (themePickerRef.current && !themePickerRef.current.contains(event.target as Node)) {
        setIsThemePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const crestIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    School,
    Cpu,
    GraduationCap,
    Layers,
    DollarSign,
    Award,
    BookOpen,
    ShieldCheck,
    Building2,
    Building
  };

  const CrestIcon = crestIconMap[currentOrganization.crestIcon] || School;

  const roleLabels: Record<UserRole, { label: string; text: string; roleColor: string }> = {
    admin: { label: t.roleAdmin, text: 'Super Administrator', roleColor: 'text-purple-400' },
    staff: { label: t.roleStaff, text: 'Teacher / Faculty', roleColor: 'text-blue-400' },
    accountant: { label: t.roleAccountant, text: 'Bursar & Accountant', roleColor: 'text-emerald-400' },
    student: { label: t.roleStudent, text: 'Student / Parent View', roleColor: 'text-amber-400' }
  };

  return (
    <header className="h-16 bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between">
      {/* Brand & Active College Info with Theme Styling */}
      <div className="flex items-center gap-3">
        {/* Dynamic College Crest Styled by Current Theme */}
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${currentTheme.gradientFrom} ${currentTheme.gradientTo} flex items-center justify-center shadow-md text-white shrink-0 transition-all duration-300`}
        >
          <CrestIcon className="w-5 h-5" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              <span>{t.appName}</span>
            </span>

            {/* Active College Code & Theme Pill */}
            <div className="relative" ref={orgDropdownRef}>
              <button
                onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-semibold ${currentTheme.badgeBg} ${currentTheme.badgeText} border ${currentTheme.borderClass} hover:bg-slate-800 transition-all`}
                title={t.switchCollege}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-sm animate-pulse"
                  style={{ backgroundColor: currentTheme.primaryHex }}
                />
                <span className="font-mono">{currentOrganization.code}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {/* Organization & Theme Switcher Popover */}
              {isOrgDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                    <div>
                      <h4 className="text-xs font-bold text-white">{t.activeCampus}</h4>
                      <p className="text-[10px] text-slate-400">Select campus or configure themes</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsOrgDropdownOpen(false);
                        onOpenAddOrganization();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white ${currentTheme.btnPrimaryClass} flex items-center gap-1 transition-all shadow-sm`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t.addOrganization}</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {organizations.map((org) => {
                      const orgTheme = CAMPUS_THEMES[org.themeId] || currentTheme;
                      const OrgCrest = crestIconMap[org.crestIcon] || School;
                      const isSelected = org.id === currentOrganization.id;

                      return (
                        <button
                          key={org.id}
                          onClick={() => {
                            onSelectOrganization(org);
                            setIsOrgDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                            isSelected
                              ? `${orgTheme.badgeBg} ${orgTheme.borderClass} ring-1 ring-offset-0`
                              : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/70 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${orgTheme.gradientFrom} ${orgTheme.gradientTo} flex items-center justify-center text-white shrink-0`}
                            >
                              <OrgCrest className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white truncate">
                                  {org.name}
                                </span>
                                <span className={`text-[10px] font-mono px-1 rounded ${orgTheme.badgeBg} ${orgTheme.badgeText}`}>
                                  {org.code}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-400 truncate flex items-center gap-1.5">
                                <span>{org.type}</span>
                                <span>&bull;</span>
                                <span className={orgTheme.accentClass}>{orgTheme.name}</span>
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 ml-2">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add College Callout */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Each college carries its own theme & identity.</span>
                    <button
                      onClick={() => {
                        setIsOrgDropdownOpen(false);
                        onOpenAddOrganization();
                      }}
                      className={`text-xs font-semibold ${currentTheme.accentClass} hover:underline`}
                    >
                      + Add New College
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="truncate max-w-[150px] sm:max-w-[260px] font-medium text-slate-300">
              {currentOrganization.name}
            </span>
            <span className="hidden md:inline">&bull;</span>
            <span className="hidden md:inline text-[11px] text-slate-400">
              {t.academicTerm}
            </span>
            <span>&bull;</span>
            <span className={`flex items-center gap-1 ${currentTheme.accentClass}`}>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: currentTheme.primaryHex }}
              />
              {roleLabels[currentRole].label}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Theme Quick Switcher, Language Selector, Role Switcher, Notices, Profile & Logout */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Quick Theme Palette Selector */}
        <div className="relative" ref={themePickerRef}>
          <button
            onClick={() => setIsThemePickerOpen(!isThemePickerOpen)}
            className={`p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors flex items-center gap-1.5`}
            title={t.selectTheme}
          >
            <Palette className="w-4 h-4" style={{ color: currentTheme.primaryHex }} />
            <span className="text-xs font-semibold hidden lg:inline" style={{ color: currentTheme.primaryHex }}>
              {currentTheme.name.split(' ')[0]}
            </span>
          </button>

          {isThemePickerOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white">{t.selectTheme}</span>
                <span className={`text-[10px] font-mono ${currentTheme.accentClass}`}>
                  {currentTheme.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(CAMPUS_THEMES) as ThemeColorId[]).map((themeKey) => {
                  const th = CAMPUS_THEMES[themeKey];
                  const isSelected = currentTheme.id === themeKey;
                  return (
                    <button
                      key={themeKey}
                      onClick={() => {
                        onChangeTheme(themeKey);
                        setIsThemePickerOpen(false);
                      }}
                      className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all ${
                        isSelected
                          ? `${th.badgeBg} ${th.borderClass} ring-1 ring-offset-0`
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: th.primaryHex }}
                      />
                      <span className="text-[11px] font-semibold text-white truncate">
                        {th.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Language Selector (English / हिंदी / मराठी) */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
          <div className="px-1.5 py-1 text-slate-400 hidden sm:flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" style={{ color: currentTheme.primaryHex }} />
          </div>
          {(['en', 'hi', 'mr'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                currentLang === lang
                  ? `${currentTheme.btnPrimaryClass} text-white shadow-sm`
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
            </button>
          ))}
        </div>

        {/* REA Framework Architecture Specs */}
        <button
          onClick={onOpenReaSpec}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 transition-colors"
          title="Inspect the REA reverse-engineered architecture"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
