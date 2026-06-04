// ═══════════════════════════════════════════════════════════════
// firebase.js — Firebase Cache Layer v2.1.2
// ระบบสามเกลอ อำเภอพิมาย
// แก้ไข: ใช้ Script tag แทน dynamic import เพื่อความเสถียร
// ═══════════════════════════════════════════════════════════════

let _db        = null;
let _fbReady   = false;
let _fbLoading = false;
let _fbQueue   = [];

// ── โหลด Firebase SDK ผ่าน Script Tag ───────────────────────
function _loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload  = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function _initFirebase() {
  if (_fbReady) return true;
  if (_fbLoading) {
    return new Promise(res => _fbQueue.push(res));
  }
  _fbLoading = true;

  try {
    // ตรวจว่า APP_CONFIG มีค่าหรือไม่
    if (!window.APP_CONFIG || !window.APP_CONFIG.FIREBASE) {
      console.warn("⚠️ APP_CONFIG.FIREBASE ไม่พบ ใช้ GAS แทน");
      _fbLoading = false;
      return false;
    }

    // โหลด Firebase SDK ผ่าน CDN (compat version — ง่ายกว่า modular)
    await _loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
    await _loadScript("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js");

    // ตรวจว่า firebase object พร้อมใช้งาน
    if (!window.firebase) {
      throw new Error("firebase object ไม่พบหลังโหลด SDK");
    }

    // ตรวจว่า App ถูก init แล้วหรือยัง
    let app;
    try {
      app = window.firebase.app();
    } catch(e) {
      app = window.firebase.initializeApp(APP_CONFIG.FIREBASE);
    }

    _db = window.firebase.firestore(app);
    _fbReady   = true;
    _fbLoading = false;
    _fbQueue.forEach(r => r(true));
    _fbQueue   = [];
    console.log("✅ Firebase Firestore พร้อมใช้งาน");
    return true;

  } catch(e) {
    _fbLoading = false;
    _fbQueue.forEach(r => r(false));
    _fbQueue   = [];
    console.warn("⚠️ Firebase โหลดไม่ได้ ใช้ GAS แทน:", e.message);
    return false;
  }
}

// ── Cache Helper ──────────────────────────────────────────────
const FireCache = {

  async set(col, docId, data, ttl) {
    const ok = await _initFirebase();
    if (!ok || !_db) return false;
    try {
      await _db.collection(col).doc(docId).set({
        data:       JSON.stringify(data),
        expires_at: Date.now() + (ttl * 1000),
        updated_at: Date.now()
      });
      return true;
    } catch(e) {
      console.warn("Cache write error:", e.message);
      return false;
    }
  },

  async get(col, docId) {
    const ok = await _initFirebase();
    if (!ok || !_db) return null;
    try {
      const snap = await _db.collection(col).doc(docId).get();
      if (!snap.exists) return null;
      const cached = snap.data();
      if (Date.now() > cached.expires_at) {
        console.log(`Cache expired: ${col}/${docId}`);
        return null;
      }
      return JSON.parse(cached.data);
    } catch(e) {
      console.warn("Cache read error:", e.message);
      return null;
    }
  }
};

// ── CachedAPI ────────────────────────────────────────────────
const CachedAPI = {

  async getPatients(params) {
    const cacheKey = "patients_list";
    const ttl      = (APP_CONFIG.CACHE_TTL && APP_CONFIG.CACHE_TTL.PATIENTS) || 300;
    const cached   = await FireCache.get("patients", cacheKey);
    if (cached) {
      console.log("⚡ Patients จาก Cache (Firestore)");
      return { success: true, data: cached, message: "สำเร็จ (cached)" };
    }
    console.log("🔄 Patients จาก GAS...");
    const res = await API.getPatients(params);
    if (res.success && res.data && res.data.length) {
      await FireCache.set("patients", cacheKey, res.data, ttl);
      console.log(`✅ Patients บันทึก Cache ${res.data.length} ราย`);
    }
    return res;
  },

  async getDashboard() {
    const cacheKey = "dashboard_summary";
    const ttl      = (APP_CONFIG.CACHE_TTL && APP_CONFIG.CACHE_TTL.DASHBOARD) || 60;
    const cached   = await FireCache.get("dashboard", cacheKey);
    if (cached) {
      console.log("⚡ Dashboard จาก Cache (Firestore)");
      return { success: true, data: cached, message: "สำเร็จ (cached)" };
    }
    console.log("🔄 Dashboard จาก GAS...");
    const res = await API.getDashboard();
    if (res.success && res.data) {
      await FireCache.set("dashboard", cacheKey, res.data, ttl);
      console.log("✅ Dashboard บันทึก Cache แล้ว");
    }
    return res;
  },

  async clearPatientCache() {
    await FireCache.set("patients", "patients_list", null, -1);
    console.log("🗑️ Patient Cache ล้างแล้ว");
  },

  async clearDashboardCache() {
    await FireCache.set("dashboard", "dashboard_summary", null, -1);
    console.log("🗑️ Dashboard Cache ล้างแล้ว");
  }
};

// เริ่ม Firebase ทันทีที่โหลดไฟล์
_initFirebase();
