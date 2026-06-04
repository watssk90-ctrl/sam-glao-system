// ═══════════════════════════════════════════════════════════════
// config.js — ระบบสามเกลอ อำเภอพิมาย
// ═══════════════════════════════════════════════════════════════
const APP_CONFIG = {
  APP_NAME: "ระบบสามเกลอ",
  APP_SUBTITLE: "อำเภอพิมาย จังหวัดนครราชสีมา",
  VERSION: "2.1.0",
  GAS_URL: "https://script.google.com/macros/s/AKfycbwhhpgTBCQ2sMn028bT0Owth8Ox8Rm2_fKGtkbijU6BTGHfme0Bu0PtqOBm2gIB1Upi/exec",
  SESSION_KEY: "samegla_session",
  TOKEN_KEY: "samegla_token",
  SESSION_TIMEOUT: 28800,

  // ── Firebase Config ──────────────────────────────────────────
  FIREBASE: {
    apiKey:            "AIzaSyBA9qZMit0N7KFR-bJ8giUSc9gWVRCpd_I",
    authDomain:        "samglao-phimai.firebaseapp.com",
    projectId:         "samglao-phimai",
    storageBucket:     "samglao-phimai.firebasestorage.app",
    messagingSenderId: "186705412164",
    appId:             "1:186705412164:web:5cfe33e082a20851033c11"
  },

  // ── Cache TTL (วินาที) ───────────────────────────────────────
  CACHE_TTL: {
    PATIENTS:  300,   // 5 นาที
    DASHBOARD: 60,    // 1 นาที
    FOLLOWUP:  120    // 2 นาที
  },

  RISK_LEVELS: {
    1: { label: "ระดับ 1", color: "#22c55e", bg: "#dcfce7", range: "1-4" },
    2: { label: "ระดับ 2", color: "#f59e0b", bg: "#fef3c7", range: "5-9" },
    3: { label: "ระดับ 3", color: "#ef4444", bg: "#fee2e2", range: "10+" }
  },
  ROLES: {
    SYSADMIN:      { label: "System Admin",          home: "dashboard.html" },
    DISTRICT:      { label: "นายอำเภอ/ผู้บริหาร",   home: "dashboard.html" },
    GOVERNOR:      { label: "นายอำเภอ",              home: "dashboard.html" },
    DOCTOR:        { label: "แพทย์/พยาบาล",          home: "patients.html"  },
    NURSE:         { label: "เจ้าหน้าที่ รพ.สต.",   home: "patients.html"  },
    HEALTH_OFFICER:{ label: "เจ้าหน้าที่สาธารณสุข", home: "patients.html"  },
    ASOM:          { label: "อสม.",                  home: "followup.html"  },
    VHV:           { label: "อสม.",                  home: "followup.html"  },
    VILLAGE_HEAD:  { label: "กำนัน/ผู้ใหญ่บ้าน",    home: "incidents.html" },
    HEADMAN:       { label: "กำนัน/ผู้ใหญ่บ้าน",    home: "incidents.html" },
    FAMILY:        { label: "ครอบครัว/ผู้ดูแล",     home: "report.html"    },
    ADMIN_AMPHOE:  { label: "Admin อำเภอ",           home: "dashboard.html" },
    ADMIN:         { label: "Admin อำเภอ",           home: "dashboard.html" }
  }
};
