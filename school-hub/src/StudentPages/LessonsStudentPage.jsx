import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LessonsStudentPage.css"; 
import SideNav from '../components/SideNav';
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function LessonsStudentPage() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  
 

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user?.classId) return;
      try {
        setLoading(true);
        const res = await api.get(`/subject-info/student?classId=${user.classId}`);
        setSubjects(res.data.data || []);
      } catch (err) {
        console.error("Fetch subjects error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [user]);

  const handleSubjectClick = async (sub) => {
    setSelectedSubject(sub);
    try {
      const res = await api.get(`/lesson-progress?subjectId=${sub._id}`);
      setLessons(res.data.data || []);
    } catch (err) {
      console.error("Fetch lessons error:", err);
    }
  };



  return (
    <div className="lessons-student-layout">
      <SideNav />

      <div className="lessons-student-main">
        <div className="container-fluid py-4">
          <h1 className="main-page-title">My Subject</h1>
          
          <div className="subjects-scroll-row">
            {subjects.map((sub) => (
              <div 
                className={`subject-card-item ${selectedSubject?._id === sub._id ? 'active' : ''}`} 
                key={sub._id}
                onClick={() => handleSubjectClick(sub)}
              >
                <div className="subject-card-img-box">
                  {sub.imageUrl ? (
                    <img 
                      src={sub.imageUrl} 
                      alt={sub.name} 
                      className="actual-img"
                      onError={(e) => {
                        e.target.style.display = 'none'; 
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="img-fallback" style={{display: sub.imageUrl ? 'none' : 'flex'}}>
                    {sub.name.charAt(0)}
                  </div>
                </div>
                <div className="subject-card-info">
                  <h6 className="sub-title">{sub.name}</h6>
                  <p className="sub-desc" title={sub.description}>{sub.description || "No description available"}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lessons-section-wrapper mt-5">
            {selectedSubject ? (
              <>
                <h3 className="lessons-list-title">
                  Lessons: <span className="purple-text">{selectedSubject.name}</span>
                </h3>
                <div className="row mt-4">
                  {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                      <div className="col-12 col-md-6 col-lg-4 mb-3" key={lesson._id}>
                        <div 
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          <div className="student-card-lesson d-flex justify-content-between align-items-center">

  <div className="d-flex align-items-center gap-2">

    <input
      type="checkbox"
      checked={lesson.completed}
      onClick={(e) => e.stopPropagation()}
      onChange={async () => {
        await api.post("/lesson-progress/toggle", {
          lessonId: lesson._id
        });

        const res = await api.get(
          `/lesson-progress?subjectId=${selectedSubject._id}`
        );

        setLessons(res.data.data || []);
      }}
    />

    <span className="lesson-title">{lesson.title}</span>

  </div>

  <i className="fa-solid fa-circle-play"></i>

</div>
                          
                          
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-lessons-msg">No lessons found for this subject.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="select-prompt-box">
                <p>Select a subject above to view available lessons</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedLesson && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={() => setSelectedLesson(null)}
        >
          <div
            className="bg-white rounded p-3 position-relative"
            style={{
              width: "80%",
              maxWidth: "700px",
              maxHeight: "80%",
              overflow: "auto",
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => setSelectedLesson(null)}
            >
              ✕
            </button>

            <h5>{selectedLesson.title}</h5>

            <video
              src={selectedLesson.videoUrl}
              controls
              className="w-100 mt-2 rounded"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}