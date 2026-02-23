import { useState, useEffect } from "react";
import api from "../api/axios";
import "./AdminDashboard.css";

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [teacherName, setTeacherName] = useState("");
  const [teacherClassId, setTeacherClassId] = useState("");
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [teachersRes, classesRes] = await Promise.all([
        api.get("/users/teachers"),
        api.get("/classes/"),
      ]);

      setTeachers(teachersRes.data.data);
      setFilteredTeachers(teachersRes.data.data);

      const classesData = classesRes.data.data.map((c) => ({
        ...c,
        name: `${c.grade}${c.section}`,
      }));
      setClasses(classesData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = teachers;
    if (search) {
      const sLower = search.toLowerCase();
      data = data.filter(
        (t) =>
          t.name.toLowerCase().includes(sLower) ||
          t._id.includes(search)
      );
    }
    setFilteredTeachers(data);
  }, [search, teachers]);

  const handleEditClick = (teacher) => {
    setEditingTeacherId(teacher._id);
    setTeacherName(teacher.name);
    setTeacherClassId(teacher.classId || "");
    setShowModal(true);
  };

  const handleDelete = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await api.delete(`/users/${teacherId}`);
      setTeachers((prev) => prev.filter((t) => t._id !== teacherId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete teacher");
    }
  };

  // --- Add / Save Teacher منفصل ---
  const handleSaveTeacher = async () => {
    if (!teacherName) return alert("Please enter teacher name");

    setLoading(true);
    setErrorMsg("");

    try {
      if (editingTeacherId) {
        // تحديث Teacher موجود
        await api.put(`/users/teachers/${editingTeacherId}`, {
          name: teacherName,
          classId: teacherClassId || null,
        });
      } else {
        // إضافة Teacher جديد
        const res = await api.post("/users/teachers", {
          name: teacherName,
          classId: teacherClassId || null,
        });
        alert(res.data.message || "Teacher added successfully");
      }

      // إعادة تحميل البيانات
      await fetchInitialData();

      // إعادة تهيئة الفورم
      setShowModal(false);
      setTeacherName("");
      setTeacherClassId("");
      setEditingTeacherId(null);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to save teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <h2 className="fw-bold">Teachers</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingTeacherId(null);
            setTeacherName("");
            setTeacherClassId("");
            setShowModal(true);
          }}
        >
          + Add Teacher
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-head">
              <th>Name</th>
              <th>System ID</th>
              <th>Email</th>
              <th>Homeroom For</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && filteredTeachers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              filteredTeachers.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>{t._id}</td>
                  <td>{t.email || "-"}</td>
                  <td>
                    {classes.find(
                      (c) => c.AdminClass === t._id || c.AdminClass?._id === t._id
                    )?.name || "-"}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-1"
                      onClick={() => handleEditClick(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <>
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content shadow-lg">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingTeacherId ? "Edit Teacher" : "Add New Teacher"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveTeacher();
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label">Teacher Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        required
                      />
                    </div>

                    {/* اختيار Class اختياري */}
                    <div className="mb-3">
                      <label className="form-label">Assign to Class (optional)</label>
                      <select
                        className="form-control"
                        value={teacherClassId}
                        onChange={(e) => setTeacherClassId(e.target.value)}
                      >
                        <option value="">None</option>
                        {classes.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
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

export default TeachersPage;