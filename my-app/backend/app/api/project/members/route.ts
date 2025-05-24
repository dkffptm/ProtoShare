// backend/app/api/project/members/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// 해당 프로젝트의 팀원 목록 반납
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = Number(searchParams.get("id"));

    if (!projectId) {
      return NextResponse.json({ error: "프로젝트 ID 누락" }, { status: 400 });
    }

    const members = await prisma.projectMember.findMany({
      where: { projectId },
      include: { user: true },
    });

    const result = members.map((m) => ({
      email: m.user.email,
      name: m.user.name,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("팀원 조회 실패:", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
