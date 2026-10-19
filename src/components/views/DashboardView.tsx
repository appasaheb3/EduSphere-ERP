import React from 'react';
import {
  Users,
  GraduationCap,
  DollarSign,
  CalendarCheck,
  Video,
  BookOpen,
  Award,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Clock,
  Sparkles,
  FileText,
  UserPlus,
  CreditCard,
  CheckCircle2,
  Bus,
  FileCheck
} from 'lucide-react';
import {
  UserRole,
  Student,
  StaffMember,
  FeeInvoice,
  Exam,
  LectureStream,
  Notice,
  HomeworkAssignment,
  AuthUser
} from '../../types/erp';
import { NavTab } from '../Sidebar';

interface DashboardViewProps {
  currentRole: UserRole;
  currentUser: AuthUser | null;
  students: Student[];
  staff: StaffMember[];
  invoices: FeeInvoice[];
  exams: Exam[];
  lectures: LectureStream[];
  notices: Notice[];
  homework: HomeworkAssignment[];
  onNavigate: (tab: NavTab) => void;
  onOpenRegisterStudent?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentRole,
  currentUser,
  students,
  staff,
  invoices,
  exams,
  lectures,
  notices,
  homework,
  onNavigate,
  onOpenRegisterStudent
}) => {
  const totalStudents = students.length;
  const totalStaff = staff.length;
  const activeLectures = lectures.filter((l) => l.status === 'Live');
  const upcomingExams = exams.filter((e) => e.status === 'Upcoming' || e.status === 'Ongoing');

  const totalFeeExpected = students.reduce((sum, s) => sum + s.totalFeeAmount, 0);
  const totalBalance = students.reduce((sum, s) => sum + s.balanceAmount, 0);
  const totalFeeCollected = totalFeeExpected - totalBalance;
  const collectionPercentage = Math.round((totalFeeCollected / (totalFeeExpected || 1)) * 100);

  const avgAttendance = Math.round(
    students.reduce((sum, s) => sum + s.attendancePct, 0) / (students.length || 1)
  );

  // Student specific data for student role
  const activeStudent = students[0]; // Aarav Sharma
  const nextDueInstallment = activeStudent?.installments.find((i) => i.status !== 'Paid');

  return (
    <div className="space-y-6">
      {/* 1. ROLE-CUSTOMIZED WELCOME BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {currentRole === 'admin'
                ? 'Super Administrator Executive Console'
                : currentRole === 'accountant'
                ? 'Bursar & Financial Accounting Command'
                : currentRole === 'staff'
                ? 'Faculty Academic & Teaching Workstation'
                : 'Student & Parent Academic Cockpit'}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentRole === 'student'
                ? `Welcome back, ${currentUser?.name || activeStudent?.name}!`
                : `Welcome, ${currentUser?.name || 'Administrator'} (${currentUser?.title || currentRole.toUpperCase()})`}
            </h1>

            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {currentRole === 'admin' &&
                'Comprehensive operational overview of student cohorts, faculty scheduling, financial health, and institutional circulars.'}
              {currentRole === 'accountant' &&
                'Manage term tuition fee installments, monitor collection realization, issue receipts, and register new fee payers.'}
              {currentRole === 'staff' &&
                'Your teaching dashboard for taking daily roll-call, managing online video lectures, creating homework assignments, and scheduling exam halls.'}
              {currentRole === 'student' &&
                `Academic Grade: ${activeStudent?.grade} (Sec ${activeStudent?.section}) &bull; Overall GPA: ${activeStudent?.overallGpa}/4.0 &bull; Attendance: ${activeStudent?.attendancePct}%`}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {(currentRole === 'admin' || currentRole === 'accountant') && onOpenRegisterStudent && (
              <button
                onClick={onOpenRegisterStudent}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Register Student
              </button>
            )}

            {activeLectures.length > 0 && (
              <button
                onClick={() => onNavigate('live-lecture')}
                className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-600/20 animate-pulse transition-all"
              >
                <Video className="w-4 h-4" />
                {currentRole === 'student' ? 'Join Live Lecture' : 'Live Stream Active'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. ROLE-SPECIFIC KPI METRICS */}

      {/* ADMIN & ACCOUNTANT VIEW */}
      {(currentRole === 'admin' || currentRole === 'accountant') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('students')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Total Enrolled Cohort</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-mono">{totalStudents}</span>
              <span className="text-xs text-emerald-400 font-medium">Enrolled Students</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Avg Attendance</span>
              <span className="font-mono text-slate-300 font-semibold">{avgAttendance}%</span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('accounting')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Collected Tuition Fees</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                ${(totalFeeCollected / 1000).toFixed(1)}k
              </span>
              <span className="text-xs text-slate-400 font-mono">
                / ${(totalFeeExpected / 1000).toFixed(1)}k
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Collection Realization</span>
              <span className="font-mono text-emerald-400 font-semibold">{collectionPercentage}%</span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('accounting')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Pending Installments</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-400 font-mono">
                ${(totalBalance / 1000).toFixed(1)}k
              </span>
              <span className="text-xs text-amber-300 font-medium">To Be Collected</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Term Installments</span>
              <span className="font-mono text-slate-300 font-semibold">Fall & Spring</span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('staff')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Faculty & Operations</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-mono">{totalStaff}</span>
              <span className="text-xs text-purple-300 font-medium">Faculty Members</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Staff Attendance</span>
              <span className="font-mono text-emerald-400 font-semibold">100% Present</span>
            </div>
          </div>
        </div>
      )}

      {/* STAFF / TEACHER SPECIFIC KPI CARDS */}
      {currentRole === 'staff' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('attendance')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Today's Class Roll Call</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-mono">Grade 10 A</span>
              <span className="text-xs text-emerald-400 font-medium">96.5% Present</span>
            </div>
            <div className="mt-2 text-[11px] text-indigo-400 font-medium">Click to mark attendance &rarr;</div>
          </div>

          <div
            onClick={() => onNavigate('live-lecture')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Live Video Classroom</span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-mono">1 Stream</span>
              <span className="text-xs text-red-400 font-medium font-mono">46 Viewers</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">Faraday's Laws & Induction</div>
          </div>

          <div
            onClick={() => onNavigate('homework')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Pending Homework</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-mono">{homework.length} Tasks</span>
              <span className="text-xs text-amber-400 font-medium">28 Turned In</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">Review problem sets</div>
          </div>

          <div
            onClick={() => onNavigate('schedule-exam')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Supervision Duties</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-mono">2 Slots</span>
              <span className="text-xs text-slate-300 font-medium">Hall A (West Wing)</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">Next: Oct 20 (09:00 AM)</div>
          </div>
        </div>
      )}

      {/* STUDENT / PARENT SPECIFIC KPI CARDS */}
      {currentRole === 'student' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('accounting')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Tuition Fee Status</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                ${activeStudent?.balanceAmount || 0}
              </span>
              <span className="text-xs text-slate-400 font-medium">Due Balance</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">
              {nextDueInstallment
                ? `Next: ${nextDueInstallment.title}`
                : 'All installments cleared!'}
            </div>
          </div>

          <div
            onClick={() => onNavigate('exams')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Cumulative GPA</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-mono">{activeStudent?.overallGpa}</span>
              <span className="text-xs text-indigo-400 font-medium">Rank #1 in Class</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">Mid-Term Marks: 92% average</div>
          </div>

          <div
            onClick={() => onNavigate('attendance')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">My Attendance Rate</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                {activeStudent?.attendancePct}%
              </span>
              <span className="text-xs text-emerald-400 font-medium">Commendable</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500">Zero unexcused absences</div>
          </div>

          <div
            onClick={() => onNavigate('homework')}
            className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-4 cursor-pointer hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Assignments Due</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white font-mono">1 Task</span>
              <span className="text-xs text-amber-400 font-medium">Due in 4 Days</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">Problem Set 4: Physics</div>
          </div>
        </div>
      )}

      {/* 3. MAIN DASHBOARD CONTENT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Dynamic Modules based on Role */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Video Classroom Spotlight */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-bold text-white">Live Virtual Classroom</h3>
              </div>
              <button
                onClick={() => onNavigate('live-lecture')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                Watch Stream <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {lectures.slice(0, 2).map((lecture) => (
              <div
                key={lecture.id}
                onClick={() => onNavigate('live-lecture')}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer mb-3 last:mb-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {lecture.status === 'Live' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        LIVE VIDEO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300">
                        {lecture.status}
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-400">
                      {lecture.grade} &bull; {lecture.subject}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">
                    {lecture.status === 'Live' ? `${lecture.viewerCount} Viewers` : lecture.startTime}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-100 mt-2">{lecture.title}</div>
                <div className="text-xs text-slate-400 mt-1">Instructor: {lecture.teacherName}</div>
              </div>
            ))}
          </div>

          {/* Fee Installment Overview Card */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  {currentRole === 'student' ? 'My Tuition Installment Schedule' : 'Fee Installments & Receivables'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('accounting')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                Open Installment Ledger <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {currentRole === 'student' ? (
              <div className="space-y-2.5">
                {activeStudent?.installments.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{inst.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">Due: {inst.dueDate}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-white">${inst.amount}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          inst.status === 'Paid'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {inst.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2 font-medium">Student</th>
                      <th className="pb-2 font-medium">Class</th>
                      <th className="pb-2 font-medium">Installment Plan</th>
                      <th className="pb-2 font-medium">Balance</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {students.slice(0, 4).map((s) => (
                      <tr key={s.id} className="hover:bg-slate-800/30">
                        <td className="py-2.5 font-medium text-slate-200">{s.name}</td>
                        <td className="py-2.5 text-slate-400">{s.grade}</td>
                        <td className="py-2.5 font-mono text-slate-300">
                          {s.installments.filter((i) => i.status === 'Paid').length} of {s.installments.length} Paid
                        </td>
                        <td className="py-2.5 font-mono text-amber-400 font-bold">${s.balanceAmount}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              s.feeStatus === 'Paid'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-amber-500/10 text-amber-400'
                            }`}
                          >
                            {s.feeStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Notice Board & Campus Services */}
        <div className="space-y-6">
          {/* Urgent Notices Widget */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Notice Board Circulars</h3>
              </div>
              <button
                onClick={() => onNavigate('notice-board')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                All Notices <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span
                      className={`font-semibold ${
                        notice.priority === 'Urgent' ? 'text-rose-400' : 'text-slate-400'
                      }`}
                    >
                      {notice.priority} Notice
                    </span>
                    <span className="text-slate-500 font-mono">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{notice.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts to ERP Services */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-3">Campus ERP Logistics</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('campus-services')}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors flex items-center gap-2"
              >
                <Bus className="w-4 h-4 text-indigo-400" />
                <span>Bus Fleet GPS</span>
              </button>
              <button
                onClick={() => onNavigate('campus-services')}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Library Catalog</span>
              </button>
              <button
                onClick={() => onNavigate('certification')}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Issue Certificates</span>
              </button>
              <button
                onClick={() => onNavigate('schedule-exam')}
                className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left transition-colors flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Hall Allocation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
