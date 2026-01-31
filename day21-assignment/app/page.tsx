"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSchools() {
      try {
        const res = await fetch("/api/schools");
        const data = await res.json();
        setSchools(data);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSchools();
  }, []);

  const filtered = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div >
      <div className="container mt-3 page-text text-center mb-3">
      <h1 className="mb-3" >Explore Schools</h1>
      <p >Search and select your school to continue</p>
      

      <div className="d-flex mb-3 gap-2">
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => setSearch("")}>
          Reset
        </button>
      
      </div>


      {loading && <p>Loading schools...</p>}
      {!loading && filtered.length === 0 && <p>No schools found.</p>}
      </div>

      <div
        className="schools-container schools-track"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "1rem",
          padding: "1rem 0",
        }}
      >
        {filtered.map((school, index) => (
          <div
            key={index}
            className="school-card"
            style={{
              minWidth: "250px",
              flex: "0 0 auto",
            }}
          >
            <div
              className="card shadow-sm"
              
            >
              <img
                src={school.image}
                className="card-img-top"
                alt={school.name}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5>{school.name}</h5>
                <div className="mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} style={{ color: "gold", fontSize: "1rem" }}>
                      {i <= school.rating ?<i className="fa-solid fa-star"></i>:<i className="fa-regular fa-star"></i>}
                    </span>
                  ))}
                </div>
                <button className="btn btn-primary w-100">Select School</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
