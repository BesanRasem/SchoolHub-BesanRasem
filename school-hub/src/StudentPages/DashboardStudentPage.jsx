import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import './DashboardStudentPage.css';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav from "../components/SideNav";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function CalendarBox({ activeType, attendanceDates = [], examDates = [], homeworkDates = [], holidayDates = [] }) {
  const [startDate, setStartDate] = useState(new Date());

  function dayStyle(date) {
    const d = date.toISOString().split("T")[0];

    if (activeType === "holiday" && holidayDates.includes(d)) return "holiday";
    if (activeType === "homework" && homeworkDates.includes(d)) return "homework";
    if (activeType === "exam" && examDates.includes(d)) return "exam";
    if (activeType === "absence" && attendanceDates.includes(d)) return "absence";

    return undefined;
  }

  return (
    <div className="calendar-box">
      <h5 className="mb-2">Calendar</h5>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        dayClassName={dayStyle}
      />
    </div>
  );
}

const data = [
  ["Test", "Math", "Physics", "English", "Science"],
  ["Test 1", 30, 70, 90, 0],
  ["Test 2", 85, 55, 44, 3],
  ["Test 3", 4, 80, 92, 40],
  ["Test 4", 95, 100, 94, 30],
];

const options = {
  title: "Student Progress Over Time",
  hAxis: {
    title: "Tests",
  },
  vAxis: {
    title: "Score",
    minValue: 0,
    maxValue: 100,
  },
  colors: ["#4e73df", "#1cc88a", "#f6c23e", "#f63ea9"],
  curveType: "function",
  pointSize: 5,
  legend: { position: "bottom" },
  backgroundColor: "#ced8f8b0",
  chartArea: {
    width: "85%",
    height: "70%",
  },
};

export async function getServerProps() {
  const res = await fetch("https://date.nager.at/api/v3/PublicHolidays/2026/JO");
  const holidays = await res.json();
  return { props: { holidays } };
}

function CompletedLessons() {
  const { user } = useAuth();
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    if (!user?._id) return;

    api.get(`/lesson-progress/completion-rate`)
      .then(res => setCompletionRate(res.data.rate || 0))
      .catch(err => console.error(err));
  }, [user]);

  const percentage = completionRate;

  return (
    <div className="card dash-card note-2">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <i className="fa-solid fa-paperclip clip"></i>
          <h5 className="card-title">Completed Lessons</h5>
        </div>

        {/* الرقم فوق */}
        <h3 className="progress-number">{percentage}%</h3>

        {/* البار */}
        <div className="progress custom-progress">
          <div
            className="progress-bar status-good"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function PendingAssignments({ pendingCount, totalAssignments }) {

  const percentage =
    totalAssignments === 0
      ? 0
      : Math.round((pendingCount / totalAssignments) * 100);

  let statusClass = "";

  if (percentage < 25) statusClass = "status-good";
  else if (percentage < 50) statusClass = "status-warning";
  else statusClass = "status-danger";

  return (
    <div className="card dash-card note-1">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <i className="fa-solid fa-paperclip clip"></i>
          <h5 className="card-title">Pending Assignments</h5>
        </div>

        <h3 className="progress-number">{percentage}%</h3>

        <div className="progress custom-progress">
          <div
            className={`progress-bar ${statusClass}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function AttendanceRate() {
  const { user } = useAuth();
  const [absenceRate, setAbsenceRate] = useState(0);

  useEffect(() => {
    if (!user?._id) return;

    api.get(`/attendance/student/${user._id}`)
      .then(res => {
        const totalDays = res.data.totalDays || 0;
        const absentDays = res.data.absentDates?.length || 0;
        const rate =
          totalDays === 0
            ? 0
            : Math.round((absentDays / totalDays) * 100);

        setAbsenceRate(rate);
      })
      .catch(err => console.error(err));
  }, [user]);

  const percentage = absenceRate;

  let statusClass = "";

  if (percentage < 25) statusClass = "status-good";
  else if (percentage < 50) statusClass = "status-warning";
  else statusClass = "status-danger";

  return (
    <div className="card dash-card note-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <i className="fa-solid fa-paperclip clip"></i>
          <h5 className="card-title">Absence Rate</h5>
        </div>

        <h3 className="progress-number">{percentage}%</h3>

        <div className="progress custom-progress">
          <div
            className={`progress-bar ${statusClass}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
export default function DashbourdStudentPage() {
  const [activeType, setActiveType] = useState(null);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [examDates, setExamDates] = useState([]);
  const [homeworkDates, setHomeworkDates] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [holidayDates, setHolidayDates] = useState([]);
  useEffect(() => {
    if (activeType === "holiday") {
      api.get("/holidays/")
        .then(res => {
          const dates = res.data.data.map(h => new Date(h.date).toISOString().split("T")[0]);
          setHolidayDates(dates);
        })
        .catch(err => console.error(err));
    }
  }, [activeType]);


  useEffect(() => {
    if (!user?.classId) return;

    const fetchGrades = async () => {
      try {
        const res = await api.get("/grades/student");
        const subjects = res.data.data;

        if (!subjects || subjects.length === 0) return;

        const header = ["Test", ...subjects.map(sub => sub.name)];

        const tests = ["test1", "test2", "test3", "final"];
        const maxScores = { test1: 20, test2: 20, test3: 20, final: 40 };

        const rows = tests.map((test, idx) => {
          const rowValues = subjects.map(sub => {
            const score = sub[test] ?? 0;
            return Math.round((score / maxScores[test]) * 100);
          });

          const tooltips = subjects.map(sub => {
            const score = sub[test] ?? 0;
            return { v: Math.round((score / maxScores[test]) * 100), f: `${score} / ${maxScores[test]}` };
          });

          return [`Test ${idx + 1}`, ...tooltips];
        });

        setChartData([header, ...rows]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGrades();
  }, [user]);

  useEffect(() => {
    if (activeType === "absence" && user?._id) {
      api.get(`/attendance/student/${user._id}`)
        .then(res => setAttendanceDates(res.data.absentDates || []))
        .catch(err => console.error(err));
    }

    if (activeType === "exam" && user?.classId) {
      api.get(`/exams/student?classId=${user.classId}`)
        .then(res => {
          const dates = res.data.data.map(e => new Date(e.examDate).toISOString().split("T")[0]);
          setExamDates(dates);
        })
        .catch(err => console.error(err));
    }

    if (user?.classId) {
      api.get(`/homework/student?classId=${user.classId}`)
        .then(res => {
          const homeworks = res.data.data || [];

          const pending = homeworks.filter(hw => hw.status === "Pending");
          setPendingCount(pending.length);

          const dates = pending.map(hw =>
            new Date(hw.dueDate).toISOString().split("T")[0]
          );
          setTotalAssignments(homeworks.length);

          setHomeworkDates(dates);
        })
        .catch(err => console.error(err));
    }
  }, [activeType, user]);

  return (
    <div className="SideNavContainer">

      <SideNav />

      <div className="container-fluid mt-3">
        <div className="row g-3">

          <div className="col-12 col-xl-9">
            <div className="row g-3">

              <div className="col-12  col-md-4 ">
                <CompletedLessons />
              </div>

              <div className="col-12  col-md-4">
                <PendingAssignments pendingCount={pendingCount} totalAssignments={totalAssignments} />
              </div>

              <div className="col-12  col-md-4">
                <AttendanceRate />
              </div>

              <div className="col-12 ">
                <div className="card dash-card note-4 mt-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <i className="fa-solid fa-paperclip clip"></i>
                      <h5 className="card-title">Grade Chart</h5>
                    </div>

                    <Chart
                      chartType="LineChart"
                      width="100%"
                      height="350px"
                      data={chartData}
                      options={options}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="col-12 col-xl-3">
            <div className="card dash-card note-5 h-100 d-flex flex-column justify-content-center align-items-center">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <i className="fa-solid fa-paperclip clip"></i>
                  <h5 className="card-title">Calendar</h5>
                </div>

                <CalendarBox
                  activeType={activeType}
                  attendanceDates={attendanceDates}
                  examDates={examDates}
                  homeworkDates={homeworkDates}
                  holidayDates={holidayDates}
                />

                <div className="calendar-legend mt-3">

                  <button className="legend-btn holiday-btn" onClick={() => setActiveType("holiday")}>
                    Holiday
                  </button>

                  <button className="legend-btn h-btn" onClick={() => setActiveType("homework")}>
                    Homework
                  </button>

                  <button className="legend-btn exam-btn" onClick={() => setActiveType("exam")}>
                    Exam
                  </button>

                  <button className="legend-btn absence-btn" onClick={() => setActiveType("absence")}>
                    Absence
                  </button>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}