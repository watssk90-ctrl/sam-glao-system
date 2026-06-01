// ═══════════════════════════════════════════════════════════════
// auth.js — ระบบสามเกลอ อำเภอพิมาย
// Session & Authentication management
// ═══════════════════════════════════════════════════════════════

const Auth = (() => {
  function getSession() {
    try {
      const s = sessionStorage.getItem(APP_CONFIG.SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  }

  function setSession(user, token) {
    sessionStorage.setItem(APP_CONFIG.SESSION_KEY, JSON.stringify(user));
    sessionStorage.setItem(APP_CONFIG.TOKEN_KEY, token);
  }

  function clearSession() {
    sessionStorage.removeItem(APP_CONFIG.SESSION_KEY);
    sessionStorage.removeItem(APP_CONFIG.TOKEN_KEY);
  }

  function requireAuth() {
    const session = getSession();
    if (!session) {
      window.location.href = "index.html";
      return null;
    }
    return session;
  }

  function hasRole(...roles) {
    const s = getSession();
    return s && roles.includes(s.role);
  }

  return { getSession, setSession, clearSession, requireAuth, hasRole };
})();
