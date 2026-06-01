// ═══════════════════════════════════════════════════════════════
// api.js — ระบบสามเกลอ อำเภอพิมาย
// Helper สำหรับเรียก GAS API ทุก endpoint
// ═══════════════════════════════════════════════════════════════

const API = (() => {
  async function call(action, payload = {}) {
    const token = sessionStorage.getItem(APP_CONFIG.TOKEN_KEY);
    try {
      const res = await fetch(APP_CONFIG.GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action, payload, token: token || "" })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: "NETWORK_ERROR", message: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้" };
    }
  }

  return {
    login:          (username, password)   => call("auth.login",          { username, password }),
    logout:         ()                     => call("auth.logout",          {}),
    getPatients:    (params = {})          => call("patients.list",        params),
    getPatient:     (patient_id)           => call("patients.get",         { patient_id }),
    savePatient:    (data)                 => call("patients.save",        data),
    getFollowups:   (patient_id)           => call("followup.list",        { patient_id }),
    saveFollowup:   (data)                 => call("followup.save",        data),
    getIncidents:   (params = {})          => call("incidents.list",       params),
    saveIncident:   (data)                 => call("incidents.save",       data),
    closeIncident:  (incident_id, note)    => call("incidents.close",      { incident_id, note }),
    getDashboard:   ()                     => call("dashboard.summary",    {}),
    getVisits:      (params = {})          => call("visits.list",          params),
    saveVisit:      (data)                 => call("visits.save",          data),
    getUsers:       ()                     => call("users.list",           {}),
    saveUser:       (data)                 => call("users.save",           data),
  };
})();
