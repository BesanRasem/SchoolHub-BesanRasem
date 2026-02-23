import { useState, useEffect } from "react";
import api from "../api/axios";
import "./AdminDashboard.css";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [studentBirthDate, setStudentBirthDate] = useState("");
  const [studentNationalId, setStudentNationalId] = useState("");

  const [parentName, setParentName] = useState("");
  const [parentNationalId, setParentNationalId] = useState("");
  const [parentPhone, setParentPhone] = useState("");

  const [classId, setClassId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [editingStudentId, setEditingStudentId] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchStudents(page);
  }, [page, search, selectedClass]);

  const fetchStudents = async (currentPage = 1) => {
    setLoading(true);
    try {
      const res = await api.get("/users", {
        params: {
          page: currentPage,
          limit,
          search,
          classId: selectedClass
        }
      });

      setStudents(res.data.data || []);
      const total = res.data.pagination?.total || res.data.data?.length || 0;
      setTotalPages(Math.ceil(total / limit));
      setFilteredStudents(res.data.data || []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes/");
      const classesData = res.data.data.map(c => ({
        ...c,
        name: `${c.grade}${c.section}`
      }));
      setClasses(classesData);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/users/${studentId}`);
      fetchStudents(page);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  const handleEditClick = (student) => {
    setEditingStudentId(student._id);
    setStudentName(student.name);
    setStudentBirthDate(student.birthDate ? new Date(student.birthDate).toISOString().split("T")[0] : "");
    setStudentNationalId(student.nationalId || "");
    setParentName(student.parentId?.name || "");
    setParentNationalId(student.parentId?.nationalId || "");
    setParentPhone(student.parentId?.parentPhone || "");
    setClassId(student.classId?._id || student.classId || "");
    setShowModal(true);
  };

  const resetForm = () => {
    setStudentName("");
    setStudentBirthDate("");
    setStudentNationalId("");
    setParentName("");
    setParentNationalId("");
    setParentPhone("");
    setClassId("");
    setEditingStudentId(null);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      if (editingStudentId) {
        await api.put(`/users/${editingStudentId}`, {
          name: studentName,
          birthDate: studentBirthDate || null,
          nationalId: studentNationalId || null,
          classId: classId || null,
          parentName,
          parentNationalId: parentNationalId || null,
          parentPhone,
        });
      } else {
        await api.post("/users/create", {
          name: studentName,
          birthDate: studentBirthDate || null,
          nationalId: studentNationalId || null,
          role: "student",
          classId: classId || null,
          parentName,
          parentNationalId: parentNationalId || null,
          parentPhone,
        });
      }

      fetchStudents(page);
      setShowModal(false);
      resetForm();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error saving student");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
        <h2>Students</h2>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          + Add Student
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, ID, or national ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="table-head">
                  <th>Name</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Birth Date</th>
                  <th>National ID</th>
                  <th>Parent Name</th>
                  <th>Parent ID</th>
                  <th>Parent Email</th>
                  <th>Parent Phone</th>
                  <th>Class</th>
                  <th>Parent National ID</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s._id}</td>
                    <td>{s.email || "-"}</td>
                    <td>{s.birthDate ? new Date(s.birthDate).toLocaleDateString() : "-"}</td>
                    <td>{s.nationalId || "-"}</td>
                    <td>{s.parentId?.name || "-"}</td>
                    <td>{s.parentId?._id || "-"}</td>
                    <td>{s.parentId?.email || "-"}</td>
                    <td>{s.parentId?.parentPhone || "-"}</td>
                    <td>
                      {s.classId ? classes.find(c => c._id === (s.classId?._id || s.classId))?.name : "Not Assigned"}
                    </td>
                    <td>{s.parentId?.nationalId || "-"}</td>
                    <td className="d-flex">
                      <button className="btn btn-sm btn-primary me-1" onClick={() => handleEditClick(s)}>Edit</button>
                      <button className="btn btn-sm btn-primary" onClick={() => handleDelete(s._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <button disabled={page === 1} className="btn btn-sm btn-secondary" onClick={() => handlePageChange(page - 1)}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} className="btn btn-sm btn-secondary" onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </>
      )}

      {showModal && (
        <>
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingStudentId ? "Edit Student" : "Add Student"}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="modal-body">
                  {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                  <form onSubmit={handleAddStudent}>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required/>
                    </div>
                    <div className="mb-2">
                      <input type="date" className="form-control" value={studentBirthDate} onChange={(e) => setStudentBirthDate(e.target.value)} />
                    </div>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Student National ID" value={studentNationalId} onChange={(e) => setStudentNationalId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Parent Name" value={parentName} onChange={(e) => setParentName(e.target.value)} required/>
                    </div>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Parent National ID" value={parentNationalId} onChange={(e) => setParentNationalId(e.target.value)} />
                    </div>
                    <div className="mb-2">
                      <input type="text" className="form-control" placeholder="Parent Phone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                      <select className="form-select" value={classId} onChange={(e) => setClassId(e.target.value)}>
                        <option value="">Select Class</option>
                        {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-100">save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>
        </>
      )}
    </div>
  );
}

export default StudentsPage;