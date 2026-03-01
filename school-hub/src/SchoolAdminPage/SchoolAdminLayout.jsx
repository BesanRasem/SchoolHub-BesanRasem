import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./AdminDashboard.css";

function SchoolAdminLayout() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      await api.post("/users/logout");
      setAccessToken(null);
      setUser(null);
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
        <div className="container-fluid">
          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <img src="/images/logo-img.png" alt="logo" height="40" />
            <span className="navbar-brand fw-bold mb-0">School Hub</span>
          </div>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items */}
          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/schooladmin/students"
                  className={({ isActive }) =>
                    "nav-link px-3" + (isActive ? " active" : "")
                  }
                >
                  Students
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/dashboard/schooladmin/teachers"
                  className={({ isActive }) =>
                    "nav-link px-3" + (isActive ? " active" : "")
                  }
                >
                  Teachers
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/dashboard/schooladmin/classes"
                  className={({ isActive }) =>
                    "nav-link px-3" + (isActive ? " active" : "")
                  }
                >
                  Classes
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid d-flex justify-content-end mt-2">
        <span
          onClick={handleLogout}
          className="d-flex align-items-center btn btn-outline-danger">
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </span>
      </div>

      <div className="container-fluid mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default SchoolAdminLayout;