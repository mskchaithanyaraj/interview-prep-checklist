import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host");

  if (hostname === "interviewprep-pi.vercel.app") {
    url.hostname = "interviewprep.chaithanyaraj.live";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
