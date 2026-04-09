import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {

try {

    const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
        }

        const userId = (session.user as any).id;
        const formData = await req.formData();
        const file = formData.get("invoice") as File;
        const transactionId = formData.get("transactionId") as string;

        if (!file) {
            return NextResponse.json(
                {error: "Invoice file is required"},
                {status: 400}
            );
        }

        if (!transactionId) {
            return NextResponse.json(
                {error: "Transaction ID is required"},
                {status: 400}
            );
        }

    // Validation file type allow common image and pdf types 
    


} catch (error) {
    
}


}