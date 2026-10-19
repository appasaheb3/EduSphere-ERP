import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Plus,
  MapPin,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Printer,
  Trash2,
  X
} from 'lucide-react';
import { Exam, ExamScheduleItem, StaffMember, UserRole } from '../../types/erp';

interface ExamSchedulerViewProps {
  currentRole: UserRole;
  exams: Exam[];
  scheduleItems: ExamScheduleItem[];
  staff: StaffMember[];
  onAddScheduleItem: (item: ExamScheduleItem) => void;
  onDeleteScheduleItem: (itemId: string) => void;
}

export const ExamSchedulerView: React.FC<ExamSchedulerViewProps> = ({
  currentRole,
  exams,
  scheduleItems,
  staff,
  onAddScheduleItem,
  onDeleteScheduleItem
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [isAddingSlot, setIsAddingSlot] = useState(false);

  // Form State
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('2026-10-29');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('12:00 PM');
  const [roomNo, setRoomNo] = useState('Hall A - West Wing');
  const [invigilatorId, setInvigilatorId] = useState(staff[0]?.id || '');
  const [maxMarks, setMaxMarks] = useState(100);

  const selectedExam = exams.find((e) => e.id === selectedExamId);
  const currentSlots = scheduleItems.filter((item) => item.examId === selectedExamId);

  // Real-time Clash Detection:
  const detectClash = (testDate: string, testRoom: string, testInvigilatorId: string) => {
    return currentSlots.find(
      (slot) =>
        slot.date === testDate &&
        (slot.roomNo === testRoom || slot.invigilatorId === testInvigilatorId)
    );
  };

  const currentConflict = detectClash(date, roomNo, invigilatorId);

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const assignedStaff = staff.find((s) => s.id === invigilatorId);

    const newItem: ExamScheduleItem = {
      id: `sch-${Date.now()}`,
      examId: selectedExamId,
      subject,
      date,
      startTime,
      endTime,
      roomNo,
      maxMarks,
      passingMarks: Math.round(maxMarks * 0.4),
      invigilatorId,
      invigilatorName: assignedStaff?.name || 'Assigned Invigilator'
    };

    onAddScheduleItem(newItem);
    setSubject('');
    setIsAddingSlot(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            Exam Schedule & Hall Allocation
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build conflict-free examination date sheets, allocate testing halls, and assign faculty invigilators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none"
          >
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name} ({exam.grade})
              </option>
            ))}
          </select>

          {currentRole !== 'student' && (
            <button
              onClick={() => setIsAddingSlot(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              Schedule Paper
            </button>
          )}
        </div>
      </div>

      {/* Date Sheet Timetable Cards */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">
              Official Timetable &bull; {selectedExam?.name}
            </h3>
            <p className="text-xs text-slate-400">Total Papers Scheduled: {currentSlots.length}</p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-400" />
            Print Date Sheet
          </button>
        </div>

        {currentSlots.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No exam slots scheduled yet for this term. Click "Schedule Paper" above to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSlots.map((slot) => (
              <div
                key={slot.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-indigo-400 font-semibold">{slot.date}</span>
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">{slot.subject}</h4>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-slate-300">{slot.roomNo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Invigilator: <strong className="text-slate-200">{slot.invigilatorName}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500">Max Marks: {slot.maxMarks}</span>
                  {currentRole !== 'student' && (
                    <button
                      onClick={() => onDeleteScheduleItem(slot.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove Slot"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Schedule Paper Modal */}
      {isAddingSlot && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSlot}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Schedule Examination Slot
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingSlot(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clash Detection Banner */}
            {currentConflict && (
              <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Potential Room or Faculty Clash:</strong> Another paper (
                  <em>{currentConflict.subject}</em>) is already scheduled in {currentConflict.roomNo} or with the same supervisor on {currentConflict.date}.
                </div>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Subject & Paper Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chemistry: Organic Reaction Mechanisms"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Exam Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Examination Room / Hall</label>
                  <select
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Hall A - West Wing">Hall A - West Wing (120 Seats)</option>
                    <option value="Hall B - Science Block">Hall B - Science Block (80 Seats)</option>
                    <option value="Computer Lab 1">Computer Lab 1 (45 Terminals)</option>
                    <option value="Computer Lab 3">Computer Lab 3 (50 Terminals)</option>
                    <option value="Library Auditorium">Library Auditorium (200 Seats)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Start Time</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="09:00 AM"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">End Time</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="12:00 PM"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Assigned Invigilator</label>
                  <select
                    value={invigilatorId}
                    onChange={(e) => setInvigilatorId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {staff.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.department})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Maximum Marks</label>
                  <input
                    type="number"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddingSlot(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Commit to Schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
