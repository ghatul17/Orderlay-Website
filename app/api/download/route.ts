// app/api/hello/route.ts
import { detectDeviceOS } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = detectDeviceOS(req.headers.get('user-agent')!)
    console.log('user agent is ',req.headers.get('user-agent'))
    console.log('url is ', url)

    return NextResponse.redirect(url.storeLink);
}

export async function POST(req: Request) {
    const data = await req.json();
    return NextResponse.json({ message: "Received data", data });
}
