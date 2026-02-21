import { useState, useEffect } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

function TeacherSchedulePage({ user }) {
  const { classId } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [isAdminClass, setIsAdminClass] = useState(false);

  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const fetchData = async () => {
    try {
      const resSubjects = await api.get(`/subjects?classId=${classId}`);
      setSubjects(resSubjects.data.data || []);

      const resSchedule = await api.get(`/schedule?classId=${classId}`);
      setSchedule(resSchedule.data.data || []);

      const cls = await api.get(`/classes/my-classes`);
      const thisClass = cls.data.data.find(c => c._id === classId);
      setIsAdminClass(thisClass?.type === "homeroom");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, [classId]);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!day || !subjectId || !startTime || !endTime) { setMessage("All fields required"); return; }
    try {
      await api.post("/schedule/create", { classId, day, subjectId, startTime, endTime });
      setMessage("the lucture has been added");
      setShowModal(false);
      setDay(""); setSubjectId(""); setStartTime(""); setEndTime("");
      fetchData();
    } catch (err) { setMessage(err.response?.data?.message || "Failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lucture?")) return;
    try { await api.delete(`/schedule/${id}`); fetchData(); setMessage("the lucture deleted "); }
    catch { setMessage("Failed"); }
  };

  const renderTable = () => {
    const materialIds = subjects.map(s => s._id);
    return (
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr className="head">
            <th>Day / Subject</th>
            {subjects.map(s => <th key={s._id}>{s.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map(dayName => (
            <tr key={dayName}>
              <td className="fw-bold ">{dayName}</td>
              {materialIds.map(subId => {
                const slot = schedule.find(s => s.day === dayName && s.subjectId?._id === subId);
                return (
                  <td key={subId}>
                    {slot ? `${slot.startTime} - ${slot.endTime}` : ""}
                    {slot && isAdminClass && (
                      <button className="btn btn-sm btn-danger ms-3" onClick={()=>handleDelete(slot._id)}>delete</button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-4">
      {message && <div className="alert alert-info">{message}</div>}
      <div className="d-flex justify-content-between mb-3">
        <h2>Class Schedule</h2>
        {isAdminClass && <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Slot</button>}
      </div>
      {renderTable()}

      {showModal && isAdminClass && (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Add Slot</h5>
                  <button className="btn-close" onClick={()=>setShowModal(false)}></button>
                </div>
                <form onSubmit={handleAddSlot}>
                  <div className="modal-body">
                    <select className="form-select mb-2" value={day} onChange={e=>setDay(e.target.value)} required>
                      <option value="">Select Day</option>
                      {daysOfWeek.map(d=><option key={d} value={d}>{d}</option>)}
                    </select>
                    <select className="form-select mb-2" value={subjectId} onChange={e=>setSubjectId(e.target.value)} required>
                      <option value="">Select Subject</option>
                      {subjects.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                    <input type="time" className="form-control mb-2" value={startTime} onChange={e=>setStartTime(e.target.value)} required/>
                    <input type="time" className="form-control" value={endTime} onChange={e=>setEndTime(e.target.value)} required/>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary w-100">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={()=>setShowModal(false)}></div>
        </>
      )}
    </div>
  );
}

export default TeacherSchedulePage;