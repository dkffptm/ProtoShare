import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

interface DeleteTaskBody { id: number }

export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token      = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const { id } = await req.json() as DeleteTaskBody;
    if (!id) return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });

    // 삭제 전 Task → projectId 꺼내오기
    const existing = await prisma.task.findUnique({
      where: { id },
      select: { projectId: true, assigneeId: true, title: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "업무를 찾을 수 없습니다." }, { status: 404 });
    }
    const project = await prisma.project.findUnique({
      where: { id: existing.projectId },
      include: { members: true },
    });
    if (!project) {
      return NextResponse.json({ error: "프로젝트를 찾을 수 없습니다." }, { status: 404 });
    }
    const isOwner  = project.userId === userId;
    const isMember = project.members.some(m => m.userId === userId);
    if (!isOwner && !isMember) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    // 삭제
    await prisma.task.delete({ where: { id } });

    // 로그 기록
    await prisma.log.create({
      data: {
        projectId: existing.projectId,
        action: "DELETE_TASK",
        entityType: "Task",
        entityId: id,
      },
    });

    // 할당자에게 알림
    if (existing.assigneeId && existing.assigneeId !== userId) {
      await prisma.notification.create({
        data: {
          userId: existing.assigneeId,
          type: "TASK_DELETED",
          payload: { taskId: id, title: existing.title },
        },
      });
    }

    return NextResponse.json({ message: "업무가 삭제되었습니다." });
  } catch (err) {
    console.error("❌ 업무 삭제 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
