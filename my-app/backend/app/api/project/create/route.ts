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

    const project = await prisma.project.create({
      data: {
        title,
        description,
        userId: decoded.userId,
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error("프로젝트 생성 실패:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
