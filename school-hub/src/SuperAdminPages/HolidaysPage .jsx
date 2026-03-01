// pages/HolidaysPage.jsx
import { useState, useEffect } from "react";
import api from "../api/axios";

function HolidaysPage() {
  const [holidays, setHolidays] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch holidays
  const fetchHolidays = async () => {
    try {
      setLoading(true);
      const res = await api.get("/holidays");
      setHolidays(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // Create holiday
  const handleCreate = async () => {
    if (!name || !date) return alert("Name and Date required");
    try {
      await api.post("/holidays", { name, date });
      setName("");
      setDate("");
      fetchHolidays();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete holiday
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this holiday?")) return;
    try {
      await api.delete(`/holidays/${id}`);
      fetchHolidays();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div >
      <h2>Holidays Management</h2>

      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          placeholder="Holiday Name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="btn btn-secondary" onClick={handleCreate}>
           + Add 
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : holidays.length === 0 ? (
        <p>No holidays found</p>
      ) : (
        <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-head">
              <th>#</th>
              <th>Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((h, idx) => (
              <tr key={h._id}>
                <td>{idx + 1}</td>
                <td>{h.name}</td>
                <td>{new Date(h.date).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-sm  btn-secondary" onClick={() => handleDelete(h._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default HolidaysPage;