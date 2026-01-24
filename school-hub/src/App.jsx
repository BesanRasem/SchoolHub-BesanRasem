import StudentDashboard from "./components/StudentDashboard";
import SubjectPage from "./components/SubjectPage";
import { Route,Routes } from "react-router-dom";
import './App.css';


function App() {
  return (
<Routes>
  
     <Route path="/" element={<StudentDashboard />} />
  
</Routes>
  );
}

export default App;