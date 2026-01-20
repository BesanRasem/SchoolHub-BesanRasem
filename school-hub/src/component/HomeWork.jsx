import { useState, useEffect } from "react";

function Homework() {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("Loading homework...");

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((data) => {
          setHomeworks(data);
          setMessage("Homework loaded successfully");
          setLoading(false);
        })
        .catch(() => {
          setError("Error loading homework");
          setLoading(false);
        });
    }, 2000);
  }, []);

  return (
    <div className="container my-3 homework-page">
      <h2 className="mb-5 fw-bold">Homework</h2>

      {loading ? (
     <div className="alert alert-info d-flex align-items-center" >
     <div className="spinner-border spinner-border-sm me-2" ></div>
    {message}
  </div>
) : null}
{error? (
  <div className="alert alert-danger">
    {error}
    </div>
):null}

      

      <div className="row g-3">
        {homeworks.map((todo) => (
          <div className="col-md-6" key={todo.id}>
            <div className="card shadow p-3">
              <div className="d-flex justify-content-between mb-2">
                <h5>Homework</h5>
                {todo.completed ? (
                  <span className="badge bg-success">Completed</span>
                ) : (
                  <span className="badge bg-danger">Not Completed</span>
                )}
              </div>
              <p>{todo.title}</p>
              <button className="btn btn-outline-primary"> loaded homework</button>
                
              
                
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homework;
