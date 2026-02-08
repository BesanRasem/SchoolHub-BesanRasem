// GradesPage.jsx
import React from "react";
import "./GradesStudentPage.css";

const gradesData = [
  { id: 1, subject: "Math", test1: 90, test2: 85, test3: 88, final: 92 },
  { id: 2, subject: "English", test1: 80, test2: 78, test3: 90, final: 85 },
  { id: 3, subject: "Science", test1: 85, test2: 90, test3: 92, final: 95 },
];

// حساب الـ Total
gradesData.forEach(g => g.total = Math.round((g.test1 + g.test2 + g.test3 + g.final) / 4));

export default function GradesStudentPage() {
  return (
    <div className="grades-container">
      <h1 className="grades-title">My Grades</h1>
      <table className="grades-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Test 1</th>
            <th>Test 2</th>
            <th>Test 3</th>
            <th>Final</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {gradesData.map((g, index) => (
            <tr key={g.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{g.subject}</td>
              <td className={g.test1 < 50 ? "fail" : ""}>{g.test1}</td>
              <td className={g.test2 < 50 ? "fail" : ""}>{g.test2}</td>
              <td className={g.test3 < 50 ? "fail" : ""}>{g.test3}</td>
              <td className={g.final < 50 ? "fail" : ""}>{g.final}</td>
              <td className={g.total < 50 ? "fail" : ""}>{g.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
