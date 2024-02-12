import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Verifica se usuario existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return Response.json({ error: "User not found" }, { status: 401 });
    }

    // Valida senha
    const isValuePassword = await compare(password, user.password);
    if (!isValuePassword) {
        return Response.json({ error: "User not found" }, {status: 401});
    }

    // Gerar token de acesso
    const payload = {
        id: user.id,
        email: email,
        createdAt: Date.now(),
    };
    const token = jwt.sign(payload, "ajuda", { expiresIn: "1h" });

    return Response.json(
        { token: token },
        { status: 201 }
    );
}
