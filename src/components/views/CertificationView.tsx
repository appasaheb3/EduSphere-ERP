import React, { useState } from 'react';
import {
  Award,
  Plus,
  Search,
  CheckCircle2,
  Printer,
  ShieldCheck,
  FileText,
  QrCode,
  X,
  ExternalLink
} from 'lucide-react';
import { Certificate, Student, UserRole } from '../../types/erp';

interface CertificationViewProps {
  currentRole: UserRole;
  certificates: Certificate[];
  students: Student[];
  onIssueCertificate: (cert: Certificate) => void;
}

export const CertificationView: React.FC<CertificationViewProps> = ({
  currentRole,
  certificates,
  students,
  onIssueCertificate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isIssuing, setIsIssuing] = useState(false);

  // Form State
  const [studentId, setStudentId] = useState(students[0]?.id || '');
  const [certType, setCertType] = useState<Certificate['type']>('Bonafide');
  const [remarks, setRemarks] = useState('Bonafide student for official identification and visa processing.');
  const [signatory, setSignatory] = useState('Dr. Eleanor Vance, Principal');

  const filteredCerts = certificates.filter(
    (c) =>
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.certNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      certNumber: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: student.id,
      studentName: student.name,
      type: certType,
      issueDate: new Date().toISOString().split('T')[0],
      academicYear: '2026-2027',
      signatory,
      remarks,
      verificationCode: `OIA-VRF-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    };

    onIssueCertificate(newCert);
    setSelectedCert(newCert);
    setIsIssuing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Certifications & Official Credentials
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Issue cryptographically verifiable Bonafide, Transfer Certificates (TC), Merit awards, and Transcripts.
          </p>
        </div>

        {currentRole !== 'student' && (
          <button
            onClick={() => setIsIssuing(true)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-amber-600/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Issue New Certificate
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certificate # or student name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <span className="text-xs text-slate-400">Total Issued: {certificates.length}</span>
      </div>

      {/* Certificates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {cert.type}
                </span>
                <span className="font-mono text-slate-500 text-[11px]">{cert.issueDate}</span>
              </div>

              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {cert.studentName}
              </h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cert.remarks}</p>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-mono">{cert.certNumber}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between text-xs text-indigo-400 font-medium">
              <span>View & Print Document</span>
              <Printer className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Printable Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#fcfbf7] text-slate-900 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative border-8 border-double border-amber-900/30">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header with Crest */}
            <div className="text-center space-y-1">
              <div className="text-amber-900 font-serif text-2xl font-black tracking-widest uppercase">
                Oakridge International Academy
              </div>
              <div className="text-xs tracking-widest font-serif text-slate-600 uppercase">
                Excellence in Academics &bull; Integrity &bull; Leadership
              </div>
              <div className="pt-3">
                <span className="px-5 py-1 rounded bg-amber-100 text-amber-900 font-serif text-sm font-bold uppercase tracking-wider border border-amber-300">
                  {selectedCert.type}
                </span>
              </div>
            </div>

            {/* Formal Certificate Body */}
            <div className="my-6 text-center space-y-4 px-6">
              <p className="text-xs text-slate-600 font-serif italic">This is to officially certify that</p>
              <h2 className="text-2xl font-bold font-serif text-slate-950 border-b border-dashed border-slate-300 pb-2">
                {selectedCert.studentName}
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed font-serif">
                {selectedCert.remarks}
              </p>
              <p className="text-xs text-slate-600 font-serif">
                During their academic tenure in the <strong className="text-slate-900">Academic Year {selectedCert.academicYear}</strong>, they maintained commendable conduct, adherence to school values, and active scholastic discipline.
              </p>
            </div>

            {/* Bottom Meta & Signatures */}
            <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-3 items-end text-xs font-serif text-slate-700">
              <div className="space-y-1 text-left">
                <div className="text-[10px] text-slate-500 uppercase">Certificate No:</div>
                <div className="font-mono font-bold text-slate-800">{selectedCert.certNumber}</div>
                <div className="text-[10px] text-slate-500">Date: {selectedCert.issueDate}</div>
              </div>

              {/* Verification Stamp / QR Representation */}
              <div className="text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-amber-800/60 bg-amber-50/50 flex flex-col items-center justify-center p-1">
                  <ShieldCheck className="w-5 h-5 text-amber-800" />
                  <span className="text-[8px] font-bold uppercase tracking-tighter text-amber-900">SEAL</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500 mt-1">{selectedCert.verificationCode}</span>
              </div>

              <div className="text-right">
                <div className="border-b border-slate-600 w-36 ml-auto mb-1"></div>
                <div className="font-bold text-slate-900">{selectedCert.signatory}</div>
                <div className="text-[10px] text-slate-500">Authorized Signatory</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Verified Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Certificate Modal */}
      {isIssuing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleIssueSubmit}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Issue Official Academic Certificate
              </h3>
              <button
                type="button"
                onClick={() => setIsIssuing(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Select Student</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.grade} - Section {s.section})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Certificate Type</label>
                <select
                  value={certType}
                  onChange={(e) => {
                    const newType = e.target.value as Certificate['type'];
                    setCertType(newType);
                    if (newType === 'Transfer Certificate') {
                      setRemarks('Student has completed their syllabus with no pending dues and is officially relieved for relocation.');
                    } else if (newType === 'Bonafide') {
                      setRemarks('Bonafide enrolled regular student in active academic standing for administrative identification.');
                    } else if (newType === 'Merit Certificate') {
                      setRemarks('Awarded for exceptional scholastic distinction, peer leadership, and honors GPA.');
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Bonafide">Bonafide Certificate</option>
                  <option value="Transfer Certificate">Transfer Certificate (TC)</option>
                  <option value="Merit Certificate">Certificate of Merit & Honors</option>
                  <option value="Character Certificate">Character & Conduct Certificate</option>
                  <option value="Sports Achievement">Sports & Athletic Achievement</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Certification Remarks / Purpose</label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Issuing Signatory</label>
                <input
                  type="text"
                  value={signatory}
                  onChange={(e) => setSignatory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsIssuing(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-amber-600/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Issue & Stamp
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
