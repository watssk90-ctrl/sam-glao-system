// ═══════════════════════════════════════════════════════════════
// firebase.js — Firebase Cache Layer
// ระบบสามเกลอ อำเภอพิมาย v2.1.0
// อ่านจาก Firestore Cache ก่อน ถ้าไม่มีหรือหมดอายุ → GAS
// ═══════════════════════════════════════════════════════════════

// ── โหลด Firebase SDK จาก CDN ────────────────────────────────
const _FB_APP_URL  = "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
const _FB_FIRE_URL = "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let _db        = null;
let _fbReady   = false;
let _fbLoading = false;
let _fbQueue   = [];

async function _initFirebase() {
  if (_fbReady) return true;
  if (_fbLoading) {
    return new Promise(res => _fbQueue.push(res));
  }
  _fbLoading = true;
  try {
    const { initializeApp }       = await import(_FB_APP_URL);
    const { getFirestore,
            doc, getDoc, setDoc,
            collection, getDocs } = await import(_FB_FIRE_URL);

    const app = initializeApp(APP_CONFIG.FIREBASE);
    _db = getFirestore(app);

    // เก็บ Firestore functions ไว้ใช้ภายหลัง
    window._FS = { doc, getDoc, setDoc, collection, getDocs };

    _fbReady = true;
    _fbLoading = false;
    _fbQueue.forEach(r => r(true));
    _fbQueue = [];
    console.log("✅ Firebase Firestore พร้อมใช้งาน");
    return true;
  } catch(e) {
    _fbLoading = false;
    console.warn("⚠️ Firebase โหลดไม่ได้ ใช้ GAS แทน:", e.message);
    return false;
  }
}

// ── Cache Helper ──────────────────────────────────────────────
const FireCache = {

  // เขียน Cache ลง Firestore
  async set(collection_name, doc_id, data, ttl_seconds) {
    const ok = await _initFirebase();
    if (!ok || !_db) return false;
    try {
      const { doc, setDoc } = window._FS;
      await setDoc(doc(_db, collection_name, doc_id), {
        data:       JSON.stringify(data),
        expires_at: Date.now() + (ttl_seconds * 1000),
        updated_at: Date.now()
      });
      return true;
    } catch(e) {
      console.warn("Cache write error:", e.message);
      return false;
    }
  },

  // อ่าน Cache จาก Firestore
  async get(collection_name, doc_id) {
    const ok = await _initFirebase();
    if (!ok || !_db) return null;
    try {
      const { doc, getDoc } = window._FS;
      const snap = await getDoc(doc(_db, collection_name, doc_id));
      if (!snap.exists()) return null;
      const cached = snap.data();
      // ตรวจสอบว่าหมดอายุหรือยัง
      if (Date.now() > cached.expires_at) {
        console.log(`Cache expired: ${collection_name}/${doc_id}`);
        return null;
      }
      return JSON.parse(cached.data);
    } catch(e) {
      console.warn("Cache read error:", e.message);
      return null;
    }
  }
};

// ── API with Cache ────────────────────────────────────────────
const CachedAPI = {

  // ── ดึงรายชื่อผู้ป่วย (Cache 5 นาที) ─────────────────────
  async getPatients(params) {
    const cacheKey = "patients_list";
    const ttl      = APP_CONFIG.CACHE_TTL?.PATIENTS || 300;

    // อ่านจาก Cache ก่อน
    const cached = await FireCache.get("patients", cacheKey);
    if (cached) {
      console.log("⚡ Patients จาก Cache (Firestore)");
      return { success: true, data: cached, message: "สำเร็จ (cached)" };
    }

    // Cache Miss → ดึงจาก GAS
    console.log("🔄 Patients จาก GAS...");
    const res = await API.getPatients(params);
    if (res.success && res.data?.length) {
      await FireCache.set("patients", cacheKey, res.data, ttl);
      console.log(`✅ Patients บันทึก Cache ${res.data.length} ราย`);
    }
    return res;
  },

  // ── ดึง Dashboard (Cache 1 นาที) ──────────────────────────
  async getDashboard() {
    const cacheKey = "dashboard_summary";
    const ttl      = APP_CONFIG.CACHE_TTL?.DASHBOARD || 60;

    const cached = await FireCache.get("dashboard", cacheKey);
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

  // ── ล้าง Cache ทั้งหมด (เรียกหลัง save/update) ────────────
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
