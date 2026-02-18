import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateStudent = () => {
  const [classes, setClasses] = useState([]);
  const [sections] = useState(["A", "B", "C"]);

  const [form, setForm] = useState({
    name: "",
    classId: "",
    section: "",
    birthDate: "",
    parentName: "",
    parentNationalId: "",
    parentPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // لتخزين الـ IDs بعد الإنشاء

  // ================== 1️⃣ جلب الصفوف ==================
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://your-api.com/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load classes");
      }
    };
    fetchClasses();
  }, []);

  // ================== 2️⃣ تحديث الفورم ==================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================== 3️⃣ إرسال البيانات ==================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // تحقق الحقول الإلزامية
    if (
      !form.name ||
      !form.classId ||
      !form.section ||
      !form.parentName ||
      !form.parentNationalId ||
      !form.parentPhone
    ) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://your-api.com/users/create",
        { ...form, role: "student" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data.data); // حفظ الـ IDs للعرض
      // مسح الفورم
      setForm({
        name: "",
        classId: "",
        section: "",
        birthDate: "",
        parentName: "",
        parentNationalId: "",
        parentPhone: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create student");
    }
    setLoading(false);
  };

  // ================== 4️⃣ نسخ للـ clipboard ==================
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Student Name*</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />

        <label>Class*</label>
        <select name="classId" value={form.classId} onChange={handleChange}>
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <label>Section*</label>
        <select name="section" value={form.section} onChange={handleChange}>
          <option value="">Select Section</option>
          {sections.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label>Birth Date</label>
        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />

        <hr />
        <h4>Parent Info*</h4>

        <label>Parent Name*</label>
        <input type="text" name="parentName" value={form.parentName} onChange={handleChange} />

        <label>Parent National ID*</label>
        <input type="text" name="parentNationalId" value={form.parentNationalId} onChange={handleChange} />

        <label>Parent Phone*</label>
        <input type="text" name="parentPhone" value={form.parentPhone} onChange={handleChange} />

        <button type="submit" disabled={loading} style={{ marginTop: 20 }}>
          {loading ? "Creating..." : "Create Student"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
          <h3>Student Created!</h3>
          <p>Student ID: {result.user._id} <button onClick={()=>copyToClipboard(result.user._id)}>Copy</button></p>
          <p>Parent ID: {result.parent._id} <button onClick={()=>copyToClipboard(result.parent._id)}>Copy</button></p>
        </div>
      )}
    </div>
  );
};

export default CreateStudent;
