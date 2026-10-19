import {
  Student,
  StaffMember,
  FeeInvoice,
  Exam,
  ExamScheduleItem,
  Certificate,
  LectureStream,
  HomeworkAssignment,
  Notice,
  AuthUser,
  LibraryBook,
  TransportRoute,
  LeaveApplication,
  TimetablePeriod
} from '../types/erp';

export const PRESET_USERS: AuthUser[] = [
  {
    id: 'usr-admin',
    name: 'Robert Thornton',
    email: 'admin@oakridge.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    title: 'Super Administrator & Campus Director',
    staffId: 'ADM-301'
  },
  {
    id: 'usr-accountant',
    name: 'Claire Vance, CPA',
    email: 'accountant@oakridge.edu',
    role: 'accountant',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    title: 'Chief Financial Officer & Bursar',
    staffId: 'ACC-201'
  },
  {
    id: 'usr-staff',
    name: 'Dr. Alistair Finch',
    email: 'faculty@oakridge.edu',
    role: 'staff',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    title: 'HOD Science & Senior Physics Faculty',
    staffId: 'FAC-101'
  },
  {
    id: 'usr-student',
    name: 'Aarav Sharma',
    email: 'student@oakridge.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    title: 'Grade 10 Scholar & Student Council Rep',
    studentId: 'std-1'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    admissionNo: 'OIA-2024-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    grade: 'Grade 10',
    section: 'A',
    rollNo: 1,
    gender: 'Male',
    dob: '2010-04-12',
    parentName: 'Rajesh Sharma',
    parentContact: '+1 (555) 234-8901',
    parentEmail: 'rajesh.sharma@gmail.com',
    address: '142 Maplewood Avenue, Westside',
    attendancePct: 96.5,
    feeStatus: 'Paid',
    totalFeeAmount: 3600,
    balanceAmount: 0,
    overallGpa: 3.92,
    busRoute: 'Route 1 - Westside Loop',
    installments: [
      {
        id: 'inst-101',
        installmentNo: 1,
        totalInstallments: 3,
        title: 'Installment 1 (Fall Admission & Term Fee)',
        amount: 1200,
        paidAmount: 1200,
        dueDate: '2026-08-15',
        paidDate: '2026-08-10',
        status: 'Paid',
        receiptNo: 'REC-2026-081',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'inst-102',
        installmentNo: 2,
        totalInstallments: 3,
        title: 'Installment 2 (Mid-Term & Lab Resource Fee)',
        amount: 1200,
        paidAmount: 1200,
        dueDate: '2026-10-15',
        paidDate: '2026-10-10',
        status: 'Paid',
        receiptNo: 'REC-2026-094',
        paymentMethod: 'Card'
      },
      {
        id: 'inst-103',
        installmentNo: 3,
        totalInstallments: 3,
        title: 'Installment 3 (Spring Examination & Tuition)',
        amount: 1200,
        paidAmount: 1200,
        dueDate: '2027-01-15',
        paidDate: '2026-10-14',
        status: 'Paid',
        receiptNo: 'REC-2026-102',
        paymentMethod: 'Card'
      }
    ]
  },
  {
    id: 'std-2',
    admissionNo: 'OIA-2024-042',
    name: 'Sophia Chen',
    email: 'sophia.chen@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    grade: 'Grade 10',
    section: 'A',
    rollNo: 2,
    gender: 'Female',
    dob: '2010-08-25',
    parentName: 'David Chen',
    parentContact: '+1 (555) 789-1234',
    parentEmail: 'david.chen@technova.com',
    address: '88 Horizon Way, North Hills',
    attendancePct: 98.0,
    feeStatus: 'Partial',
    totalFeeAmount: 3600,
    balanceAmount: 1200,
    overallGpa: 3.98,
    busRoute: 'Route 3 - North Hills Express',
    installments: [
      {
        id: 'inst-201',
        installmentNo: 1,
        totalInstallments: 3,
        title: 'Installment 1 (Fall Admission & Term Fee)',
        amount: 1200,
        paidAmount: 1200,
        dueDate: '2026-08-15',
        paidDate: '2026-08-12',
        status: 'Paid',
        receiptNo: 'REC-2026-042',
        paymentMethod: 'Card'
      },
      {
        id: 'inst-202',
        installmentNo: 2,
        totalInstallments: 3,
        title: 'Installment 2 (Mid-Term & Lab Resource Fee)',
        amount: 1200,
        paidAmount: 1200,
        dueDate: '2026-10-15',
        paidDate: '2026-10-12',
        status: 'Paid',
        receiptNo: 'REC-2026-068',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'inst-203',
        installmentNo: 3,
        totalInstallments: 3,
        title: 'Installment 3 (Spring Examination & Tuition)',
        amount: 1200,
        paidAmount: 0,
        dueDate: '2027-01-15',
        status: 'Upcoming'
      }
    ]
  },
  {
    id: 'std-3',
    admissionNo: 'OIA-2024-089',
    name: 'Liam Vance',
    email: 'liam.vance@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    grade: 'Grade 10',
    section: 'B',
    rollNo: 5,
    gender: 'Male',
    dob: '2010-02-14',
    parentName: 'Elena Vance',
    parentContact: '+1 (555) 345-6789',
    parentEmail: 'elena.vance@gmail.com',
    address: '23 Pinecrest Lane, Eastview',
    attendancePct: 89.2,
    feeStatus: 'Partial',
    totalFeeAmount: 3600,
    balanceAmount: 1850,
    overallGpa: 3.45,
    busRoute: 'Route 2 - Eastview Campus Line',
    installments: [
      {
        id: 'inst-301',
        installmentNo: 1,
        totalInstallments: 3,
        title: 'Installment 1 (Fall Admission & Term Fee)',
        amount: 1200,
        paidAmount: 1200,
        dueDate: '2026-08-15',
        paidDate: '2026-08-14',
        status: 'Paid',
        receiptNo: 'REC-2026-083',
        paymentMethod: 'Card'
      },
      {
        id: 'inst-302',
        installmentNo: 2,
        totalInstallments: 3,
        title: 'Installment 2 (Mid-Term & Lab Resource Fee)',
        amount: 1200,
        paidAmount: 550,
        dueDate: '2026-10-25',
        status: 'Due'
      },
      {
        id: 'inst-303',
        installmentNo: 3,
        totalInstallments: 3,
        title: 'Installment 3 (Spring Examination & Tuition)',
        amount: 1200,
        paidAmount: 0,
        dueDate: '2027-01-15',
        status: 'Upcoming'
      }
    ]
  },
  {
    id: 'std-4',
    admissionNo: 'OIA-2023-112',
    name: 'Maya Patel',
    email: 'maya.patel@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    grade: 'Grade 11',
    section: 'Sci',
    rollNo: 12,
    gender: 'Female',
    dob: '2009-11-03',
    parentName: 'Sanjay Patel',
    parentContact: '+1 (555) 456-7890',
    parentEmail: 'sanjay.patel@biocare.org',
    address: '500 Brickell Blvd, Suite 4B',
    attendancePct: 94.8,
    feeStatus: 'Paid',
    totalFeeAmount: 4100,
    balanceAmount: 0,
    overallGpa: 3.85,
    busRoute: 'Route 1 - Westside Loop',
    installments: [
      {
        id: 'inst-401',
        installmentNo: 1,
        totalInstallments: 3,
        title: 'Installment 1 (Fall Term & STEM Lab)',
        amount: 1400,
        paidAmount: 1400,
        dueDate: '2026-08-15',
        paidDate: '2026-08-10',
        status: 'Paid',
        receiptNo: 'REC-2026-045',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'inst-402',
        installmentNo: 2,
        totalInstallments: 3,
        title: 'Installment 2 (Mid-Term & Transport)',
        amount: 1400,
        paidAmount: 1400,
        dueDate: '2026-10-15',
        paidDate: '2026-10-08',
        status: 'Paid',
        receiptNo: 'REC-2026-085',
        paymentMethod: 'Cash'
      },
      {
        id: 'inst-403',
        installmentNo: 3,
        totalInstallments: 3,
        title: 'Installment 3 (Spring Term & Boards)',
        amount: 1300,
        paidAmount: 1300,
        dueDate: '2027-01-15',
        paidDate: '2026-10-18',
        status: 'Paid',
        receiptNo: 'REC-2026-118',
        paymentMethod: 'Card'
      }
    ]
  },
  {
    id: 'std-5',
    admissionNo: 'OIA-2023-156',
    name: 'Noah Williams',
    email: 'noah.w@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    grade: 'Grade 11',
    section: 'Sci',
    rollNo: 18,
    gender: 'Male',
    dob: '2009-06-19',
    parentName: 'Jessica Williams',
    parentContact: '+1 (555) 901-2345',
    parentEmail: 'jess.williams@apex.com',
    address: '77 Cedar Crest, South Valley',
    attendancePct: 78.4,
    feeStatus: 'Overdue',
    totalFeeAmount: 3900,
    balanceAmount: 2200,
    overallGpa: 2.95,
    busRoute: 'Route 4 - South Valley Express',
    installments: [
      {
        id: 'inst-501',
        installmentNo: 1,
        totalInstallments: 3,
        title: 'Installment 1 (Fall Admission & Tuition)',
        amount: 1300,
        paidAmount: 1300,
        dueDate: '2026-08-15',
        paidDate: '2026-08-20',
        status: 'Paid',
        receiptNo: 'REC-2026-098',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'inst-502',
        installmentNo: 2,
        totalInstallments: 3,
        title: 'Installment 2 (Mid-Term & Science Equipment)',
        amount: 1300,
        paidAmount: 400,
        dueDate: '2026-09-30',
        status: 'Due'
      },
      {
        id: 'inst-503',
        installmentNo: 3,
        totalInstallments: 3,
        title: 'Installment 3 (Spring Examination & Tuition)',
        amount: 1300,
        paidAmount: 0,
        dueDate: '2027-01-15',
        status: 'Upcoming'
      }
    ]
  },
  {
    id: 'std-6',
    admissionNo: 'OIA-2022-205',
    name: 'Chloe Dubois',
    email: 'chloe.dubois@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    grade: 'Grade 12',
    section: 'A',
    rollNo: 8,
    gender: 'Female',
    dob: '2008-09-30',
    parentName: 'Marc Dubois',
    parentContact: '+1 (555) 678-9012',
    parentEmail: 'marc.dubois@luxcapital.fr',
    address: '310 Riverdale Court, Waterfront',
    attendancePct: 97.2,
    feeStatus: 'Paid',
    totalFeeAmount: 4200,
    balanceAmount: 0,
    overallGpa: 4.0,
    busRoute: 'Route 1 - Westside Loop',
    installments: [
      {
        id: 'inst-601',
        installmentNo: 1,
        totalInstallments: 3,
        title: 'Installment 1 (Senior Honors Tuition)',
        amount: 1400,
        paidAmount: 1400,
        dueDate: '2026-08-15',
        paidDate: '2026-08-10',
        status: 'Paid',
        receiptNo: 'REC-2026-055',
        paymentMethod: 'Card'
      },
      {
        id: 'inst-602',
        installmentNo: 2,
        totalInstallments: 3,
        title: 'Installment 2 (AP Testing & Lab Fees)',
        amount: 1400,
        paidAmount: 1400,
        dueDate: '2026-10-15',
        paidDate: '2026-10-09',
        status: 'Paid',
        receiptNo: 'REC-2026-086',
        paymentMethod: 'Card'
      },
      {
        id: 'inst-603',
        installmentNo: 3,
        totalInstallments: 3,
        title: 'Installment 3 (Graduation & Diplomas)',
        amount: 1400,
        paidAmount: 1400,
        dueDate: '2027-01-15',
        paidDate: '2026-10-15',
        status: 'Paid',
        receiptNo: 'REC-2026-130',
        paymentMethod: 'Bank Transfer'
      }
    ]
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'stf-1',
    staffId: 'FAC-101',
    name: 'Dr. Alistair Finch',
    email: 'a.finch@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    role: 'HOD',
    department: 'Science & Physics',
    subjects: ['Advanced Physics', 'Astrophysics'],
    assignedClasses: ['Grade 11 Sci', 'Grade 12 A'],
    contact: '+1 (555) 111-2233',
    joiningDate: '2018-08-15',
    salary: 78000,
    attendancePct: 99.1,
    status: 'Active'
  },
  {
    id: 'stf-2',
    staffId: 'FAC-102',
    name: 'Prof. Margaret Sterling',
    email: 'm.sterling@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    role: 'Teacher',
    department: 'Mathematics',
    subjects: ['Calculus BC', 'Linear Algebra', 'Grade 10 Math'],
    assignedClasses: ['Grade 10 A', 'Grade 10 B', 'Grade 12 A'],
    contact: '+1 (555) 222-3344',
    joiningDate: '2019-07-01',
    salary: 72000,
    attendancePct: 98.4,
    status: 'Active'
  },
  {
    id: 'stf-3',
    staffId: 'FAC-103',
    name: 'Julian Henderson',
    email: 'j.henderson@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    role: 'Teacher',
    department: 'Computer Science',
    subjects: ['Data Structures & Python', 'Web Development & AI'],
    assignedClasses: ['Grade 10 A', 'Grade 11 Sci'],
    contact: '+1 (555) 333-4455',
    joiningDate: '2021-01-10',
    salary: 75000,
    attendancePct: 97.0,
    status: 'Active'
  },
  {
    id: 'stf-4',
    staffId: 'ACC-201',
    name: 'Claire Vance, CPA',
    email: 'c.vance@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    role: 'Accountant',
    department: 'Finance & Accounts',
    subjects: ['Financial Accounting'],
    assignedClasses: [],
    contact: '+1 (555) 444-5566',
    joiningDate: '2017-04-12',
    salary: 82000,
    attendancePct: 99.5,
    status: 'Active'
  },
  {
    id: 'stf-5',
    staffId: 'ADM-301',
    name: 'Robert Thornton',
    email: 'r.thornton@oakridge.edu',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    role: 'Admin',
    department: 'School Administration',
    subjects: [],
    assignedClasses: [],
    contact: '+1 (555) 555-6677',
    joiningDate: '2015-02-01',
    salary: 95000,
    attendancePct: 100.0,
    status: 'Active'
  }
];

export const INITIAL_INVOICES: FeeInvoice[] = [
  {
    id: 'inv-101',
    invoiceNo: 'INV-2026-081',
    studentId: 'std-1',
    studentName: 'Aarav Sharma',
    grade: 'Grade 10',
    category: 'Tuition',
    amount: 1200,
    paidAmount: 1200,
    dueDate: '2026-08-15',
    paidDate: '2026-08-10',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    installmentPlan: { currentInstallment: 1, totalInstallments: 3, installmentAmount: 1200 }
  },
  {
    id: 'inv-102',
    invoiceNo: 'INV-2026-082',
    studentId: 'std-2',
    studentName: 'Sophia Chen',
    grade: 'Grade 10',
    category: 'Tuition',
    amount: 1200,
    paidAmount: 1200,
    dueDate: '2026-10-15',
    paidDate: '2026-10-12',
    status: 'Paid',
    paymentMethod: 'Card',
    installmentPlan: { currentInstallment: 2, totalInstallments: 3, installmentAmount: 1200 }
  },
  {
    id: 'inv-103',
    invoiceNo: 'INV-2026-083',
    studentId: 'std-3',
    studentName: 'Liam Vance',
    grade: 'Grade 10',
    category: 'Tuition',
    amount: 1200,
    paidAmount: 550,
    dueDate: '2026-10-25',
    status: 'Partial',
    paymentMethod: 'Card',
    installmentPlan: { currentInstallment: 2, totalInstallments: 3, installmentAmount: 1200 }
  },
  {
    id: 'inv-104',
    invoiceNo: 'INV-2026-084',
    studentId: 'std-5',
    studentName: 'Noah Williams',
    grade: 'Grade 11',
    category: 'Tuition',
    amount: 1300,
    paidAmount: 400,
    dueDate: '2026-09-30',
    status: 'Overdue',
    installmentPlan: { currentInstallment: 2, totalInstallments: 3, installmentAmount: 1300 }
  },
  {
    id: 'inv-105',
    invoiceNo: 'INV-2026-085',
    studentId: 'std-4',
    studentName: 'Maya Patel',
    grade: 'Grade 11',
    category: 'Transport',
    amount: 1400,
    paidAmount: 1400,
    dueDate: '2026-10-10',
    paidDate: '2026-10-08',
    status: 'Paid',
    paymentMethod: 'Cash',
    installmentPlan: { currentInstallment: 2, totalInstallments: 3, installmentAmount: 1400 }
  },
  {
    id: 'inv-106',
    invoiceNo: 'INV-2026-086',
    studentId: 'std-6',
    studentName: 'Chloe Dubois',
    grade: 'Grade 12',
    category: 'Examination',
    amount: 1400,
    paidAmount: 1400,
    dueDate: '2026-10-15',
    paidDate: '2026-10-09',
    status: 'Paid',
    paymentMethod: 'Card',
    installmentPlan: { currentInstallment: 2, totalInstallments: 3, installmentAmount: 1400 }
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'ex-1',
    name: 'Mid-Term Summative Assessment 2026',
    term: 'Fall Term',
    academicYear: '2026-2027',
    grade: 'Grade 10',
    status: 'Ongoing',
    startDate: '2026-10-20',
    endDate: '2026-10-28'
  },
  {
    id: 'ex-2',
    name: 'Senior Science Board Preparatory Exam',
    term: 'Fall Term',
    academicYear: '2026-2027',
    grade: 'Grade 11',
    status: 'Upcoming',
    startDate: '2026-11-05',
    endDate: '2026-11-15'
  },
  {
    id: 'ex-3',
    name: 'Quarterly Unit Evaluation',
    term: 'Quarter 1',
    academicYear: '2026-2027',
    grade: 'Grade 12',
    status: 'Completed',
    startDate: '2026-09-12',
    endDate: '2026-09-18'
  }
];

export const INITIAL_SCHEDULE_ITEMS: ExamScheduleItem[] = [
  {
    id: 'sch-1',
    examId: 'ex-1',
    subject: 'Mathematics & Trigonometry',
    date: '2026-10-20',
    startTime: '09:00 AM',
    endTime: '12:00 PM',
    roomNo: 'Hall A - West Wing',
    maxMarks: 100,
    passingMarks: 40,
    invigilatorId: 'stf-2',
    invigilatorName: 'Prof. Margaret Sterling'
  },
  {
    id: 'sch-2',
    examId: 'ex-1',
    subject: 'Physics: Mechanics & Wave Optics',
    date: '2026-10-22',
    startTime: '09:00 AM',
    endTime: '12:00 PM',
    roomNo: 'Hall B - Science Block',
    maxMarks: 100,
    passingMarks: 40,
    invigilatorId: 'stf-1',
    invigilatorName: 'Dr. Alistair Finch'
  },
  {
    id: 'sch-3',
    examId: 'ex-1',
    subject: 'Computer Science: Algorithms & Python',
    date: '2026-10-25',
    startTime: '09:00 AM',
    endTime: '11:30 AM',
    roomNo: 'Computer Lab 3',
    maxMarks: 100,
    passingMarks: 40,
    invigilatorId: 'stf-3',
    invigilatorName: 'Julian Henderson'
  },
  {
    id: 'sch-4',
    examId: 'ex-1',
    subject: 'English Literature & Composition',
    date: '2026-10-27',
    startTime: '09:00 AM',
    endTime: '12:00 PM',
    roomNo: 'Hall A - West Wing',
    maxMarks: 100,
    passingMarks: 40,
    invigilatorId: 'stf-2',
    invigilatorName: 'Prof. Margaret Sterling'
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    certNumber: 'CERT-2026-0041',
    studentId: 'std-2',
    studentName: 'Sophia Chen',
    type: 'Merit Certificate',
    issueDate: '2026-10-05',
    academicYear: '2026-2027',
    signatory: 'Dr. Eleanor Vance, Principal',
    remarks: 'Outstanding Academic Performance & Top Rank in Mathematics Olympiad',
    verificationCode: 'OIA-VRF-9923-X'
  },
  {
    id: 'cert-2',
    certNumber: 'CERT-2026-0082',
    studentId: 'std-1',
    studentName: 'Aarav Sharma',
    type: 'Bonafide',
    issueDate: '2026-10-12',
    academicYear: '2026-2027',
    signatory: 'Robert Thornton, Registrar',
    remarks: 'Bonafide student of Grade 10 Section A for Passport & Visa verification',
    verificationCode: 'OIA-VRF-8812-B'
  },
  {
    id: 'cert-3',
    certNumber: 'CERT-2026-0105',
    studentId: 'std-6',
    studentName: 'Chloe Dubois',
    type: 'Sports Achievement',
    issueDate: '2026-09-28',
    academicYear: '2026-2027',
    signatory: 'Coach Marcus Bell, Athletics Director',
    remarks: 'Gold Medalist - State Interscholastic Swimming Championship 200m Medley',
    verificationCode: 'OIA-VRF-7734-S'
  }
];

// Rich Educational Video Lectures with reliable media
export const INITIAL_LECTURES: LectureStream[] = [
  {
    id: 'lec-1',
    title: 'Electromagnetic Waves, Induction & Faraday’s Laws',
    subject: 'Physics',
    grade: 'Grade 11 Sci',
    teacherId: 'stf-1',
    teacherName: 'Dr. Alistair Finch',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    startTime: 'Today &bull; Live Now',
    status: 'Live',
    viewerCount: 46,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80',
    duration: '45:20',
    meetingTopic: 'Faraday’s law of induction, Lenz’s rule, and AC generators derivation with laboratory demonstrations.',
    whiteboardNotes: [
      'Magnetic Flux: Φ = B · A · cos(θ)',
      'Induced EMF: ε = -N (dΦ / dt)',
      'Lenz’s Law: The direction of induced current opposes the flux change that produced it.',
      'Homework: Complete problems 4.1 to 4.8 from Halliday & Resnick by Friday!'
    ]
  },
  {
    id: 'lec-2',
    title: 'Calculus BC: Integration by Parts & Differential Equations',
    subject: 'Mathematics',
    grade: 'Grade 10 A',
    teacherId: 'stf-2',
    teacherName: 'Prof. Margaret Sterling',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    startTime: 'Today, 02:00 PM',
    status: 'Scheduled',
    viewerCount: 0,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    posterImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    duration: '50:00',
    meetingTopic: 'Tabular integration method, definite integral applications, and harmonic oscillators.',
    whiteboardNotes: [
      'Formula: ∫ u dv = u·v - ∫ v du',
      'Integration mnemonic: LIATE rule (Logarithmic, Inverse trig, Algebraic, Trig, Exponential)'
    ]
  },
  {
    id: 'lec-3',
    title: 'Python Data Structures: Trees, Graphs & Sorting Algorithms',
    subject: 'Computer Science',
    grade: 'Grade 10 A',
    teacherId: 'stf-3',
    teacherName: 'Julian Henderson',
    teacherAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    startTime: 'Yesterday (Archived Recording)',
    status: 'Ended',
    viewerCount: 68,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    duration: '38:15',
    meetingTopic: 'Binary Search Trees (BST), recursion depth, Big-O notation, and Python tree traversals.',
    whiteboardNotes: [
      'In-order traversal: Left -> Root -> Right (Produces sorted list)',
      'Time complexity of balanced BST lookup: O(log n)'
    ]
  }
];

export const INITIAL_HOMEWORK: HomeworkAssignment[] = [
  {
    id: 'hw-1',
    title: 'Problem Set 4: Electromagnetic Flux & Transformers',
    subject: 'Physics',
    grade: 'Grade 11 Sci',
    assignedBy: 'Dr. Alistair Finch',
    assignedDate: '2026-10-18',
    dueDate: '2026-10-23',
    description: 'Solve questions 1 through 10 on transformer step-up/step-down efficiency and mutual inductance calculations. Show detailed step calculations.',
    maxPoints: 50,
    submissionsCount: 28,
    totalStudents: 32,
    attachments: ['Physics_Assignment_Set4.pdf', 'Formula_Sheet_EM.pdf']
  },
  {
    id: 'hw-2',
    title: 'Calculus Worksheet: Differential Equations Modeling',
    subject: 'Mathematics',
    grade: 'Grade 10 A',
    assignedBy: 'Prof. Margaret Sterling',
    assignedDate: '2026-10-17',
    dueDate: '2026-10-21',
    description: 'Solve first order linear differential equations with initial value problems. Verify exponential growth and decay scenarios.',
    maxPoints: 40,
    submissionsCount: 30,
    totalStudents: 30,
    attachments: ['Differential_Equations_Worksheet.pdf']
  },
  {
    id: 'hw-3',
    title: 'Project: Build an Interactive Student Management CLI',
    subject: 'Computer Science',
    grade: 'Grade 10 A',
    assignedBy: 'Julian Henderson',
    assignedDate: '2026-10-15',
    dueDate: '2026-10-26',
    description: 'Write a Python program using classes and file handling (JSON or CSV) to store, search, and calculate GPA for student records.',
    maxPoints: 100,
    submissionsCount: 19,
    totalStudents: 30,
    attachments: ['CS_Project_Rubric.pdf', 'Starter_Template.py']
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Mid-Term Examination Hall Tickets & Seating Allocations Released',
    category: 'Examination',
    date: '2026-10-18',
    author: 'Examination Controller Office',
    targetAudience: 'All',
    priority: 'Urgent',
    content: 'All students appearing for the Fall Mid-Term Examinations starting October 20th must download their digital hall tickets. No student will be admitted without their official ID and barcode badge.'
  },
  {
    id: 'not-2',
    title: 'Quarterly Tuition Installment 2 Deadline & Late Fee Policy',
    category: 'Administrative',
    date: '2026-10-16',
    author: 'Finance & Accounts Department',
    targetAudience: 'Parents',
    priority: 'High',
    content: 'Parents and guardians are reminded that the 2nd installment of tuition and science laboratory fees is due on or before October 25, 2026. Online portal installment payments incur zero gateway surcharge.'
  },
  {
    id: 'not-3',
    title: 'Annual Interschool STEM Exhibition & Robotics Showcase',
    category: 'Academic',
    date: '2026-10-14',
    author: 'Science Club & Faculty of Tech',
    targetAudience: 'Students',
    priority: 'Normal',
    content: 'Registration is now open for students from Grades 9-12 to submit their innovative robotics, AI, or green energy project abstracts. The grand prize is a fully-funded trip to the National Science Fair.'
  },
  {
    id: 'not-4',
    title: 'Staff Professional Development Day - Early Dismissal on Friday',
    category: 'Holiday',
    date: '2026-10-10',
    author: 'Principal’s Desk',
    targetAudience: 'All',
    priority: 'Normal',
    content: 'All classes will conclude at 12:30 PM this coming Friday for quarterly faculty curriculum alignment workshops. School transport buses will depart at 1:00 PM sharp.'
  }
];

// Top ERP Features: Library Books
export const INITIAL_LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'bk-1',
    title: 'Fundamentals of Physics (Extended 11th Ed)',
    author: 'David Halliday, Robert Resnick, Jearl Walker',
    isbn: '978-1119460138',
    category: 'Physics & Sciences',
    availableCopies: 14,
    totalCopies: 20,
    shelfLocation: 'Aisle 3, Shelf B-4'
  },
  {
    id: 'bk-2',
    title: 'Thomas’ Calculus: Early Transcendentals',
    author: 'George B. Thomas, Maurice D. Weir',
    isbn: '978-0134439020',
    category: 'Mathematics',
    availableCopies: 8,
    totalCopies: 15,
    shelfLocation: 'Aisle 2, Shelf M-1'
  },
  {
    id: 'bk-3',
    title: 'Introduction to Algorithms (CLRS 4th Ed)',
    author: 'Thomas Cormen, Charles Leiserson, Ronald Rivest',
    isbn: '978-0262046305',
    category: 'Computer Science',
    availableCopies: 6,
    totalCopies: 10,
    shelfLocation: 'Aisle 5, Shelf CS-2'
  },
  {
    id: 'bk-4',
    title: 'Organic Chemistry: Structure and Function',
    author: 'K. Peter C. Vollhardt, Neil E. Schore',
    isbn: '978-1319079451',
    category: 'Chemistry & Biology',
    availableCopies: 11,
    totalCopies: 12,
    shelfLocation: 'Aisle 4, Shelf CH-3'
  }
];

// Top ERP Features: Transport Routes
export const INITIAL_TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: 'tr-1',
    routeName: 'Route 1 - Westside Loop',
    busNo: 'BUS-04 (Mercedes Benz Coach)',
    driverName: 'Arthur Jenkins',
    driverPhone: '+1 (555) 701-3322',
    capacity: 45,
    currentStudents: 38,
    stops: ['Westside Plaza (07:15 AM)', 'Maplewood Ave (07:28 AM)', 'Riverdale Gate (07:42 AM)', 'Oakridge Campus (08:00 AM)'],
    morningPickupTime: '07:15 AM',
    afternoonDropTime: '03:45 PM',
    status: 'At Campus'
  },
  {
    id: 'tr-2',
    routeName: 'Route 2 - Eastview Campus Line',
    busNo: 'BUS-07 (Volvo Transit)',
    driverName: 'Gary Ramirez',
    driverPhone: '+1 (555) 702-4433',
    capacity: 40,
    currentStudents: 35,
    stops: ['Eastview Station (07:20 AM)', 'Pinecrest Lane (07:35 AM)', 'Highland Park (07:45 AM)', 'Oakridge Campus (08:00 AM)'],
    morningPickupTime: '07:20 AM',
    afternoonDropTime: '03:50 PM',
    status: 'At Campus'
  },
  {
    id: 'tr-3',
    routeName: 'Route 3 - North Hills Express',
    busNo: 'BUS-11 (Blue Bird All-American)',
    driverName: 'Sgt. Thomas Cole',
    driverPhone: '+1 (555) 703-5544',
    capacity: 50,
    currentStudents: 44,
    stops: ['North Hills Metro (07:10 AM)', 'Horizon Way (07:25 AM)', 'Cedar Ridge (07:40 AM)', 'Oakridge Campus (08:00 AM)'],
    morningPickupTime: '07:10 AM',
    afternoonDropTime: '03:40 PM',
    status: 'At Campus'
  }
];

// Top ERP Features: Leave Applications
export const INITIAL_LEAVES: LeaveApplication[] = [
  {
    id: 'lv-1',
    applicantName: 'Noah Williams',
    applicantRole: 'Student',
    applicantId: 'std-5',
    leaveType: 'Medical',
    startDate: '2026-10-21',
    endDate: '2026-10-22',
    daysCount: 2,
    reason: 'Dental surgery and prescribed recovery period.',
    status: 'Pending',
    appliedOn: '2026-10-18'
  },
  {
    id: 'lv-2',
    applicantName: 'Sophia Chen',
    applicantRole: 'Student',
    applicantId: 'std-2',
    leaveType: 'Academic Event',
    startDate: '2026-10-24',
    endDate: '2026-10-25',
    daysCount: 2,
    reason: 'Representing school at the State Mathematics Olympiad Finals.',
    status: 'Approved',
    appliedOn: '2026-10-15'
  },
  {
    id: 'lv-3',
    applicantName: 'Prof. Margaret Sterling',
    applicantRole: 'Staff',
    applicantId: 'stf-2',
    leaveType: 'Personal',
    startDate: '2026-11-02',
    endDate: '2026-11-03',
    daysCount: 2,
    reason: 'Family wedding attendance out of state.',
    status: 'Pending',
    appliedOn: '2026-10-17'
  }
];

// Daily Period Timetable
export const GRADE_10_TIMETABLE: Record<string, TimetablePeriod[]> = {
  Monday: [
    { periodNo: 1, timeSlot: '08:30 - 09:20', subject: 'Mathematics (Calculus)', teacher: 'Prof. M. Sterling', room: 'Room 204' },
    { periodNo: 2, timeSlot: '09:25 - 10:15', subject: 'Physics & Wave Optics', teacher: 'Dr. A. Finch', room: 'Science Lab 2' },
    { periodNo: 3, timeSlot: '10:30 - 11:20', subject: 'Computer Science (Python)', teacher: 'J. Henderson', room: 'Comp Lab 3' },
    { periodNo: 4, timeSlot: '11:25 - 12:15', subject: 'English Literature', teacher: 'Mrs. D. Miller', room: 'Room 108' },
    { periodNo: 5, timeSlot: '01:00 - 01:50', subject: 'Chemistry (Titrations)', teacher: 'Dr. K. Patel', room: 'Chem Lab 1' },
    { periodNo: 6, timeSlot: '01:55 - 02:45', subject: 'Physical Education / Gym', teacher: 'Coach M. Bell', room: 'Main Gymnasium' }
  ]
};
