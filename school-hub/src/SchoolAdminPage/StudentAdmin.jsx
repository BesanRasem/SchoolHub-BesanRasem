import { useState, useEffect } from "react";
import api from "../api/axios";
import "./AdminDashboard.css";

import $ from "jquery";
import "datatables.net";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";

import JSZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts;
window.JSZip = JSZip;

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [studentName, setStudentName] = useState("");
  const [studentBirthDate, setStudentBirthDate] = useState("");
  const [studentNationalId, setStudentNationalId] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentNationalId, setParentNationalId] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [classId, setClassId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Fetch classes
  useEffect(() => {
    fetchClasses();
  }, []);

  // Fetch students
  useEffect(() => {
    fetchStudents(page);
  }, [page, search, selectedClass]);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes/");
      const classesData = res.data.data.map((c) => ({
        ...c,
        name: `${c.grade}${c.section}`,
      }));
      setClasses(classesData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async (currentPage = 1) => {
    setLoading(true);
    try {
      const res = await api.get("/users", {
        params: { page: currentPage, limit, search, classId: selectedClass },
      });

      const data = res.data.data || [];
      setStudents(data);

      const total = res.data.pagination?.total || data.length || 0;
      setTotalPages(Math.ceil(total / limit));
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && students.length > 0) {
      if ($.fn.DataTable.isDataTable("#studentsTable")) {
        $("#studentsTable").DataTable().destroy();
      }

      const tableData = students.map((s) => ({
        _id: s._id,
        name: s.name || "-",
        studentId: s._id,
        email: s.email || "-",
        nationalId: s.nationalId || "-",
        className: s.classId ? `${s.classId.grade || ""}${s.classId.section || ""}` : "-",
        parentName: s.parentId?.name || "-",
        parentEmail: s.parentId?.email || "-",
        parentNationalId: s.parentId?.nationalId || "-",
        parentPhone: s.parentId?.parentPhone || "-",
        parentId: s.parentId?._id || "-",
      }));

      $("#studentsTable").DataTable({
        data: tableData,
        columns: [
          { data: "name", title: "Student Name" },
          { data: "studentId", title: "Student ID" },
          { data: "email", title: "Email" },
          { data: "nationalId", title: "National ID" },
          { data: "className", title: "Class" },
          { data: "parentName", title: "Parent Name" },
          { data: "parentEmail", title: "Parent Email" },
          { data: "parentNationalId", title: "Parent National ID" },
          { data: "parentPhone", title: "Parent Phone" },
          { data: "parentId", title: "Parent ID" },
          {
            data: null,
            title: "Actions",
            
render: (data) =>
  `<div class="d-flex gap-1">
     <button class="btn btn-sm btn-primary edit-btn" data-id="${data._id}">Edit</button>
     <button class="btn btn-sm btn-primary delete-btn" data-id="${data._id}">Delete</button>
   </div>`,
          },
        ],
        dom: "Bfrtip",
        buttons: [
          {
            extend: "excelHtml5",
            text: '<i class="fa fa-file-excel"></i> Excel',
            title: "Students",
            className: "btn btn-sm btn-primary exels-btn me-1",
          },
          {
            extend: "pdfHtml5",
            text: '<i class="fa fa-file-pdf"></i> PDF',
            title: "Students",
            orientation: "landscape",
            className: "btn btn-sm btn-primary exels-btn me-1",
          },
          {
            extend: "print",
            text: '<i class="fa fa-print"></i> Print',
            title: "Students",
            className: "btn btn-sm btn-primary exels-btn",
          },
        ],
        paging: false,
        searching: true,
        ordering: false,
        info: false,
      });

      $("#studentsTable").on("click", ".edit-btn", function () {
        const id = $(this).data("id");
        const student = students.find((s) => s._id === id);
        if (student) handleEditClick(student);
      });

      $("#studentsTable").on("click", ".delete-btn", function () {
        const id = $(this).data("id");
        handleDelete(id);
      });
    }
  }, [students, loading]);

  const handleDelete = async (studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/users/${studentId}`);
      fetchStudents(page);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete student");
    }
  };

  const handleEditClick = (student) => {
    setEditingStudentId(student._id);
    setStudentName(student.name);
    setStudentBirthDate(student.birthDate ? new Date(student.birthDate).toISOString().split("T")[0] : "");
    setStudentNationalId(student.nationalId || "");
    setParentName(student.parentId?.name || "");
    setParentNationalId(student.parentId?.nationalId || "");
    setParentPhone(student.parentId?.parentPhone || "");
    setClassId(student.classId?._id || student.classId || "");
    setShowModal(true);
  };

  const resetForm = () => {
    setStudentName("");
    setStudentBirthDate("");
    setStudentNationalId("");
    setParentName("");
    setParentNationalId("");
    setParentPhone("");
    setClassId("");
    setEditingStudentId(null);
    setErrorMsg("");
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        name: studentName,
        birthDate: studentBirthDate || null,
        nationalId: studentNationalId || null,
        classId: classId || null,
        parentName,
        parentNationalId: parentNationalId || null,
        parentPhone,
      };

      if (editingStudentId) {
        await api.put(`/users/${editingStudentId}`, payload);
      } else {
        await api.post("/users/create", { ...payload, role: "student" });
      }

      fetchStudents(page);
      setShowModal(false);
      resetForm();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error saving student");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Students</h2>
        <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
          + Add Student
        </button>
      </div>

      <div className="row mb-3">
        
        <div className="col-md-4 mb-2">
          <select className="form-select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">All Classes</option>
            {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-responsive">
          <table id="studentsTable" className="table table-striped table-bordered">
            <thead>
              <tr className="table-head">
                <th>Name</th>
                <th>System ID</th>
                <th>Email</th>
                <th>National ID</th>
                <th>Parent Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody />
          </table>

          <div className="d-flex justify-content-between mt-3">
            <button disabled={page === 1} className="btn btn-sm btn-secondary" onClick={() => handlePageChange(page - 1)}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} className="btn btn-sm btn-secondary" onClick={() => handlePageChange(page + 1)}>Next</button>
          </div>
        </div>
      )}

      {showModal && (
        <>
          <div className="modal show fade d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editingStudentId ? "Edit Student" : "Add Student"}</h5>
                  <button className="btn-close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                  <form onSubmit={handleAddStudent}>
                    <input className="form-control mb-2" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
                    <input type="date" className="form-control mb-2" value={studentBirthDate} onChange={(e) => setStudentBirthDate(e.target.value)} />
                    <input className="form-control mb-2" placeholder="Student National ID" value={studentNationalId} onChange={(e) => setStudentNationalId(e.target.value)} />
                    <input className="form-control mb-2" placeholder="Parent Name" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                    <input className="form-control mb-2" placeholder="Parent National ID" value={parentNationalId} onChange={(e) => setParentNationalId(e.target.value)} />
                    <input className="form-control mb-2" placeholder="Parent Phone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} />
                    <select className="form-select mb-3" value={classId} onChange={(e) => setClassId(e.target.value)}>
                      <option value="">Select Class</option>
                      {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                    <button className="btn btn-primary w-100">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
}

export default StudentsPage;