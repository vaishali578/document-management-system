import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateOTP } from "../api/authApi";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    try {
      setLoading(true);

      await generateOTP({
        mobile_number: mobileNumber,
      });

      toast.success("OTP sent successfully");

      navigate("/verify-otp", {
        state: {
          mobileNumber,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Animated background */}
      <div className="dms-bg-mesh">
        <div className="dms-bg-grid" />
        <div className="dms-orb dms-orb-1" />
        <div className="dms-orb dms-orb-2" />
      </div>

      {/* Floating dots */}
      <div className="floating-dot floating-dot-1" />
      <div className="floating-dot floating-dot-2" />
      <div className="floating-dot floating-dot-3" />
      <div className="floating-dot floating-dot-4" />

      <div className="dms-page">
        <div className="auth-card">

          {/* Logo */}
          <div className="auth-logo">
            <div className="auth-logo-icon-wrap">
              <div className="ring" />
              <div className="auth-logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="rgba(255,255,255,0.9)" />
                  <polyline points="14 2 14 8 20 8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                  <line x1="8" y1="13" x2="16" y2="13" stroke="rgba(99,102,241,0.8)" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="8" y1="17" x2="13" y2="17" stroke="rgba(139,92,246,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div>
              <div className="auth-title">Document Manager</div>
              <div style={{ textAlign: 'center', fontSize: '.7rem', color: 'var(--text-3)', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '.15rem' }}>
                Secure · Organized · Fast
              </div>
            </div>
          </div>

          <p className="auth-subtitle">
            Enter your mobile number and we'll send you a one-time password to sign in.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="dms-field">
              <label className="dms-label">📱 Mobile Number</label>
              <input
                type="text"
                className="dms-input"
                placeholder="e.g. 9876543210"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength={10}
              />
            </div>

            <div className="dms-btn-submit-wrap">
              <button
                className="dms-btn dms-btn-primary dms-btn-full"
                disabled={loading}
              >
                {loading && <span className="dms-spinner" />}
                {loading ? "Sending OTP…" : "Send OTP →"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </>
  );
}

export default Login;