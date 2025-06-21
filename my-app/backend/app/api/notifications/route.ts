import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }
  const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

  const url = new URL(req.url);
  const unread = url.searchParams.get("unread") === "true";
  const limit = Number(url.searchParams.get("limit") || 20);

  const notifications = await prisma.notification.findMany({
    where: { userId, ...(unread ? { read: false } : {}) },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json(notifications);
}
