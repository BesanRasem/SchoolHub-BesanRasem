import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios"; 
import "./Teacherashboard.css";


function TeacherExamsPage() {
  const { classId } = useParams();

  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ show: false, type: "success", text: "" });

  const [name, setName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [examType, setExamType] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");

 
const fetchData = async () => {
  try {
    const resSub = await axios.get(`/subjects?classId=${classId}`);
    console.log("Subjects response:", resSub.data);

    if (resSub.data && resSub.data.data) {
      setSubjects(resSub.data.data);
    } else {
      setSubjects([]);
    }

    const resExams = await axios.get(`/exams?classId=${classId}`);

    if (resExams.data && resExams.data.data) {
      setExams(resExams.data.data);
    } else {
      setExams([]);
    }

  } catch (err) {
    console.error("Fetch error:", err.response?.data || err.message);
  }
};

useEffect(() => {
  fetchData();
}, [classId]);

  useEffect(() => {
    fetchData();
  }, [classId]);

  const showMsg = (type, text) => {
    setMessage({ show: true, type, text });
    setTimeout(() => setMessage({ show: false, type: "success", text: "" }), 3000);
  };

  const clearForm = () => {
    setName("");
    setSubjectId("");
    setExamType("");
    setExamDate("");
    setExamTime("");
  };

  
  const handleOpenAdd = () => {
    setIsEdit(false);
    clearForm();
    setShowModal(true);
  };

  const handleOpenEdit = (exam) => {
    setIsEdit(true);
    setEditingId(exam._id);
    setName(exam.name);
    setSubjectId(exam.subjectId?._id || "");
    setExamType(exam.examType);
    setExamDate(exam.examDate ? exam.examDate.slice(0, 10) : "");
    setExamTime(exam.examTime);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, subjectId, classId, examType, examDate, examTime };

    try {
      if (isEdit) {
        await axios.put(`/exams/${editingId}`, payload);
        showMsg("success", "Updated successfully ");
      } else {
        await axios.post("/exams/create", payload);
        showMsg("success", "Created successfully ");
      }
      setShowModal(false);
      fetchData(); 
      clearForm();
    } catch (err) {
      showMsg("danger", err.response?.data?.message || "Failed to save");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this exam?")) return;
    try {
      await axios.delete(`/exams/${id}`);
      showMsg("warning", "Exam deleted ");
      fetchData();
    } catch (err) {
      showMsg("danger", "Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      {message.show && (
        <div className={`alert alert-${message.type} text-center fw-bold`}>{message.text}</div>
      )}

      <div className="d-flex justify-content-between mb-4">
        <h3 className="fw-bold title">Class Exams</h3>
        <button className="btn btn-primary" onClick={handleOpenAdd}>+ Add Exam</button>
      </div>

        <table className="table  table-bordered table-striped align-middle mb-0">
          <thead >
            <tr className="head">
              <th>Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.subjectId?.name}</td>
                <td>{e.examDate ? e.examDate.slice(0, 10) : ""}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-primary me-2 text-white" onClick={() => handleOpenEdit(e)}>Edit</button>
                  <button className="btn btn-sm btn-primary" onClick={() => handleDelete(e._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {showModal && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h5 className="modal-title">{isEdit ? "Edit" : "New"} Exam</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <input className="form-control mb-2" placeholder="Exam Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    
                    <select className="form-select mb-2" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} required>
                      <option value="">Select Subject</option>
                      {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>

                    <select className="form-select mb-2" value={examType} onChange={(e) => setExamType(e.target.value)} required>
                      <option value="">Type</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>

                    <input type="date" className="form-control mb-2" value={examDate} onChange={(e) => setExamDate(e.target.value)} required />
                    <input type="time" className="form-control" value={examTime} onChange={(e) => setExamTime(e.target.value)} required />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-sm btn-primary w-100">{isEdit ? "Update" : "Save"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default TeacherExamsPage;