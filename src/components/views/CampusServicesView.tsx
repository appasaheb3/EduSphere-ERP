import React, { useState } from 'react';
import {
  Bus,
  BookOpen,
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Filter,
  Check,
  MapPin,
  FileCheck,
  ShieldAlert,
  X
} from 'lucide-react';
import { LibraryBook, TransportRoute, LeaveApplication, UserRole } from '../../types/erp';
import { GRADE_10_TIMETABLE } from '../../data/mockData';

interface CampusServicesViewProps {
  currentRole: UserRole;
  books: LibraryBook[];
  transportRoutes: TransportRoute[];
  leaveApplications: LeaveApplication[];
  onUpdateLeaveStatus: (leaveId: string, status: 'Approved' | 'Rejected') => void;
  onApplyLeave: (leave: LeaveApplication) => void;
  onIssueBook: (bookId: string) => void;
  onReturnBook: (bookId: string) => void;
}

export const CampusServicesView: React.FC<CampusServicesViewProps> = ({
  currentRole,
  books,
  transportRoutes,
  leaveApplications,
  onUpdateLeaveStatus,
  onApplyLeave,
  onIssueBook,
  onReturnBook
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'transport' | 'library' | 'leaves' | 'timetable'>('transport');
  const [searchBook, setSearchBook] = useState('');
  const [isApplyingLeave, setIsApplyingLeave] = useState(false);

  // Leave form state
  const [leaveType, setLeaveType] = useState<LeaveApplication['leaveType']>('Medical');
  const [startDate, setStartDate] = useState('2026-10-24');
  const [endDate, setEndDate] = useState('2026-10-25');
  const [leaveReason, setLeaveReason] = useState('');

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchBook.toLowerCase()) ||
      b.author.toLowerCase().includes(searchBook.toLowerCase()) ||
      b.isbn.includes(searchBook)
  );

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;

    const newLeave: LeaveApplication = {
      id: `lv-${Date.now()}`,
      applicantName: currentRole === 'student' ? 'Aarav Sharma' : 'Faculty Member',
      applicantRole: currentRole === 'student' ? 'Student' : 'Staff',
      applicantId: 'usr-current',
      leaveType,
      startDate,
      endDate,
      daysCount: 2,
      reason: leaveReason,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };

    onApplyLeave(newLeave);
    setIsApplyingLeave(false);
    setLeaveReason('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bus className="w-5 h-5 text-indigo-400" />
            Campus Logistics & Essential ERP Services
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            School bus fleet monitoring, digital library circulation, student leave applications, and class bell schedules.
          </p>
        </div>

        {/* Subtab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs flex-wrap">
          <button
            onClick={() => setActiveSubTab('transport')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'transport' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            Bus Fleet ({transportRoutes.length})
          </button>
          <button
            onClick={() => setActiveSubTab('library')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'library' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Library Circulation
          </button>
          <button
            onClick={() => setActiveSubTab('leaves')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'leaves' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            Leave Approvals ({leaveApplications.filter((l) => l.status === 'Pending').length})
          </button>
          <button
            onClick={() => setActiveSubTab('timetable')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeSubTab === 'timetable' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Bell Schedule
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Transport & School Bus Tracking */}
      {activeSubTab === 'transport' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {transportRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-indigo-400 font-bold">{route.busNo}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {route.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{route.routeName}</h3>

                  <div className="mt-3 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Driver in Charge:</span>
                      <span className="font-semibold text-white">{route.driverName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Driver Phone:</span>
                      <span className="font-mono text-indigo-300">{route.driverPhone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Occupancy:</span>
                      <span className="font-mono text-slate-200">
                        {route.currentStudents} / {route.capacity} Students
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1.5 text-[11px]">
                  <span className="text-slate-500 block font-medium">Designated Stops & Schedule:</span>
                  <div className="space-y-1">
                    {route.stops.map((stop, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: Library Circulation */}
      {activeSubTab === 'library' && (
        <div className="space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search title, author, or ISBN..."
                value={searchBook}
                onChange={(e) => setSearchBook(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <span className="text-xs text-slate-400">Total Volumes: {books.length} Cataloged</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {book.category}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">ISBN: {book.isbn}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{book.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Authors: {book.author}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{book.shelfLocation}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Availability</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {book.availableCopies} of {book.totalCopies} Copies
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {book.availableCopies > 0 && (
                      <button
                        onClick={() => onIssueBook(book.id)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors"
                      >
                        Issue Copy
                      </button>
                    )}
                    {book.availableCopies < book.totalCopies && (
                      <button
                        onClick={() => onReturnBook(book.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors"
                      >
                        Return Copy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: Leave Applications & Approvals */}
      {activeSubTab === 'leaves' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Student & Faculty Leave Applications</h3>
            <button
              onClick={() => setIsApplyingLeave(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              Apply for Leave
            </button>
          </div>

          <div className="space-y-3">
            {leaveApplications.map((leave) => (
              <div
                key={leave.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-white">{leave.applicantName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                      {leave.applicantRole}
                    </span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-indigo-400 font-medium">{leave.leaveType} Leave</span>
                    <span className="text-slate-500 font-mono text-[11px]">Applied {leave.appliedOn}</span>
                  </div>
                  <p className="text-xs text-slate-300">{leave.reason}</p>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Duration: {leave.startDate} to {leave.endDate} ({leave.daysCount} Days)
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      leave.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : leave.status === 'Rejected'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {leave.status}
                  </span>

                  {(currentRole === 'admin' || currentRole === 'staff') && leave.status === 'Pending' && (
                    <div className="flex items-center gap-1.5 ml-2">
                      <button
                        onClick={() => onUpdateLeaveStatus(leave.id, 'Approved')}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => onUpdateLeaveStatus(leave.id, 'Rejected')}
                        className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: Class Bell Schedule & Timetable */}
      {activeSubTab === 'timetable' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Bell Schedule & Period Allocation</h3>
              <p className="text-xs text-slate-400">Class: Grade 10 A &bull; Academic Year 2026-27</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              6 Periods / Day
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {GRADE_10_TIMETABLE.Monday.map((p) => (
              <div
                key={p.periodNo}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-mono font-bold text-[10px] flex items-center justify-center">
                      {p.periodNo}
                    </span>
                    <span className="font-mono text-slate-400 text-xs">{p.timeSlot}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{p.subject}</h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">{p.teacher}</div>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {p.room}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      {isApplyingLeave && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleLeaveSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-400" />
                Submit Formal Leave Application
              </h3>
              <button
                type="button"
                onClick={() => setIsApplyingLeave(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Medical">Medical / Doctor Appointment</option>
                  <option value="Academic Event">Academic Olympiad / Competition</option>
                  <option value="Personal">Personal / Family Emergency</option>
                  <option value="Vacation">Approved Family Travel</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Statement of Reason</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain reason for absence..."
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsApplyingLeave(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Submit to Dean
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
