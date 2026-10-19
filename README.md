# EduSphere-ERP — Multi-Tenant Campus & Institutional Management Cloud

A comprehensive, production-grade School & College Enterprise Resource Planning (ERP) platform built following the **REA (Reverse Engineer Anything — `morluto/rea`)** cleanroom architecture methodology.

Designed with high density, role-based access control (RBAC), multi-tenant college management with **per-college dynamic color theming**, multi-language internationalization (English, Hindi, and Marathi), and zero-pill typographic discipline.

---

## 🎨 Per-College Organization Multi-Tenancy & Dynamic Brand Theming

**EduSphere-ERP** supports multi-institution campus environments. Every college or organization added to the system carries its own institutional identity, code, crest emblem, and **distinct visual color theme**:

### Supported Brand Themes
1. **Royal Indigo** (`#4f46e5`) — Prestige Academies, Central Universities & K-12 Institutes.
2. **Heritage Crimson** (`#dc2626`) — Engineering Colleges, Technology Institutes & Robotics Centers.
3. **University Emerald** (`#059669`) — Medical Colleges, Health Sciences & Biological Institutes.
4. **Electric Violet** (`#9333ea`) — Polytechnics, Vocational Institutes, Architecture & Design Schools.
5. **Gold & Amber** (`#d97706`) — Business Schools, Management Institutes & Law Faculties.
6. **Oceanic Cyan** (`#0891b2`) — Frontier Research Institutes, Quantum & AI STEM Campuses.
7. **Rose Ruby** (`#e11d48`) — Liberal Arts, Literature, International Baccalaureate & Humanities.
8. **Nordic Teal** (`#0d9488`) — Autonomous Institutes, Innovation Labs & Advanced Skill Centers.

### Adding New Colleges with Custom Themes
- Administrators can click **`+ Add College / Organization`** in the top navigation bar or sidebar.
- Enter College Name, Short Code (e.g. *PIET*, *COEP*, *MIT*, *GUHS*), Institutional Type, Motto/Tagline, Location, Established Year, and Accreditation.
- Choose from 8 emblem crests (*Academy*, *Tech & Engineering*, *Medical*, *Polytechnic*, *Business*, *Excellence*, *Research*, *Autonomous*).
- **Select the Theme**: An interactive palette picker with live visual preview shows how the college's buttons, badges, banners, and crest will render.
- Upon saving, the new college is added and activated immediately with its custom theme across the entire application!
- Switch between registered colleges anytime in 1-click using the college selector in the top bar.

---

## 🚀 Core ERP Modules & Capabilities

### 1. Multi-Role Authentication & Dedicated Login Portal
- **Independent Login Page**: Dedicated authentication screen with institutional email, password toggle, keep-signed-in options, and security notice.
- **Active College Selection on Login**: Switch active campus and view its theme right on the authentication screen.
- **1-Click Fast Login Presets**:
  - **Super Administrator** (`admin@edusphere.edu` / Robert Thornton)
  - **Bursar & Accountant** (`accountant@edusphere.edu` / Claire Vance, CPA)
  - **Faculty / Teacher** (`faculty@edusphere.edu` / Dr. Alistair Finch)
  - **Student / Parent** (`student@edusphere.edu` / Aarav Sharma)
- **Role-Dedicated Layouts**: Each role experiences a tailor-made command cockpit with permissions appropriate to their responsibilities.

### 2. FERPA/GDPR Student Data Privacy & Isolation (RBAC)
- When authenticated as a **Student**:
  - **Strict Self-Isolation**: Students can only view their own GPA, attendance, guardian details, fee balances, and digital student ID card. Access to peer student records is strictly restricted.
  - **Personal Examination Marks**: Only their own scores, grades, and marksheet report cards are visible.
  - **Private Attendance Registry**: Daily personal presence records and monthly attendance percentages.
  - **Personal Fee Installments**: Access only to their own tuition dues, payment schedules, and stamped receipts.
  - **Issued Certificates & Leaves**: Only documents and leave applications belonging to their profile are displayed.

### 3. Direct Student Registration (Admin & Accountant Access)
- Accessible by Administrators and Accountants via a dedicated modal or action button.
- Comprehensive enrollment fields:
  - Personal info: Name, gender, DOB, grade, section, roll number.
  - Guardian contact: Parent name, phone, email, address, assigned bus route.
  - **Financial Plan & Flexible Installments**: Total academic fee with choice of 1, 2, 3, or 4 installment schedules.
  - Automatically posts the initial bill into the accounts ledger and registers student installments.

### 4. Fee Installments & Accounting Management
- **Installment Scheduling**: Flexible fees broken down into installments (e.g. Installment 1: Fall Term, Installment 2: Mid-Term, Installment 3: Spring Term).
- **Online Payment Simulation**: Pay individual term installments via Card, Bank Transfer, or Cash at the Bursar desk.
- **Printable Stamped Vouchers**: Instant generation of official receipts with itemized breakdown tables, authorization tokens, cashier signatures, and university seals.

### 5. High-Definition Online Video Streaming Lectures
- **Real Video Playback**: HTML5 `<video>` engine streaming educational lectures (Faraday's Laws & Physics, Calculus & Differential Equations, Python Data Structures & BSTs).
- **Player Controls**: Play/pause, scrubbing slider, volume control, mute toggle, playback speed ($1\times$, $1.25\times$, $1.5\times$), and fullscreen.
- **Interactive Whiteboard Simulation**: Toggle to an animated canvas wave simulation demonstrating harmonic motion and electromagnetic field equations.
- **Synchronized Q&A Chat**: Real-time student-teacher chat with timestamps, live blackboard notes, participant roster, and hand-raising indicator.

### 6. Continuous Examination & Marks Registry
- **Marks Ledger**: Inline grading per subject with dynamic percentage and letter grade calculation ($A^+$, $A$, $B$, etc.).
- **Verified Report Cards**: Formal report card layout with school crest, subject breakdown, class teacher remarks, and principal seal.

### 7. Exam Timetable Scheduler & Clash Detection
- **Conflict-Free Scheduling**: Set examination dates, start/end time slots, testing rooms, and assigned supervisors.
- **Real-Time Clash Engine**: Alerts when two exams collide in the same testing hall or share the same invigilator.
- **Exportable Date Sheet**: Print-ready schedule for students and faculty.

### 8. Official Certifications & Document Engine
- **Credential Issuance**: Issue **Transfer Certificates (TC)**, **Bonafide Certificates**, **Merit Awards**, and **Character Certificates**.
- **Formal Academic Styling**: Engraved vintage border, cryptographic verification tokens, official seals, and printable format.

### 9. Daily Attendance & Roll Call
- **Dual Attendance Roster**: Switch between Student Roll Call and Faculty/Staff Attendance.
- **Granular Status**: Mark *Present*, *Absent*, *Late*, or *Excused*.
- **Bulk Action**: 1-click "Mark All Present" with instant status counters and attendance percentage analytics.

### 10. Homework & Task Management
- **Teacher Assignment Publisher**: Post assignments with deadlines, attachments, and instructions.
- **Student Submission Drawer**: Upload homework solutions with notes and track grading feedback.

### 11. Campus Logistics & Auxiliary Services
- **School Bus Fleet GPS**: Live tracking of bus routes, driver contacts, speed telemetry, and arrival times.
- **Library Circulation**: ISBN lookup, genre categorization, lending tracker, and return processing.
- **Staff & Student Leave Approvals**: Multi-tier leave applications with medical/casual categorization, reason notes, and instant Admin approval/rejection.

### 12. Notice Board & Urgent Circulars
- Broadcast circulars categorized by *Academic*, *Administrative*, *Examination*, and *Holiday*.
- Target audience routing (*All*, *Students*, *Staff*, *Parents*) with high-priority **Urgent** banner alerts.

### 13. Trilingual Internationalization (i18n)
- Seamless 1-click language switcher in the navigation bar:
  - 🇬🇧 **English**
  - 🇮🇳 **Hindi (हिंदी)**
  - 🇮🇳 **Marathi (मराठी)**

---

## 🛠️ Tech Stack

- **Framework**: React 19 SPA with TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS v4 with custom CSS variable themes
- **Icons**: Lucide React
- **Animations**: CSS Transitions & HTML5 Canvas

---

## 💻 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
