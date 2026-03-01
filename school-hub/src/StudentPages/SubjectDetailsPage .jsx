import { useState } from "react";
import SideNav from "../components/SideNav";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SubjectDetailsPage() {
  const [subject] = useState({
    name: "Mathematics",
    teacherName: "Mr. Ali",
    imageUrl: "https://placehold.co/600x200?text=Mathematics", 
  });

  const [lessons] = useState([
    { id: 1, title: "Algebra Basics", type: "video", videoUrl: "#" },
    { id: 2, title: "Geometry Intro", type: "video", videoUrl: "#" },
    { id: 3, title: "Trigonometry", type: "video", videoUrl: "#" },
    { id: 4, title: "Calculus I", type: "video", videoUrl: "#" },
    { id: 5, title: "Probability", type: "video", videoUrl: "#" },
    { id: 6, title: "Statistics", type: "video", videoUrl: "#" }
  ]);

  return (
    <div className="d-flex SideNavContainer">
      <SideNav />

      <div className="container-fluid mt-3">
        <div className="text-center mb-4">
          <img
            src={subject.imageUrl}
            alt={subject.name}
            className="img-fluid rounded mb-2"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
          <h2>{subject.name}</h2>
          <p className="text-muted">Teacher: {subject.teacherName}</p>
        </div>

        <div className="row g-3">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="col-12 col-sm-6 col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h6 className="card-title">{lesson.title}</h6>
                  <small className="text-muted">{lesson.type.toUpperCase()}</small>
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-3"
                  >
                    Watch Video
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}