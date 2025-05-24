import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "인증 토큰 없음" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };

    const { title, description } = await req.json();
    // 1. 프로젝트 생성
    const project = await prisma.project.create({
      data: {
        title,
        description,
        userId: decoded.userId,
      },
    });

    // 2. 프로젝트 생성자 → 관리자 권한 부여
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { role: "ADMIN" },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error("프로젝트 생성 실패:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
