import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Filter,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Briefcase,
  DollarSign,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { StaffMember, UserRole } from '../../types/erp';

interface StaffViewProps {
  currentRole: UserRole;
  staff: StaffMember[];
}

export const StaffView: React.FC<StaffViewProps> = ({ currentRole, staff }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', 'Science & Physics', 'Mathematics', 'Computer Science', 'Finance & Accounts', 'School Administration'];

  const filteredStaff = staff.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subjects.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    return matchesQuery && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            Faculty & Administrative Staff Directory
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Departmental structures, faculty course loads, contact rosters, and attendance records.
          </p>
        </div>

        <div className="text-xs text-slate-400">
          Total Faculty: <strong className="text-white">{staff.length} Active</strong>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty by name, department, or subject..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs overflow-x-auto w-full sm:w-auto">
          <span className="text-slate-400 mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Department:
          </span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedDept === dept
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-mono text-slate-400 text-[11px]">{member.staffId}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {member.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{member.name}</h4>
                  <p className="text-xs text-indigo-400 font-medium">{member.role}</p>
                  <p className="text-[11px] text-slate-400">{member.department}</p>
                </div>
              </div>

              {/* Subjects & Classes */}
              {member.subjects.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">Assigned Courses</span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px] border border-slate-800"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono text-[11px] text-slate-300">{member.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-mono text-[11px] text-slate-300">{member.contact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
