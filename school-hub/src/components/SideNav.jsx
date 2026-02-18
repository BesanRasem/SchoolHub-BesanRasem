import { Link } from "react-router-dom";
import "./SideNav.css";



function SideNav() {
  return (
    <div>
    <aside className="SideNav SideNav d-none d-lg-block h-100">
      <h4 className="sidenav-title">School Hub</h4>
      <ul className="sidenav-list">
        <li><Link to="#" className="sidenav-link active"><i className="fa-solid fa-house"></i> Dashboard</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-calendar-days"></i> Schedule</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-book"></i> Homework</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-file-lines"></i> Exams</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-user"></i> Lessons</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-chart-line"></i> Grades</Link></li>
      </ul>
    </aside>
      <nav className="navbar navbar-expand-lg d-lg-none ">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">School Hub</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav mx-auto">
  <a className="nav-link active" href="#hero">Dashboard</a>
  <a className="nav-link" href="#about">Schedule</a>
  <a className="nav-link" href="#services">Homework</a>
  <a className="nav-link" href="#contact">Exams</a>
    <a className="nav-link" href="#contact">Lessons</a>

  <a className="nav-link" href="#contact">Grades</a>

</div>
    </div>
  </div>
</nav>
    </div>
  );
}
export default SideNav;