import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LndingPage";
import Login from "./pages/loginPage/Login";
import DashbourdStudentPage from "./StudentPages/DashboardStudentPage";
import ProtectedRoute from "./ProtectedRoute";

import SchoolAdminLayout from "./SchoolAdminPage/SchoolAdminLayout";
import StudentAdmin from "./SchoolAdminPage/StudentAdmin";
import TeacherAdmin from "./SchoolAdminPage/TeacherAdmin";
import ClassAdmin from "./SchoolAdminPage/ClassAdmin";

import TeacherLayout from "./TeacherPage/TeacherLayout";
import TeacherDashboard from "./TeacherPage/TeacherDashboard";
import TeacherClassLayout from "./TeacherPage/TeacherClassLayout";
import TeacherSubjectsPage from "./TeacherPage/TeacherSubjectsPage";
import TeacherAttendancePage from "./TeacherPage/TeacherAttendancePage";
import TeacherGradesPage from "./TeacherPage/TeacherGradesPage";
import TeacherExamsPage from "./TeacherPage/TeacherExamsPage";
import TeacherSchedulePage from "./TeacherPage/TeacherSchedulePage";
import ExamsStudentPage from "./StudentPages/ExamsStudentPage";
import SchedulStudentPage from "./StudentPages/SchedualStudentPage";
import GradesStudentPage from "./StudentPages/GradesStudentPage";
import HomeworkStudentPage from "./StudentPages/HomeworkStudentPage";
import LessonsStudentPage from "./StudentPages/LessonsStudentPage";
import SubjectDetailsPage from "./StudentPages/SubjectDetailsPage ";
import TeacherLessonPage from "./TeacherPage/TeacherLessonPage";
import TeacherHomeworkPage from "./TeacherPage/TeacherHomeworkPage";
import SuperAdminLayout from "./SuperAdminPages/SuperAdminLayout";
import SchoolsPage from "./SuperAdminPages/SchoolsPage";
import SchoolAdminsPage from "./SuperAdminPages/SchoolAdminsPage ";
import HolidaysPage from "./SuperAdminPages/HolidaysPage ";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
       <Route path="/dashboard/student/exams" element={<ExamsStudentPage />} />
       <Route path="/dashboard/student/schedule" element={<SchedulStudentPage />} />
       <Route path="/dashboard/student/grades" element={<GradesStudentPage />} />
       <Route path="/dashboard/student/homework" element={<HomeworkStudentPage />} />
       <Route path="/dashboard/student/lessons" element={<LessonsStudentPage />} />
      <Route
        path="/dashboard/student"
        element={
          <ProtectedRoute allowedRole="student">
            <DashbourdStudentPage />
          </ProtectedRoute>
        }
      />
      <Route
  path="/dashboard/student/subjects/:subjectId"
  element={
    <ProtectedRoute allowedRole="student">
      <SubjectDetailsPage />
    </ProtectedRoute>
  }
/>

    <Route path="/dashboard/schooladmin" element={<ProtectedRoute allowedRole="schooladmin" />}>
  <Route element={<SchoolAdminLayout />}> {/* هذا Layout مع الناف بار */}
    <Route index element={<StudentAdmin />} /> {/* default page */}
    <Route path="students" element={<StudentAdmin />} />
    <Route path="teachers" element={<TeacherAdmin />} />
    <Route path="classes" element={<ClassAdmin />} />
  </Route>
</Route>
            <Route
        path="/dashboard/teacher"
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="classes/:classId" element={<TeacherClassLayout />}>
          <Route path="attendance" element={<TeacherAttendancePage />} />
          <Route path="subjects" element={<TeacherSubjectsPage />} />
          <Route path="grades" element={<TeacherGradesPage />} />
          <Route path="exams" element={<TeacherExamsPage />} />
          <Route path="schedule" element={<TeacherSchedulePage/>}/>
          <Route path="lessons" element={<TeacherLessonPage/>}/>
          <Route path="homework" element={<TeacherHomeworkPage/>}/>
        </Route>
      </Route>
     <Route
  path="/dashboard/superadmin"
  element={
    <ProtectedRoute allowedRole="superadmin">
      <SuperAdminLayout />
    </ProtectedRoute>
  }
>
  <Route path="schools" element={<SchoolsPage />} />
  <Route path="admins" element={<SchoolAdminsPage />} />
  <Route path="holidays" element={<HolidaysPage />} />
</Route>



    </Routes>
  );
}

export default App;
