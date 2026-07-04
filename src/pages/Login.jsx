import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateOTP } from "../api/authApi";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      <Toaster position="top-right" />

      <div className="container">
        <div className="row justify-content-center mt-5">

          <div className="col-md-5">

            <div className="card shadow">

              <div className="card-body">

                <h3 className="text-center mb-4">
                  Document Management System
                </h3>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label">
                      Mobile Number
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      value={mobileNumber}
                      onChange={(e) =>
                        setMobileNumber(e.target.value)
                      }
                    />

                  </div>

                  <button
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
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

export default Login;