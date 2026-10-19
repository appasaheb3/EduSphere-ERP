import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Users,
  Search,
  Filter,
  Save,
  Check,
  Award
} from 'lucide-react';
import { Student, StaffMember, UserRole, AuthUser } from '../../types/erp';

interface AttendanceViewProps {
  currentRole: UserRole;
  currentUser: AuthUser | null;
  students: Student[];
  staff: StaffMember[];
  onSaveAttendance?: (records: any) => void;
}

type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  currentRole,
  currentUser,
  students,
  staff
}) => {
  const isStudent = currentRole === 'student';
  const myStudentId = currentUser?.studentId || 'std-1';
  const myStudent = students.find((s) => s.id === myStudentId) || students[0];

  const [activeSubTab, setActiveSubTab] = useState<'students' | 'staff'>('students');
  const [selectedGrade, setSelectedGrade] = useState<string>('Grade 10');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Map of studentId -> status
  const [studentAttendance, setStudentAttendance] = useState<Record<string, AttendanceStatus>>({
    'std-1': 'Present',
    'std-2': 'Present',
    'std-3': 'Late',
    'std-4': 'Present',
    'std-5': 'Absent',
    'std-6': 'Present'
  });

  const [staffAttendance, setStaffAttendance] = useState<Record<string, AttendanceStatus>>({
    'stf-1': 'Present',
    'stf-2': 'Present',
    'stf-3': 'Present',
    'stf-4': 'Present',
    'stf-5': 'Present'
  });

  const handleSetStudentStatus = (id: string, status: AttendanceStatus) => {
    setStudentAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const handleSetStaffStatus = (id: string, status: AttendanceStatus) => {
    setStaffAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const handleMarkAllPresent = () => {
    if (activeSubTab === 'students') {
      const updated: Record<string, AttendanceStatus> = {};
      students.forEach((s) => {
        updated[s.id] = 'Present';
      });
      setStudentAttendance(updated);
    } else {
      const updated: Record<string, AttendanceStatus> = {};
      staff.forEach((st) => {
        updated[st.id] = 'Present';
      });
      setStaffAttendance(updated);
    }
  };

  const handleSaveRollCall = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  // If student, only visible student is themselves
  const displayedStudents = isStudent
    ? [myStudent]
    : students.filter((s) => selectedGrade === 'All' || s.grade === selectedGrade);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-indigo-400" />
            {isStudent ? 'My Attendance Registry & Monthly Record' : 'Daily Attendance & Roll Call Registry'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isStudent
              ? 'Your authenticated attendance log, roll-call verification, and semester attendance percentage.'
              : 'Conduct live daily roll call for students and staff with biometric/manual synchronization.'}
          </p>
        </div>

        {/* Tab switch between Student and Staff roll calls (Hidden for student role) */}
        {!isStudent && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveSubTab('students')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'students'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Student Roll Call
            </button>
            <button
              onClick={() => setActiveSubTab('staff')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeSubTab === 'staff'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Staff & Faculty
            </button>
          </div>
        )}
      </div>

      {/* Control Bar & Stats */}
      {isStudent ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Semester Attendance</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">{myStudent.attendancePct}%</span>
            </div>
            <Award className="w-8 h-8 text-emerald-500/30" />
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Today's Roll Call Status</span>
              <span className="text-xl font-bold text-emerald-400">Present in Class</span>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-500/30" />
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Enrolled Class</span>
              <span className="text-xl font-bold text-white">{myStudent.grade} (Sec {myStudent.section})</span>
            </div>
            <Users className="w-8 h-8 text-indigo-500/30" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Total Cohort</span>
              <span className="text-xl font-bold text-white font-mono">{displayedStudents.length}</span>
            </div>
            <Users className="w-6 h-6 text-slate-500" />
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Present</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">
                {Object.values(studentAttendance).filter((s) => s === 'Present').length}
              </span>
            </div>
            <CheckCircle2 className="w-6 h-6 text-emerald-500/40" />
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Absent</span>
              <span className="text-xl font-bold text-rose-400 font-mono">
                {Object.values(studentAttendance).filter((s) => s === 'Absent').length}
              </span>
            </div>
            <XCircle className="w-6 h-6 text-rose-500/40" />
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Late / Tardy</span>
              <span className="text-xl font-bold text-amber-400 font-mono">
                {Object.values(studentAttendance).filter((s) => s === 'Late').length}
              </span>
            </div>
            <Clock className="w-6 h-6 text-amber-500/40" />
          </div>
        </div>
      )}

      {/* Filter and Date selector (Admin/Staff only) */}
      {!isStudent && (
        <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            {activeSubTab === 'students' && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Class:</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="All">All Grades</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPresent}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              Mark All Present
            </button>
            <button
              onClick={handleSaveRollCall}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
            >
              {isSavedNotice ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {isSavedNotice ? 'Saved!' : 'Save Register'}
            </button>
          </div>
        </div>
      )}

      {/* Attendance Register Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">ID / Roll</th>
                <th className="py-3 px-4 font-semibold">Name & Details</th>
                <th className="py-3 px-4 font-semibold">Monthly Avg</th>
                <th className="py-3 px-4 font-semibold">Status Marking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {displayedStudents.map((student) => {
                const status = studentAttendance[student.id] || 'Present';
                return (
                  <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-300">
                      #{student.rollNo} &bull; {student.admissionNo}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-semibold text-white">{student.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {student.grade} - Section {student.section}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${student.attendancePct}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-slate-300 font-semibold text-[11px]">
                          {student.attendancePct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {isStudent ? (
                        <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-xs border border-emerald-500/20 inline-flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Marked Present Today
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          {(['Present', 'Absent', 'Late', 'Excused'] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSetStudentStatus(student.id, s)}
                              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                                status === s
                                  ? s === 'Present'
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : s === 'Absent'
                                    ? 'bg-rose-600 text-white shadow-sm'
                                    : s === 'Late'
                                    ? 'bg-amber-600 text-white shadow-sm'
                                    : 'bg-blue-600 text-white shadow-sm'
                                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
