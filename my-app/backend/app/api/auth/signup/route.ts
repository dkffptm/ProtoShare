import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    console.log("✅ 요청 데이터:", { name, email, password });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log("⚠️ 중복 이메일:", email);
      return new Response(
        JSON.stringify({ error: "이미 등록된 이메일입니다." }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    console.log("✅ 유저 생성 완료:", user);

    return new Response(JSON.stringify({ message: "회원가입 성공", user }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ 회원가입 오류 (백엔드):", error);

    return new Response(JSON.stringify({ error: "서버 내부 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
