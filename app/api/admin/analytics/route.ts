import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Role, PlanType, ReportStatus } from "@prisma/client";

export async function GET(req: NextRequest) {

    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
        }

        // Check if user is admin
        const userRole = (session.user as any).role;
        if (userRole !== Role.ADMIN) {
            return NextResponse.json({error: "Forbidden - Admin Access required"}, { status: 403});
        }

        // Get Total users 
        const totalUsers = await prisma.user.count();

        // Get Users by plan
        const subscriptions = await prisma.subscription.groupBy({
            by: ["planType"],
            _count: true,
        });

const planBreakdown = {
    FREE: subscriptions.find((s) => s.planType === PlanType.FREE)?._count || 0,
    PRO: subscriptions.find((s) => s.planType === PlanType.PRO)?._count || 0,
};

    // Get total reports 
    const totalReports = await prisma.report.count();

    // Get reports by status 
    const reportsByStatus = await prisma.report.groupBy({
        by: ["status"],
        _count: true,
    })

    const reportsBreakdown = {
        COMPLETED: reportsByStatus.find((r) => r.status === ReportStatus.COMPLETED)?._count || 0,
        PROCESSING: reportsByStatus.find((r) => r.status === ReportStatus.PROCESSING)?._count || 0,
        PENDING: reportsByStatus.find((r) => r.status === ReportStatus.PENDING)?._count || 0,
        FAILED: reportsByStatus.find((r) => r.status === ReportStatus.FAILED)?._count || 0,
    };

    /// Get current month usage
    




    } catch (error) {
        
    }



}