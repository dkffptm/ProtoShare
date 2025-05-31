import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    // 1. Authorization 헤더에서 JWT 토큰 추출
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "토큰이 없습니다." }, { status: 401 });
    }

    // 2. 토큰 디코드하여 사용자 ID 추출
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    const userId = decoded.userId;

    // 3. 클라이언트 요청에서 프로젝트 정보 추출
    const { title, description } = await req.json();

    // 4. 프로젝트 생성 + 생성자를 ADMIN으로 ProjectMember에 등록
    const project = await prisma.project.create({
      data: {
        title,
        description,
        userId, // 프로젝트 소유자

        members: {
          create: {
            userId,
            role: "ADMIN", // 생성자는 이 프로젝트의 관리자
          },
        },
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("프로젝트 생성 실패:", error);
    return NextResponse.json(
      { error: "프로젝트 생성 중 오류 발생" },
      { status: 500 }
    );
  }
}
