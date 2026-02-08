import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import { useState ,useEffect } from "react";
import DatePicker from "react-datepicker";
import './DashboardStudentPage.css';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function CalendarBox({activeType}) {
  const [startDate, setStartDate] = useState(new Date());
  const homeworkDates = ["2026-02-10", "2026-02-15"];
const examDates = ["2026-02-20"];
const absenceDates = ["2026-02-05"];
const holidayDates=["2026-02-04"];


  function dayStyle(date) {
  const d = date.toLocaleDateString("en-CA");

  if (activeType === "holiday" && holidayDates.includes(d)) {
    return "holiday";
  }

  if (activeType === "homework" && homeworkDates.includes(d)) {
    return "homework";
  }

  if (activeType === "exam" && examDates.includes(d)) {
    return "exam";
  }

  if (activeType === "absence" && absenceDates.includes(d)) {
    return "absence";
  }

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
  ["Test 1", 30, 70, 90 , 0],
  ["Test 2", 85, 55, 44 ,3],
  ["Test 3", 4, 80, 92,40],
  ["Test 4", 95, 100, 94,30],
];

const options ={
  title: "Student Progress Over Time",
  hAxis: {
    title: "Tests",
  },
  vAxis: {
    title: "Score",
    minValue: 0,
    maxValue: 100,
  },
  colors: ["#4e73df", "#1cc88a", "#f6c23e","#f63ea9"],
  curveType: "function",
  pointSize: 5,
  legend: { position: "bottom"},
  backgroundColor:"#ced8f8b0",
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

function SideNav() {
  return (
    <aside className="SideNav">
      <h4 className="sidenav-title">School Hub</h4>
      <ul className="sidenav-list">
        <li><Link to="#" className="sidenav-link active"><i className="fa-solid fa-house"></i> Dashboard</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-calendar-days"></i> Schedule</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-book"></i> Homework</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-file-lines"></i> Exams</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-user"></i> Profile</Link></li>
        <li><Link to="#" className="sidenav-link"><i className="fa-solid fa-chart-line"></i> Progress</Link></li>
      </ul>
    </aside>
  );
}

function CompletedLessons(){
  return(
    <div>
      <div className="card dash-card CompletedLessons-card note-2">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <i className="fa-solid fa-paperclip clip"></i>
            <h5 className="card-title">Completed Lessons</h5>
          </div>
          <h3 className="my-2">75%</h3>
          <div className="progress">
            <div className="progress-bar progress-bar-lessons "
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PendingAssignments(){
  return(
    <div>
      <div className="card dash-card CompletedLessons-card note-1">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <i className="fa-solid fa-paperclip clip"></i>
            <h5 className="card-title">Pending Assignments</h5>
          </div>
          <h3 className="my-2">4</h3>
          <div className="progress">
            <div className="progress-bar progress-bar-assigment "
              aria-valuenow={4}
              aria-valuemin={0}
              aria-valuemax={8}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendanceRate(){
  return(
    <div>
      <div className="card dash-card CompletedLessons-card note-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <i className="fa-solid fa-paperclip clip"></i>
            <h5 className="card-title">Attendance Rate</h5>
          </div>
          <h3 className="my-2">5%</h3>
          <div className="progress">
            <div className="progress-bar progress-bar-attendance "
              aria-valuenow={95}
              aria-valuemin={0}
              aria-valuemax={100}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashbourdStudentPage() {
const [activeType, setActiveType] = useState(null);

 

  return (
    <div className="d-flex">

      {/* SIDENAV */}
      <SideNav />

      {/* CONTENT */}
      <div className="container-fluid mt-3">
        <div className="row g-3">

          {/* LEFT SIDE */}
          <div className="col-md-9">
            <div className="row g-3">

              <div className="col-md-4">
                <CompletedLessons />
              </div>

              <div className="col-md-4">
                <PendingAssignments />
              </div>

              <div className="col-md-4">
                <AttendanceRate />
              </div>

              {/* CHART */}
              <div className="col-12">
                <div className="card dash-card mt-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <i className="fa-solid fa-paperclip clip"></i>
                      <h5 className="card-title">Grade Chart</h5>
                    </div>

                    <Chart
                      chartType="LineChart"
                      width="100%"
                      height="350px"
                      data={data}
                      options={options}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CALENDAR */}
          <div className="col-md-3">
            <div className="card dash-card note-5 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <i className="fa-solid fa-paperclip clip"></i>
                  <h5 className="card-title">Calendar</h5>
                </div>

                <CalendarBox   activeType={activeType} />
                <div className="calendar-legend mt-3">

  <button className="legend-btn holiday-btn" onClick={() => setActiveType("holiday")}>
    Holiday
  </button>

  <button className="legend-btn homework-btn"onClick={() => setActiveType("homework")}>
    Homework
  </button>

  <button className="legend-btn exam-btn"onClick={() => setActiveType("exam")}>
    Exam
  </button>

  <button className="legend-btn absence-btn"onClick={() => setActiveType("absence")}>
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
