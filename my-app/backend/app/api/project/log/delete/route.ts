import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

interface DeleteLogBody {
  id: number;
}

export async function DELETE(req: Request) {
  try {
    // 인증
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "인증 토큰 없음" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const userId = decoded.userId;

    // 파라미터 파싱
    const { id }: DeleteLogBody = await req.json();
    if (!id) {
      return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });
    }

    // 기존 로그 → project 조회
    const existing = await prisma.log.findUnique({
      where: { id },
      select: { projectId: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "로그를 찾을 수 없습니다." }, { status: 404 });
    }
    const project = await prisma.project.findUnique({
      where: { id: existing.projectId },
      select: { userId: true },
    });
    if (!project) {
      return NextResponse.json({ error: "프로젝트를 찾을 수 없습니다." }, { status: 404 });
    }
    if (project.userId !== userId) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    // 로그 삭제
    await prisma.log.delete({ where: { id } });
    
    return NextResponse.json({ message: "로그가 삭제되었습니다." });
  } catch (err) {
    console.error("❌ 로그 삭제 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
