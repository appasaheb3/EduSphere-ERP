import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Printer,
  FileText,
  CreditCard,
  Download,
  Receipt,
  X,
  Calendar,
  Layers,
  UserPlus
} from 'lucide-react';
import { FeeInvoice, Student, UserRole, FeeInstallment } from '../../types/erp';

interface AccountingViewProps {
  currentRole: UserRole;
  invoices: FeeInvoice[];
  students: Student[];
  onUpdateInvoice: (updatedInvoice: FeeInvoice) => void;
  onCreateInvoice: (newInvoice: FeeInvoice) => void;
  onUpdateStudentInstallments?: (studentId: string, updatedInstallments: FeeInstallment[]) => void;
  onOpenRegisterStudent?: () => void;
}

export const AccountingView: React.FC<AccountingViewProps> = ({
  currentRole,
  invoices,
  students,
  onUpdateInvoice,
  onCreateInvoice,
  onUpdateStudentInstallments,
  onOpenRegisterStudent
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'invoices' | 'installments'>('installments');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Partial' | 'Overdue'>('All');
  const [selectedStudentForInstallments, setSelectedStudentForInstallments] = useState<Student>(
    students[0] || null
  );

  // Modals
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState<FeeInvoice | null>(null);
  const [selectedInstallmentForReceipt, setSelectedInstallmentForReceipt] = useState<{
    installment: FeeInstallment;
    student: Student;
  } | null>(null);

  const [payingInstallment, setPayingInstallment] = useState<{
    installment: FeeInstallment;
    student: Student;
  } | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Bank Transfer' | 'Cash' | 'Cheque'>('Card');

  // Create Invoice Modal State
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [newStudentId, setNewStudentId] = useState(students[0]?.id || '');
  const [newCategory, setNewCategory] = useState<FeeInvoice['category']>('Tuition');
  const [newAmount, setNewAmount] = useState(1200);
  const [newDueDate, setNewDueDate] = useState('2026-11-15');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesQuery =
      inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.grade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalBilled = students.reduce((sum, s) => sum + s.totalFeeAmount, 0);
  const totalBalance = students.reduce((sum, s) => sum + s.balanceAmount, 0);
  const totalCollected = totalBilled - totalBalance;
  const overdueCount = students.filter((s) => s.feeStatus === 'Overdue').length;

  const handlePayInstallmentSubmit = () => {
    if (!payingInstallment) return;
    const { installment, student } = payingInstallment;

    const updatedInstallments = student.installments.map((inst) => {
      if (inst.id === installment.id) {
        return {
          ...inst,
          paidAmount: inst.amount,
          status: 'Paid' as const,
          paidDate: new Date().toISOString().split('T')[0],
          paymentMethod,
          receiptNo: `REC-2026-${Math.floor(100 + Math.random() * 900)}`
        };
      }
      return inst;
    });

    if (onUpdateStudentInstallments) {
      onUpdateStudentInstallments(student.id, updatedInstallments);
    }

    // Also update invoice if corresponding
    const relatedInvoice = invoices.find((inv) => inv.studentId === student.id);
    if (relatedInvoice) {
      onUpdateInvoice({
        ...relatedInvoice,
        paidAmount: relatedInvoice.paidAmount + installment.amount,
        status: 'Paid',
        paidDate: new Date().toISOString().split('T')[0],
        paymentMethod
      });
    }

    setSelectedInstallmentForReceipt({
      installment: {
        ...installment,
        paidAmount: installment.amount,
        status: 'Paid',
        paidDate: new Date().toISOString().split('T')[0],
        receiptNo: `REC-2026-${Math.floor(100 + Math.random() * 900)}`,
        paymentMethod
      },
      student
    });

    setPayingInstallment(null);
  };

  const handleCreateNewInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === newStudentId);
    if (!student) return;

    const newInv: FeeInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNo: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      studentId: student.id,
      studentName: student.name,
      grade: student.grade,
      category: newCategory,
      amount: Number(newAmount),
      paidAmount: 0,
      dueDate: newDueDate,
      status: 'Partial'
    };

    onCreateInvoice(newInv);
    setIsCreatingInvoice(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            Financial Bursar & Fee Installment Portal
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage student installment schedules, collect term payments, issue stamped receipts, and register students.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {(currentRole === 'admin' || currentRole === 'accountant') && onOpenRegisterStudent && (
            <button
              onClick={onOpenRegisterStudent}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Register New Student
            </button>
          )}

          {currentRole !== 'student' && (
            <button
              onClick={() => setIsCreatingInvoice(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              Custom Invoice
            </button>
          )}
        </div>
      </div>

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Total Fee Receivables</span>
          <span className="text-xl font-bold text-white font-mono">${totalBilled.toLocaleString()}</span>
          <span className="text-[11px] text-slate-500 block mt-1">Across all registered cohorts</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Total Collected</span>
          <span className="text-xl font-bold text-emerald-400 font-mono">${totalCollected.toLocaleString()}</span>
          <span className="text-[11px] text-emerald-500 block mt-1">
            {Math.round((totalCollected / (totalBilled || 1)) * 100)}% realization rate
          </span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Pending Installments</span>
          <span className="text-xl font-bold text-amber-400 font-mono">${totalBalance.toLocaleString()}</span>
          <span className="text-[11px] text-slate-500 block mt-1">Scheduled for upcoming terms</span>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Overdue Accounts</span>
          <span className="text-xl font-bold text-rose-400 font-mono">{overdueCount}</span>
          <span className="text-[11px] text-rose-500 block mt-1">Grace period expired</span>
        </div>
      </div>

      {/* Subtab Toggle: Installment Schedules vs Ledger Invoices */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('installments')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeSubTab === 'installments'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          Installment Plans & Term Payment ({students.length} Students)
        </button>
        <button
          onClick={() => setActiveSubTab('invoices')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeSubTab === 'invoices'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          Accounts Invoices Ledger ({invoices.length})
        </button>
      </div>

      {/* TAB 1: Installment Plans & Term-by-Term Payment */}
      {activeSubTab === 'installments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Student Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Student Account
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {students.map((student) => {
                const isSelected = selectedStudentForInstallments?.id === student.id;
                return (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudentForInstallments(student)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">{student.name}</h4>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            student.feeStatus === 'Paid'
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : student.feeStatus === 'Partial'
                              ? 'text-amber-400 bg-amber-500/10'
                              : 'text-rose-400 bg-rose-500/10'
                          }`}
                        >
                          {student.feeStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{student.grade} &bull; {student.admissionNo}</p>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Due: ${student.balanceAmount}</span>
                        <span>Total: ${student.totalFeeAmount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Student Installment Schedule Details */}
          {selectedStudentForInstallments && (
            <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
              {/* Header profile */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedStudentForInstallments.avatar}
                    alt={selectedStudentForInstallments.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedStudentForInstallments.name}</h3>
                    <p className="text-xs text-slate-400">
                      Admission #{selectedStudentForInstallments.admissionNo} &bull; {selectedStudentForInstallments.grade} &bull; Section {selectedStudentForInstallments.section}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Parent: {selectedStudentForInstallments.parentName} ({selectedStudentForInstallments.parentContact})
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Remaining Balance</span>
                  <span className="text-2xl font-bold font-mono text-amber-400">
                    ${selectedStudentForInstallments.balanceAmount}
                  </span>
                  <span className="text-[11px] text-slate-500 block font-mono">
                    Total: ${selectedStudentForInstallments.totalFeeAmount}
                  </span>
                </div>
              </div>

              {/* Installments Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Fee Installment Breakdown ({selectedStudentForInstallments.installments.length} Terms)</span>
                  <span className="text-slate-400">Pay term installments individually</span>
                </div>

                <div className="space-y-3">
                  {selectedStudentForInstallments.installments.map((inst) => {
                    const isPaid = inst.status === 'Paid';
                    return (
                      <div
                        key={inst.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isPaid
                            ? 'bg-slate-950/70 border-emerald-900/40'
                            : inst.status === 'Due'
                            ? 'bg-amber-950/20 border-amber-800/40'
                            : 'bg-slate-950/50 border-slate-800'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-indigo-400">
                              Installment #{inst.installmentNo} of {inst.totalInstallments}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                isPaid
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : inst.status === 'Due'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {inst.status}
                            </span>
                          </div>
                          <div className="text-xs font-semibold text-white">{inst.title}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-3 font-mono">
                            <span>Due Date: {inst.dueDate}</span>
                            {inst.paidDate && (
                              <span className="text-emerald-400">Paid On: {inst.paidDate}</span>
                            )}
                            {inst.receiptNo && (
                              <span className="text-slate-400">Ref: {inst.receiptNo}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto">
                          <div className="text-right">
                            <span className="text-lg font-bold font-mono text-white">${inst.amount}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Paid: ${inst.paidAmount}
                            </span>
                          </div>

                          {isPaid ? (
                            <button
                              onClick={() =>
                                setSelectedInstallmentForReceipt({
                                  installment: inst,
                                  student: selectedStudentForInstallments
                                })
                              }
                              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                            >
                              <Receipt className="w-3.5 h-3.5 text-indigo-400" />
                              Receipt
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setPayingInstallment({
                                  installment: inst,
                                  student: selectedStudentForInstallments
                                });
                                setPaymentAmount(inst.amount - inst.paidAmount);
                              }}
                              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              Pay Installment
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Standard Invoices Ledger */}
      {activeSubTab === 'invoices' && (
        <div className="space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name or invoice #..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
              <span className="text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Status:
              </span>
              {(['All', 'Paid', 'Partial', 'Overdue'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-4 font-semibold">Invoice No</th>
                    <th className="py-3 px-4 font-semibold">Student & Class</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Total Amount</th>
                    <th className="py-3 px-4 font-semibold">Paid</th>
                    <th className="py-3 px-4 font-semibold">Balance</th>
                    <th className="py-3 px-4 font-semibold">Due Date</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredInvoices.map((inv) => {
                    const balance = inv.amount - inv.paidAmount;
                    return (
                      <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium text-slate-200">{inv.invoiceNo}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white">{inv.studentName}</div>
                          <div className="text-[11px] text-slate-400">{inv.grade}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                            {inv.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-white">${inv.amount}</td>
                        <td className="py-3 px-4 font-mono text-emerald-400">${inv.paidAmount}</td>
                        <td className="py-3 px-4 font-mono text-amber-400">${balance}</td>
                        <td className="py-3 px-4 text-slate-400 font-mono">{inv.dueDate}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              inv.status === 'Paid'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : inv.status === 'Partial'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedInvoiceForReceipt(inv)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] inline-flex items-center gap-1 transition-colors"
                          >
                            <Receipt className="w-3 h-3 text-indigo-400" />
                            Receipt
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Pay Installment Modal */}
      {payingInstallment && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Pay Installment #{payingInstallment.installment.installmentNo}
              </h3>
              <button
                onClick={() => setPayingInstallment(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Student</span>
                <span className="font-semibold text-white">{payingInstallment.student.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Installment Item</span>
                <span className="font-medium text-slate-200">{payingInstallment.installment.title}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Amount Due</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ${payingInstallment.installment.amount}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Select Payment Gateway / Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Card">Debit / Credit Card (Instant Online Receipt)</option>
                  <option value="Bank Transfer">Direct Bank Wire / NEFT Transfer</option>
                  <option value="Cash">Cash at Campus Bursar Desk</option>
                  <option value="Cheque">Bank Demand Draft / Cheque</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setPayingInstallment(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePayInstallmentSubmit}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirm Payment & Generate Voucher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Printable Installment Receipt Modal */}
      {selectedInstallmentForReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedInstallmentForReceipt(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center border-b-2 border-slate-800 pb-4">
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-indigo-900">
                Oakridge International Academy
              </h3>
              <p className="text-[11px] text-slate-600">Department of Finance & Campus Bursar</p>
              <div className="mt-2 inline-block px-3 py-0.5 rounded bg-emerald-50 text-[11px] font-bold uppercase tracking-wider text-emerald-800 border border-emerald-300">
                Official Installment Payment Receipt
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Receipt Number</span>
                <span className="font-mono font-bold text-slate-800">
                  {selectedInstallmentForReceipt.installment.receiptNo || 'REC-2026-901'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Payment Date</span>
                <span className="font-mono text-slate-800">
                  {selectedInstallmentForReceipt.installment.paidDate || new Date().toISOString().split('T')[0]}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Student Name</span>
                <span className="font-bold text-slate-900">
                  {selectedInstallmentForReceipt.student.name}
                </span>
                <span className="text-[11px] text-slate-600 block">
                  {selectedInstallmentForReceipt.student.grade} &bull; {selectedInstallmentForReceipt.student.admissionNo}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Payment Method</span>
                <span className="font-medium text-slate-800">
                  {selectedInstallmentForReceipt.installment.paymentMethod || 'Online Card Portal'}
                </span>
              </div>
            </div>

            {/* Breakdown table */}
            <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-2">Installment Term</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2 font-medium">
                      {selectedInstallmentForReceipt.installment.title}
                    </td>
                    <td className="p-2 text-right font-mono font-bold text-slate-900">
                      ${selectedInstallmentForReceipt.installment.amount}
                    </td>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-slate-900">
                    <td className="p-2">Total Amount Cleared</td>
                    <td className="p-2 text-right font-mono text-emerald-700">
                      ${selectedInstallmentForReceipt.installment.amount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200 text-[11px] text-slate-500">
              <div className="font-mono text-[10px]">
                Auth Token: OIA-INST-SHA-{selectedInstallmentForReceipt.installment.id}
              </div>
              <div className="text-right">
                <div className="border-b border-slate-400 w-32 mb-1"></div>
                <span>Claire Vance, CPA (Bursar)</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2 justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-700 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Voucher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice receipt modal */}
      {selectedInvoiceForReceipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedInvoiceForReceipt(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center border-b-2 border-slate-800 pb-4">
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-indigo-900">
                Oakridge International Academy
              </h3>
              <p className="text-[11px] text-slate-600">Department of Finance & Campus Bursar</p>
              <div className="mt-2 inline-block px-3 py-0.5 rounded bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-700 border border-slate-300">
                Official Fee Receipt
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Invoice #</span>
                <span className="font-mono font-bold text-slate-800">{selectedInvoiceForReceipt.invoiceNo}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Student</span>
                <span className="font-bold text-slate-900">{selectedInvoiceForReceipt.studentName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Category</span>
                <span className="font-medium text-slate-800">{selectedInvoiceForReceipt.category}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Amount Paid</span>
                <span className="font-mono font-bold text-emerald-700">${selectedInvoiceForReceipt.paidAmount}</span>
              </div>
            </div>
            <div className="mt-5 flex gap-2 justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-700 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Custom Invoice Modal */}
      {isCreatingInvoice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateNewInvoice}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                Issue Custom Fee Invoice
              </h3>
              <button
                type="button"
                onClick={() => setIsCreatingInvoice(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Select Student</label>
                <select
                  value={newStudentId}
                  onChange={(e) => setNewStudentId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.grade} - Roll #{s.rollNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Fee Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Tuition">Tuition Fee</option>
                  <option value="Laboratory">Laboratory & Science Equipment</option>
                  <option value="Transport">School Bus & Transport</option>
                  <option value="Examination">Board Examination Fee</option>
                  <option value="Library">Library & Digital Resources</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Invoice Amount ($)</label>
                <input
                  type="number"
                  min={50}
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Payment Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsCreatingInvoice(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Generate Invoice
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
