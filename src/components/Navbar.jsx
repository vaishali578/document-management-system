import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.user_name
    ? user.user_name.slice(0, 2).toUpperCase()
    : "U";

  return (
    <nav className="dms-navbar">
      <div className="dms-navbar-inner">

        <Link to="/dashboard" className="dms-brand">
          <div className="dms-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="rgba(255,255,255,0.95)" />
              <polyline points="14 2 14 8 20 8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="dms-brand-name">DMS</span>
        </Link>

        <div className="dms-navbar-right">
          <div className="dms-user-badge">
            <div className="dms-avatar">{initials}</div>
            <span style={{ color: 'var(--text-2)', fontSize: '.875rem' }}>{user.user_name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="dms-btn dms-btn-ghost dms-btn-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;