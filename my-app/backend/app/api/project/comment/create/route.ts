import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface CreateCommentBody {
  taskId: number;
  content: string;
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "인증 토큰 없음" }, { status: 401 });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const { taskId, content }: CreateCommentBody = await req.json();
    if (!taskId || !content) {
      return NextResponse.json({ error: "taskId와 content는 필수입니다." }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { projectId: true, assigneeId: true },
    });
    if (!task) return NextResponse.json({ error: "업무를 찾을 수 없습니다." }, { status: 404 });

    const project = await prisma.project.findUnique({
      where: { id: task.projectId },
      select: { userId: true },
    });
    if (!project) return NextResponse.json({ error: "프로젝트를 찾을 수 없습니다." }, { status: 404 });

    const isOwner = project.userId === userId;
    const isMember = await prisma.projectMember.findFirst({
      where: { projectId: task.projectId, userId },
    });

    if (!isOwner && !isMember) {
      return NextResponse.json({ error: "프로젝트 멤버가 아닙니다." }, { status: 403 });
    }

    const newComment = await prisma.comment.create({
      data: {
        taskId,
        userId,
        content,
      },
    });

    await prisma.log.create({
      data: {
        projectId: task.projectId,
        action: "CREATE_COMMENT",
        entityType: "Comment",
        entityId: newComment.id,
      },
    });

    if (task.assigneeId && task.assigneeId !== userId) {
    await prisma.notification.create({
    data: {
      userId: task.assigneeId,
      type: "COMMENT_ADDED",
      payload: {
        taskId,
        commentId: newComment.id,
        content,
      },
    },
  });
}

    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.error("❌ 댓글 생성 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
