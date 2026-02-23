import { NavLink, Outlet, useParams } from "react-router-dom";
import "./Teacherashboard.css";

function TeacherClassLayout() {
  const { classId } = useParams();

  const classInfo = {
    name: `Grade ${classId} - A`,
    isHomeroom: true,
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light  shadow-sm">
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
            aria-controls="teacherNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="teacherNavbar">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/attendance`}
                  className={({ isActive }) =>
                    "nav-link px-3" + (isActive ? " active" : "")
                  }
                >
                  Attendance
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/subjects`}
                  className={({ isActive }) =>
                    "nav-link px-3" + (isActive ? " active" : "")
                  }
                >
                  Subjects
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/grades`}
                  className={({ isActive }) =>
                    "nav-link px-3" + (isActive ? " active" : "")
                  }
                >
                  Grades
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/dashboard/teacher/classes/${classId}/exams`}
                  className={({ isActive }) =>
                    "nav-link px-3" + (isActive ? " active" : "")
                  }
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
    className={({ isActive }) =>
      "nav-link px-3" + (isActive ? " active" : "")
    }
  >
    Lessons
  </NavLink>
</li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        

        <Outlet />
      </div>
    </>
  );
}

export default TeacherClassLayout;