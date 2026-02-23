import { useEffect, useState } from "react";
import "./LessonsStudentPage.css";
import SideNav from '../components/SideNav';
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function StudentSubjectsPage() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingLessons, setLoadingLessons] = useState(false);

  // ================= FETCH SUBJECTS =================
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user?.classId) return;

      setLoadingSubjects(true);
      try {
        const res = await api.get(`/subjects?classId=${user.classId}`);
        setSubjects(res.data.data || []);
        if (res.data.data.length > 0) setSelectedSubject(res.data.data[0]);
      } catch (err) {
        console.error("Subjects error:", err);
      } finally {
        setLoadingSubjects(false);
      }
    };
    fetchSubjects();
  }, [user]);

  // ================= FETCH SUBJECT INFO =================
  useEffect(() => {
    const fetchSubjectInfo = async () => {
      if (!selectedSubject) return;

      try {
        const res = await api.get(`/subject-info/info?subjectId=${selectedSubject._id}`);
        setSubjectInfo(res.data.data || null);
      } catch (err) {
        console.error("Subject info error:", err);
        setSubjectInfo(null);
      }
    };
    fetchSubjectInfo();
  }, [selectedSubject]);

  // ================= FETCH LESSONS =================
  useEffect(() => {
    const fetchLessons = async () => {
      if (!selectedSubject) return;
      setLoadingLessons(true);

      try {
        const res = await api.get(`/lessons?subjectId=${selectedSubject._id}`);
        setLessons(res.data.data || []);
      } catch (err) {
        console.error("Lessons error:", err);
        setLessons([]);
      } finally {
        setLoadingLessons(false);
      }
    };
    fetchLessons();
  }, [selectedSubject]);

  return (
    <div className="student-page">
      <SideNav />
      <div className="container my-4">
        <h1 className="text-center mb-4">My Subjects</h1>

        {/* ================= SUBJECTS SCROLL CARDS ================= */}
        {loadingSubjects ? (
          <p className="text-center">Loading subjects...</p>
        ) : (
          <div className="subjects-scroll mb-4">
            {subjects.map((sub) => (
              <div
                key={sub._id}
                className={`subject-card ${selectedSubject?._id === sub._id ? "selected" : ""}`}
                onClick={() => setSelectedSubject(sub)}
              >
                <img
                  src={sub.imageUrl || "/default-subject.jpg"}
                  alt={sub.name}
                  className="subject-card-img"
                />
                <h6 className="mt-2 text-center">{sub.name}</h6>
                <p className="text-center text-muted" style={{ fontSize: "0.8rem" }}>
                  {sub.teacherId?.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ================= SUBJECT INFO ================= */}
        {subjectInfo && (
          <div className="card mb-4 shadow-sm">
            {subjectInfo.imageUrl && (
              <img
                src={subjectInfo.imageUrl}
                className="card-img-top"
                alt="Subject"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h5>Description</h5>
              <p>{subjectInfo.description}</p>
              <p>
                <strong>Teacher:</strong> {selectedSubject.teacherId?.name}
              </p>
            </div>
          </div>
        )}

        {/* ================= LESSONS ================= */}
        <h4 className="mb-3">Lessons</h4>
        {loadingLessons ? (
          <p>Loading lessons...</p>
        ) : lessons.length === 0 ? (
          <p className="text-muted">No lessons available yet.</p>
        ) : (
          <div className="row g-3">
            {lessons.map((lesson) => (
              <div key={lesson._id} className="col-md-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <iframe
                    src={lesson.videoUrl.replace(
                      "https://vimeo.com/",
                      "https://player.vimeo.com/video/"
                    )}
                    width="100%"
                    height="200"
                    allow="autoplay; fullscreen"
                    title={lesson.title}
                    style={{ border: "none" }}
                  ></iframe>
                  <div className="card-body">
                    <h6 className="card-title">{lesson.title}</h6>
                    <p className="card-text">
                      Teacher: {lesson.teacherId?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}