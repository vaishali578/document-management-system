import { useState } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      toast.error("Username is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    toast.success("User created successfully (Demo)");

    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div className="dms-content">

        <div className="page-header">
          <div className="page-title">Admin Panel</div>
          <div className="page-subtitle">Create and manage system user accounts</div>
        </div>

        <div style={{ maxWidth: 500 }}>
          <div className="dms-card" style={{ animation: 'scale-in .4s .1s both' }}>

            <div className="dms-card-header">
              <div className="icon-badge" style={{ background: 'rgba(245,158,11,.15)', border: '1px solid rgba(245,158,11,.25)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <line x1="20" y1="8" x2="20" y2="14"/>
                  <line x1="23" y1="11" x2="17" y2="11"/>
                </svg>
              </div>
              <span className="dms-card-title">Create New User</span>
            </div>

            <div className="dms-card-body">
              <form onSubmit={handleSubmit}>

                <div className="dms-field">
                  <label className="dms-label">Username</label>
                  <input
                    type="text"
                    className="dms-input"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                </div>

                <div className="dms-field">
                  <label className="dms-label">Password</label>
                  <input
                    type="password"
                    className="dms-input"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter secure password"
                  />
                </div>

                <hr className="dms-divider" />

                <button
                  className="dms-btn dms-btn-primary dms-btn-full"
                  type="submit"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <line x1="20" y1="8" x2="20" y2="14"/>
                    <line x1="23" y1="11" x2="17" y2="11"/>
                  </svg>
                  Create User
                </button>

              </form>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Admin;