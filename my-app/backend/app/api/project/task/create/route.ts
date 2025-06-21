import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

interface CreateTaskBody {
  projectId: number;
  code: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  assigneeId?: number;
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token      = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "인증 필요" }, { status: 401 });
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const {
      projectId, code, title, description,
      status, priority, dueDate, assigneeId,
    }: CreateTaskBody = await req.json();

    if (!projectId || !code || !title) {
      return NextResponse.json({ error: "projectId, code, title은 필수입니다." }, { status: 400 });
    }

    // 프로젝트 소유권/멤버십 체크
    const project = await prisma.project.findUnique({
      where: { id: projectId },
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

    // 업무 생성
    const newTask = await prisma.task.create({
      data: {
        projectId,
        code,
        title,
        description: description || "",
        status: status || "TODO",
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
        assigneeId,
      },
    });

    // 로그 기록
    await prisma.log.create({
      data: {
        projectId,
        action: "CREATE_TASK",
        entityType: "Task",
        entityId: newTask.id,
      },
    });

    // 할당자에게 알림
    if (assigneeId) {
      await prisma.notification.create({
        data: {
          userId: assigneeId,
          type: "TASK_ASSIGNED",
          payload: { taskId: newTask.id, title: newTask.title },
        },
      });
    }

    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    console.error("❌ 업무 생성 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
