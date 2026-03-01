import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import api from "../api/axios";
import "./Teacherashboard.css";


export default function TeacherHomeworkPage() {
  const { classId } = useParams();
  const [homeworks, setHomeworks] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (classId) {
      fetchHomeworks();
    }
  }, [filterDate, classId]);

  const fetchHomeworks = async () => {
    try {
      const res = await api.get("/homework", {
        params: { 
          classId: classId, 
          submissionDate: filterDate 
        }
      });
      setHomeworks(res.data.data);
    } catch (err) {
      console.error("Error fetching homeworks:", err);
    }
  };

  const uploadFile = async (file) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog_uploads");
    formData.append("resource_type", "auto");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwg5rv0jm/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        setPdfUrl(data.secure_url);
      }
    } catch (err) {
      alert("Upload failed. Check your Cloudinary settings.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreate = async () => {
    if (!subject || !dueDate) return alert("Please fill required fields");
    
    try {
      await api.post("/homework", { 
        subject, 
        description, 
        pdfUrl, 
        dueDate, 
        classId 
      });
      setSuccess("Homework Added Successfully ");
      setSubject(""); setDescription(""); setDueDate(""); setPdfUrl("");
      document.getElementById("pdfInput").value = "";
      fetchHomeworks();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      alert("Error adding homework. Check console.");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 ">Teacher Control Panel</h2>
      
      {success && <div className="alert alert-success shadow-sm">{success}</div>}

      <div className="card lesson-card shadow-sm p-4 mb-5 bg-white rounded">
        <h5 className="mb-3">Create New Assignment</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input className="form-control" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          </div>
          <div className="col-md-6">
            <input className="form-control" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
          <div className="col-12">
            <textarea className="form-control" placeholder="Assignment Description" rows="2" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="col-md-8">
            <input id="pdfInput" className="form-control" type="file" accept="application/pdf" onChange={e => uploadFile(e.target.files[0])} />
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" onClick={handleCreate} disabled={isUploading || !classId}>
              {isUploading ? "Uploading..." : "Publish Assignment"}
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Assignment Submissions</h3>
        <div className="d-flex align-items-center gap-2">
          <label >Filter by Date:</label>
          <input type="date" className="form-control form-control-sm w-auto" 
                 onChange={e => setFilterDate(e.target.value)} />
          <button className="btn  btn-priamry" onClick={() => { setFilterDate("all"); }}>Reset</button>
        </div>
      </div>

      <div className="row">
        {homeworks.length === 0 && <p className="text-center text-muted mt-4">No assignments found for this class.</p>}
        {homeworks.map(hw => (
          <div key={hw._id} className="col-lg-6 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-header d-flex justify-content-between">
                <span className="fw-bold subject-title">{hw.subject}</span>
                <span className="badge  ">Due: {new Date(hw.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="card-body homewoark-teacher-card">
                <p className="card-text">{hw.description || "No description provided."}</p>
                <h6 className="border-bottom pb-2">Student Submissions ({hw.submissions.length})</h6>
                <div className="submission-list" >
                  {hw.submissions.map((s, i) => (
                    <div key={i} className="d-flex justify-content-between align-items-center p-2 mb-2  ">
                      <div className="small">
                        <div className="fw-bold">{s.studentId?.name}</div>
                        <div className="text-muted" >
                          {new Date(s.submittedAt).toLocaleString()}
                        </div>
                      </div>
                      <a href={s.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-link text-decoration-none">View PDF</a>
                    </div>
                  ))}
                  {hw.submissions.length === 0 && <span className="text-muted small">No submissions yet.</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}