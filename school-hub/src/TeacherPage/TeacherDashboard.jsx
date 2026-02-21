import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Teacherashboard.css";


function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (user) fetchMyClasses();
  }, [user]);

  const fetchMyClasses = async () => {
    try {
      const res = await axios.get("/classes/my-classes");
      setClasses(res.data.data || []);
    } catch (err) {
      console.error("Error:", err);
    } 
  };


  return (
    <div className="container mt-4">
      <h3 className="fw-bold title mb-4">Teacher Dashboard</h3>
      <div className="row">
        {!classes?.[0] ? (
          <div className="alert alert-info">No classes assigned yet.</div>
        ) : (
          classes.map((cls) => (
            <div className="col-md-4 mb-3" key={cls._id}>
              <div className="card shadow-sm h-100 border-0">

                
                
                <div className="card-body">
                  <h5 className="fw-bold">{cls.grade} - {cls.section}</h5>
                  
                  <div className="mt-2 mb-3">
                    {cls.type === "homeroom" ? (
                      <span className="badge ">Homeroom Teacher</span>
                    ) : (
                      <span className="badge ">Subject Teacher</span>
                    )}
                  </div>

                  <button
                    className="btn btn-outline-primary w-100 mt-2"
                    onClick={() => navigate(`/dashboard/teacher/classes/${cls._id}/subjects`)}
                  >
                    Enter Class
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;