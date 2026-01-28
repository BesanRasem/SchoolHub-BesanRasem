import { Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";

function App(){
  return(
    <div style={{padding:16}}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route 
        path="/Profile"
        element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>

        }/>
        
      </Routes>

    </div>
  )
}
export default App;
