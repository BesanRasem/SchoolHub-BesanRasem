import { useState, useEffect } from "react";
import api from "../api/axios";
import "./AdminDashboard.css";

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [editingClassId, setEditingClassId] = useState(null); // ✅ جديد

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classRes, teacherRes] = await Promise.all([
        api.get("/classes"),
        api.get("/users/teachers")
      ]);
      setClasses(classRes.data.data);
      setTeachers(teacherRes.data.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleCreateOrUpdateClass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingClassId) {
        // تحديث صف
        await api.put(`/classes/update/${editingClassId}`, {
          grade,
          section,
          teacherId: selectedTeacher || null
        });
      } else {
        // إنشاء صف جديد
        await api.post("/classes/create", {
          grade,
          section,
          AdminClass: selectedTeacher || null
        });
      }
      setShowModal(false);
      setGrade("");
      setSection("");
      setSelectedTeacher("");
      setEditingClassId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving class");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This will remove the class from all assigned students.")) {
      try {
        await api.delete(`/classes/delete/${id}`);
        fetchData();
      } catch (err) {
        alert("Error deleting class");
      }
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Classes Management</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingClassId(null);
            setGrade("");
            setSection("");
            setSelectedTeacher("");
            setShowModal(true);
          }}
        >
          + Add New Class
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-head">
              <th>Grade</th>
              <th>Section</th>
              <th>Teacher Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c) => (
              <tr key={c._id}>
                <td>{c.grade}</td>
                <td>{c.section}</td>
                <td>{c.AdminClass ? c.AdminClass.name : "Not Assigned"}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-1"
                    onClick={() => {
                      setEditingClassId(c._id);
                      setGrade(c.grade);
                      setSection(c.section);
                      setSelectedTeacher(c.AdminClass?._id || "");
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingClassId ? "Edit Class" : "Create Class"}
                  </h5>
                  <button className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleCreateOrUpdateClass}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label>Grade (e.g. 10, 11, 12)</label>
                      <input
                        className="form-control"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Section (e.g. A, B, C)</label>
                      <input
                        className="form-control"
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>Assign TeacherAdmin</label>
                      <select
                        className="form-select"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                      >
                        <option value="">Select Teacher (Optional)</option>
                        {teachers.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>
        </>
      )}
    </div>
  );
}

export default ClassesPage;