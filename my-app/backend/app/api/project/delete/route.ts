import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";

export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "인증 실패" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    const { id } = await req.json();

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project || project.userId !== decoded.userId) {
      return NextResponse.json({ error: "삭제 권한 없음" }, { status: 403 });
    }

    // 1. 관련된 members 먼저 삭제
    await prisma.projectMember.deleteMany({
      where: { projectId: id },
    });

    // 2. 그 다음 프로젝트 삭제
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "삭제 완료" });
  } catch (err) {
    console.error("삭제 실패:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
