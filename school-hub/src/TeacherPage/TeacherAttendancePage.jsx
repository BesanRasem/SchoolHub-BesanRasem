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

  useEffect(() => {
    if (!classId) return;
    fetchAttendance();
  }, [classId, date]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/attendance/${classId}?date=${date}`);

      setStudents(res.data.students || []);
      setAttendance(res.data.attendance?.students || []);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setStudents([]);
      setAttendance([]);
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
    } 
  };


  return (
    <div className="container mt-4">
      <h3 className="fw-bold title">Attendance for Class</h3>

      <div className="mb-3 Date" >
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="form-control"
        />
      </div>

      <table className="table table-bordered">
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
              <td colSpan={3} className="text-center">No students in this class.</td>
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

      <button
        className="btn btn-primary"
        onClick={saveAttendance}
        
      >
       save
      </button>
    </div>
  );
}

export default TeacherAttendancePage;