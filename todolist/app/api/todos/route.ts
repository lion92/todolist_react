import { prisma } from "@/lib/prisma";

export async function GET() {
    const todos = await prisma.todo.findMany();
    return Response.json(todos);
}

export async function POST(req: Request) {
    const body = await req.json();

    const newTodo = await prisma.todo.create({
        data: { todo: body.todo }
    });

    return Response.json(newTodo);
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    await prisma.todo.delete({ where: { id } });

    return Response.json({ success: true });
}

export async function PUT(req: Request) {
    const { id, todo, check } = await req.json();

    await prisma.todo.update({
        where: { id },
        data: {
            ...(todo !== undefined && { todo }),
            ...(check !== undefined && { check }),
        }
    });

    return Response.json({ success: true });
}
