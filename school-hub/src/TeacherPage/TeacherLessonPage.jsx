import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "./Teacherashboard.css";

function TeacherContentPage() {
  const { classId } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const [subjectTitle, setSubjectTitle] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectImage, setSubjectImage] = useState(null);
  const [subjectImageUrl, setSubjectImageUrl] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get(`/subjects/teach?classId=${classId}`);
        setSubjects(res.data.data || []);
      } catch (err) {
        console.error("Subjects error:", err);
      }
    };
    if (classId) fetchSubjects();
  }, [classId]);

  useEffect(() => {
    if (!selectedSubject) {
      setLessons([]);
      setSubjectTitle("");
      setSubjectDescription("");
      setSubjectImage(null);
      setSubjectImageUrl("");
      return;
    }

    setSubjectTitle(selectedSubject.name || "");
    setSubjectImage(null);

    const fetchSubjectInfo = async () => {
      try {
        const res = await api.get(
           `/subject-info/info?subjectId=${selectedSubject._id}`
        );

        if (res.data) {
          setSubjectDescription(res.data.description || "");
          setSubjectImageUrl(res.data.imageUrl || "");
        } else {
          setSubjectDescription("");
          setSubjectImageUrl("");
        }
      } catch (err) {
        console.error("Subject info error:", err);
      }
    };

    const fetchLessons = async () => {
      try {
        const res = await api.get(`/lessons?subjectId=${selectedSubject._id}`);
        setLessons(res.data.data || []);
      } catch (err) {
        console.error("Lessons error:", err);
      }
    };

    fetchSubjectInfo();
    fetchLessons();
  }, [selectedSubject]);

 const handleSubjectUpdate = async (e) => {
  e.preventDefault();
  if (!selectedSubject) return;

  try {
    setLoading(true);

    await api.put(
      `/subjects/${selectedSubject._id}`,
      { name: subjectTitle }
    );

    const infoFormData = new FormData();
    infoFormData.append("subjectId", selectedSubject._id);
    infoFormData.append("description", subjectDescription);
    if (subjectImage) {
      infoFormData.append("image", subjectImage);
    }

    await api.post(
      "/subject-info/update-info",
      infoFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const infoRes = await api.get(
      `/subject-info/info?subjectId=${selectedSubject._id}`
    );

    if (infoRes.data) {
      setSubjectDescription(infoRes.data.description || "");
      setSubjectImageUrl(infoRes.data.imageUrl || "");
    }

    setSuccessMessage("Subject updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);

  } catch (err) {
    console.error("Update subject error:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !videoTitle || !selectedSubject) return;

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("subjectId", selectedSubject._id);
    formData.append("classId", classId);
    formData.append("video", videoFile);

    try {
      setLoading(true);
      await api.post("/lessons/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setVideoTitle("");
      setVideoFile(null);

      const res = await api.get(`/lessons?subjectId=${selectedSubject._id}`);
      setLessons(res.data.data || []);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
  const confirmed = window.confirm("are oyu sure?");

  if (!confirmed) return;

  try {
    await api.delete(`/lessons/${id}`);
    setLessons((prev) => prev.filter((l) => l._id !== id));
  } catch (err) {
    console.error("Delete error:", err);
  }
};

  // ===================== UI =====================
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Teacher Lessons</h2>

      <div className="mb-3">
        <label className="form-label">Select Subject</label>
        <select
          className="form-select"
          value={selectedSubject?._id || ""}
          onChange={(e) => {
            const sub = subjects.find((s) => s._id === e.target.value);
            setSelectedSubject(sub || null);
          }}
        >
          <option value="">-- Select --</option>
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {selectedSubject && (
        <form
          onSubmit={handleSubjectUpdate}
          className="lesson-card card mb-4 p-3 shadow-sm"
        >
          <h5>Edit Subject Info</h5>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Subject Title"
            value={subjectTitle}
            onChange={(e) => setSubjectTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={subjectDescription}
            onChange={(e) => setSubjectDescription(e.target.value)}
          />

          {subjectImageUrl && (
            <img
              src={subjectImageUrl}
              alt="subject"
              className="rounded mb-2"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
          )}

          <input
            type="file"
            className="form-control mb-2"
            accept="image/*"
            onChange={(e) => setSubjectImage(e.target.files[0])}
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Updating..." : "Update Subject"}
          </button>
        </form>
      )}

      {selectedSubject && (
        <form
          onSubmit={handleVideoUpload}
          className="lesson-card card p-3 mb-4 shadow-sm"
        >
          <h5>Upload New Video</h5>

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Lesson title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
          />

          <input
            type="file"
            className="form-control mb-2"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>
      )}

      {selectedSubject && (
        <div>
          <h6 className="mb-3 fw-bold video-label">Videos</h6>

          {lessons.length === 0 && (
            <p className="text-muted">No videos uploaded yet.</p>
          )}

          <div className="d-flex flex-column gap-3">
            {lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="card p-3 shadow-sm d-flex justify-content-between flex-row align-items-center"
                onClick={() => setSelectedLesson(lesson)}
              >
                <h6 className="mb-0">{lesson.title}</h6>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(lesson._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedLesson && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          
        >
          <div
            className="bg-white rounded p-3 position-relative"
          
          >
            <button
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => setSelectedLesson(null)}
            >
              <i class="fa-solid fa-xmark"></i>
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

export default TeacherContentPage;