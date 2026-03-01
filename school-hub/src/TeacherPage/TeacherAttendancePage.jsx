import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function TeacherAttendancePage() {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; 

  useEffect(() => {
    if (!classId) return;
    fetchAttendance(page);
  }, [classId, date, page]);

  const fetchAttendance = async (currentPage = 1) => {
  try {
    setLoading(true);
    const res = await axios.get(
      `/attendance/${classId}?date=${date}&page=${currentPage}&limit=${limit}`
    );

    setStudents(res.data.students || []);
    setAttendance(res.data.attendance?.students || []);

    const total = res.data.pagination?.total || 0; // ← استخدم total من backend
    setTotalPages(Math.ceil(total / limit));
  } catch (err) {
    console.error("Error fetching attendance:", err);
    setStudents([]);
    setAttendance([]);
  } finally {
    setLoading(false);
  }
};
  const handleStatusChange = (studentId, status) => {
    setAttendance(prev =>
      prev.map(s => (s.studentId === studentId ? { ...s, status } : s))
    );
  };

  const saveAttendance = async () => {
    try {
      setSaving(true);
      await axios.post(`/attendance/${classId}`, { date, students: attendance });
      alert("Attendance saved successfully!");
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert("Failed to save attendance. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold title">Attendance for Class</h3>

      <div className="mb-3 Date">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="form-control"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr className="head">
                <th>Student Name</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    No students in this class.
                  </td>
                </tr>
              ) : (
                students.map(student => {
                  const studentAttendance =
                    attendance.find(s => s.studentId === student._id) || { status: "absent" };
                  return (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td className="text-center">
                        <input
                          type="radio"
                          name={`status-${student._id}`}
                          checked={studentAttendance.status === "present"}
                          onChange={() => handleStatusChange(student._id, "present")}
                        />
                      </td>
                      <td className="text-center">
                        <input
                          type="radio"
                          name={`status-${student._id}`}
                          checked={studentAttendance.status === "absent"}
                          onChange={() => handleStatusChange(student._id, "absent")}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button
              disabled={page === 1}
              className="btn btn-sm btn-secondary"
              onClick={() => handlePageChange(page - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              className="btn btn-sm btn-secondary"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={saveAttendance}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </>
      )}
    </div>
  );
}

export default TeacherAttendancePage;