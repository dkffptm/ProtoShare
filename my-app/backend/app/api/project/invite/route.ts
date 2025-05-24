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

    // userId 포함된 JWT로 디코딩
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };

    const { projectId, email } = await req.json();

    // 프로젝트의 소유자인지 확인
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== decoded.userId) {
      return NextResponse.json(
        { error: "초대 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 초대할 사용자 확인
    const userToInvite = await prisma.user.findUnique({ where: { email } });
    if (!userToInvite) {
      return NextResponse.json({ error: "사용자 없음" }, { status: 404 });
    }

    // 중복 초대 방지
    const existing = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: { projectId, userId: userToInvite.id },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "이미 초대된 사용자입니다." },
        { status: 409 }
      );
    }

    // 초대 실행
    await prisma.projectMember.create({
      data: {
        projectId,
        userId: userToInvite.id,
      },
    });

    return NextResponse.json({ message: "초대 완료" });
  } catch (err) {
    console.error("초대 실패:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
