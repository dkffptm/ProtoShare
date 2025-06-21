import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    // 인증 토큰 추출
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "인증 토큰 없음" }, { status: 401 });
    }

    // 토큰 검증 후 사용자 ID 추출
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    // 프로젝트 + 유저 + 멤버 + 작업 포함 조회
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { userId }, // 내가 만든 프로젝트
          { members: { some: { userId } } }, // 내가 속한 프로젝트
        ],
      },
      include: {
        user: true, // 생성자 정보
        members: {
          include: { user: true }, // 멤버 유저 정보
        },
        tasks: true, // 작업 목록 포함
      },
    });

    // 응답 반환
    return NextResponse.json(projects);
  } catch (error) {
    console.error("프로젝트 조회 실패:", error);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
