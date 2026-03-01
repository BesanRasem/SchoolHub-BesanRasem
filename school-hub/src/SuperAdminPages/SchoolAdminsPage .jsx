import { useEffect, useState } from "react";
import api from "../api/axios";

function SchoolAdminPage() {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const [name, setName] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const [schools, setSchools] = useState([]);

  // ================= Fetch Admins =================
  const fetchAdmins = async () => {
    try {
      const res = await api.get("/school-admin");
      setAdmins(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= Fetch Schools for Dropdown =================
  const fetchSchools = async () => {
    try {
      const res = await api.get("/schools");
      setSchools(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchSchools();
  }, []);

  // ================= Filtered List =================
  const filteredAdmins = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      (a.schoolId?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      a._id.toLowerCase().includes(search.toLowerCase())
  );

  // ================= Modal =================
  const openAddModal = () => {
    setEditingAdmin(null);
    setName("");
    setSchoolId("");
    setShowModal(true);
  };

  const openEditModal = (admin) => {
    setEditingAdmin(admin);
    setName(admin.name);
    setSchoolId(admin.schoolId?._id || "");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAdmin) {
        await api.put(`/school-admin/${editingAdmin._id}`, { name, schoolId });
      } else {
        await api.post("/school-admin", { name, schoolId });
      }
      setShowModal(false);
      fetchAdmins();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await api.delete(`/school-admin/${id}`);
      fetchAdmins();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="school-admin-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>School Admins</h2>
        <button className="btn btn-secondary" onClick={openAddModal}>
         + Add Admin
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, school, or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped ">
          <thead>
            <tr  className="table-head">
              <th>#</th>
              <th>Admin ID</th>
              <th>Name</th>
              <th>School</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No admins found
                </td>
              </tr>
            ) : (
              filteredAdmins.map((admin, index) => (
                <tr key={admin._id}>
                  <td>{index + 1}</td>
                  <td>
                    {admin._id}
                  </td>
                  <td>{admin.name}</td>
                  <td>{admin.schoolId?.name || "-"}</td>
                  <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => openEditModal(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleDelete(admin._id)}
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
          className="modal fade show d-block"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingAdmin ? "Edit Admin" : "Add New Admin"}
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
                    placeholder="Admin Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <select
                    className="form-select"
                    value={schoolId}
                    onChange={(e) => setSchoolId(e.target.value)}
                    required
                  >
                    <option value="">Select School</option>
                    {schools.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
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

export default SchoolAdminPage;