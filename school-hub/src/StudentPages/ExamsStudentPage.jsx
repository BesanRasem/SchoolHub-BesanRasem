// ExamSchedulePage.jsx
import React from "react";
import "./ExamsStudentPage.css"; // CSS خارجي

const examsData = [
  { id: 1, title: "Math Quiz", type: "Online", datetime: "2026-02-05T10:00:00" },
  { id: 2, title: "English Mid", type: "Offline", datetime: "2026-02-08T13:00:00" },
  { id: 3, title: "Science Final", type: "Online", datetime: "2026-02-15T09:00:00" },
];

export default function ExamsStudentPage() {
  return (
    <div className="exam-schedule-container">
      <h1 className="exam-schedule-title">Exam Schedule</h1>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Exam Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {examsData.map((exam, index) => {
            const examDate = new Date(exam.datetime);
            const dateStr = examDate.toLocaleDateString();
            const timeStr = examDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return (
              <tr key={exam.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{exam.title}</td>
                <td>{exam.type}</td>
                <td>{dateStr}</td>
                <td>{timeStr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
