import { useEffect, useState } from "react";
import api from "../api/axios";

function SuperAdminSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await api.get("/schools"); // إذا ما عندك GET schools نضيفه
      setSchools(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setSchoolName("");
    setSchoolAddress("");
    setAdminName("");
    setErrorMsg("");
  };

  const handleCreateSchool = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // 1️⃣ إنشاء المدرسة
      const schoolRes = await api.post("/schools/create", {
        name: schoolName,
        address: schoolAddress,
      });

      const schoolId = schoolRes.data.data._id;

      // 2️⃣ إنشاء School Admin
      await api.post("/users/create-schooladmin", {
        name: adminName,
        role: "schooladmin",
        schoolId,
      });

      setShowModal(false);
      resetForm();
      fetchSchools();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to create school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Schools</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add School
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>School Name</th>
              <th>Address</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {schools.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center fw-bold">
                  No schools yet
                </td>
              </tr>
            ) : (
              schools.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.address || "-"}</td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New School</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                  <form onSubmit={handleCreateSchool}>
                    <input
                      className="form-control mb-2"
                      placeholder="School Name"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      required
                    />
                    <input
                      className="form-control mb-2"
                      placeholder="Address"
                      value={schoolAddress}
                      onChange={(e) => setSchoolAddress(e.target.value)}
                    />
                    <hr />
                    <input
                      className="form-control mb-2"
                      placeholder="School Admin Name"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      required
                    />
                    <button className="btn btn-primary w-100" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
}

export default SuperAdminSchoolsPage;