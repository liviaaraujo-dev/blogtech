import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { hash } from "bcryptjs";

export async function GET() {
  console.log("Executado");
  return Response.json({ message: "OK!" });
}

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Verifica se usuario existe
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (userExists) {
    return Response.json({ error: "User exists" }, {status: 405});
  }

  // Criptografar senha
  const has_password = await hash(password, 8);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: has_password,
    },
  });

  // Gerar Token de Acesso
  const payload = {
    id: user.id,
    email: user.email,
    createdAt: Date.now(),
  };
  const token = jwt.sign(payload, "ajuda", { expiresIn: "1h" });

  return Response.json(
    { token: token },
    { status: 201 }
  );
}
