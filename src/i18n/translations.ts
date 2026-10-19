export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  appName: string;
  campusCloud: string;
  academicTerm: string;
  liveCampus: string;
  switchPerspective: string;
  reaBlueprint: string;
  signOut: string;
  signInTitle: string;
  signInSubtitle: string;
  quickLogin: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  keepSignedIn: string;
  loginButton: string;
  registerStudent: string;
  activeCampus: string;
  addOrganization: string;
  selectTheme: string;
  themeTitle: string;
  themeSubtitle: string;
  collegeName: string;
  collegeCode: string;
  collegeType: string;
  tagline: string;
  location: string;
  establishedYear: string;
  accreditation: string;
  crestIcon: string;
  saveCollege: string;
  switchCollege: string;
  previewTheme: string;
  // Navigation
  navDashboard: string;
  navStudents: string;
  navStaff: string;
  navAttendance: string;
  navAccounting: string;
  navExams: string;
  navScheduleExam: string;
  navCertificates: string;
  navLiveLecture: string;
  navHomework: string;
  navLogistics: string;
  navNoticeBoard: string;
  // Roles
  roleAdmin: string;
  roleAccountant: string;
  roleStaff: string;
  roleStudent: string;
  // Common terms
  present: string;
  absent: string;
  late: string;
  excused: string;
  paid: string;
  partial: string;
  overdue: string;
  upcoming: string;
  due: string;
  gpa: string;
  balance: string;
  totalFee: string;
  payInstallment: string;
  receipt: string;
  print: string;
  search: string;
  save: string;
  cancel: string;
  close: string;
  submit: string;
  broadcast: string;
  grade: string;
  section: string;
  rollNo: string;
  busRoute: string;
  library: string;
  leaves: string;
  timetable: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'EduSphere-ERP',
    campusCloud: 'Multi-Tenant Campus Cloud',
    academicTerm: '2026-27 Term 1',
    liveCampus: 'Live Campus System',
    switchPerspective: 'Switch Perspective',
    reaBlueprint: 'REA Architecture Specs',
    signOut: 'Sign Out',
    signInTitle: 'Sign In to EduSphere-ERP',
    signInSubtitle: 'Select your role preset for instant 1-click access, or log in with credentials.',
    quickLogin: '1-Click Fast Login by Role:',
    emailPlaceholder: 'name@edusphere.edu',
    passwordPlaceholder: '••••••••••••',
    keepSignedIn: 'Keep me signed in on this workstation',
    loginButton: 'Authenticate & Access Dashboard',
    registerStudent: 'Register New Student',
    activeCampus: 'Active Campus / College',
    addOrganization: 'Add College / Organization',
    selectTheme: 'Campus Brand Theme',
    themeTitle: 'Select Organization Visual Theme',
    themeSubtitle: 'Each college or organization has its own distinctive branding, badge styling, and color theme.',
    collegeName: 'Institution / College Name',
    collegeCode: 'Institutional Code',
    collegeType: 'Institution Type',
    tagline: 'Motto / Tagline',
    location: 'Campus City / Location',
    establishedYear: 'Established Year',
    accreditation: 'Accreditation / Affiliation',
    crestIcon: 'Emblem Crest Icon',
    saveCollege: 'Register College & Apply Theme',
    switchCollege: 'Switch Active Campus',
    previewTheme: 'Theme Visual Palette Preview',
    // Navigation
    navDashboard: 'Campus Overview',
    navStudents: 'Students & Records',
    navStaff: 'Staff & Faculty',
    navAttendance: 'Daily Attendance',
    navAccounting: 'Accountant & Installments',
    navExams: 'Exams & Results',
    navScheduleExam: 'Schedule Exam',
    navCertificates: 'Certificates & TC',
    navLiveLecture: 'Online Streaming Video',
    navHomework: 'Homework & Tasks',
    navLogistics: 'Transport, Library & Leaves',
    navNoticeBoard: 'Notice Board',
    // Roles
    roleAdmin: 'Super Administrator',
    roleAccountant: 'Bursar & Accountant',
    roleStaff: 'Faculty / Teacher',
    roleStudent: 'Student / Parent View',
    // Common terms
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    excused: 'Excused',
    paid: 'Paid',
    partial: 'Partial',
    overdue: 'Overdue',
    upcoming: 'Upcoming',
    due: 'Due',
    gpa: 'Overall GPA',
    balance: 'Balance Due',
    totalFee: 'Total Academic Fee',
    payInstallment: 'Pay Installment',
    receipt: 'Receipt',
    print: 'Print Document',
    search: 'Search...',
    save: 'Save Changes',
    cancel: 'Cancel',
    close: 'Close',
    submit: 'Submit',
    broadcast: 'Broadcast Notice',
    grade: 'Grade / Class',
    section: 'Section',
    rollNo: 'Roll No',
    busRoute: 'Bus Fleet GPS',
    library: 'Library Circulation',
    leaves: 'Leave Approvals',
    timetable: 'Bell Schedule'
  },
  hi: {
    appName: 'एडुस्फीयर-ईआरपी',
    campusCloud: 'मल्टी-टेनेंट कैंपस क्लाउड',
    academicTerm: '२०२६-२७ सत्र १',
    liveCampus: 'लाइव कैंपस प्रणाली',
    switchPerspective: 'भूमिका बदलें',
    reaBlueprint: 'आरईए आर्किटेक्चर विवरण',
    signOut: 'लॉग आउट',
    signInTitle: 'एडुस्फीयर-ईआरपी में लॉगिन करें',
    signInSubtitle: 'त्वरित १-क्लिक पहुंच के लिए अपनी भूमिका चुनें या क्रेडेंशियल दर्ज करें।',
    quickLogin: 'भूमिका द्वारा त्वरित १-क्लिक लॉगिन:',
    emailPlaceholder: 'name@edusphere.edu',
    passwordPlaceholder: '••••••••••••',
    keepSignedIn: 'मुझे इस वर्कस्टेशन पर साइन इन रखें',
    loginButton: 'प्रमाणित करें और डैशबोर्ड खोलें',
    registerStudent: 'नया छात्र पंजीकृत करें',
    activeCampus: 'सक्रिय कैंपस / कॉलेज',
    addOrganization: 'नया कॉलेज / संस्थान जोड़ें',
    selectTheme: 'कैंपस ब्रांड थीम',
    themeTitle: 'संस्थान के लिए दृश्य रंग थीम चुनें',
    themeSubtitle: 'प्रत्येक कॉलेज या संस्था की अपनी विशिष्ट ब्रांडिंग, बैज और रंग थीम होती है।',
    collegeName: 'संस्थान / कॉलेज का नाम',
    collegeCode: 'संस्था कोड',
    collegeType: 'संस्था का प्रकार',
    tagline: 'आदर्श वाक्य / टैगलाइन',
    location: 'कैंपस शहर / स्थान',
    establishedYear: 'स्थापना वर्ष',
    accreditation: 'मान्यता / संबद्धता',
    crestIcon: 'प्रतीक चिन्ह (क्रेस्ट)',
    saveCollege: 'कॉलेज जोड़ें और थीम लागू करें',
    switchCollege: 'सक्रिय कॉलेज बदलें',
    previewTheme: 'थीम रंग पूर्वावलोकन',
    // Navigation
    navDashboard: 'कैंपस अवलोकन',
    navStudents: 'छात्र और रिकॉर्ड',
    navStaff: 'कर्मचारी और संकाय',
    navAttendance: 'दैनिक उपस्थिति (रोल कॉल)',
    navAccounting: 'लेखापाल और किस्त शुल्क',
    navExams: 'परीक्षा और परिणाम',
    navScheduleExam: 'परीक्षा समय सारिणी',
    navCertificates: 'प्रमाणपत्र और टीसी',
    navLiveLecture: 'ऑनलाइन लाइव वीडियो व्याख्यान',
    navHomework: 'गृहकार्य और असाइनमेंट',
    navLogistics: 'परिवहन, पुस्तकालय और अवकाश',
    navNoticeBoard: 'सूचना पट्ट (परिपत्र)',
    // Roles
    roleAdmin: 'मुख्य प्रशासक',
    roleAccountant: 'लेखापाल एवं खजांची',
    roleStaff: 'संकाय / शिक्षक',
    roleStudent: 'छात्र / अभिभावक पोर्टल',
    // Common terms
    present: 'उपस्थित',
    absent: 'अनुपस्थित',
    late: 'देरी से',
    excused: 'स्वीकृत अवकाश',
    paid: 'भुगतान पूर्ण',
    partial: 'आंशिक देय',
    overdue: 'अतिदेय',
    upcoming: 'आगामी',
    due: 'देय',
    gpa: 'कुल जीपीए',
    balance: 'शेष देय राशि',
    totalFee: 'कुल शैक्षणिक शुल्क',
    payInstallment: 'किस्त का भुगतान करें',
    receipt: 'रसीद',
    print: 'दस्तावेज़ प्रिंट करें',
    search: 'खोजें...',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    close: 'बंद करें',
    submit: 'जमा करें',
    broadcast: 'सूचना प्रसारित करें',
    grade: 'कक्षा / ग्रेड',
    section: 'वर्ग (सेक्शन)',
    rollNo: 'क्रमांक (रोल नंबर)',
    busRoute: 'स्कूल बस जीपीएस',
    library: 'पुस्तकालय वितरण',
    leaves: 'अवकाश अनुमोदन',
    timetable: 'दैनिक समय-सारणी'
  },
  mr: {
    appName: 'एडुस्फीअर-ईआरपी',
    campusCloud: 'मल्टी-टॅनेन्ट कॅम्पस व्यवस्थापन क्लाउड',
    academicTerm: '२०२६-२७ सत्र १',
    liveCampus: 'थेट कॅम्पस प्रणाली',
    switchPerspective: 'भूमिका बदला',
    reaBlueprint: 'आरईए आर्किटेक्चर तपशील',
    signOut: 'बाहेर पडा (लॉग आउट)',
    signInTitle: 'एडुस्फीअर-ईआरपी मध्ये प्रवेश करा',
    signInSubtitle: 'त्वरित १-क्लिक प्रवेशासाठी आपली भूमिका निवडा किंवा क्रेडेन्शियल्स प्रविष्ट करा.',
    quickLogin: 'भूमिकांनुसार १-क्लिक जलद लॉगिन:',
    emailPlaceholder: 'name@edusphere.edu',
    passwordPlaceholder: '••••••••••••',
    keepSignedIn: 'मला या वर्कस्टेशनवर साइन इन ठेवा',
    loginButton: 'प्रमाणित करा आणि डॅशबोर्ड उघडा',
    registerStudent: 'नवीन विद्यार्थी नोंदणी करा',
    activeCampus: 'सक्रिय कॉलेज / कॅम्पस',
    addOrganization: 'नवीन कॉलेज / संस्था जोडा',
    selectTheme: 'कॅम्पस रंग थीम',
    themeTitle: 'संस्थेसाठी दृश्य रंग थीम निवडा',
    themeSubtitle: 'प्रत्येक कॉलेज किंवा शैक्षणिक संस्थेसाठी स्वतंत्र बोधचिन्ह व रंग थीम उपलब्ध आहे.',
    collegeName: 'महाविद्यालय / शैक्षणिक संस्थेचे नाव',
    collegeCode: 'संस्था कोड',
    collegeType: 'संस्थेचा प्रकार',
    tagline: 'ध्येयवाक्य / ब्रीदवाक्य',
    location: 'कॅम्पस शहर / पत्ता',
    establishedYear: 'स्थापना वर्ष',
    accreditation: 'मान्यता / संलग्नता (NAAC/NBA)',
    crestIcon: 'प्रतीक चिन्ह (क्रेस्ट)',
    saveCollege: 'संस्था जोडा व थीम लागू करा',
    switchCollege: 'सक्रिय महाविद्यालय बदला',
    previewTheme: 'थीम रंग पॅलेट पूर्वावलोकन',
    // Navigation
    navDashboard: 'कॅम्पस विहंगावलोकन',
    navStudents: 'विद्यार्थी व नोंदी',
    navStaff: 'कर्मचारी व शिक्षक वर्ग',
    navAttendance: 'दैनिक हजेरी (रोल कॉल)',
    navAccounting: 'लेखापाल व हप्ता शुल्क',
    navExams: 'परीक्षा व निकाल',
    navScheduleExam: 'परीक्षा वेळापत्रक',
    navCertificates: 'प्रमाणपत्रे व टीसी (दाखला)',
    navLiveLecture: 'ऑनलाइन थेट व्हिडिओ व्याख्यान',
    navHomework: 'गृहपाठ व अभ्यास',
    navLogistics: 'वाहतूक, ग्रंथालय व रजा व्यवस्थापन',
    navNoticeBoard: 'सूचना फलक (परिपत्रके)',
    // Roles
    roleAdmin: 'मुख्य प्रशासक',
    roleAccountant: 'लेखापाल व बर्सर',
    roleStaff: 'शिक्षक / प्राध्यापक',
    roleStudent: 'विद्यार्थी / पालक दर्शन',
    // Common terms
    present: 'हजर (उपस्थित)',
    absent: 'गैरहजर',
    late: 'उशिरा',
    excused: 'सवलत रजा',
    paid: 'शुल्क भरले',
    partial: 'अंशतः देय',
    overdue: 'मुदत संपलेले',
    upcoming: 'आगामी',
    due: 'देय रक्कम',
    gpa: 'एकूण जीपीए',
    balance: 'शिल्लक देय रक्कम',
    totalFee: 'एकूण शैक्षणिक शुल्क',
    payInstallment: 'हप्ता भरा',
    receipt: 'पावती',
    print: 'दस्तऐवज छापा',
    search: 'शोधा...',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    close: 'बंद करा',
    submit: 'सादर करा',
    broadcast: 'सूचना प्रसिद्ध करा',
    grade: 'इयत्ता / श्रेणी',
    section: 'तुकडी',
    rollNo: 'हजेरी क्रमांक (रोल नं)',
    busRoute: 'शाळा बस जीपीएस ट्रॅकिंग',
    library: 'ग्रंथालय पुस्तक वितरण',
    leaves: 'रजा मंजुरी अर्ज',
    timetable: 'घंटा वेळापत्रक'
  }
};
