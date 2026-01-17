function Card({ subject, description, status, feedback }) {
  return (
    <div className="col-lg-6 ">
      <div className="card shadow homework-card">
        <div className="card-body">

          <div className="d-flex justify-content-between mb-2">
            <h5 className="mb-0 fw-bold">{subject}</h5>
            <span className="badge bg-warning">{status}</span>
          </div>

          <p className="fw-bold">
           {description}
          </p>

          <p className="text-muted mb-2">
            Due: 20 Jan 2026
          </p>

          <div className="alert alert-light mb-2">
            {feedback}
          </div>

          <button className="btn btn-outline-primary">
            Upload Your Homework
          </button>

        </div>
      </div>
    </div>
  );
}

export default Card;
