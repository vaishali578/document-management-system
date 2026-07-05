import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
      <Toaster />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-body">

                <h3 className="mb-4 text-center">
                  Admin - Create User
                </h3>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label">
                      Username
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter Username"
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                    />

                  </div>

                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                  >
                    Create User
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Admin;