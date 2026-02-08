import { useState } from "react";
import "./Login.css";
function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentID, setStudentID] = useState("");
  const [classCode, setClassCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  

  const showStudentFields = role === "student" || role === "parent";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      setMessage("Please choose a role first");
      setMessageType("error");
      return;
    }

    if (!email || !password) {
      setMessage("Please enter email and password");
      setMessageType("error");
      return;
    }

    if (showStudentFields && (!studentID || !classCode)) {
      setMessage("Please enter Student ID and Class Code");
      setMessageType("error");
      return;
    }

    setMessage("Login successful!");
    setMessageType("success");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-left">
          <h2 id="welcomeTitle">
            {role
              ? `Welcome, ${role.charAt(0).toUpperCase() + role.slice(1)}!`
              : "Welcome!"}
          </h2>

        \
        </div>

        <div className="login-right">
          <h2 className="form-title">Login</h2>

          <form onSubmit={handleSubmit}>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Choose Role</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
  type="password"
  placeholder="Password"
  className="form-control"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  onFocus={() => setPasswordFocused(true)}
  onBlur={() => setPasswordFocused(false)}
/>

            {showStudentFields && (
              <>
                <input
                  type="text"
                  placeholder="Student ID"
                  className="form-control"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Class Code"
                  className="form-control"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                />
              </>
            )}

            <button type="submit" className="login-btn">
              Login
            </button>

            {message && (
              <p className={`form-message ${messageType}`}>
                {message}
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
