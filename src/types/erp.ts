export type UserRole = 'admin' | 'staff' | 'accountant' | 'student';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  studentId?: string;
  staffId?: string;
}

export interface FeeInstallment {
  id: string;
  installmentNo: number;
  totalInstallments: number;
  title: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Partial' | 'Due' | 'Upcoming';
  receiptNo?: string;
  paymentMethod?: 'Card' | 'Bank Transfer' | 'Cash' | 'Cheque';
}

export interface Student {
  id: string;
  admissionNo: string;
  name: string;
  email: string;
  avatar: string;
  grade: string;
  section: string;
  rollNo: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  parentName: string;
  parentContact: string;
  parentEmail?: string;
  address: string;
  attendancePct: number;
  feeStatus: 'Paid' | 'Partial' | 'Overdue';
  balanceAmount: number;
  totalFeeAmount: number;
  installments: FeeInstallment[];
  overallGpa: number;
  busRoute?: string;
}

export interface StaffMember {
  id: string;
  staffId: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Teacher' | 'HOD' | 'Admin' | 'Accountant' | 'Lab Assistant';
  department: string;
  subjects: string[];
  assignedClasses: string[];
  contact: string;
  joiningDate: string;
  salary: number;
  attendancePct: number;
  status: 'Active' | 'On Leave';
}

export interface AttendanceRecord {
  id: string;
  date: string;
  targetId: string;
  targetType: 'student' | 'staff';
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  markedBy: string;
  remarks?: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  grade: string;
  category: 'Tuition' | 'Laboratory' | 'Transport' | 'Examination' | 'Sports' | 'Library';
  amount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Partial' | 'Overdue';
  paymentMethod?: 'Card' | 'Bank Transfer' | 'Cash' | 'Cheque';
  installmentPlan?: {
    currentInstallment: number;
    totalInstallments: number;
    installmentAmount: number;
  };
}

export interface Exam {
  id: string;
  name: string;
  term: string;
  academicYear: string;
  grade: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Graded';
  startDate: string;
  endDate: string;
}

export interface ExamScheduleItem {
  id: string;
  examId: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  roomNo: string;
  maxMarks: number;
  passingMarks: number;
  invigilatorId: string;
  invigilatorName: string;
}

export interface Certificate {
  id: string;
  certNumber: string;
  studentId: string;
  studentName: string;
  type: 'Transfer Certificate' | 'Bonafide' | 'Merit Certificate' | 'Character Certificate' | 'Sports Achievement';
  issueDate: string;
  academicYear: string;
  signatory: string;
  remarks: string;
  verificationCode: string;
}

export interface LectureStream {
  id: string;
  title: string;
  subject: string;
  grade: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar: string;
  startTime: string;
  status: 'Live' | 'Scheduled' | 'Ended';
  viewerCount: number;
  videoUrl: string;
  posterImage: string;
  duration: string;
  meetingTopic: string;
  whiteboardNotes: string[];
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  subject: string;
  grade: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  description: string;
  maxPoints: number;
  submissionsCount: number;
  totalStudents: number;
  attachments?: string[];
}

export interface Notice {
  id: string;
  title: string;
  category: 'Academic' | 'Administrative' | 'Examination' | 'Sports & Cultural' | 'Holiday';
  date: string;
  author: string;
  targetAudience: 'All' | 'Students' | 'Staff' | 'Parents';
  priority: 'Urgent' | 'High' | 'Normal';
  content: string;
}

// Leading ERP additions
export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  availableCopies: number;
  totalCopies: number;
  shelfLocation: string;
}

export interface TransportRoute {
  id: string;
  routeName: string;
  busNo: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  currentStudents: number;
  stops: string[];
  morningPickupTime: string;
  afternoonDropTime: string;
  status: 'On Route' | 'At Campus' | 'Idle';
}

export interface LeaveApplication {
  id: string;
  applicantName: string;
  applicantRole: 'Student' | 'Staff';
  applicantId: string;
  leaveType: 'Medical' | 'Personal' | 'Academic Event' | 'Vacation';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export interface TimetablePeriod {
  periodNo: number;
  timeSlot: string;
  subject: string;
  teacher: string;
  room: string;
}
