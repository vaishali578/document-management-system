import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateOTP } from "../api/authApi";
import toast, { Toaster } from "react-hot-toast";
import useAuthStore from "../store/authStore";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore((state) => state.login);

  const mobileNumber = location.state?.mobileNumber;

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
      <Toaster />

      <div className="container mt-5">
        <div className="row justify-content-center">

          <div className="col-md-5">

            <div className="card shadow">

              <div className="card-body">

                <h3 className="text-center mb-4">
                  Verify OTP
                </h3>

                <p className="text-center">
                  Mobile Number
                  <br />
                  <strong>{mobileNumber}</strong>
                </p>

                <form onSubmit={handleVerify}>

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default VerifyOtp;