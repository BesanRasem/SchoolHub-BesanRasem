import React, { useState } from "react";
import "./SchedualStudentPage.css"; // تأكد اسم الملف صحيح

const scheduleData = [
  {
    day: "Monday",
    subjects: [
      { name: "Math", from: "08:00", to: "09:30" },
      { name: "Physics", from: "09:45", to: "11:15" },
      { name: "English", from: "11:30", to: "12:30" },
    ],
  },
  {
    day: "Tuesday",
    subjects: [
      { name: "Chemistry", from: "08:00", to: "09:30" },
      { name: "History", from: "09:45", to: "11:15" },
      { name: "Art", from: "11:30", to: "12:30" },
    ],
  },
  {
    day: "Wednesday",
    subjects: [
      { name: "Biology", from: "08:00", to: "09:30" },
      { name: "Math", from: "09:45", to: "11:15" },
      { name: "Physical Education", from: "11:30", to: "12:30" },
    ],
  },
  {
    day: "Thursday",
    subjects: [
      { name: "English", from: "08:00", to: "09:30" },
      { name: "Physics", from: "09:45", to: "11:15" },
      { name: "Music", from: "11:30", to: "12:30" },
    ],
  },
  {
    day: "Friday",
    subjects: [
      { name: "Chemistry", from: "08:00", to: "09:30" },
      { name: "Math", from: "09:45", to: "11:15" },
      { name: "Computer Science", from: "11:30", to: "12:30" },
    ],
  },
];

export default function SchedualStudentPage() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const handleDayClick = (day) => setSelectedDay(day);

  const currentSchedule = scheduleData.find(
    (item) => item.day === selectedDay
  );

  return (
    <div className="schedule-page">
      <h1 className="title">My Weekly Schedule</h1>

      <div className="days-buttons">
        {scheduleData.map((item) => (
          <button
            key={item.day}
            onClick={() => handleDayClick(item.day)}
            className={`day-btn ${selectedDay === item.day ? "active" : ""}`}
          >
            {item.day}
          </button>
        ))}
      </div>

      <div className="schedule-card">
        <h2 className="schedule-title">{selectedDay}'s Classes</h2>
        <ul className="subjects-list">
          {currentSchedule.subjects.map((subject, index) => (
            <li key={index} className="subject-item">
              <div className="subject-name">{subject.name}</div>
              <div className="subject-time">
                {subject.from} - {subject.to}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
