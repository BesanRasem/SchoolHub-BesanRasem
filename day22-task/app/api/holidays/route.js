const holidays = [
  "2026-02-01",
  "2026-02-25",
  "2026-02-01",
  "2026-02-10"
];
export async function GET() {

  return Response.json({ holidays });
}