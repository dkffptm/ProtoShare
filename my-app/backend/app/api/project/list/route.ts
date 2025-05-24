// backend/app/api/project/list/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "인증 토큰 없음" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };

    console.log("🔑 userId:", decoded.userId);

    const projects = await prisma.project.findMany({
      where: {
        userId: decoded.userId,
      },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(projects);
  } catch (err) {
    console.error("❌ 프로젝트 목록 불러오기 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
