import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ExamsStudentPage.css"; 
import SideNav from '../components/SideNav';
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function GradesStudentPage() {
  const { user } = useAuth();
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      if (!user?.classId) return;

      try {
        const res = await api.get("/grades/student");
        setGradesData(res.data.data.map(subject => ({
          name: subject.name,
          test1: subject.test1,
          test2: subject.test2,
          test3: subject.test3,
          final: subject.final
        })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [user]);

  return (
    <div className="exams-page">
      <SideNav />
      <div className="exam-schedule container">
        <h1 className="exam-schedule-title text-center">My Grades</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped exam-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Test 1</th>
                  <th>Test 2</th>
                  <th>Test 3</th>
                  <th>Final</th>
                </tr>
              </thead>
              <tbody>
                {gradesData.map((subject, index) => (
                  <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{subject.name}</td>
                    <td>{subject.test1 ?? "-"}</td>
                    <td>{subject.test2 ?? "-"}</td>
                    <td>{subject.test3 ?? "-"}</td>
                    <td>{subject.final ?? "-"}</td>
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