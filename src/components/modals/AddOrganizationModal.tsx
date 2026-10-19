import React, { useState } from 'react';
import {
  Building2,
  X,
  Sparkles,
  School,
  Cpu,
  GraduationCap,
  Layers,
  DollarSign,
  Award,
  BookOpen,
  ShieldCheck,
  Check,
  Palette,
  MapPin,
  Calendar,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { Organization, OrganizationType, ThemeColorId, CampusTheme } from '../../types/erp';
import { CAMPUS_THEMES } from '../../data/mockData';
import { Language, translations } from '../../i18n/translations';

interface AddOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOrganization: (org: Organization) => void;
  currentLang: Language;
}

export const AddOrganizationModal: React.FC<AddOrganizationModalProps> = ({
  isOpen,
  onClose,
  onAddOrganization,
  currentLang
}) => {
  const t = translations[currentLang];

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState<OrganizationType>('Engineering College');
  const [tagline, setTagline] = useState('');
  const [location, setLocation] = useState('Pune, Maharashtra');
  const [establishedYear, setEstablishedYear] = useState<number>(2015);
  const [accreditation, setAccreditation] = useState('NAAC A++ Grade & NBA Accredited');
  const [crestIcon, setCrestIcon] = useState('Cpu');
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeColorId>('crimson');

  if (!isOpen) return null;

  const currentTheme = CAMPUS_THEMES[selectedThemeId];

  const crestIcons = [
    { id: 'School', icon: School, label: 'Academy' },
    { id: 'Cpu', icon: Cpu, label: 'Tech & Engineering' },
    { id: 'GraduationCap', icon: GraduationCap, label: 'University / Medical' },
    { id: 'Layers', icon: Layers, label: 'Polytechnic' },
    { id: 'DollarSign', icon: DollarSign, label: 'Business / FinTech' },
    { id: 'Award', icon: Award, label: 'Excellence' },
    { id: 'BookOpen', icon: BookOpen, label: 'Research' },
    { id: 'ShieldCheck', icon: ShieldCheck, label: 'Autonomous' }
  ];

  const organizationTypes: OrganizationType[] = [
    'Engineering College',
    'Medical College',
    'College / Institute',
    'University Campus',
    'Polytechnic & Vocational',
    'Autonomous Institute',
    'Business & Law School',
    'K-12 Academy'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const generatedCode = code.trim() || name.split(' ').map((w) => w[0]).join('').slice(0, 5).toUpperCase();

    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: name.trim(),
      code: generatedCode,
      type,
      tagline: tagline.trim() || 'Excellence in Higher Education & Applied Research',
      themeId: selectedThemeId,
      establishedYear: Number(establishedYear) || 2020,
      location: location.trim() || 'Central Campus',
      accreditation: accreditation.trim() || 'State Board & UGC Recognized',
      crestIcon,
      website: `https://${generatedCode.toLowerCase()}.edusphere.edu`,
      contactEmail: `dean@${generatedCode.toLowerCase()}.edu`
    };

    onAddOrganization(newOrg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        {/* Header with Theme Banner Preview */}
        <div className={`p-6 border-b border-slate-800 bg-gradient-to-r ${currentTheme.headerBg} relative`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${currentTheme.gradientFrom} ${currentTheme.gradientTo} flex items-center justify-center shadow-lg text-white`}>
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{t.addOrganization}</span>
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${currentTheme.badgeBg} ${currentTheme.badgeText} border ${currentTheme.borderClass}`}>
                    {currentTheme.name}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{t.themeSubtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Institution Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-300" />
              <span>1. Institutional Identity</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {t.collegeName} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pune Institute of Engineering & Technology (PIET)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {t.collegeCode} (e.g. PIET, MIT, COEP) *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. PIET"
                  maxLength={8}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 font-mono uppercase focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {t.collegeType}
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as OrganizationType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {organizationTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {t.tagline}
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Empowering Innovation, Technology & Societal Leadership"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {t.location}
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Shivajinagar, Pune"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {t.establishedYear}
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(Number(e.target.value))}
                    min={1800}
                    max={2030}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  {t.accreditation}
                </label>
                <input
                  type="text"
                  value={accreditation}
                  onChange={(e) => setAccreditation(e.target.value)}
                  placeholder="e.g. NAAC A++ Grade, NBA Accredited, AICTE Approved"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Crest Emblem Selection */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              {t.crestIcon}
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {crestIcons.map((item) => {
                const Icon = item.icon;
                const isSelected = crestIcon === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setCrestIcon(item.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? `${currentTheme.badgeBg} ${currentTheme.borderClass} ${currentTheme.accentClass} ring-1 ring-offset-0`
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[9px] font-medium truncate w-full text-center">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: THEME SELECTION - "as per college or organization it should be different theme while adding it" */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.themeTitle} *</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Select a unique color palette and brand identity for this institution.
                </p>
              </div>
            </div>

            {/* Theme Swatches Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
              {(Object.keys(CAMPUS_THEMES) as ThemeColorId[]).map((themeKey) => {
                const th = CAMPUS_THEMES[themeKey];
                const isSelected = selectedThemeId === themeKey;
                return (
                  <button
                    type="button"
                    key={themeKey}
                    onClick={() => setSelectedThemeId(themeKey)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                      isSelected
                        ? `bg-slate-950 ${th.borderClass} ring-2 ${th.ringClass}`
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-4 h-4 rounded-full shadow-sm"
                          style={{ backgroundColor: th.primaryHex }}
                        />
                        <div className={`w-8 h-2 rounded-full bg-gradient-to-r ${th.gradientFrom} ${th.gradientTo}`} />
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-white text-slate-950 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">{th.name}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{th.paletteName}</div>
                  </button>
                );
              })}
            </div>

            {/* Live Interactive Preview Card for this Theme */}
            <div className={`mt-3 p-4 rounded-xl border ${currentTheme.borderClass} bg-slate-950/80`}>
              <div className="text-[10px] uppercase font-mono font-semibold text-slate-400 mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{t.previewTheme}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${currentTheme.gradientFrom} ${currentTheme.gradientTo} flex items-center justify-center text-white shadow-md`}>
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{name.trim() || 'Institution Name'}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${currentTheme.badgeBg} ${currentTheme.badgeText}`}>
                        {code.trim() || 'CODE'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {tagline.trim() || 'Academic Excellence & Applied Innovation'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${currentTheme.btnPrimaryClass} transition-all`}
                  >
                    Action Button
                  </button>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-mono ${currentTheme.badgeBg} ${currentTheme.badgeText} border ${currentTheme.borderClass}`}>
                    Active Status
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white ${currentTheme.btnPrimaryClass} flex items-center gap-2 transition-all shadow-lg`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.saveCollege}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
