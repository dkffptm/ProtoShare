import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

interface UpdateTaskBody {
  id: number;
  code?: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  assigneeId?: number;
}

export async function PATCH(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token      = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const body = await req.json() as UpdateTaskBody;
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "id가 필요합니다." }, { status: 400 });

    // 기존 업무 & 프로젝트 조회 (멤버 포함)
    const existing = await prisma.task.findUnique({
      where: { id },
      select: { projectId: true },
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

    // 업무 업데이트
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...updates,
        dueDate: updates.dueDate ? new Date(updates.dueDate) : undefined,
      },
    });

    // 로그 기록
    await prisma.log.create({
      data: {
        projectId: existing.projectId,
        action: "UPDATE_TASK",
        entityType: "Task",
        entityId: updatedTask.id,
      },
    });

    // 알림
    if (updatedTask.assigneeId && updatedTask.assigneeId !== userId) {
      await prisma.notification.create({
        data: {
          userId: updatedTask.assigneeId,
          type: "TASK_UPDATED",
          payload: { taskId: updatedTask.id, title: updatedTask.title },
        },
      });
    }

    return NextResponse.json(updatedTask);
  } catch (err) {
    console.error("❌ 업무 수정 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
