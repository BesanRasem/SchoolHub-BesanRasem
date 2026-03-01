import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeworkStudentPage.css";
import SideNav from "../components/SideNav";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const TABS = ["All", "Pending", "Submitted", "Late"];

export default function StudentHomeworkPage() {
  const { user } = useAuth();
  const [homeworks, setHomeworks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState(null);

  useEffect(() => {
    const fetchHomeworks = async () => {
      if (!user?.classId) return;

      try {
        const res = await api.get(
          `/homework/student?classId=${user.classId}`
        );
        setHomeworks(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeworks();
  }, [user]);

  const filteredHomeworks =
    selectedTab === "All"
      ? homeworks
      : homeworks.filter(hw => hw.status === selectedTab);

  const uploadPdf = async (file, homeworkId) => {
    if (!file) return;

    setUploadingId(homeworkId);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog_uploads");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwg5rv0jm/auto/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    await api.post(`/homework/${homeworkId}/submit`, {
      pdfUrl: data.secure_url
    });

    setHomeworks(prev =>
      prev.map(hw =>
        hw._id === homeworkId ? { ...hw, status: "Submitted" } : hw
      )
    );

    setUploadingId(null);
  };

  const openPdf = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="homework-page">
      <SideNav />

      <div className="homework-content container">
        <h1 className="homework-title text-center">My Homework</h1>

        <div className="day-selector d-flex justify-content-center flex-wrap mb-4">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`day-btn ${
                selectedTab === tab ? "active" : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="row g-4">
            {filteredHomeworks.length === 0 ? (
              <p className="text-center fw-bold">
                No {selectedTab} homework
              </p>
            ) : (
              filteredHomeworks.map(hw => (
                <div key={hw._id} className="col-12 col-sm-6 col-lg-4">
                  <div className="card homework-card h-100">
                    <div className="card-body d-flex flex-column">

                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold mb-0">
                          {hw.subject}
                        </h5>

                        <span
                          className={`badge status-badge ${hw.status.toLowerCase()}`}
                        >
                          {hw.status}
                        </span>
                      </div>

                      <p className="card-text text-muted small flex-grow-1">
                        {hw.description}
                      </p>

                      <p className="due-date mb-3">
                         Due: {new Date(hw.dueDate).toLocaleDateString()}
                      </p>

                      <div className="mt-auto d-flex gap-2 flex-wrap">
                        {hw.pdfUrl && (
                          <button
                            className="btn homework-btn btn-sm w-100"
                            onClick={() => openPdf(hw.pdfUrl)}
                          >
                            View Homework
                          </button>
                        )}

                        {hw.status === "Pending" && (
                          <label className="btn btn-primary btn-sm w-100">
                            {uploadingId === hw._id
                              ? "Uploading..."
                              : "Submit PDF"}
                            <input
                              type="file"
                              accept="application/pdf"
                              hidden
                              onChange={e =>
                                uploadPdf(e.target.files[0], hw._id)
                              }
                            />
                          </label>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}