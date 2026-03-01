import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET() {
  await connectDB();
  const courses = await Course.find().populate("student");
  return Response.json(courses);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const course = await Course.create(body);
  return Response.json(course);
}