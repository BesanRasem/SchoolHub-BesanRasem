import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

export async function GET() {
  await connectDB();
  const students = await Student.find();
  return Response.json(students);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const student = await Student.create(body);
  return Response.json(student);
}