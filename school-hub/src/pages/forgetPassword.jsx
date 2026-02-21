import { useState } from "react";
import axios from "axios";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMsg(null);

    if (!email) {
      setErrorMsg("Please enter your email");
      return;
    }

    try {
      // مثال لإرسال البريد إلى backend
      await axios.post("http://localhost:5000/api/users/forgot-password", { email });

      setMessage("If this email exists, a reset link has been sent!");
      setEmail(""); // إعادة تعيين الحقل
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="forget-password-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h2 className="mb-3 text-center">Forgot Password</h2>
              <p className="text-center mb-4">
                Enter your email to receive a password reset link.
              </p>

              {message && <div className="alert alert-success">{message}</div>}
              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
