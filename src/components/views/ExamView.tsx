import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  Award,
  Search,
  CheckCircle2,
  Printer,
  ChevronRight,
  TrendingUp,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { Exam, ExamScheduleItem, Student, UserRole } from '../../types/erp';

interface ExamViewProps {
  currentRole: UserRole;
  exams: Exam[];
  scheduleItems: ExamScheduleItem[];
  students: Student[];
}

interface StudentGradeRecord {
  studentId: string;
  studentName: string;
  rollNo: number;
  marks: Record<string, number>; // subject -> marks
}

export const ExamView: React.FC<ExamViewProps> = ({
  currentRole,
  exams,
  scheduleItems,
  students
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [reportCardStudent, setReportCardStudent] = useState<Student | null>(null);

  // Initial grade records state
  const [gradeRecords, setGradeRecords] = useState<Record<string, StudentGradeRecord>>({
    'std-1': {
      studentId: 'std-1',
      studentName: 'Aarav Sharma',
      rollNo: 1,
      marks: {
        'Mathematics & Trigonometry': 92,
        'Physics: Mechanics & Wave Optics': 88,
        'Computer Science: Algorithms & Python': 96,
        'English Literature & Composition': 85
      }
    },
    'std-2': {
      studentId: 'std-2',
      studentName: 'Sophia Chen',
      rollNo: 2,
      marks: {
        'Mathematics & Trigonometry': 99,
        'Physics: Mechanics & Wave Optics': 95,
        'Computer Science: Algorithms & Python': 98,
        'English Literature & Composition': 94
      }
    },
    'std-3': {
      studentId: 'std-3',
      studentName: 'Liam Vance',
      rollNo: 5,
      marks: {
        'Mathematics & Trigonometry': 74,
        'Physics: Mechanics & Wave Optics': 68,
        'Computer Science: Algorithms & Python': 82,
        'English Literature & Composition': 70
      }
    }
  });

  const selectedExam = exams.find((e) => e.id === selectedExamId);
  const examSubjects = scheduleItems.filter((item) => item.examId === selectedExamId);

  const handleUpdateMark = (studentId: string, subject: string, mark: number) => {
    setGradeRecords((prev) => {
      const existing = prev[studentId] || {
        studentId,
        studentName: students.find((s) => s.id === studentId)?.name || 'Student',
        rollNo: students.find((s) => s.id === studentId)?.rollNo || 0,
        marks: {}
      };
      return {
        ...prev,
        [studentId]: {
          ...existing,
          marks: {
            ...existing.marks,
            [subject]: Math.min(100, Math.max(0, mark))
          }
        }
      };
    });
  };

  const getLetterGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-emerald-400' };
    if (score >= 80) return { grade: 'A', color: 'text-teal-400' };
    if (score >= 70) return { grade: 'B+', color: 'text-cyan-400' };
    if (score >= 60) return { grade: 'B', color: 'text-blue-400' };
    if (score >= 50) return { grade: 'C', color: 'text-amber-400' };
    if (score >= 40) return { grade: 'D', color: 'text-orange-400' };
    return { grade: 'F', color: 'text-rose-500' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-indigo-400" />
            Examinations & Marks Registry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Record subject evaluations, compute GPAs, and print certified academic report cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Exam Term:</span>
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name} ({exam.grade})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Exam Overview Card */}
      {selectedExam && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{selectedExam.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {selectedExam.status}
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-3">
              <span>Grade: <strong className="text-slate-200">{selectedExam.grade}</strong></span>
              <span>&bull;</span>
              <span>Academic Year: <strong className="text-slate-200">{selectedExam.academicYear}</strong></span>
              <span>&bull;</span>
              <span>Dates: <strong className="text-slate-200">{selectedExam.startDate} to {selectedExam.endDate}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-400 block font-medium">Papers</span>
              <span className="text-lg font-bold text-indigo-400 font-mono">{examSubjects.length} Subjects</span>
            </div>
          </div>
        </div>
      )}

      {/* Grade Ledger Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Student Marks Ledger</h3>
          </div>
          <span className="text-xs text-slate-400">
            {currentRole === 'student' ? 'Read-only view' : 'Click in marks cell to edit inline'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Roll #</th>
                <th className="py-3 px-4 font-semibold">Student Name</th>
                {examSubjects.map((sub) => (
                  <th key={sub.id} className="py-3 px-4 font-semibold text-center">
                    <div>{sub.subject.split(':')[0]}</div>
                    <div className="text-[10px] text-slate-500 font-mono">Max: {sub.maxMarks}</div>
                  </th>
                ))}
                <th className="py-3 px-4 font-semibold text-center">Total / Avg</th>
                <th className="py-3 px-4 font-semibold text-center">Final Grade</th>
                <th className="py-3 px-4 font-semibold text-right">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {students
                .filter((s) => s.grade === selectedExam?.grade || !selectedExam)
                .map((student) => {
                  const record = gradeRecords[student.id];
                  const studentMarks = record?.marks || {};

                  let totalScore = 0;
                  let scoredCount = 0;

                  examSubjects.forEach((sub) => {
                    if (studentMarks[sub.subject] !== undefined) {
                      totalScore += studentMarks[sub.subject];
                      scoredCount += 1;
                    }
                  });

                  const avgScore = scoredCount > 0 ? Math.round(totalScore / scoredCount) : 0;
                  const gradeInfo = getLetterGrade(avgScore);

                  return (
                    <tr key={student.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-300">#{student.rollNo}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{student.name}</div>
                        <div className="text-[11px] text-slate-400">{student.admissionNo}</div>
                      </td>

                      {examSubjects.map((sub) => {
                        const currentMark = studentMarks[sub.subject] ?? 0;
                        return (
                          <td key={sub.id} className="py-3 px-4 text-center">
                            {currentRole === 'student' ? (
                              <span className="font-mono text-slate-200 font-semibold">{currentMark}</span>
                            ) : (
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={currentMark}
                                onChange={(e) =>
                                  handleUpdateMark(student.id, sub.subject, Number(e.target.value))
                                }
                                className="w-16 bg-slate-950 border border-slate-800 text-center font-mono py-1 rounded text-white focus:outline-none focus:border-indigo-500 focus:bg-slate-900"
                              />
                            )}
                          </td>
                        );
                      })}

                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-200">
                        {avgScore}%
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold">
                        <span className={`px-2 py-0.5 rounded bg-slate-950 border border-slate-800 ${gradeInfo.color}`}>
                          {gradeInfo.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setReportCardStudent(student)}
                          className="px-2.5 py-1 rounded bg-indigo-600/80 hover:bg-indigo-600 text-white font-medium text-[11px] inline-flex items-center gap-1 transition-colors"
                        >
                          <Award className="w-3 h-3" />
                          View Card
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Student Report Card Modal */}
      {reportCardStudent && selectedExam && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setReportCardStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* School Crest & Header */}
            <div className="text-center border-b-2 border-indigo-900 pb-3">
              <h3 className="text-xl font-black uppercase tracking-wider text-indigo-950">
                Oakridge International Academy
              </h3>
              <p className="text-xs text-slate-600 font-medium">Board of Secondary & Higher Secondary Education</p>
              <div className="mt-2 inline-block px-4 py-1 rounded bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold uppercase tracking-wider">
                Official Term Examination Report Card
              </div>
            </div>

            {/* Student Metadata */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px]">Student Name</span>
                <span className="font-bold text-sm text-slate-900">{reportCardStudent.name}</span>
                <span className="text-slate-600 text-[11px] block">
                  Admission No: {reportCardStudent.admissionNo} &bull; Roll: #{reportCardStudent.rollNo}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Grade & Section</span>
                <span className="font-bold text-slate-900">{reportCardStudent.grade} - Section {reportCardStudent.section}</span>
                <span className="text-slate-600 text-[11px] block">Attendance: {reportCardStudent.attendancePct}%</span>
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Subject</th>
                    <th className="p-2 text-center">Max Marks</th>
                    <th className="p-2 text-center">Pass Marks</th>
                    <th className="p-2 text-center">Marks Scored</th>
                    <th className="p-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {examSubjects.map((sub) => {
                    const mark = gradeRecords[reportCardStudent.id]?.marks[sub.subject] ?? 85;
                    const grade = getLetterGrade(mark);
                    return (
                      <tr key={sub.id}>
                        <td className="p-2 font-medium">{sub.subject}</td>
                        <td className="p-2 text-center font-mono">100</td>
                        <td className="p-2 text-center font-mono">40</td>
                        <td className="p-2 text-center font-mono font-bold text-indigo-950">{mark}</td>
                        <td className="p-2 text-center font-mono font-bold">{grade.grade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Remarks & Signatures */}
            <div className="mt-4 text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded border border-amber-200">
              <strong className="text-slate-800">Faculty Remarks:</strong> Demonstrates exceptional analytical acumen and consistency. Commended for diligent participation in STEM competitions.
            </div>

            <div className="mt-6 flex items-end justify-between pt-4 border-t border-slate-200 text-xs">
              <div className="text-center">
                <div className="border-b border-slate-400 w-28 mb-1"></div>
                <span className="text-[10px] text-slate-500">Class Teacher</span>
              </div>
              <div className="text-center">
                <div className="border-b border-slate-400 w-28 mb-1"></div>
                <span className="text-[10px] text-slate-500">Controller of Exams</span>
              </div>
              <div className="text-center">
                <div className="border-b border-slate-400 w-28 mb-1"></div>
                <span className="text-[10px] text-slate-500">Principal's Seal</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Verified Marksheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
