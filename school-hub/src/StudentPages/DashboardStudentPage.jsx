import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import { useState ,useEffect } from "react";
import DatePicker from "react-datepicker";
import './DashboardStudentPage.css';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNav from "../components/SideNav";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function CalendarBox({activeType, attendanceDates = [], examDates = []}) {
  const [startDate, setStartDate] = useState(new Date());
  const homeworkDates = ["2026-02-10", "2026-02-15"];
  const holidayDates = ["2026-02-04"];

  function dayStyle(date) {
    const d = date.toLocaleDateString("en-CA");

    if (activeType === "holiday" && holidayDates.includes(d)) return "holiday";
    if (activeType === "homework" && homeworkDates.includes(d)) return "homework";
    if (activeType === "exam" && examDates.includes(d)) return "exam"; // جديد
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

function AttendanceRate() {
  const { user } = useAuth();
  const [absenceRate, setAbsenceRate] = useState(null);

  useEffect(() => {
    if (user?._id) {
      api.get(`/attendance/student/${user._id}`)
        .then(res => {
          const totalDays = res.data.totalDays || 0;
          const absentDays = res.data.absentDates?.length || 0;
          const rate = totalDays === 0 ? 0 : Math.round((absentDays / totalDays) * 100);
          setAbsenceRate(rate);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  function getBarColor(rate) {
    if (rate < 25) return "#1cc88a";    // أخضر → منخفض
    if (rate < 50) return "#f6c23e";    // أصفر → متوسط
    return "#e74a3b";                    // أحمر → عالي
  }

  return (
    <div>
      <div className="card dash-card CompletedLessons-card note-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <i className="fa-solid fa-paperclip clip"></i>
            <h5 className="card-title">Absence Rate</h5>
          </div>
          <h3 className="my-2">
            {absenceRate !== null ? `${absenceRate}%` : "Loading..."}
          </h3>
          <div className="progress">
            <div
              className="progress-bar"
              style={{
                width: `${absenceRate || 0}%`,
                backgroundColor: getBarColor(absenceRate)
              }}
              aria-valuenow={absenceRate || 0}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashbourdStudentPage() {
 const [activeType, setActiveType] = useState(null);
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [examDates, setExamDates] = useState([]);
  const { user } = useAuth();
  const [chartData, setChartData] = useState([]);
useEffect(() => {
  if (!user?.classId) return;

  const fetchGrades = async () => {
    try {
      const res = await api.get("/grades/student"); // جلب العلامات للطالب
      const subjects = res.data.data;

      if (!subjects || subjects.length === 0) return;

      // رأس الجدول
      const header = ["Test", ...subjects.map(sub => sub.name)];

      // لبناء الصفوف
      const tests = ["test1", "test2", "test3", "final"];
      const maxScores = { test1: 20, test2: 20, test3: 20, final: 40 };

      const rows = tests.map((test, idx) => {
        const rowValues = subjects.map(sub => {
          const score = sub[test] ?? 0;
          // تحويل للـ chart (0-100%)
          return Math.round((score / maxScores[test]) * 100);
        });

        const tooltips = subjects.map(sub => {
          const score = sub[test] ?? 0;
          return { v: Math.round((score / maxScores[test]) * 100), f: `${score} / ${maxScores[test]}` };
        });

        return [ `Test ${idx + 1}`, ...tooltips ];
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

  // لما يضغط Exam نجيب أيام الامتحانات
  if (activeType === "exam" && user?.classId) {
    api.get(`/exams/student?classId=${user.classId}`)
      .then(res => {
        // نحتفظ بس بالتاريخ بصيغة "YYYY-MM-DD"
        const dates = res.data.data.map(e => new Date(e.examDate).toISOString().split("T")[0]);
        setExamDates(dates);
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
                <PendingAssignments />
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
  examDates={examDates}  // جديد
/>                <div className="calendar-legend mt-3">

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
