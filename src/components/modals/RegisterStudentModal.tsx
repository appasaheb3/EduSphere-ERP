import React, { useState } from 'react';
import {
  UserPlus,
  X,
  CheckCircle2,
  Calendar,
  CreditCard,
  DollarSign,
  Bus,
  MapPin,
  Phone,
  Mail,
  Users
} from 'lucide-react';
import { Student, FeeInstallment, FeeInvoice } from '../../types/erp';

interface RegisterStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (newStudent: Student, initialInvoice: FeeInvoice) => void;
}

export const RegisterStudentModal: React.FC<RegisterStudentModalProps> = ({
  isOpen,
  onClose,
  onRegister
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [dob, setDob] = useState('2010-05-15');
  const [grade, setGrade] = useState('Grade 10');
  const [section, setSection] = useState('A');
  const [rollNo, setRollNo] = useState(25);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [busRoute, setBusRoute] = useState('Route 1 - Westside Loop');

  // Fee Installment Plan Configuration
  const [totalFeeAmount, setTotalFeeAmount] = useState(3600);
  const [installmentsCount, setInstallmentsCount] = useState<number>(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !parentName.trim()) return;

    const studentId = `std-${Date.now()}`;
    const admissionNo = `OIA-2026-${Math.floor(100 + Math.random() * 900)}`;
    const studentEmail = email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@oakridge.edu`;

    // Generate installment breakdown
    const installmentAmount = Math.round(totalFeeAmount / installmentsCount);
    const generatedInstallments: FeeInstallment[] = Array.from({ length: installmentsCount }).map(
      (_, i) => {
        const months = ['2026-08-15', '2026-10-15', '2027-01-15', '2027-04-15'];
        return {
          id: `inst-${studentId}-${i + 1}`,
          installmentNo: i + 1,
          totalInstallments: installmentsCount,
          title: `Installment ${i + 1} of ${installmentsCount}`,
          amount: installmentAmount,
          paidAmount: 0,
          dueDate: months[i] || '2026-10-15',
          status: i === 0 ? 'Due' : 'Upcoming'
        };
      }
    );

    const newStudent: Student = {
      id: studentId,
      admissionNo,
      name,
      email: studentEmail,
      avatar:
        gender === 'Female'
          ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      grade,
      section,
      rollNo: Number(rollNo),
      gender,
      dob,
      parentName,
      parentContact,
      parentEmail,
      address: address || 'Campus Residential Zone, Westside',
      attendancePct: 100,
      feeStatus: 'Partial',
      totalFeeAmount,
      balanceAmount: totalFeeAmount,
      installments: generatedInstallments,
      overallGpa: 3.8,
      busRoute
    };

    const initialInvoice: FeeInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNo: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      studentId,
      studentName: name,
      grade,
      category: 'Tuition',
      amount: installmentAmount,
      paidAmount: 0,
      dueDate: generatedInstallments[0].dueDate,
      status: 'Partial',
      installmentPlan: {
        currentInstallment: 1,
        totalInstallments: installmentsCount,
        installmentAmount
      }
    };

    onRegister(newStudent, initialInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[92vh] overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Register New Student</h3>
              <p className="text-xs text-slate-400">
                Enroll student, configure parent records, and set up tuition installment plan.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Section 1: Basic Information */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              1. Student Academic & Personal Info
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Grade / Cohort</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Section & Roll #</label>
                <div className="flex gap-2">
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-1/2 bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="A">Sec A</option>
                    <option value="B">Sec B</option>
                    <option value="Sci">Sci</option>
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={rollNo}
                    onChange={(e) => setRollNo(Number(e.target.value))}
                    className="w-1/2 bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Guardian Details */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              2. Guardian & Contact Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Parent / Guardian Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Richard Lin"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Emergency Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="+1 (555) 998-1122"
                  value={parentContact}
                  onChange={(e) => setParentContact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Residential Address</label>
                <input
                  type="text"
                  placeholder="Street address, city"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">School Transport Route</label>
                <select
                  value={busRoute}
                  onChange={(e) => setBusRoute(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Route 1 - Westside Loop">Route 1 - Westside Loop (BUS-04)</option>
                  <option value="Route 2 - Eastview Campus Line">Route 2 - Eastview Campus Line (BUS-07)</option>
                  <option value="Route 3 - North Hills Express">Route 3 - North Hills Express (BUS-11)</option>
                  <option value="Self / Parent Drop">No Transport (Self / Parent Drop)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Fees & Installment Plan */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>3. Financial & Installment Schedule</span>
              <span className="font-mono text-slate-400 text-[10px]">
                ${Math.round(totalFeeAmount / installmentsCount)} / installment
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Total Academic Fee ($)</label>
                <input
                  type="number"
                  min={500}
                  step={100}
                  value={totalFeeAmount}
                  onChange={(e) => setTotalFeeAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Installment Plan</label>
                <select
                  value={installmentsCount}
                  onChange={(e) => setInstallmentsCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={1}>1 Installment (Full Upfront Payment)</option>
                  <option value={2}>2 Installments (Semi-Annual)</option>
                  <option value={3}>3 Installments (Term-by-Term: Fall, Winter, Spring)</option>
                  <option value={4}>4 Installments (Quarterly)</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
              The student will be initialized with a <strong className="text-slate-200">{installmentsCount}-part installment schedule</strong>. The first installment of <strong className="text-emerald-400">${Math.round(totalFeeAmount / installmentsCount)}</strong> will be automatically billed in the Accounts Ledger.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Complete Registration & Bill Initial Installment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
