import React, { useState } from 'react';
import {
  UserRole,
  AuthUser,
  Student,
  StaffMember,
  FeeInvoice,
  FeeInstallment,
  ExamScheduleItem,
  Certificate,
  HomeworkAssignment,
  Notice,
  LibraryBook,
  TransportRoute,
  LeaveApplication
} from './types/erp';
import {
  PRESET_USERS,
  INITIAL_STUDENTS,
  INITIAL_STAFF,
  INITIAL_INVOICES,
  INITIAL_EXAMS,
  INITIAL_SCHEDULE_ITEMS,
  INITIAL_CERTIFICATES,
  INITIAL_LECTURES,
  INITIAL_HOMEWORK,
  INITIAL_NOTICES,
  INITIAL_LIBRARY_BOOKS,
  INITIAL_TRANSPORT_ROUTES,
  INITIAL_LEAVES
} from './data/mockData';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { AccountingView } from './components/views/AccountingView';
import { ExamView } from './components/views/ExamView';
import { ExamSchedulerView } from './components/views/ExamSchedulerView';
import { CertificationView } from './components/views/CertificationView';
import { AttendanceView } from './components/views/AttendanceView';
import { LiveLectureView } from './components/views/LiveLectureView';
import { HomeworkView } from './components/views/HomeworkView';
import { NoticeBoardView } from './components/views/NoticeBoardView';
import { StudentDirectoryView } from './components/views/StudentDirectoryView';
import { StaffView } from './components/views/StaffView';
import { CampusServicesView } from './components/views/CampusServicesView';
import { RegisterStudentModal } from './components/modals/RegisterStudentModal';
import { ReaSpecModal } from './components/views/ReaSpecModal';

export default function App() {
  // Authentication & Role State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(PRESET_USERS[0]);
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Modals
  const [isReaSpecOpen, setIsReaSpecOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // App-wide persistent state
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [invoices, setInvoices] = useState<FeeInvoice[]>(INITIAL_INVOICES);
  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [scheduleItems, setScheduleItems] = useState<ExamScheduleItem[]>(INITIAL_SCHEDULE_ITEMS);
  const [certificates, setCertificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [lectures, setLectures] = useState(INITIAL_LECTURES);
  const [homework, setHomework] = useState<HomeworkAssignment[]>(INITIAL_HOMEWORK);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [books, setBooks] = useState<LibraryBook[]>(INITIAL_LIBRARY_BOOKS);
  const [transportRoutes, setTransportRoutes] = useState<TransportRoute[]>(INITIAL_TRANSPORT_ROUTES);
  const [leaves, setLeaves] = useState<LeaveApplication[]>(INITIAL_LEAVES);

  // Auth Handlers
  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    // Find matching preset user for avatar and profile
    const matched = PRESET_USERS.find((u) => u.role === role);
    if (matched) {
      setCurrentUser(matched);
    }
    setActiveTab('dashboard');
  };

  // Student Registration Handler
  const handleRegisterStudent = (newStudent: Student, initialInvoice: FeeInvoice) => {
    setStudents((prev) => [newStudent, ...prev]);
    setInvoices((prev) => [initialInvoice, ...prev]);
  };

  // Fee Installments Update Handler
  const handleUpdateStudentInstallments = (
    studentId: string,
    updatedInstallments: FeeInstallment[]
  ) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const paidTotal = updatedInstallments
            .filter((i) => i.status === 'Paid')
            .reduce((sum, i) => sum + i.amount, 0);
          const balance = s.totalFeeAmount - paidTotal;
          const status = balance === 0 ? 'Paid' : balance < s.totalFeeAmount ? 'Partial' : 'Overdue';
          return {
            ...s,
            installments: updatedInstallments,
            balanceAmount: balance,
            feeStatus: status
          };
        }
        return s;
      })
    );
  };

  // Handlers for dynamic actions
  const handleUpdateInvoice = (updated: FeeInvoice) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === updated.id ? updated : inv)));
  };

  const handleCreateInvoice = (newInv: FeeInvoice) => {
    setInvoices((prev) => [newInv, ...prev]);
  };

  const handleAddScheduleItem = (newItem: ExamScheduleItem) => {
    setScheduleItems((prev) => [...prev, newItem]);
  };

  const handleDeleteScheduleItem = (itemId: string) => {
    setScheduleItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleIssueCertificate = (newCert: Certificate) => {
    setCertificates((prev) => [newCert, ...prev]);
  };

  const handleAddAssignment = (newHw: HomeworkAssignment) => {
    setHomework((prev) => [newHw, ...prev]);
  };

  const handleAddNotice = (newNotice: Notice) => {
    setNotices((prev) => [newNotice, ...prev]);
  };

  const handleUpdateLeaveStatus = (leaveId: string, status: 'Approved' | 'Rejected') => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, status } : l))
    );
  };

  const handleApplyLeave = (newLeave: LeaveApplication) => {
    setLeaves((prev) => [newLeave, ...prev]);
  };

  const handleIssueBook = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId && b.availableCopies > 0
          ? { ...b, availableCopies: b.availableCopies - 1 }
          : b
      )
    );
  };

  const handleReturnBook = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId && b.availableCopies < b.totalCopies
          ? { ...b, availableCopies: b.availableCopies + 1 }
          : b
      )
    );
  };

  // If logged out, render the login page
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Badges calculations
  const liveLecturesCount = lectures.filter((l) => l.status === 'Live').length;
  const pendingHomeworkCount = homework.length;
  const urgentNoticesCount = notices.filter((n) => n.priority === 'Urgent').length;
  const overdueInvoicesCount = students.filter((s) => s.feeStatus === 'Overdue').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Global Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        currentRole={currentRole}
        setCurrentRole={handleRoleChange}
        unreadNoticesCount={urgentNoticesCount}
        onOpenNotices={() => setActiveTab('notice-board')}
        onOpenReaSpec={() => setIsReaSpecOpen(true)}
      />

      {/* Main Workspace: Sidebar + Dynamic Module View */}
      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentRole={currentRole}
          liveLecturesCount={liveLecturesCount}
          pendingHomeworkCount={pendingHomeworkCount}
          urgentNoticesCount={urgentNoticesCount}
          overdueInvoicesCount={overdueInvoicesCount}
          onOpenRegisterStudent={() => setIsRegisterModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              currentRole={currentRole}
              currentUser={currentUser}
              students={students}
              staff={staff}
              invoices={invoices}
              exams={exams}
              lectures={lectures}
              notices={notices}
              homework={homework}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenRegisterStudent={() => setIsRegisterModalOpen(true)}
            />
          )}

          {activeTab === 'students' && (
            <StudentDirectoryView
              currentRole={currentRole}
              students={students}
              onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
            />
          )}

          {activeTab === 'staff' && (
            <StaffView
              currentRole={currentRole}
              staff={staff}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView
              currentRole={currentRole}
              students={students}
              staff={staff}
            />
          )}

          {activeTab === 'accounting' && (
            <AccountingView
              currentRole={currentRole}
              invoices={invoices}
              students={students}
              onUpdateInvoice={handleUpdateInvoice}
              onCreateInvoice={handleCreateInvoice}
              onUpdateStudentInstallments={handleUpdateStudentInstallments}
              onOpenRegisterStudent={() => setIsRegisterModalOpen(true)}
            />
          )}

          {activeTab === 'exams' && (
            <ExamView
              currentRole={currentRole}
              exams={exams}
              scheduleItems={scheduleItems}
              students={students}
            />
          )}

          {activeTab === 'schedule-exam' && (
            <ExamSchedulerView
              currentRole={currentRole}
              exams={exams}
              scheduleItems={scheduleItems}
              staff={staff}
              onAddScheduleItem={handleAddScheduleItem}
              onDeleteScheduleItem={handleDeleteScheduleItem}
            />
          )}

          {activeTab === 'certification' && (
            <CertificationView
              currentRole={currentRole}
              certificates={certificates}
              students={students}
              onIssueCertificate={handleIssueCertificate}
            />
          )}

          {activeTab === 'live-lecture' && (
            <LiveLectureView
              currentRole={currentRole}
              lectures={lectures}
            />
          )}

          {activeTab === 'homework' && (
            <HomeworkView
              currentRole={currentRole}
              assignments={homework}
              onAddAssignment={handleAddAssignment}
            />
          )}

          {activeTab === 'campus-services' && (
            <CampusServicesView
              currentRole={currentRole}
              books={books}
              transportRoutes={transportRoutes}
              leaveApplications={leaves}
              onUpdateLeaveStatus={handleUpdateLeaveStatus}
              onApplyLeave={handleApplyLeave}
              onIssueBook={handleIssueBook}
              onReturnBook={handleReturnBook}
            />
          )}

          {activeTab === 'notice-board' && (
            <NoticeBoardView
              currentRole={currentRole}
              notices={notices}
              onAddNotice={handleAddNotice}
            />
          )}
        </main>
      </div>

      {/* Register Student Modal for Admin and Accountant */}
      <RegisterStudentModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterStudent}
      />

      {/* REA Reverse-Engineering Architecture Modal */}
      <ReaSpecModal
        isOpen={isReaSpecOpen}
        onClose={() => setIsReaSpecOpen(false)}
      />
    </div>
  );
}
