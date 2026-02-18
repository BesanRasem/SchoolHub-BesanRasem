import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LndingPage";
import Login from "./pages/loginPage/Login";

import DashbourdStudentPage from "./StudentPages/DashboardStudentPage";
import AdminDashboard from "./SchoolAdminPage/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

// لاحقاً تضيفي Teacher و Parent

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route
       path="/dashboard/student"
       element={
        <ProtectedRoute allowedRole="student">
        <DashbourdStudentPage />
         </ProtectedRoute>
        }
      />
    

    </Routes>
  );
}

export default App;
