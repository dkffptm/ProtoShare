import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "인증 토큰 없음" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { userId: userId }, // 자신이 만든 프로젝트
          {
            members: {
              some: {
                userId: userId, // 초대받은 프로젝트
              },
            },
          },
        ],
      },
      include: {
        user: true, // 생성자 정보 포함
        members: {
          include: {
            user: true, // 초대된 유저 정보도 포함
          },
        },
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("프로젝트 조회 실패:", error);
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}
