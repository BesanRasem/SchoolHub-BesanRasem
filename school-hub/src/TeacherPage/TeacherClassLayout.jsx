import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import "./Teacherashboard.css";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function TeacherClassLayout() {
  const { classId } = useParams();
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

  const handleBack = () => {
    navigate("/dashboard/teacher");
  };

  return (
    <>
      {/* ==================== Navbar ==================== */}
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-2">
            <img src="/images/logo-img.png" alt="logo" height="40" />
            <span className="navbar-brand mb-0 fw-bold">Teacher Portal</span>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#teacherNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="teacherNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/attendance`}
                  className={({ isActive }) => "nav-link px-3" + (isActive ? " active" : "")}
                >
                  Attendance
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/subjects`}
                  className={({ isActive }) => "nav-link px-3" + (isActive ? " active" : "")}
                >
                  Subjects
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/grades`}
                  className={({ isActive }) => "nav-link px-3" + (isActive ? " active" : "")}
                >
                  Grades
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/exams`}
                  className={({ isActive }) => "nav-link px-3" + (isActive ? " active" : "")}
                >
                  Exams
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/schedule`}
                  className={({ isActive }) => "nav-link px-3" + (isActive ? " active" : "")}
                >
                  Schedule
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/lessons`}
                  className={({ isActive }) => "nav-link px-3" + (isActive ? " active" : "")}
                >
                  Lessons
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/homework`}
                  className={({ isActive }) => "nav-link px-3" + (isActive ? " active" : "")}
                >
                  Homework
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ==================== Back + Logout ==================== */}
      <div className="container-fluid mt-2 d-flex justify-content-between ">
        <button className="btn btn-outline-secondary back-btn" onClick={handleBack}>
          <i className="fa-solid fa-arrow-left"></i>
           Back
        </button>

        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </div>

      <div className="container mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default TeacherClassLayout;