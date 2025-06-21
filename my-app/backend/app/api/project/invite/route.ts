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

    const { projectId, email } = await req.json();

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== decoded.userId) {
      return NextResponse.json(
        { error: "초대 권한이 없습니다." },
        { status: 403 }
      );
    }

    const userToInvite = await prisma.user.findUnique({ where: { email } });
    if (!userToInvite) {
      return NextResponse.json({ error: "사용자 없음" }, { status: 404 });
    }

    const existing = await prisma.projectMember.findFirst({
      where: {
        projectId,
        userId: userToInvite.id,
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "이미 초대된 사용자입니다." },
        { status: 409 }
      );
    }

    await prisma.projectMember.create({
      data: {
        projectId,
        userId: userToInvite.id,
      },
    });

    await prisma.project.update({
      where: { id: projectId },
      data: {
        invitedCount: { increment: 1 },
      },
    });

    const inviter = await prisma.user.findUnique({ where: { id: decoded.userId } });

    await prisma.notification.create({
      data: {
      userId: userToInvite.id,
      type: "PROJECT_INVITED",
      payload: {
      projectId,
      inviter: inviter?.email || "관리자",
      projectTitle: project.title,
      },
    },
  });

    return NextResponse.json({ message: "초대 완료" });
  } catch (err) {
    console.error("초대 실패:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
