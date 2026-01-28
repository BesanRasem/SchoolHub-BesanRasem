import Image from "next/image";

export default function ServicesPage() {
  return (
    <section className="services-page py-5">
      <div className="container">

       
        <div className="text-center mb-5">
          <h1 className="title">Our Services</h1>
          <p className="subtitle">
            We provide the best tools to manage schools, engage parents, and empower students.
          </p>
        </div>

        
        <div className="row g-4">
          
          <div className="col-md-4">
            <div className="card note-3 service-card  text-center p-3">
              <div className="d-flex justify-contant-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">Student Management</h3>
              </div>
              <p className="service-text">
                Track student attendance, performance, and progress easily through one platform.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card note-1 service-card text-center p-3">
              <div className="d-flex justify-contant-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">School Administration</h3>
              </div>
              <p className="service-text">
                Manage classes, teachers, schedules, and exams efficiently with our admin tools.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card note-2 service-card text-center p-3">
              <div className="d-flex justify-contant-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">Parent Engagement</h3>
              </div>
              <p className="service-text">
                Keep parents informed and engaged with updates, notifications, and performance reports.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card note-1 service-card text-center p-3">
              <div className="d-flex justify-contant-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">Learning Materials</h3>
              </div>
              <p className="service-text">
                Provide students with access to assignments, lessons, and educational resources online.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card note-2 service-card text-center p-3">
              <div className="d-flex justify-contant-between mb-3">
               <i className="fa-solid fa-paperclip clip"></i>
               <h3 className="service-heading mt-2">Analytics & Reports</h3>
              </div>
              <p className="service-text">
                Generate performance reports and insights for students, classes, and schools.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card note-3 service-card h-100 text-center p-3">
              <div className="d-flex justify-contant-between mb-3">
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
    </section>
  );
}
