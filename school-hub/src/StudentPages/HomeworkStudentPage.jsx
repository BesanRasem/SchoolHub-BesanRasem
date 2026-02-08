import { useState } from "react";

function HomeworkStudentPage() {

  const [activeStatus, setActiveStatus] = useState("Pending");

  const homeworks = [
    {
      id: 1,
      subject: "Math",
      title: "Solve chapter 3 exercises",
      dueDate: "20 Jan 2026",
      status: "Pending",
      feedback: "No feedback yet",
    },
    {
      id: 2,
      subject: "English",
      title: "Write a short essay",
      dueDate: "18 Jan 2026",
      status: "Completed",
      feedback: "Great work! Very well written.",
      grade: "90 / 100",
    },
    {
      id: 3,
      subject: "Science",
      title: "Read chapter 5",
      dueDate: "10 Jan 2026",
      status: "Overdue",
      feedback: "Late submission",
    },
  ];

  const filteredHomeworks = homeworks.filter(
    hw => hw.status === activeStatus
  );

  return (
    <div className="container my-4">

      <h2 className="mb-4 fw-bold">Homework</h2>

      {/* Status Buttons */}
      <div className="d-flex gap-2 mb-4">
        {["Pending", "Completed", "Overdue"].map(status => (
          <button
            key={status}
            className={`btn ${
              activeStatus === status
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Homework Cards */}
      <div className="row g-3">
        {filteredHomeworks.length === 0 ? (
          <p className="text-muted">No homework in this section.</p>
        ) : (
          filteredHomeworks.map(hw => (
            <div className="col-md-6" key={hw.id}>
              <div className="card shadow homework-card">
                <div className="card-body">

                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="fw-bold mb-0">{hw.subject}</h5>

                    <span
                      className={`badge ${
                        hw.status === "Pending"
                          ? "bg-warning"
                          : hw.status === "Completed"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {hw.status}
                    </span>
                  </div>

                  <p className="fw-bold">{hw.title}</p>

                  <p className="text-muted mb-2">
                    Due: {hw.dueDate}
                  </p>

                  <div className="alert alert-light">
                    {hw.feedback}
                  </div>

                  {hw.status === "Completed" && (
                    <p className="mb-0">
                      <span className="fw-bold">Grade:</span> {hw.grade}
                    </p>
                  )}

                  {hw.status === "Pending" && (
                    <button className="btn btn-outline-primary mt-2">
                      Upload Your Homework
                    </button>
                  )}

                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
export default HomeworkStudentPage;