import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "인증 필요" }, { status: 401 });
  }
  const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

  const url = new URL(req.url);
  const projectId = Number(url.searchParams.get("projectId"));
  if (!projectId) {
    return NextResponse.json({ error: "projectId가 필요합니다." }, { status: 400 });
  }

  // 프로젝트 소유자이거나 멤버로 초대된 경우만
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      members: {
        where: { userId }
      }
    }
  });
  if (!project) {
    return NextResponse.json({ error: "프로젝트가 없습니다." }, { status: 404 });
  }
  const isOwner = project.userId === userId;
  const isMember = project.members.length > 0;
  if (!isOwner && !isMember) {
    return NextResponse.json({ error: "조회 권한이 없습니다." }, { status: 403 });
  }

  // 권한 통과했으면 업무 리스트
  const tasks = await prisma.task.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}
