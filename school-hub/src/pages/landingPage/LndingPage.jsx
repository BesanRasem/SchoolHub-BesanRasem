import "./LandingPage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

import Login from"../loginPage/Login";


 function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <div className="d-flex align-items-center gap-2">
            <img src="/images/logo-img.png" alt="logo" height="40" />
            <span className="navbar-brand mb-0">School Hub</span>
          </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav mx-auto">
  <a className="nav-link active" href="#hero">Home</a>
  <a className="nav-link" href="#about">About</a>
  <a className="nav-link" href="#services">Services</a>
  <a className="nav-link" href="#contact">Contact</a>
</div>
    </div>
  </div>
</nav>
    );
}


  export default function LandingPage() {
    useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  
  
    return(
        <div className="hero-page">
            <Navbar />
        
 <section className="hero" id="hero">
  <div className="hero-text ">
    <h1> Welcome to <span className="brand-name">SchoolHub</span>, your all-in-one school platform </h1>
    <p>Manage attendance, grades, and homework easily for students, parents, and teachers.</p>
    <div className="hero-button d-flex justify-content-center flex-wrap ">
      <Link to="/login" className="btn btn-primary btn-lg " state={{ activate: true }} >Activate Your Account</Link>
     <Link to="/login" className="btn btn-outline-primary btn-lg">
       Login
       </Link>    </div>
  </div>
  <div className="hero-image" >
     <img
     
    src="https://i.pinimg.com/736x/c2/af/91/c2af91b7769924806c4cd86c9e55fcc5.jpg"
    alt="School illustration"
  />

  </div>
</section>
<section className="about-section py-5" id="about">
  <div className="container">
    <div className="row align-items-center">

      <div className="col-lg-6" data-aos="fade-right">
        <h2 className="about-title">About SchoolHub</h2>
        <p className="about-subtitle">
          Smart technology connecting schools, parents, and students.
        </p>

        <div className="about-box">
          <h4>Who We Are</h4>
          <p>
            SchoolHub is a modern platform that simplifies school management
            and strengthens communication between all parties.
          </p>
        </div>

        <div className="about-box">
          <h4>Our Mission</h4>
          <p>
            To empower education with transparency, efficiency,
            and a better learning experience.
          </p>
        </div>
      </div>

      
      <div className="col-lg-6 text-center" data-aos="fade-left">
        <div className="lamp">
          <img
            src="/images/about-image.png"
            alt="Idea illustration"
          />
        </div>
      </div>

    </div>
  </div>
</section>

<section className="services-page py-5" id="services">
      <div className="container">

       
        <div className="text-center mb-5">
          <h1 className="title">Our Services</h1>
          
        </div>

        
        <div className="row g-4">
          
          <div className=" col-12 col-sm-6 col-md-6 col-lg-4 " >
            <div data-aos="flip-left">
            <div className="card note-3 service-card  text-center p-3" >
              <div className="d-flex justify-content-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">Student Management</h3>
              </div>
              <p className="service-text">
                Manage classes, teachers, schedules, and exams efficiently with our admin tools.
              </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-4">
             <div data-aos="flip-left">
            <div className="card note-1 service-card text-center p-3">
              <div className="d-flex justify-content-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">School Administration</h3>
              </div>
              <p className="service-text">
                Manage classes, teachers, schedules, and exams efficiently with our admin tools.
              </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-4">
             <div data-aos="flip-left">
            <div className="card note-2 service-card text-center p-3">
              <div className="d-flex justify-content-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">Parent Engagement</h3>
              </div>
              <p className="service-text">
                Keep parents informed and engaged with updates, notifications, and performance reports.
              </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-4">
             <div data-aos="flip-left">
            <div className="card note-1 service-card text-center p-3">
              <div className="d-flex justify-content-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">Learning Materials</h3>
              </div>
              <p className="service-text">
                Provide students with access to assignments, lessons, and educational resources online.
              </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-4">
             <div data-aos="flip-left">
            <div className="card note-2 service-card text-center p-3">
              <div className="d-flex justify-content-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">Analytics & Reports</h3>
              </div>
              <p className="service-text">
                Generate performance reports and insights for students, classes, and schools.
              </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-4">
             <div data-aos="flip-left">
            <div className="card note-3 service-card h-100 text-center p-3">
              <div className="d-flex justify-content-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2 ">Notifications</h3>
              </div>
              <p className="service-text">
                Send instant updates and alerts to students, parents, and teachers.
              </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <section className="contact-section" id="contact">
  <div className="container text-center">
    <h2>Have Questions?</h2>
    <p >
      We’d love to hear from you. Get in touch and let’s build better education together.
    </p>

    <Link to="/contact" className="btn btn-primary btn-lg">
      Contact Us
    </Link>
  </div>
</section>
<Footer/>


    
</div>


  
    );
}