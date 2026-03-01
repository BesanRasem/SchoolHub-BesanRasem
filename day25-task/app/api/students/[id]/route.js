import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

export async function GET(req, { params }) {
  await connectDB();
  const student = await Student.findById(params.id);
  return Response.json(student);
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await Student.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Student.findByIdAndDelete(params.id);
  return Response.json({ message: "Deleted" });
}