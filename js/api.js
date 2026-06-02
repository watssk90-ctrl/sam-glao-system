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
    // Auth
    login:         (username, password) => call("auth.login",       { username, password }),
    logout:        ()                   => call("auth.logout",       {}),

    // Patient
    getPatients:   (params = {})        => call("patient.list",      params),
    getPatient:    (patient_id)         => call("patient.get",       { patient_id }),
    savePatient:   (data)               => data.patient_id
                                           ? call("patient.update",  data)
                                           : call("patient.create",  data),

    // Followup
    getFollowups:  (patient_id)         => call("followup.list",     { patient_id }),
    saveFollowup:  (data)               => call("followup.save",     data),

    // Incident
    getIncidents:  (params = {})        => call("incident.list",     params),
    saveIncident:  (data)               => call("incident.create",   data),
    closeIncident: (incident_id, note, status) => call("incident.resolve", { incident_id, action_taken: note, status }),

    // Dashboard
    getDashboard:  ()                   => call("dashboard.summary", {}),

    // Visit
    getVisits:     (params = {})        => call("visit.list",        params),
    saveVisit:     (data)               => call("visit.complete",    data),

    // User
    getUsers:      ()                   => call("user.list",         {}),
    saveUser:      (data)               => data.user_id
                                           ? call("user.update",     data)
                                           : call("user.create",     data),

    // Utility — เรียก action ตรงๆ
    call:          (action, payload)    => call(action, payload)
  };
})();
