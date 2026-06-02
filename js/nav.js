// ═══════════════════════════════════════════════════════════════
// nav.js — ระบบสามเกลอ อำเภอพิมาย
// Responsive Navigation: Desktop Sidebar + Tablet Hamburger + Mobile Bottom Nav
// ═══════════════════════════════════════════════════════════════

const NAV = (() => {

  // ── เมนูทั้งหมด ───────────────────────────────────────────────
  const MENU_ITEMS = [
    {
      id:    "dashboard",
      label: "Dashboard",
      href:  "dashboard.html",
      roles: ["SYSADMIN","DISTRICT","GOVERNOR","DOCTOR","NURSE","HEALTH_OFFICER","ADMIN_AMPHOE","ADMIN"],
      icon:  `<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/></svg>`
    },
    {
      id:    "patients",
      label: "ผู้ป่วย",
      href:  "patients.html",
      roles: ["SYSADMIN","DOCTOR","NURSE","HEALTH_OFFICER","ADMIN_AMPHOE","ADMIN"],
      icon:  `<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
    },
    {
      id:    "followup",
      label: "ประเมิน 5+7",
      href:  "followup.html",
      roles: ["SYSADMIN","DOCTOR","NURSE","HEALTH_OFFICER","ASOM","VHV","ADMIN_AMPHOE","ADMIN"],
      icon:  `<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`
    },
    {
      id:    "incidents",
      label: "เหตุการณ์",
      href:  "incidents.html",
      roles: ["SYSADMIN","DISTRICT","GOVERNOR","DOCTOR","NURSE","HEALTH_OFFICER","ASOM","VHV","VILLAGE_HEAD","HEADMAN","FAMILY","ADMIN_AMPHOE","ADMIN"],
      icon:  `<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`
    },
    {
      id:    "visits",
      label: "เยี่ยมบ้าน",
      href:  "visits.html",
      roles: ["SYSADMIN","DOCTOR","NURSE","HEALTH_OFFICER","ASOM","VHV","ADMIN_AMPHOE","ADMIN"],
      icon:  `<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`
    },
    {
      id:    "treatment",
      label: "แผนการรักษา",
      href:  "treatment.html",
      roles: ["SYSADMIN","DOCTOR","NURSE","HEALTH_OFFICER","ADMIN_AMPHOE","ADMIN"],
      icon:  `<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`
    },
    {
      id:    "users",
      label: "ผู้ใช้งาน",
      href:  "users.html",
      roles: ["SYSADMIN","ADMIN_AMPHOE","ADMIN"],
      icon:  `<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
    }
  ];

  // ── CSS ที่ inject เข้าไป ────────────────────────────────────
  const NAV_CSS = `
    <style id="nav-styles">
      .nav-icon { width:18px; height:18px; flex-shrink:0; }

      /* ══ SIDEBAR (Desktop ≥1024px) ══════════════════════════ */
      #nav-sidebar {
        position: fixed; top:0; left:0; height:100vh; width:240px;
        background: linear-gradient(180deg,#0f172a 0%,#1e3a5f 100%);
        display: flex; flex-direction: column; padding: 16px;
        z-index: 40; transition: transform 0.3s ease;
      }
      #nav-sidebar .nav-brand { margin-bottom:28px; padding:4px 8px 0; }
      #nav-sidebar .nav-brand h1 { color:white; font-weight:700; font-size:18px; }
      #nav-sidebar .nav-brand p  { color:rgba(147,197,253,0.6); font-size:12px; margin-top:2px; }
      #nav-sidebar .nav-links { flex:1; display:flex; flex-direction:column; gap:2px; }
      #nav-sidebar .nav-link {
        display:flex; align-items:center; gap:12px;
        padding:10px 12px; border-radius:10px; font-size:14px;
        color:rgba(147,197,253,0.7); text-decoration:none;
        transition:all 0.15s;
      }
      #nav-sidebar .nav-link:hover { background:rgba(255,255,255,0.1); color:white; }
      #nav-sidebar .nav-link.active { background:rgba(255,255,255,0.1); color:white; }
      #nav-sidebar .nav-footer { border-top:1px solid rgba(255,255,255,0.1); padding-top:16px; }
      #nav-sidebar .nav-user { display:flex; align-items:center; gap:10px; padding:0 8px 12px; }
      #nav-sidebar .nav-avatar {
        width:32px; height:32px; border-radius:50%;
        background:rgba(59,130,246,0.3); display:flex; align-items:center; justify-content:center; flex-shrink:0;
      }
      #nav-sidebar .nav-avatar svg { width:16px; height:16px; color:rgba(147,197,253,1); }
      #nav-sidebar .nav-username { color:white; font-size:12px; font-weight:500; }
      #nav-sidebar .nav-role { color:rgba(147,197,253,0.6); font-size:11px; }
      #nav-sidebar .nav-logout {
        display:flex; align-items:center; gap:8px;
        padding:8px 12px; border-radius:10px; font-size:12px;
        color:rgba(248,113,113,0.7); cursor:pointer; border:none; background:none; width:100%; text-align:left;
        transition:all 0.15s;
      }
      #nav-sidebar .nav-logout:hover { color:rgb(248,113,113); background:rgba(239,68,68,0.1); }
      #nav-sidebar .nav-logout svg { width:16px; height:16px; flex-shrink:0; }

      /* ══ MAIN CONTENT offset ════════════════════════════════ */
      .nav-main { margin-left:240px; min-height:100vh; }

      /* ══ HAMBURGER BUTTON (Tablet 768–1023px) ═══════════════ */
      #nav-hamburger {
        display:none; position:fixed; top:12px; left:12px; z-index:50;
        width:44px; height:44px; border-radius:12px; border:none; cursor:pointer;
        background:linear-gradient(135deg,#1e3a5f,#0f172a);
        box-shadow:0 4px 12px rgba(0,0,0,0.3);
        align-items:center; justify-content:center;
      }
      #nav-hamburger svg { width:22px; height:22px; color:white; }

      /* ══ OVERLAY (Tablet/Mobile) ════════════════════════════ */
      #nav-overlay {
        display:none; position:fixed; inset:0; z-index:35;
        background:rgba(0,0,0,0.5); backdrop-filter:blur(2px);
      }
      #nav-overlay.active { display:block; }

      /* ══ BOTTOM NAV (Mobile <768px) ═════════════════════════ */
      #nav-bottom {
        display:none; position:fixed; bottom:0; left:0; right:0; z-index:40;
        background:linear-gradient(180deg,#0f172a,#1e293b);
        border-top:1px solid rgba(255,255,255,0.1);
        padding:8px 0 env(safe-area-inset-bottom,8px);
      }
      #nav-bottom .bottom-nav-items {
        display:flex; justify-content:space-around; align-items:center;
      }
      #nav-bottom .bottom-nav-item {
        display:flex; flex-direction:column; align-items:center; gap:3px;
        padding:6px 12px; border-radius:12px; text-decoration:none;
        color:rgba(147,197,253,0.6); font-size:10px; transition:all 0.15s;
        min-width:56px;
      }
      #nav-bottom .bottom-nav-item svg { width:22px; height:22px; }
      #nav-bottom .bottom-nav-item.active { color:white; background:rgba(255,255,255,0.1); }
      #nav-bottom .bottom-nav-item:hover { color:white; }
      #nav-bottom .bottom-more {
        display:flex; flex-direction:column; align-items:center; gap:3px;
        padding:6px 12px; border-radius:12px;
        color:rgba(147,197,253,0.6); font-size:10px; cursor:pointer;
        min-width:56px; border:none; background:none;
      }
      #nav-bottom .bottom-more svg { width:22px; height:22px; }

      /* ══ MORE MENU (Mobile popup) ═══════════════════════════ */
      #nav-more-menu {
        display:none; position:fixed; bottom:80px; right:12px; z-index:50;
        background:linear-gradient(135deg,#1e3a5f,#0f172a);
        border:1px solid rgba(255,255,255,0.15); border-radius:16px;
        padding:8px; min-width:180px;
        box-shadow:0 -8px 32px rgba(0,0,0,0.4);
      }
      #nav-more-menu.active { display:block; }
      #nav-more-menu a {
        display:flex; align-items:center; gap:10px;
        padding:10px 12px; border-radius:10px; font-size:13px;
        color:rgba(147,197,253,0.8); text-decoration:none; transition:all 0.15s;
      }
      #nav-more-menu a:hover { background:rgba(255,255,255,0.1); color:white; }
      #nav-more-menu a.active { background:rgba(255,255,255,0.1); color:white; }
      #nav-more-menu .more-logout {
        display:flex; align-items:center; gap:10px;
        padding:10px 12px; border-radius:10px; font-size:13px;
        color:rgba(248,113,113,0.8); cursor:pointer; border:none; background:none; width:100%;
        border-top:1px solid rgba(255,255,255,0.1); margin-top:4px; padding-top:12px;
      }
      #nav-more-menu .more-logout:hover { color:rgb(248,113,113); background:rgba(239,68,68,0.1); }

      /* ══ RESPONSIVE BREAKPOINTS ═════════════════════════════ */

      /* Tablet: 768px – 1023px */
      @media (min-width:768px) and (max-width:1023px) {
        #nav-sidebar { transform: translateX(-240px); }
        #nav-sidebar.open { transform: translateX(0); }
        #nav-hamburger { display:flex; }
        #nav-bottom { display:none !important; }
        .nav-main { margin-left:0; padding-top:64px; }
      }

      /* Mobile: < 768px */
      @media (max-width:767px) {
        #nav-sidebar { display:none; }
        #nav-hamburger { display:none; }
        #nav-bottom { display:block; }
        .nav-main { margin-left:0; padding-bottom:80px; }
      }

      /* Desktop: ≥ 1024px */
      @media (min-width:1024px) {
        #nav-sidebar { transform: translateX(0) !important; }
        #nav-hamburger { display:none !important; }
        #nav-bottom { display:none !important; }
        .nav-main { margin-left:240px; }
      }
    </style>
  `;

  // ── หาชื่อหน้าปัจจุบัน ────────────────────────────────────────
  function _currentPage() {
    const path = window.location.pathname;
    const file = path.split("/").pop() || "dashboard.html";
    return file.replace(".html","");
  }

  // ── กรองเมนูตาม Role ─────────────────────────────────────────
  function _getMenuForRole(role) {
    return MENU_ITEMS.filter(item => item.roles.includes(role));
  }

  // ── สร้าง Sidebar HTML ────────────────────────────────────────
  function _buildSidebar(session, menuItems, currentPage) {
    const links = menuItems.map(item => `
      <a href="${item.href}" class="nav-link ${currentPage === item.id ? "active" : ""}">
        ${item.icon}
        <span>${item.label}</span>
      </a>
    `).join("");

    const roleLabel = APP_CONFIG.ROLES[session.role]?.label || session.role;

    return `
      <nav id="nav-sidebar">
        <div class="nav-brand">
          <h1>ระบบสามเกลอ</h1>
          <p>อ.พิมาย จ.นครราชสีมา</p>
        </div>
        <div class="nav-links">${links}</div>
        <div class="nav-footer">
          <div class="nav-user">
            <div class="nav-avatar">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div style="min-width:0">
              <div class="nav-username" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${session.full_name || session.username}</div>
              <div class="nav-role">${roleLabel}</div>
            </div>
          </div>
          <button class="nav-logout" onclick="NAV.logout()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            ออกจากระบบ
          </button>
        </div>
      </nav>
    `;
  }

  // ── สร้าง Bottom Nav HTML (Mobile) ───────────────────────────
  function _buildBottomNav(menuItems, currentPage) {
    // แสดงแค่ 4 เมนูหลักใน Bottom Bar ที่เหลือไปอยู่ใน More
    const mainItems = menuItems.slice(0, 4);
    const moreItems = menuItems.slice(4);

    const mainLinks = mainItems.map(item => `
      <a href="${item.href}" class="bottom-nav-item ${currentPage === item.id ? "active" : ""}">
        ${item.icon}
        <span>${item.label}</span>
      </a>
    `).join("");

    let moreBtn = "";
    let moreMenu = "";

    if (moreItems.length > 0) {
      const moreLinks = moreItems.map(item => `
        <a href="${item.href}" class="${currentPage === item.id ? "active" : ""}">
          ${item.icon}
          <span>${item.label}</span>
        </a>
      `).join("");

      moreBtn = `
        <button class="bottom-more" onclick="NAV.toggleMore()">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
          <span>เพิ่มเติม</span>
        </button>
      `;

      moreMenu = `
        <div id="nav-more-menu">
          ${moreLinks}
          <button class="more-logout" onclick="NAV.logout()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            ออกจากระบบ
          </button>
        </div>
      `;
    } else {
      moreBtn = `
        <button class="bottom-more" onclick="NAV.logout()">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          <span>ออก</span>
        </button>
      `;
    }

    return `
      ${moreMenu}
      <nav id="nav-bottom">
        <div class="bottom-nav-items">
          ${mainLinks}
          ${moreBtn}
        </div>
      </nav>
    `;
  }

  // ── Init หลัก ─────────────────────────────────────────────────
  function init() {
    const session = Auth.requireAuth();
    if (!session) return;

    const currentPage = _currentPage();
    const menuItems   = _getMenuForRole(session.role);

    // Inject CSS
    document.head.insertAdjacentHTML("beforeend", NAV_CSS);

    // สร้าง Nav HTML
    const sidebarHTML   = _buildSidebar(session, menuItems, currentPage);
    const bottomNavHTML = _buildBottomNav(menuItems, currentPage);
    const hamburgerHTML = `
      <button id="nav-hamburger" onclick="NAV.toggleSidebar()" aria-label="เปิดเมนู">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <div id="nav-overlay" onclick="NAV.closeSidebar()"></div>
    `;

    // Inject เข้า body
    document.body.insertAdjacentHTML("afterbegin",
      sidebarHTML + hamburgerHTML + bottomNavHTML
    );

    // Wrap content ในส่วน main
    const mainContent = document.getElementById("nav-main-content");
    if (mainContent) mainContent.classList.add("nav-main");
  }

  // ── Toggle Sidebar (Tablet) ────────────────────────────────────
  function toggleSidebar() {
    const sidebar = document.getElementById("nav-sidebar");
    const overlay = document.getElementById("nav-overlay");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
  }

  function closeSidebar() {
    document.getElementById("nav-sidebar").classList.remove("open");
    document.getElementById("nav-overlay").classList.remove("active");
  }

  // ── Toggle More Menu (Mobile) ──────────────────────────────────
  function toggleMore() {
    const menu = document.getElementById("nav-more-menu");
    if (menu) menu.classList.toggle("active");
  }

  // ── Logout ────────────────────────────────────────────────────
  async function logout() {
    await API.logout();
    Auth.clearSession();
    window.location.href = "../index.html";
  }

  return { init, toggleSidebar, closeSidebar, toggleMore, logout };
})();
