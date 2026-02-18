import 'bootstrap/dist/css/bootstrap.min.css';
import "./ExamsStudentPage.css"; 
import SideNav from '../components/SideNav';


const examsData = [
  {  title: "Math Quiz", type: "Online", date: "2026-02-05",time:"10:00:00" },
  { title: "English Mid", type: "Offline", date: "2026-02-08",time:"13:00:00" },
  { title: "Science Final", type: "Online", date: "2026-02-08",time:"13:00:00" },
];

export default function ExamsStudentPage() {
  return (
   <div className=" exams-page">
  <SideNav />
  <div className="exam-schedule container  card ">
    <h1 className="exam-schedule-title text-center">Exam Schedule</h1>
    <div className="  table-responsive">
    <table className="table exam-table ">
      <thead>
        <tr>
          <th>Exam Name</th>
          <th>Type</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {examsData.map((exam, index) => (
          <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
            <td>{exam.title}</td>
            <td>{exam.type}</td>
            <td>{exam.date}</td>
            <td>{exam.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
</div>

  );
}
