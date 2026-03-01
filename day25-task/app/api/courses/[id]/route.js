import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req, { params }) {
  await connectDB();
  const course = await Course.findById(params.id).populate("student");
  return Response.json(course);
}

export async function PUT(req, { params }) {
  await connectDB();
  const body = await req.json();
  const updated = await Course.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Course.findByIdAndDelete(params.id);
  return Response.json({ message: "Deleted" });
}