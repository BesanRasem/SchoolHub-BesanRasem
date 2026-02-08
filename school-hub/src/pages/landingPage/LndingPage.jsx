
import NavBar from "../../components/NavBar";
import "./LandingPage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";





  export default function LandingPage() {
    useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  
  
    return(
        <div>
            <NavBar/>
        
 <section className="hero" id="hero">
  <div className="hero-text ">
    <h1> Welcome to <span className="brand-name">SchoolHub</span>, your all-in-one school platform </h1>
    <p>Manage attendance, grades, and homework easily for students, parents, and teachers.</p>
    <div className="hero-button d-flex justify-content-center flex-wrap ">
      <a href="#" className="btn btn-primary btn-lg " >Register Your School</a>
      <a href="login.html" className="btn btn-outline-primary btn-lg ">Login</a>
    </div>
  </div>
  <div className="hero-image" >
     <img
     
    src="https://i.pinimg.com/736x/c2/af/91/c2af91b7769924806c4cd86c9e55fcc5.jpg"
    alt="School illustration"
  />

  </div>
</section>
<section className="about-section py-5">
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

<section className="services-page py-5">
      <div className="container">

       
        <div className="text-center mb-5">
          <h1 className="title">Our Services</h1>
          
        </div>

        
        <div className="row g-4">
          
          <div className=" col-md-4 " >
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

          <div className="col-md-4">
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

          <div className="col-md-4 ">
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

          <div className="col-md-4">
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

          <div className="col-md-4">
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

          <div className="col-md-4">
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
    <section className="contact-section">
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


    
</div>


  
    );
}