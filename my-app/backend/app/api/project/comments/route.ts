import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface CreateCommentBody {
  taskId: number;
  content: string;
}

export async function POST(req: Request) {
  try {
    // 1. 인증 토큰 파싱
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "인증 토큰 없음" }, { status: 401 });

    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    // 2. 요청 body 파싱
    const { taskId, content }: CreateCommentBody = await req.json();
    if (!taskId || !content) {
      return NextResponse.json({ error: "taskId와 content는 필수입니다." }, { status: 400 });
    }

    console.log("🟡 댓글 작성 요청", { taskId, userId, content });

    // 3. task → projectId, assigneeId 가져오기
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { projectId: true, assigneeId: true },
    });
    if (!task) {
      return NextResponse.json({ error: "업무를 찾을 수 없습니다." }, { status: 404 });
    }

    // 4. 프로젝트 owner 여부 확인
    const project = await prisma.project.findUnique({
      where: { id: task.projectId },
      select: { userId: true },
    });

    const isOwner = project?.userId === userId;

    // 5. 멤버 여부 확인
    const isMember = await prisma.projectMember.findFirst({
      where: {
        projectId: task.projectId,
        userId,
      },
    });

    if (!isOwner && !isMember) {
      return NextResponse.json({ error: "댓글 작성 권한이 없습니다." }, { status: 403 });
    }

    // 6. 댓글 생성
    const newComment = await prisma.comment.create({
      data: {
        taskId,
        userId,
        content,
      },
    });

    // 7. 로그 기록
    await prisma.log.create({
      data: {
        projectId: task.projectId,
        action: "CREATE_COMMENT",
        entityType: "Comment",
        entityId: newComment.id,
      },
    });

    // 8. 담당자에게 알림 (본인 제외)
    if (task.assigneeId && task.assigneeId !== userId) {
      await prisma.notification.create({
        data: {
          userId: task.assigneeId,
          type: "COMMENT_ADDED",
          payload: JSON.stringify({
            taskId,
            commentId: newComment.id,
            content,
          }),
        },
      });
    }

    console.log("✅ 댓글 생성 완료", newComment);
    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.error("❌ 댓글 생성 오류:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
