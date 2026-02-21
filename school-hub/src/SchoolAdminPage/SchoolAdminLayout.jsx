import { Outlet, NavLink } from "react-router-dom";
import "./AdminDashboard.css";

function SchoolAdminLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-2">
            <img src="/images/logo-img.png" alt="logo" height="40" />
            <span className="navbar-brand mb-0">School Hub</span>
          </div>

          <div className="navbar-nav mx-auto">
            <NavLink
              to="/dashboard/schooladmin/students"
              className="nav-link"
            >
              Students
            </NavLink>

            <NavLink
              to="/dashboard/schooladmin/teachers"
              className="nav-link"
            >
              Teachers
            </NavLink>

            <NavLink
              to="/dashboard/schooladmin/classes"
              className="nav-link"
            >
              Classes
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        <Outlet />
      </div>
    </>
  );
}

export default SchoolAdminLayout;
