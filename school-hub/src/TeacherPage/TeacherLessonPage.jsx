import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function TeacherContentPage() {
  const { classId } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [subjectInfo, setSubjectInfo] = useState({
    description: "",
    image: null,
    imagePreview: null,
    saved: false,
  });

  /* ================= RESET لما يتغير الصف ================= */
  useEffect(() => {
    setSubjects([]);
    setSelectedSubject("");
    setLessons([]);
    setSubjectInfo({ description: "", image: null, imagePreview: null, saved: false });
  }, [classId]);

  /* ================= FETCH SUBJECTS ================= */
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

  /* ================= FETCH LESSONS ================= */
  useEffect(() => {
    if (!selectedSubject) {
      setLessons([]);
      setSubjectInfo({ description: "", image: null, imagePreview: null, saved: false });
      return;
    }

    const fetchLessons = async () => {
      try {
        const res = await api.get(`/lessons?subjectId=${selectedSubject}`);
        setLessons(res.data.data || []);
      } catch (err) {
        console.error("Lessons error:", err);
      }
    };

    const fetchSubjectInfo = async () => {
      try {
        const res = await api.get(`/subject-info/info?subjectId=${selectedSubject}`);
        const info = res.data.data;
        setSubjectInfo({
          description: info?.description || "",
          image: null,
          imagePreview: info?.imageUrl || null,
          saved: false,
        });
      } catch (err) {
        console.error("Subject info fetch error:", err);
        setSubjectInfo({ description: "", image: null, imagePreview: null, saved: false });
      }
    };

    fetchLessons();
    fetchSubjectInfo();
  }, [selectedSubject]);

  /* ================= HANDLE SUBJECT INFO SAVE ================= */
  const handleSubjectSave = async () => {
    if (!selectedSubject) return;

    const formData = new FormData();
    formData.append("subjectId", selectedSubject);
    formData.append("description", subjectInfo.description);
    if (subjectInfo.image) formData.append("image", subjectInfo.image);

    try {
      setLoading(true);
      const res = await api.post("/subject-info/update-info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const info = res.data.data;
      setSubjectInfo({
        description: info.description || "",
        image: null,
        imagePreview: info.imageUrl || null,
        saved: true,
      });
    } catch (err) {
      console.error("Subject info save error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPLOAD VIDEO ================= */
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !videoTitle || !selectedSubject) return;

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("subjectId", selectedSubject);
    formData.append("classId", classId);
    formData.append("video", videoFile);

    try {
      setLoading(true);
      await api.post("/lessons/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideoTitle("");
      setVideoFile(null);

      const res = await api.get(`/lessons?subjectId=${selectedSubject}`);
      setLessons(res.data.data || []);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE VIDEO ================= */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/lessons/${id}`);
      setLessons((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Teacher Lessons</h2>

      {/* ================= SUBJECT SELECT ================= */}
      <div className="mb-3">
        <label className="form-label">Select Subject</label>
        <select
          className="form-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">-- Select --</option>
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      {/* ================= SUBJECT INFO CARD ================= */}
      {selectedSubject && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5>Subject Information</h5>

          <textarea
            className="form-control mb-2"
            placeholder="Subject description"
            value={subjectInfo.description}
            onChange={(e) =>
              setSubjectInfo({ ...subjectInfo, description: e.target.value, saved: false })
            }
          />

          <input
            type="file"
            className="form-control mb-2"
            accept="image/*"
            onChange={(e) =>
              setSubjectInfo({
                ...subjectInfo,
                image: e.target.files[0],
                imagePreview: URL.createObjectURL(e.target.files[0]),
                saved: false,
              })
            }
          />

          {subjectInfo.imagePreview && (
            <img
              src={subjectInfo.imagePreview}
              alt="Preview"
              className="mb-2"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}

          <button className="btn btn-success" onClick={handleSubjectSave} disabled={loading}>
            {loading ? "Saving..." : "Save Subject Info"}
          </button>
        </div>
      )}

      {/* ================= UPLOAD VIDEO CARD ================= */}
      {selectedSubject && (
        <form onSubmit={handleVideoUpload} className="card p-3 mb-4 shadow-sm">
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

      {/* ================= LESSONS LIST ================= */}
      {selectedSubject && (
        <div>
          <h5 className="mb-3">Videos</h5>
          {lessons.length === 0 && <p className="text-muted">No videos uploaded yet.</p>}

          {lessons.map((lesson) => (
            <div key={lesson._id} className="card mb-3 p-3 shadow-sm">
              <h6>{lesson.title}</h6>

              <iframe
                src={`https://player.vimeo.com/video/${lesson.vimeoVideoId}`}
                width="100%"
                height="300"
                allow="autoplay; fullscreen"
                title={lesson.title}
              ></iframe>

              <button
                className="btn btn-danger mt-2"
                onClick={() => handleDelete(lesson._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherContentPage;