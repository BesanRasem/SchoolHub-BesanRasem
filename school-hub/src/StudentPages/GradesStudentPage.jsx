import 'bootstrap/dist/css/bootstrap.min.css';
import "./GradesStudentPage.css"; 
import SideNav from '../components/SideNav';


const gradesData = [
  {  subject: "Math", test1: 90, test2: 85, test3: 88, final: 92 },
  {  subject: "English", test1: 80, test2: 78, test3: 90, final: 85 },
  {  subject: "Science", test1: 85, test2: 90, test3: 92, final: 95 },
];

export default function GradesStudentPage() {
  return (
   <div className=" grades-page">
  <SideNav />
  <div className="grades-schedule container  card ">
    <h1 className="grades-schedule-title text-center">Grades Schedule</h1>
    <div className="  table-responsive">
    <table className="table table-striped grade-table ">
      <thead>
        <tr>
          <th>Subjects</th>
          <th>test1</th>
          <th>test2</th>
          <th>test3</th>
          <th>finalTest</th>
        </tr>
      </thead>
      <tbody>
        {gradesData.map((grade) => (
          <tr >
            <td>{grade.subject}</td>
            <td>{grade.test1}</td>
            <td>{grade.test2}</td>
            <td>{grade.test3}</td>
            <td>{grade.final}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
</div>

  );
}
