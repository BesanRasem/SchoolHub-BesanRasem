function SubjectPage(){
    return(
        <div>
            <div className="subject-hero">
                <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/Chemistry.mp4" type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1>Mathematics</h1>
        <p>Grade 7</p>
      </div>

            </div>
             <div className="lecture-list">
              <div className="lecture-card">
          <div className="lecture-header ">
            <span className="lecture-number"> class 1 </span>
               <span className="badge bg-success">Completed</span>
          </div>
          <h3 className="lecture-title">Introduction to Chemistry</h3>
        </div>
        <div className="lecture-card">
          <div className="lecture-header">
            <span className="lecture-number">class 2</span>
            <span className="badge bg-success">Completed</span>
          </div>
          <h3 className="lecture-title">Introduction to Chemistry</h3>
        </div>
             </div>
        </div>
    );
}
export default SubjectPage