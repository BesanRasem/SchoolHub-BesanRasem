import { NavLink } from "react-router-dom";

function SideNav() {
    return (
        <div className=" SideNav d-flex flex-column"> 
            <ul className="  nav  flex-column mb-auto">
                <li>
                    <NavLink href="#" className="nav-link mt-3 mb-3">Dashboard</NavLink>
                </li>
                
                <li>
                    <NavLink href="#" className="nav-link mb-3  ">Schedual</NavLink>
                </li>
                
                <li>
                    <NavLink href="#" className="nav-link mb-3 ">HomeWork</NavLink>
                </li>
                
                <li>
                    <NavLink href="#" className="nav-link mb-3">My Exams</NavLink>
                </li>
                
                <li>
                    <NavLink href="#" className="nav-link mb-3 ">My Profile</NavLink>
                </li>
                
                <li>
                    <NavLink href="#" className="nav-link mb-3">Attendance</NavLink>
                </li>
                
                <li>
                    <NavLink href="#" className="nav-link mb-3">My Teacher</NavLink>
                </li>
                
                <li>
                    <NavLink href="#" className="nav-link mb-3">Subject</NavLink>
                </li>
               
                <li>
                    <NavLink href="#" className="nav-link mb-3">Progress</NavLink>
                </li>
            </ul>
        </div>
    );}
    
    function Progress(){
        return(
                
        <div className="card dash-card progress-card note-4" >
            <div className="card-body">
              
                <div className="d-flex justify-content-between align-items-center mb-3">
             <i className="fa-solid fa-paperclip clip"></i>
              <h5 className="card-title">Progress Rate</h5>
              </div>
              <video
        className="progress-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/Progress.mp4" type="video/mp4" />
      </video>
             
         </div>
           </div>
        );
    }

function Navbar(){
    return(
            <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand logo" href="#">School Hub</a>
    <i class="fa-solid fa-bell"></i>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
    );
}
function Attendance() {
     return(
        <div className="card dash-card attendance-card note-1" >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
             <i className="fa-solid fa-paperclip clip"></i>
              <h5 className="card-title">Attendance</h5>
              </div>
             
         </div>
           </div>
        );
}
function Profile() {
     return(
        <div className="card dash-card profile-card note-2" >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
             <i className="fa-solid fa-paperclip clip"></i>
              <h5 className="card-title">My Profile</h5>
              </div>
              <div className="profile-card-content">
              <img src="https://i.pinimg.com/736x/5f/91/41/5f91413c8a9e766a5139c6cfe5caa837.jpg" alt="profie image"
              className="profile-image mb-2"></img>
              <h5 className="card-title">Besan Rasem</h5>
             </div>
         </div>
           </div>
        );
}
function Exam() {
     return(
        <div className="card dash-card exams-card note-3" >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
             <i className="fa-solid fa-paperclip clip"></i>
              <h5 className="card-title">My exams</h5>
              </div>
              <div className="card mb-2 d-flex flex-row justify-content-between exam-card ">
                <div>
                  <h6 className="ms-2"> Chemistry</h6>
                  
                    <ul className="exam-detail d-flex gap-5">
                      <li>10 question</li>
                      <li>15 min</li>
                    </ul>
                  
                </div>
              </div>
              <div className="card  mb-2 d-flex flex-row justify-content-between exam-card ">
                <div>
                  <h6 className="ms-2"> Math</h6>
                  
                    <ul className="exam-detail d-flex gap-5">
                      <li>10 question</li>
                      <li>15 min</li>
                    </ul>
                  
                </div>
              </div>
              <a href="#" className="ms-3">+more</a>

             
         </div>
           </div>
        );
}
function Teacher() {
     return(
        <div className="card dash-card teacher-card note-3" >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
             <i className="fa-solid fa-paperclip clip"></i>
              <h5 className="card-title" >My Teacher</h5>
              </div>
             
         </div>
           </div>
        );
}
function HomeWork(){
    return(
        <div className="card dash-card homeworks-card note-1" >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
             <i className="fa-solid fa-paperclip clip"></i>
              <h5 className="card-title">HomeWork</h5>
              </div>
              <div className="card  homework-card mt-2 ">
                
                  <div>
                    <div className="d-flex justify-content-between">
                  <h6 className="ms-2"> Math</h6>
                  <span className="badge bg-danger mt-2 me-1">not Completed</span>
                  </div>
                  <div className="homework-detail ms-2">
                  <p >Solve chapter 3 exercises</p>
                  <p className="homework-date ms-2">Due: 18 Jan 2026</p>
                    </div>
                    </div>
      
              </div>
              <div className="card  homework-card mt-2">
                
                  <div>
                    <div className="d-flex justify-content-between">
                  <h6 className="ms-2"> English</h6>
                  <span className="badge bg-success mt-2 me-1">Completed</span>
                  </div>
                  <div className="homework-detail ms-2">
                  <p >Write a short essay</p>
                  <p className="homework-date ms-2">Due: 18 Jan 2026</p>
                    </div>
                    </div>
      
              </div>
              <a className="ms-2"href="#">+more</a>
             
         </div>
           </div>
        );
}
function Subjects() {
  
 return(
        <div className="card note-3 dash-card subject-card" >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
             <i className="fa-solid fa-paperclip clip"></i>
              <h5 className="card-title">Subject</h5>
              </div>
             
         </div>
           </div>
        );
}



function Schedule() {
  return(
        <div className="card dash-card attendance-card note-2" >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
             <i className="fa-solid fa-paperclip clip"></i>
              <h5 className="card-title">Schedual</h5>
              </div>
              <div className="card schedual-card">
                      <div className="schedule-item m-2">
          <h6>Sport</h6>
          <p>08:00 - 09:00</p>
          
        </div>
        </div>
        <div className="card schedual-card mt-2">

        <div className="schedule-item m-2 ">
          <h6>Chemistry</h6>
          <p>10:00 - 11:00</p>
        </div>
        </div>

        <a href="#" className="m-3">+ more</a>
             
         </div>
           </div>
        );
}



function StudentDashboard() {
    return (
        <div>
        <Navbar/>
        <div className="container mt-3">
        <div className="d-flex">
        <SideNav />
        <div className=" container dashboard-grid ">
            <Progress/>
            <Profile/>
            <Exam/>
            <Schedule/>
            <Teacher/>
          
            <HomeWork/>
            <Attendance/>
            
            <Subjects/>
        </div>
        </div>
        </div>
        </div>
    );
}

export default StudentDashboard;
