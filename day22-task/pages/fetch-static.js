import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';




export default function HomeworkStatic({ homeworks }) {
  return (
    <div className="container my-3 homework-page">
      <h2 className="mb-5 fw-bold">Homework - Page</h2>

      <div className="row g-3">
        {homeworks.map((todo) => (
          <div className="col-md-6" key={todo.id}>
            <div className="card homework-card shadow p-3">
              <div className="d-flex justify-content-between mb-2">
                <h5>Homework</h5>
                {todo.completed ? (
                  <span className="badge bg-success">Completed</span>
                ) : (
                  <span className="badge bg-danger">Not Completed</span>
                )}
              </div>
              <p>{todo.title}</p>
              <button className="btn btn-outline-primary">Loaded Homework</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  const homeworks = await res.json();

  return {
    props: {
      homeworks,
    },
  };
}
