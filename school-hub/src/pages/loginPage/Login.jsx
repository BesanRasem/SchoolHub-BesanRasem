import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api, { setAxiosToken } from "../../api/axios";
import { useLocation } from "react-router-dom";


function Auth() {
  const location = useLocation();

  const { setAccessToken, setUser } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(!location.state?.activate);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true); 
    setMessage("");
    setErrorMsg("");

    try {
       await wait(500);
      
      if (!isLogin) {
        await api.post("/users/activate", {
          userId,
          email,
          password,
        });

        setMessage(" Account activated successfully. Please login.");
        setIsLogin(true);

        setUserId("");
        setEmail("");
        setPassword("");
      } 

      else {
        const res = await api.post("/users/login", {
          email,
          password,
        });

        if (!res.data?.accessToken) {
          throw new Error("Login failed: No token received");
        }

        setAccessToken(res.data.accessToken);
        setAxiosToken(res.data.accessToken);
        setUser(res.data.data);

        navigate(`/dashboard/${res.data.data.role}`);
      }
    } catch (error) {
      console.log("Login Error:", error);

      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else if (error.message) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Unexpected error occurred. Please try again.");
      }
    }finally {
    setLoading(false); 
  }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${!isLogin ? "active" : ""}`}>
        
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
              setMessage("");
              setErrorMsg("");
            }}
          >
            {isLogin ? "Activate Account" : "Login"}
          </button>
        </div>

        <div className="panel panel-right">
          <h2>{isLogin ? "Login" : "Activate Account"}</h2>

          <form onSubmit={handleSubmit}>
            {message && (
              <div className="alert alert-success">{message}</div>
            )}

            {errorMsg && (
              <div className="alert alert-danger">{errorMsg}</div>
            )}

            {!isLogin && (
              <input
                type="text"
                placeholder="User ID"
                className="form-control"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
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

            <button type="submit" className="main-btn btn btn-primary btn-lg w-100" disabled={loading}>
              {loading && ( <span className="spinner-border spinner-border-sm" role="status" /> )}
              
              {isLogin ? "Login" : "Activate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
