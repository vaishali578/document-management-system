import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateOTP } from "../api/authApi";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { token, login } = useAuthStore();

  const mobileNumber = location.state?.mobileNumber;

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    } else if (!mobileNumber) {
      navigate("/", { replace: true });
    }
  }, [token, mobileNumber, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await validateOTP({
        mobile_number: mobileNumber,
        otp,
      });

      const data = response.data.data;

      login(data);
      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP");
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

      <div className="floating-dot floating-dot-1" />
      <div className="floating-dot floating-dot-2" />
      <div className="floating-dot floating-dot-3" />
      <div className="floating-dot floating-dot-4" />

      <div className="dms-page">
        <div className="auth-card">

          {/* Icon */}
          <div className="auth-logo">
            <div className="auth-logo-icon-wrap">
              <div className="ring" />
              <div className="auth-logo-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            <div className="auth-title">Verify OTP</div>
          </div>

          <p className="auth-subtitle">
            We sent a 6-digit code to{" "}
            <span style={{ color: 'var(--accent)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {mobileNumber}
            </span>
          </p>

          <form onSubmit={handleVerify}>

            <div className="dms-field">
              <label className="dms-label">🔐 One-Time Password</label>
              <input
                type="text"
                className="dms-input otp-input"
                placeholder="● ● ● ● ● ●"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>

            <div className="dms-btn-submit-wrap">
              <button
                className="dms-btn dms-btn-success dms-btn-full"
                disabled={loading}
              >
                {loading && <span className="dms-spinner" />}
                {loading ? "Verifying…" : "Verify & Sign In →"}
              </button>
            </div>

          </form>

        </div>
      </div>
    </>
  );
}

export default VerifyOtp;