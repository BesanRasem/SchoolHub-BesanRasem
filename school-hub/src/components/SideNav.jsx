import { Link } from "react-router-dom";
import "./SideNav.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function SideNav() {
  const { setAccessToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("are you sure");
    if (!confirmed) return; 
    try {
      await api.post("/users/logout");
      setAccessToken(null);
      setUser(null);
      navigate("/login");
    } catch (err) {
      alert("logout failed");
    }
  };

  return (
    <div>
      <aside className="SideNav d-none d-lg-block h-100">
        <h4 className="sidenav-title">School Hub</h4>
        <ul className="sidenav-list">
          <li><Link to="/dashboard/student" className="sidenav-link"><i className="fa-solid fa-house"></i> Dashboard</Link></li>
          <li><Link to="/dashboard/student/schedule" className="sidenav-link"><i className="fa-solid fa-calendar-days"></i> Schedule</Link></li>
          <li><Link to="/dashboard/student/homework" className="sidenav-link"><i className="fa-solid fa-book"></i> Homework</Link></li>
          <li><Link to="/dashboard/student/exams" className="sidenav-link"><i className="fa-solid fa-file-lines"></i> Exams</Link></li>
          <li><Link to="/dashboard/student/lessons" className="sidenav-link"><i className="fa-solid fa-user"></i> Lessons</Link></li>
          <li><Link to="/dashboard/student/grades" className="sidenav-link"><i className="fa-solid fa-chart-line"></i> Grades</Link></li>
          <li>
            <div className="sidenav-link logout-link" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </aside>

      {/* Navbar للجوال */}
      <nav className="navbar navbar-expand-lg d-lg-none">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">School Hub</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <Link className="nav-link" to="/dashboard/student">Dashboard</Link>
              <Link className="nav-link" to="/dashboard/student/schedule">Schedule</Link>
              <Link className="nav-link" to="/dashboard/student/homework">Homework</Link>
              <Link className="nav-link" to="/dashboard/student/exams">Exams</Link>
              <Link className="nav-link" to="/dashboard/student/lessons">Lessons</Link>
              <Link className="nav-link" to="/dashboard/student/grades">Grades</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideNav;