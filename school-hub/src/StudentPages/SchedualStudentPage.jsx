import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SchedualStudentPage.css";
import SideNav from "../components/SideNav";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

export default function ScheduleStudentPage() {
  const { user } = useAuth();
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Sunday");

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!user?.classId) return;
      try {
        const res = await api.get(`/schedule?classId=${user.classId}`);
        setScheduleData(
          res.data.data.map(item => ({
            subject: item.subjectId.name,
            day: item.day,
            startTime: item.startTime,
            endTime: item.endTime
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [user]);

  const filteredSchedule = scheduleData.filter(
    slot => slot.day === selectedDay
  );

  return (
    <div className="schedule-page">
      <SideNav />

      <div className="schedule-content container">
        <h1 className="schedule-title text-center">Class Schedule</h1>

        <div className="day-selector d-flex justify-content-center flex-wrap mb-4">
          {DAYS.map(day => (
            <button
              key={day}
              className={`day-btn ${selectedDay === day ? "active" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped exam-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Day</th>
                  <th>Start Time</th>
                  <th>End Time</th>
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
                  filteredSchedule.map((slot, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "even-row" : "odd-row"}
                    >
                      <td>{slot.subject}</td>
                      <td>{slot.day}</td>
                      <td>{slot.startTime}</td>
                      <td>{slot.endTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}