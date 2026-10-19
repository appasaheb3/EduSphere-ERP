import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Award,
  CheckCircle2,
  Clock,
  IdCard,
  UserPlus,
  X,
  Layers
} from 'lucide-react';
import { Student, UserRole } from '../../types/erp';

interface StudentDirectoryViewProps {
  currentRole: UserRole;
  students: Student[];
  onOpenRegisterModal?: () => void;
}

export const StudentDirectoryView: React.FC<StudentDirectoryViewProps> = ({
  currentRole,
  students,
  onOpenRegisterModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(students[0] || null);
  const [showIdBadge, setShowIdBadge] = useState(false);

  const filteredStudents = students.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === 'All' || s.grade === gradeFilter;
    return matchesQuery && matchesGrade;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            {currentRole === 'student' ? 'My Academic Dossier' : 'Student Registry & Cohort Records'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete scholastic dossiers including GPA metrics, guardian contacts, fee installment balances, and digital ID cards.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {(currentRole === 'admin' || currentRole === 'accountant') && onOpenRegisterModal && (
            <button
              onClick={onOpenRegisterModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Register New Student
            </button>
          )}

          {selectedStudent && (
            <button
              onClick={() => setShowIdBadge(true)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all"
            >
              <IdCard className="w-4 h-4 text-indigo-400" />
              Generate Student ID Badge
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student by name, admission #, or guardian..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
          <span className="text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Grade:
          </span>
          {['All', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                gradeFilter === g
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Student List and Selected Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Cards List */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredStudents.map((student) => {
            const isSelected = selectedStudent?.id === student.id;
            return (
              <div
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono text-slate-400 text-[11px]">{student.admissionNo}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        student.feeStatus === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : student.feeStatus === 'Partial'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      Fee: {student.feeStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{student.name}</h4>
                      <p className="text-xs text-slate-400">
                        {student.grade} &bull; Section {student.section} &bull; Roll #{student.rollNo}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{student.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Overall GPA</span>
                    <span className="font-mono font-bold text-indigo-400">{student.overallGpa} / 4.0</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px]">Fee Balance</span>
                    <span className="font-mono font-semibold text-amber-400">${student.balanceAmount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Student Detail Dossier */}
        {selectedStudent && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="text-center pb-4 border-b border-slate-800">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-indigo-500 shadow-xl"
              />
              <h3 className="text-base font-bold text-white mt-2.5">{selectedStudent.name}</h3>
              <p className="text-xs text-slate-400">
                {selectedStudent.grade} - Section {selectedStudent.section} &bull; Roll #{selectedStudent.rollNo}
              </p>
              <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full bg-slate-950 text-indigo-300 font-mono text-[11px] border border-slate-800">
                {selectedStudent.admissionNo}
              </div>
            </div>

            {/* Academic & Financial Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Cumulative GPA</span>
                <span className="text-sm font-bold text-indigo-400 font-mono">{selectedStudent.overallGpa}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Attendance Rate</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{selectedStudent.attendancePct}%</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Fee Clearance</span>
                <span className="text-sm font-bold text-white">{selectedStudent.feeStatus}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Balance Due</span>
                <span className="text-sm font-bold text-amber-400 font-mono">${selectedStudent.balanceAmount}</span>
              </div>
            </div>

            {/* Installments Mini Summary */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-semibold text-white text-xs flex items-center justify-between">
                <span>Tuition Installments</span>
                <span className="text-slate-500 font-mono text-[10px]">
                  {selectedStudent.installments.filter((i) => i.status === 'Paid').length} of {selectedStudent.installments.length} Paid
                </span>
              </h4>
              <div className="space-y-1">
                {selectedStudent.installments.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]"
                  >
                    <span className="text-slate-300 font-medium">{inst.title}</span>
                    <span
                      className={`font-mono font-bold ${
                        inst.status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      ${inst.amount} ({inst.status})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guardian & Contact Info */}
            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <h4 className="font-semibold text-white text-xs">Parent & Guardian Information</h4>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Guardian: <strong>{selectedStudent.parentName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono">{selectedStudent.parentContact}</span>
              </div>
              {selectedStudent.busRoute && (
                <div className="flex items-center gap-2 text-indigo-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Transport: {selectedStudent.busRoute}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowIdBadge(true)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20"
            >
              <IdCard className="w-4 h-4" />
              View Official Campus ID Card
            </button>
          </div>
        )}
      </div>

      {/* ID Badge Modal */}
      {showIdBadge && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-indigo-500/40 text-center">
            <button
              onClick={() => setShowIdBadge(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold mb-1">
              Oakridge International Academy
            </div>
            <div className="text-xs font-semibold text-slate-300 mb-4">Official Student Identification</div>

            <img
              src={selectedStudent.avatar}
              alt={selectedStudent.name}
              className="w-24 h-24 rounded-2xl object-cover mx-auto border-4 border-indigo-400 shadow-xl"
            />

            <h3 className="text-lg font-bold text-white mt-3">{selectedStudent.name}</h3>
            <p className="text-xs text-indigo-300 font-mono mt-0.5">{selectedStudent.admissionNo}</p>

            <div className="mt-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs grid grid-cols-2 gap-2 text-left">
              <div>
                <span className="text-[10px] text-slate-500 block">Class / Cohort</span>
                <span className="font-semibold text-slate-200">{selectedStudent.grade}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Roll Number</span>
                <span className="font-semibold text-slate-200">#{selectedStudent.rollNo}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Valid Academic Term</span>
                <span className="font-semibold text-slate-200">2026 - 2027</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Emergency Phone</span>
                <span className="font-semibold text-slate-200 font-mono text-[10px] truncate">
                  {selectedStudent.parentContact}
                </span>
              </div>
            </div>

            {/* Barcode Simulation */}
            <div className="mt-5 p-2 bg-white rounded-lg inline-block w-full">
              <div className="h-8 bg-slate-950 flex items-center justify-around px-2">
                {Array.from({ length: 30 }).map((_, i) => (
                  <span
                    key={i}
                    className="bg-white inline-block h-full"
                    style={{ width: `${(i % 3) + 1}px`, margin: '0 1px' }}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
