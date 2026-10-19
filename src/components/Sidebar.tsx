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
  UserPlus
} from 'lucide-react';
import { UserRole } from '../types/erp';

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
  onOpenRegisterStudent?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  liveLecturesCount,
  pendingHomeworkCount,
  urgentNoticesCount,
  overdueInvoicesCount,
  onOpenRegisterStudent
}) => {
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
      label: currentRole === 'student' ? 'Student Cockpit' : currentRole === 'accountant' ? 'Bursar Dashboard' : 'Campus Overview',
      icon: LayoutDashboard,
      roles: ['admin', 'staff', 'accountant', 'student']
    },
    {
      id: 'students',
      label: currentRole === 'student' ? 'My Student Dossier' : 'Students & Records',
      icon: Users,
      roles: ['admin', 'staff', 'accountant', 'student']
    },
    {
      id: 'staff',
      label: 'Staff & Faculty',
      icon: GraduationCap,
      roles: ['admin', 'staff']
    },
    {
      id: 'attendance',
      label: 'Daily Attendance',
      icon: CalendarCheck,
      roles: ['admin', 'staff', 'student']
    },
    {
      id: 'accounting',
      label: currentRole === 'student' ? 'My Fee Installments' : 'Accountant & Installments',
      icon: DollarSign,
      roles: ['admin', 'accountant', 'student'],
      badge: overdueInvoicesCount > 0 ? overdueInvoicesCount : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    },
    {
      id: 'exams',
      label: 'Exams & Results',
      icon: FileCheck2,
      roles: ['admin', 'staff', 'student']
    },
    {
      id: 'schedule-exam',
      label: 'Schedule Exam',
      icon: Calendar,
      roles: ['admin', 'staff']
    },
    {
      id: 'certification',
      label: 'Certificates & TC',
      icon: Award,
      roles: ['admin', 'staff', 'student']
    },
    {
      id: 'live-lecture',
      label: 'Online Streaming Video',
      icon: Video,
      roles: ['admin', 'staff', 'student'],
      badge: liveLecturesCount > 0 ? 'LIVE' : undefined,
      badgeColor: 'bg-red-500 text-white animate-pulse'
    },
    {
      id: 'homework',
      label: 'Homework & Tasks',
      icon: BookOpen,
      roles: ['admin', 'staff', 'student'],
      badge: pendingHomeworkCount > 0 ? pendingHomeworkCount : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
    },
    {
      id: 'campus-services',
      label: 'Transport, Library & Leaves',
      icon: Bus,
      roles: ['admin', 'staff', 'accountant', 'student']
    },
    {
      id: 'notice-board',
      label: 'Notice Board',
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
        {/* Quick Student Registration Button for Admin and Accountant */}
        {(currentRole === 'admin' || currentRole === 'accountant') && onOpenRegisterStudent && (
          <button
            onClick={onOpenRegisterStudent}
            className="w-full mb-3 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register New Student</span>
          </button>
        )}

        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 py-2">
          {currentRole.toUpperCase()} Navigation
        </div>
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
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
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
            <span>Security Layer</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Isolated Role RBAC
            </span>
          </div>
          <div className="text-xs font-mono text-slate-300 truncate">
            Oakridge Campus Cloud
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            REA Reverse-Engineered Architecture
          </div>
        </div>
      </div>
    </aside>
  );
};
