import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ExamsStudentPage.css"; 
import SideNav from '../components/SideNav';
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ExamsStudentPage() {
  const { user } = useAuth();
  const [examsData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      if (!user?.classId) return;
      try {
        const res = await api.get(`/exams/student?classId=${user.classId}`);
        setExamsData(
          res.data.data.map(e => ({
            title: e.name,
            subject: e.subjectId?.name || "",
            type: e.examType,
            date: new Date(e.examDate).toISOString().split("T")[0],
            time: e.examTime
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [user]);

  return (
    <div className="exams-page">
      <SideNav />
      <div className="exam-schedule container">
        <h1 className="exam-schedule-title text-center">Exam Schedule</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped exam-table">
              <thead>
                <tr>
                  <th>Exam Name</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {examsData.map((exam, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even-row" : "odd-row"}
                  >
                    <td>{exam.title}</td>
                    <td>{exam.subject}</td>
                    <td>{exam.type}</td>
                    <td>{exam.date}</td>
                    <td>{exam.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}