import { useEffect, useState } from "react";
import api from "../api/axios";

function SchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const fetchSchools = async () => {
    try {
      const res = await api.get("/schools");
      setSchools(res.data.data);
      setFilteredSchools(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
  const value = search.toLowerCase();

  const filtered = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(value) ||
      s.address.toLowerCase().includes(value) ||
      s._id.toLowerCase().includes(value)
  );

  setFilteredSchools(filtered);
}, [search, schools]);

  const openAddModal = () => {
    setEditingSchool(null);
    setName("");
    setAddress("");
    setShowModal(true);
  };

  const openEditModal = (school) => {
    setEditingSchool(school);
    setName(school.name);
    setAddress(school.address);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSchool) {
        await api.put(`/schools/${editingSchool._id}`, {
          name,
          address,
        });
      } else {
        await api.post("/schools/create", {
          name,
          address,
        });
      }

      setShowModal(false);
      fetchSchools();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this school?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/schools/${id}`);
      fetchSchools();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Add New School</h2>
        <button className="btn btn-secondary" onClick={openAddModal}>
         + Add School
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by school name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped  align-middle">
          <thead className="table-head">
            <tr>
              <th>#</th>
              <th>School ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSchools.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No schools found
                </td>
              </tr>
            ) : (
              filteredSchools.map((school, index) => (
                <tr key={school._id}>
                  <td>{index + 1}</td>

                  <td>
                    {school._id}
                  </td>

                  <td>{school.name}</td>
                  <td>{school.address}</td>
                  <td>
                    {new Date(school.createdAt).toLocaleDateString()}
                  </td>

                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => openEditModal(school)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleDelete(school._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block" >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingSchool ? "Edit School" : "Add New School"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="School Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-secondary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SchoolsPage;