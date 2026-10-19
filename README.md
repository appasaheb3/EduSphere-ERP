# Oakridge Academy ERP — Institutional Campus Management Cloud

A comprehensive, production-grade School Enterprise Resource Planning (ERP) platform built following the **REA (Reverse Engineer Anything — `morluto/rea`)** cleanroom architecture methodology.

Designed with high density, role-based access control (RBAC), multi-language internationalization (English, Hindi, and Marathi), and zero-pill typographic discipline.

---

## 🚀 Key Modules & Architecture

### 1. Multi-Role Authentication & Dedicated Role Portals
- **Secure Portal Login**: Clean authentication screen with credential input, remember-me options, and password visibility toggles.
- **1-Click Role Presets**: Instant testing as:
  - **Super Admin** (`admin@oakridge.edu` / Robert Thornton)
  - **Bursar & Accountant** (`accountant@oakridge.edu` / Claire Vance, CPA)
  - **Faculty / Teacher** (`faculty@oakridge.edu` / Dr. Alistair Finch)
  - **Student / Parent** (`student@oakridge.edu` / Aarav Sharma)
- **Role-Dedicated Layouts**: Each role experiences a tailor-made command cockpit with permissions appropriate to their responsibilities.

### 2. FERPA/GDPR Student Data Isolation (RBAC)
- When authenticated as a **Student**:
  - **Private Student Dossier**: Students can only view their own GPA, attendance, guardian details, and identity card. Directory of peer students is strictly restricted.
  - **Personal Examination Marks**: Only their own scores, grades, and marksheet report cards are visible.
  - **Private Attendance Registry**: Daily personal presence records and monthly attendance percentages.
  - **Personal Fee Installments**: Access only to their own tuition dues and receipts.
  - **Issued Certificates & Leaves**: Only documents and leave applications belonging to their profile are displayed.

### 3. Student Registration (Admin & Accountant Access)
- **Direct Cohort Enrollment**: Accessible by Administrators and Accountants.
- **Comprehensive Enrollment Modal**:
  - Personal information: Full name, gender, DOB, grade, section, roll number.
  - Guardian information: Parent contact, emergency phone, residential address, bus route.
  - **Financial Plan**: Custom total academic fee and choice of installment schedules (1, 2, 3, or 4 installments).
  - Automatically posts the initial bill into the accounts ledger and schedules term payments.

### 4. Fee Installments & Financial Bursar
- **Term-by-Term Installments**: Fees divided across academic terms (e.g., Installment 1: Fall Term, Installment 2: Mid-Term, Installment 3: Spring Term).
- **Payment Gateway Simulation**: Pay individual term installments via Debit/Credit Card, Bank Wire / NEFT, or Cash at the Bursar desk.
- **Printable Stamped Vouchers**: Instant generation of official receipts with breakdown tables, authorization tokens, and cashier signatures.

### 5. High-Definition Online Video Streaming
- **Real Video Playback**: HTML5 `<video>` engine streaming educational lectures (Faraday's Laws & Physics, Calculus & Differential Equations, Python Data Structures & BSTs).
- **Comprehensive Player Controls**: Play/pause, scrubbing slider, volume control, mute toggle, playback speed ($1\times$, $1.25\times$, $1.5\times$), and fullscreen.
- **Whiteboard Wave Simulation**: Toggle to an animated canvas wave simulation demonstrating harmonic motion and electromagnetic field equations.
- **Classroom Synchronicity**: Real-time Q&A student-teacher chat with timestamps, live blackboard notes, participant roster, and hand-raising indicator.

### 6. Continuous Examination & Marks Registry
- **Marks Ledger**: Inline grading per subject with dynamic percentage and letter grade calculation ($A^+$, $A$, $B$, etc.).
- **Verified Report Cards**: Formal report card layout with school crest, subject breakdown, class teacher remarks, and principal seal.

### 7. Exam Timetable Scheduler & Clash Detection
- **Conflict-Free Scheduling**: Set examination dates, start/end time slots, testing rooms, and assigned supervisors.
- **Real-Time Clash Engine**: Alerts when two exams collide in the same testing hall or share the same invigilator.
- **Exportable Date Sheet**: Print-ready schedule for students and faculty.

### 8. Certifications & Official Documents
- **Official Credentials**: Issue **Transfer Certificates (TC)**, **Bonafide Certificates**, **Merit Awards**, and **Character Certificates**.
- **Formal Academic Styling**: Engraved vintage border, cryptographic verification tokens, official seals, and printable format.

### 9. Daily Attendance & Roll Call
- **Dual Register**: Separate roll calls for student classes and faculty departments.
- **One-Click Actions**: "Mark All Present", status toggles (*Present*, *Absent*, *Late*, *Excused*), date selection, and monthly visual progress bars.

### 10. Homework & Coursework Management
- Assignment distribution with due dates, maximum points, and teacher attachments.
- Student submission drawer to turn in homework and track grading status.

### 11. Campus Logistics & Essential Services
- 🚌 **Bus Fleet GPS Tracker**: School bus routes, driver direct contact numbers, bus capacity, pickup stops, and morning/afternoon timings.
- 📚 **Library & Book Circulation**: Catalog search, ISBN listings, available copy counts, and one-click "Issue Copy" and "Return Copy" actions.
- 📋 **Leave Applications & Approvals**: Formal leave submissions (Medical, Personal, Event) with faculty and admin approval/rejection workflows.
- ⏰ **Bell Schedule & Class Timetable**: 6-period daily schedule with subject allocations, faculty names, and room numbers.

### 12. Multilingual Support (English, Hindi, Marathi)
- Seamless real-time language switching:
  - **English (EN)**
  - **हिंदी (Hindi - HI)**
  - **मराठी (Marathi - MR)**
- Instant translation of navigation, dashboards, buttons, headers, statuses, and role labels.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (Functional components, Hooks) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Icons** | Lucide React |
| **Build & Dev Tool** | Vite 8 |
| **Video Engine** | HTML5 Video & Canvas API |
| **Internationalization** | Typed i18n dictionary system |

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

### 4. Type Check and Lint
```bash
npm run lint
```

---

## 🏛️ REA Framework Rationale
Developed following the 5-stage cleanroom synthesis process from `morluto/rea`:
1. **Target Deconstruction**: Mapping traditional school ERP modules (Fedena, PowerSchool, OpenEduCat).
2. **Behavioral Contracts**: Defining rigid role-based access rules (RBAC) and financial calculations.
3. **Schema Synthesis**: Modern TypeScript data structures with type safety.
4. **Cleanroom Synthesis**: Building modular, accessible React 19 components with zero mock stubs.
5. **Production Polish**: Tabular figures for accounting, print-ready document modals, and low-latency video streaming.
