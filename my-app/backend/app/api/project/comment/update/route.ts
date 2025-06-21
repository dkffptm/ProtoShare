import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import jwt from "jsonwebtoken";

interface UpdateCommentBody {
  id: number;
  content: string;
}

export async function PATCH(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "인증 토큰 없음" }, { status: 401 });
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const { id, content } = (await req.json()) as UpdateCommentBody;
    if (!id || !content) return NextResponse.json({ error: "id와 content는 필수입니다." }, { status: 400 });

    const existing = await prisma.comment.findUnique({
      where: { id },
      select: { taskId: true },
    });
    if (!existing) return NextResponse.json({ error: "댓글을 찾을 수 없습니다." }, { status: 404 });

    const task = await prisma.task.findUnique({
      where: { id: existing.taskId },
      select: {
        id: true,
        projectId: true,
        assigneeId: true,
      },
    });
    if (!task) return NextResponse.json({ error: "업무를 찾을 수 없습니다." }, { status: 404 });

    const project = await prisma.project.findUnique({
      where: { id: task.projectId },
      select: { userId: true },
    });
    if (!project) return NextResponse.json({ error: "프로젝트를 찾을 수 없습니다." }, { status: 404 });
    if (project.userId !== userId) return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });

    await prisma.log.create({
      data: {
        projectId: task.projectId,
        action: "UPDATE_COMMENT",
        entityType: "Comment",
        entityId: updatedComment.id,
      },
    });

    if (task.assigneeId && task.assigneeId !== userId) {
      await prisma.notification.create({
        data: {
          userId: task.assigneeId,
          type: "COMMENT_UPDATED",
          payload: {
          taskId: task.id,
          commentId: updatedComment.id,
          },
        },
      });
    }

    return NextResponse.json(updatedComment, { status: 200 });
  } catch (err) {
    console.error("❌ 댓글 수정 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
