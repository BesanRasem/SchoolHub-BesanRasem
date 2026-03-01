import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function TeacherGradesPage() {
  const { classId } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [subjectId, setSubjectId] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    setStudents([]);
    setGrades({});
    setSubjectId("");
    setPage(1);
  }, [classId]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get(`/subjects/teach?classId=${classId}`);
        setSubjects(res.data.data || []);
      } catch (err) {
        console.error("Subjects error:", err);
      }
    };

    if (classId) fetchSubjects();
  }, [classId]);

  const fetchStudents = async (currentPage = 1) => {
    try {
      const res = await api.get(
        `/users/students/by-class?classId=${classId}&page=${currentPage}&limit=${limit}`
      );

      const studentsArr = res.data.data || [];
      setStudents(studentsArr);

      const total = res.data.pagination?.total || studentsArr.length;
      setTotalPages(Math.ceil(total / limit));

      return studentsArr;
    } catch (err) {
      console.error("Students error:", err);
      return [];
    }
  };

  const fetchGrades = async (subId, currentPage = 1) => {
    setLoading(true);

    try {
      const studentsArr = await fetchStudents(currentPage);

      const gradesRes = await api.get(
        `/grades?classId=${classId}&subjectId=${subId}`
      );

      const gradesArr = gradesRes.data.data || [];

      const map = {};

      gradesArr.forEach((g) => {
        map[g.studentId._id] = g;
      });

      studentsArr.forEach((st) => {
        if (!map[st._id]) {
          map[st._id] = {
            test1: "",
            test2: "",
            test3: "",
            final: "",
          };
        }
      });

      setGrades(map);
    } catch (err) {
      console.error("Grades error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (e) => {
    const id = e.target.value;
    setSubjectId(id);

    setPage(1); 

    if (id) fetchGrades(id, 1);
  };

  const handleChange = (studentId, field, value) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const saveGrade = async (studentId) => {
    const g = grades[studentId];

    try {
      await api.put(`/grades/student/${studentId}`, {
        subjectId,
        classId,
        test1: g?.test1,
        test2: g?.test2,
        test3: g?.test3,
        final: g?.final,
      });

      alert("Saved ✅");
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    if (subjectId) {
      fetchGrades(subjectId, newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold  mb-4 title">Class Grades</h3>

      <div className="mb-3">
        <select
          className="form-select"
          value={subjectId}
          onChange={handleSubjectChange}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && subjectId && (
        <>
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr className="head">
                <th>Student</th>
                <th>Test 1</th>
                <th>Test 2</th>
                <th>Test 3</th>
                <th>Final</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((st) => (
                <tr key={st._id}>
                  <td>{st.name}</td>

                  {["test1", "test2", "test3", "final"].map((f) => (
                    <td key={f}>
                      <input
                        type="number"
                        className="form-control"
                        value={grades[st._id]?.[f] ?? ""}
                        onChange={(e) =>
                          handleChange(st._id, f, Number(e.target.value))
                        }
                      />
                    </td>
                  ))}

                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => saveGrade(st._id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button
              disabled={page === 1}
              className="btn btn-sm btn-secondary"
              onClick={() => handlePageChange(page - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              className="btn btn-sm btn-secondary"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}