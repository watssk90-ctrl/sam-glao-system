// ═══════════════════════════════════════════════════════════════
// config.js — ระบบสามเกลอ อำเภอพิมาย
// ═══════════════════════════════════════════════════════════════

const APP_CONFIG = {
  APP_NAME: "ระบบสามเกลอ",
  APP_SUBTITLE: "อำเภอพิมาย จังหวัดนครราชสีมา",
  VERSION: "2.0.0",

  https://script.google.com/macros/s/AKfycbzH3c9whKGkwlQMKVhTD-5H8cOkpyW0rTrVuL-hOAyZX9YdwfHX2Y-Xprh6wnnQN4tm/exec",

  SESSION_KEY: "samegla_session",
  TOKEN_KEY: "samegla_token",
  SESSION_TIMEOUT: 28800,

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
