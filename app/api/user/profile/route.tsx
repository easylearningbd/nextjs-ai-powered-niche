import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest){
    try {

       const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
        }

        const userId = (session.user as any).id;

    const user = await prisma.user.findUnique({
        where: { id: userId},
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found"}, {status: 404});
    }

    return NextResponse.json({user });

    } catch (error) {
        console.error("Get profile error", error);
    }
}