import { Link } from "react-router-dom";

function Dashboard() {

  const userName = localStorage.getItem("user_name");

  const tiles = [
    {
      to: "/upload",
      className: "dash-tile-upload",
      iconBg: "linear-gradient(135deg, rgba(99,102,241,.25), rgba(139,92,246,.2))",
      iconBorder: "rgba(99,102,241,.3)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      ),
      label: "Upload Document",
      desc: "Add new files — PDFs, images and more",
      tag: "New",
      tagColor: "rgba(99,102,241,.3)",
      tagText: "#a5b4fc",
    },
    {
      to: "/search",
      className: "dash-tile-search",
      iconBg: "linear-gradient(135deg, rgba(16,185,129,.2), rgba(5,150,105,.15))",
      iconBorder: "rgba(16,185,129,.3)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      ),
      label: "Search Documents",
      desc: "Find files by category, date, or tags",
      tag: null,
    },
    {
      to: "/admin",
      className: "dash-tile-admin",
      iconBg: "linear-gradient(135deg, rgba(245,158,11,.2), rgba(234,88,12,.15))",
      iconBorder: "rgba(245,158,11,.25)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      label: "Admin Panel",
      desc: "Manage users and system access",
      tag: "Admin",
      tagColor: "rgba(245,158,11,.25)",
      tagText: "#fbbf24",
    },
  ];

  return (
    <div className="dms-content">

      {/* Welcome */}
      <div className="dash-welcome">
        <h1>
          {userName ? `Good day, ${userName} 👋` : "Welcome back 👋"}
        </h1>
        <p>What would you like to manage today?</p>
      </div>

      {/* Tiles */}
      <div className="dash-grid">
        {tiles.map((tile) => (
          <Link
            key={tile.to}
            to={tile.to}
            className={`dash-tile ${tile.className}`}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div
                className="dash-tile-icon"
                style={{
                  background: tile.iconBg,
                  border: `1px solid ${tile.iconBorder}`,
                }}
              >
                {tile.icon}
              </div>
              {tile.tag && (
                <span style={{
                  fontSize: '.68rem',
                  fontWeight: 700,
                  padding: '.2rem .6rem',
                  borderRadius: '99px',
                  background: tile.tagColor,
                  color: tile.tagText,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                }}>
                  {tile.tag}
                </span>
              )}
            </div>

            <div>
              <div className="dash-tile-label">{tile.label}</div>
              <div className="dash-tile-desc">{tile.desc}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', color: 'var(--text-2)', fontSize: '.8rem', fontWeight: 500 }}>
              <span>Open</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>

            <div className="dash-tile-arrow">→</div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;