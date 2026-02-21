const studentsGrades = [
  {
    name: "Ahmad",
    math: { test1: 90, test2: 85, final: 92 }
  },
  {
    name: "Sara",
    math: { test1: 80, test2: 88, final: 90 }
  }
];

function TeacherGradesPage() {
  return (
    <div className="card p-4">
      <h2 className="text-center mb-4">Grades</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student</th>
            <th>Test 1</th>
            <th>Test 2</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          {studentsGrades.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td><input defaultValue={s.math.test1} /></td>
              <td><input defaultValue={s.math.test2} /></td>
              <td><input defaultValue={s.math.final} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherGradesPage;
