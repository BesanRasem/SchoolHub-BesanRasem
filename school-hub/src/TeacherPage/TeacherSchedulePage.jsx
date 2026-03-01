import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

export default function TeacherSchedulePage() {
  const { classId } = useParams();

  const [schedule, setSchedule] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Sunday");

  const [subjectId, setSubjectId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const fetchData = async () => {
    const resSchedule = await api.get(`/schedule?classId=${classId}`);
    setSchedule(resSchedule.data.data || []);

    const resSubjects = await api.get(`/subjects?classId=${classId}`);
    setSubjects(resSubjects.data.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [classId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post("/schedule/create", {
      classId,
      subjectId,
      day: selectedDay,
      startTime,
      endTime,
    });

    setSubjectId("");
    setStartTime("");
    setEndTime("");
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slot?")) return;
    await api.delete(`/schedule/${id}`);
    fetchData();
  };

  const filteredSchedule = schedule.filter(
    (s) => s.day === selectedDay
  );

  return (
    <div className="schedule-page">
      

      <div className="schedule-content container">
        <h1 className="schedule-title text-center">Class Schedule</h1>

        <div className="day-selector d-flex justify-content-center flex-wrap mb-4">
          {DAYS.map((day) => (
            <button
              key={day}
              className={`day-btn ${selectedDay === day ? "active" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <form className="row g-2 mb-4" onSubmit={handleAdd}>
          <div className="col-md-4">
            <select
              className="form-select"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">+ Add</button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped exam-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Start</th>
                <th>End</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedule.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center fw-bold">
                    No classes on {selectedDay}
                  </td>
                </tr>
              ) : (
                filteredSchedule.map((slot, i) => (
                  <tr key={slot._id}>
                    <td>{slot.subjectId?.name}</td>
                    <td>{slot.startTime}</td>
                    <td>{slot.endTime}</td>
                    <td className="text-center">
                      <button
                        className=" btn btn-primary"
                        onClick={() => handleDelete(slot._id)}
                      >
                       Delate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}