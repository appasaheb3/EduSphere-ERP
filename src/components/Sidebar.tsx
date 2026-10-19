import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  DollarSign,
  FileCheck2,
  Calendar,
  Award,
  Video,
  BookOpen,
  Bell,
  Bus,
  UserPlus,
  Building2,
  Palette,
  School,
  Cpu,
  Layers,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { UserRole, Organization, CampusTheme } from '../types/erp';
import { Language, translations } from '../i18n/translations';

export type NavTab =
  | 'dashboard'
  | 'students'
  | 'staff'
  | 'attendance'
  | 'accounting'
  | 'exams'
  | 'schedule-exam'
  | 'certification'
  | 'live-lecture'
  | 'homework'
  | 'notice-board'
  | 'campus-services';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currentRole: UserRole;
  liveLecturesCount: number;
  pendingHomeworkCount: number;
  urgentNoticesCount: number;
  overdueInvoicesCount: number;
  currentLang: Language;
  onOpenRegisterStudent?: () => void;
  currentOrganization: Organization;
  currentTheme: CampusTheme;
  onOpenAddOrganization?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  liveLecturesCount,
  pendingHomeworkCount,
  urgentNoticesCount,
  overdueInvoicesCount,
  currentLang,
  onOpenRegisterStudent,
  currentOrganization,
  currentTheme,
  onOpenAddOrganization
}) => {
  const t = translations[currentLang];

  const crestIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    School,
    Cpu,
    GraduationCap,
    Layers,
    DollarSign,
    Award,
    BookOpen,
    ShieldCheck,
    Building2
  };

  const CrestIcon = crestIconMap[currentOrganization.crestIcon] || School;

  const navItems: {
    id: NavTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    roles: UserRole[];
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: currentRole === 'student' ? (currentLang === 'mr' ? 'माझा डॅशबोर्ड' : currentLang === 'hi' ? 'मेरा डैशबोर्ड' : 'Student Cockpit') : t.navDashboard,
      icon: LayoutDashboard,
      roles: ['admin', 'staff', 'accountant', 'student']
    },
    {
      id: 'students',
      label: currentRole === 'student' ? (currentLang === 'mr' ? 'माझी शैक्षणिक माहिती' : currentLang === 'hi' ? 'मेरी शैक्षणिक प्रोफाइल' : 'My Student Dossier') : t.navStudents,
      icon: Users,
      roles: ['admin', 'staff', 'accountant', 'student']
    },
    {
      id: 'staff',
      label: t.navStaff,
      icon: GraduationCap,
      roles: ['admin', 'staff']
    },
    {
      id: 'attendance',
      label: currentRole === 'student' ? (currentLang === 'mr' ? 'माझी हजेरी' : currentLang === 'hi' ? 'मेरी उपस्थिति' : 'My Attendance') : t.navAttendance,
      icon: CalendarCheck,
      roles: ['admin', 'staff', 'student']
    },
    {
      id: 'accounting',
      label: currentRole === 'student' ? (currentLang === 'mr' ? 'माझे शुल्क व हप्ते' : currentLang === 'hi' ? 'मेरा शुल्क और किस्तें' : 'My Fee Installments') : t.navAccounting,
      icon: DollarSign,
      roles: ['admin', 'accountant', 'student'],
      badge: overdueInvoicesCount > 0 ? overdueInvoicesCount : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    },
    {
      id: 'exams',
      label: currentRole === 'student' ? (currentLang === 'mr' ? 'माझ्या परीक्षा व गुण' : currentLang === 'hi' ? 'मेरी परीक्षा और अंक' : 'My Exams & Grades') : t.navExams,
      icon: FileCheck2,
      roles: ['admin', 'staff', 'student']
    },
    {
      id: 'schedule-exam',
      label: t.navScheduleExam,
      icon: Calendar,
      roles: ['admin', 'staff']
    },
    {
      id: 'certification',
      label: currentRole === 'student' ? (currentLang === 'mr' ? 'माझी प्रमाणपत्रे' : currentLang === 'hi' ? 'मेरे प्रमाणपत्र' : 'My Certificates') : t.navCertificates,
      icon: Award,
      roles: ['admin', 'staff', 'student']
    },
    {
      id: 'live-lecture',
      label: t.navLiveLecture,
      icon: Video,
      roles: ['admin', 'staff', 'student'],
      badge: liveLecturesCount > 0 ? 'LIVE' : undefined,
      badgeColor: 'bg-red-500 text-white animate-pulse'
    },
    {
      id: 'homework',
      label: currentRole === 'student' ? (currentLang === 'mr' ? 'माझा गृहपाठ' : currentLang === 'hi' ? 'मेरा गृहकार्य' : 'My Homework') : t.navHomework,
      icon: BookOpen,
      roles: ['admin', 'staff', 'student'],
      badge: pendingHomeworkCount > 0 ? pendingHomeworkCount : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    },
    {
      id: 'campus-services',
      label: t.navLogistics,
      icon: Bus,
      roles: ['admin', 'staff', 'accountant', 'student']
    },
    {
      id: 'notice-board',
      label: t.navNoticeBoard,
      icon: Bell,
      roles: ['admin', 'staff', 'accountant', 'student'],
      badge: urgentNoticesCount > 0 ? urgentNoticesCount : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    }
  ];

  const visibleItems = navItems.filter((item) => item.roles.includes(currentRole));

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-3">
        {/* Active College Theme Banner Card */}
        <div
          className={`mb-3 p-3 rounded-xl border ${currentTheme.borderClass} bg-gradient-to-br ${currentTheme.headerBg} relative overflow-hidden transition-all duration-300`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${currentTheme.gradientFrom} ${currentTheme.gradientTo} flex items-center justify-center text-white shadow shrink-0`}
            >
              <CrestIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                  {currentOrganization.code}
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentTheme.primaryHex }}
                  title={currentTheme.name}
                />
              </div>
              <h4 className="text-xs font-bold text-white truncate leading-tight">
                {currentOrganization.name}
              </h4>
              <p className={`text-[10px] truncate ${currentTheme.accentClass}`}>
                {currentTheme.name}
              </p>
            </div>
          </div>

          {currentRole === 'admin' && onOpenAddOrganization && (
            <button
              onClick={onOpenAddOrganization}
              className="mt-2 w-full py-1 px-2 rounded-lg bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800 text-[10px] font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>{t.addOrganization}</span>
            </button>
          )}
        </div>

        {/* Quick Student Registration Button for Admin and Accountant */}
        {(currentRole === 'admin' || currentRole === 'accountant') && onOpenRegisterStudent && (
          <button
            onClick={onOpenRegisterStudent}
            className={`w-full mb-3 py-2 px-3 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all ${currentTheme.btnPrimaryClass}`}
          >
            <UserPlus className="w-4 h-4" />
            <span>{t.registerStudent}</span>
          </button>
        )}

        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 py-2">
          {currentRole.toUpperCase()} &bull; {currentLang.toUpperCase()}
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: currentTheme.primaryHex,
                        boxShadow: `0 4px 14px 0 ${currentTheme.primaryHex}40`
                      }
                    : {}
                }
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Context Card in Bottom Sidebar */}
      <div className="mt-auto p-3 border-t border-slate-800">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>{t.liveCampus}</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              RBAC Active
            </span>
          </div>
          <div className="text-xs font-mono text-slate-300 truncate">
            {currentOrganization.code} &bull; {t.appName}
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Theme: {currentTheme.name}</span>
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: currentTheme.primaryHex }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
