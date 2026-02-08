import { Route,Routes } from "react-router-dom";
import './App.css';
import HomeworkStudentPage from "./StudentPages/HomeworkStudentPage";
import ExamsStudentPage from "./StudentPages/ExamsStudentPage";
import GradesStudentPage from "./StudentPages/GradesStudentPage";
import SchedualStudentPage from "./StudentPages/SchedualStudentPage";
import LandingPage from "./pages/landingPage/LndingPage";
import DashbourdStudentPage from "./StudentPages/DashboardStudentPage";

function App() {
  return (
<Routes>
  
     <Route path="/" element={<DashbourdStudentPage />} />
  
</Routes>
  );
}

export default App;