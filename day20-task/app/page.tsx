import Image from "next/image";

export default function SchoolHome() {
  return (
    <div className="school-home">
 <section className="hero d-flex justify-content-center  align-items-center flex-wrap" id="hero">
  <div className="hero-text my-2">
    <h1 className="title"> Welcome to <span className="brand-name">SchoolHub</span>,  Admin Portal </h1>
    <p className="subtitle">Manage your school efficiently and effectively.</p>
    <div className="hero-button  ">
      <a href="#" className="btn btn-primary btn-lg " >Go to Dashboard</a>
    </div>
  </div>
  <div className="hero-image">
  <Image
    src="/images/about-image.png"
    alt="image"
    fill
    className="hero-img"
  />
  </div>
  </section>

<section className="features py-5">
  <div className="container text-center">
    <h2 className="feature-title">Why Choose SchoolHub is Right?</h2>
    <div className="row g-5 mt-4">
      <div className="  col-md-4">
        <div className="feature-card ">
        <i className=" clip fa-solid fa-thumbtack"></i>
        <h4 className="service-heading">Student Management</h4>
        <p className="service-text">Easily track attendance, grades, and progress.</p>
        </div>
      </div>
      <div className="  col-md-4">
        <div className="feature-card ">
          <i className=" clip fa-solid fa-thumbtack"></i>    
              <h4 className="service-heading">Admin Tools</h4>
        <p className="service-text">Manage schedules, exams, and teachers efficiently.</p>
        </div>
      </div>
      <div className="  col-md-4">
        <div className="feature-card ">
        <i className=" clip fa-solid fa-thumbtack"></i> 
        <h4 className="service-heading">Parent Engagement</h4>
        <p className="service-text">Keep parents updated with notifications and reports.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<div className="row text-center my-5 ">
  <div className="col-md-3 col-6 mb-4">
    <h2 className="stat-number">120+</h2>
    <p className="stat-label">Schools</p>
  </div>
  <div className="col-md-3 col-6 mb-4">
    <h2 className="stat-number">8,500+</h2>
    <p className="stat-label">Students</p>
  </div>
  <div className="col-md-3 col-6 mb-4">
    <h2 className="stat-number">4,200+</h2>
    <p className="stat-label">Parents</p>
  </div>
  <div className="col-md-3 col-6 mb-4">
    <h2 className="stat-number">99%</h2>
    <p className="stat-label">Satisfaction</p>
  </div>
</div>




    </div>
  );
}
