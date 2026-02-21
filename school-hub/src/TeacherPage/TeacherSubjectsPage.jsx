import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function TeacherSubjectsPage() {
  const { classId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [editingSubjectId, setEditingSubjectId] = useState(null);

  const [isHomeroom, setIsHomeroom] = useState(false);

  useEffect(() => {
    if (classId) {
      fetchSubjects();
      fetchTeachers();
      checkHomeroomStatus();
    }
  }, [classId]);

  const fetchSubjects = async () => {
    try {
      const res = await axios.get(`/subjects?classId=${classId}`);
      setSubjects(res.data.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("/users/teachers");
      setTeachers(res.data.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  // تحقق إذا المستخدم هو Admin للصف
  const checkHomeroomStatus = async () => {
    try {
      const res = await axios.get(`/classes/my-classes`);
      const myClass = res.data.data.find(c => c._id === classId && c.type === "homeroom");
      setIsHomeroom(!!myClass);
    } catch (err) {
      console.error("Error checking homeroom status:", err);
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      if (editingSubjectId) {
        await axios.put(`/subjects/${editingSubjectId}`, {
          name: subjectName,
          teacherId
        });
      } else {
        await axios.post("/subjects/create", {
          name: subjectName,
          teacherId,
          classId
        });
      }

      fetchSubjects();
      setSubjectName("");
      setTeacherId("");
      setEditingSubjectId(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error saving subject:", err);
      alert("Failed to save subject. Check fields or permissions.");
    }
  };

  const handleEditSubject = (id, name, tId) => {
    setEditingSubjectId(id);
    setSubjectName(name);
    setTeacherId(tId || "");
    setShowModal(true);
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      await axios.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (err) {
      console.error("Error deleting subject:", err);
      alert("Failed to delete subject.");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold title">Class Subjects</h2>
        {isHomeroom && (
          <button
            className="btn btn-primary shadow-sm"
            onClick={() => {
              setEditingSubjectId(null);
              setSubjectName("");
              setTeacherId("");
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-lg me-1"></i> +Add New Subject
          </button>
        )}
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table table-bordered table-striped align-middle">
          <thead>
            <tr className="head">
              <th>Subject Name</th>
              <th>Teacher</th>
              {isHomeroom && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {subjects.length === 0 ? (
              <tr>
                <td colSpan={isHomeroom ? 3 : 2} className="text-center text-muted py-4">
                  No subjects added yet for this class.
                </td>
              </tr>
            ) : (
              subjects.map((subj) => (
                <tr key={subj._id}>
                  <td>{subj.name}</td>
                  <td>{subj.teacherId?.name || "Not Assigned"}</td>
                  {isHomeroom && (
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEditSubject(subj._id, subj.name, subj.teacherId?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleDeleteSubject(subj._id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isHomeroom && showModal && (
        <>
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content shadow-lg border-0">
                <div className="modal-header">
                  <h5 className="modal-title">{editingSubjectId ? "Edit Subject" : "Add New Subject"}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <form onSubmit={handleAddSubject}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subject Name"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <select
                        className="form-select"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        required
                      >
                        <option value="">Assign Teacher</option>
                        {teachers.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm w-100 shadow">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      )}
    </div>
  );
}

export default TeacherSubjectsPage;