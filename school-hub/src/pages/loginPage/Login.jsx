import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setErrorMsg(null);

    try {
      if (!isLogin) {
        await axios.post("http://localhost:5000/api/users/activate", {
          userId,
          email,
          password,
          schoolId: role === "schoolAdmin" ? schoolId : undefined
        });

        setMessage("Account activated successfully! You can now log in.");
        setIsLogin(true);
        setUserId("");
        setEmail("");
        setPassword("");
        setRole("");
        setSchoolId("");

      } else {
        const res = await axios.post(
          "http://localhost:5000/api/users/login",
          { email, password }
        );

        const token = res.data.token;
        const user = res.data.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));

        navigate(`/dashboard/${user.role}`);
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${!isLogin ? "active" : ""}`}>

        {/* LEFT PANEL */}
        <div className="panel panel-left">
          <h1>School Hub</h1>
          <img src="/images/logo-img.png" alt="logo" />
          <p>
            {isLogin
              ? "New here? Activate your account."
              : "Already activated? Login now!"}
          </p>
          <button
            className="ghost-btn btn btn-outline-primary btn-lg"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage(null);
              setErrorMsg(null);
            }}
          >
            {isLogin ? "Activate Account" : "Login"}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="panel panel-right">
          <h2>{isLogin ? "Login" : "Activate Account"}</h2>

          <form onSubmit={handleSubmit}>

            {/* ✅ الرسائل */}
            {message && (
              <div className="success-msg">{message}</div>
            )}

            {errorMsg && (
              <div className="error-msg">{errorMsg}</div>
            )}

            {!isLogin && (
              <>
                {/* 👇 الدور أول خانة */}
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Choose Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                  <option value="schoolAdmin">School Admin</option>
                </select>

                <input
                  type="text"
                  placeholder="User ID"
                  className="form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />

                {role === "schoolAdmin" && (
                  <input
                    type="text"
                    placeholder="School ID"
                    className="form-control"
                    value={schoolId}
                    onChange={(e) => setSchoolId(e.target.value)}
                    required
                  />
                )}
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="main-btn btn btn-primary btn-lg">
              {isLogin ? "Login" : "Activate"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
