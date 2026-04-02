import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { GoogleTrendsService } from "@/lib/services/googleTrends";
import { OpenAIService } from "@/lib/services/openai";
import { PlanType, ReportStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        // Check Authentication 
      const session = await auth();  
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
      }

    const userId = (session.user as any).id;

    // Get user with subscription
    const user = await prisma.user.findUnique({
        where: {id: userId},
        include: { subscription: true }
    });

    if (!user || !user.subscription) {
        return NextResponse.json(
            {error: "User or subscription not found"},
            { status: 404 }
        );
    }

    const isPro = user.subscription.planType === PlanType.PRO;

    /// Check usage limits for Free users
    if (!isPro) {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const usage = await prisma.usageLog.findUnique({
            where: {
                userId_month_year: {
                    userId,
                    month: currentMonth,
                    year: currentYear,
                },
            },
        });

    const validationCount = usage?.validationCount || 0;
    const freeLimit = 3;

    if (validationCount >= freeLimit) {
        return NextResponse.json(
            {
                error: "Monthly validation limit reached. Upgrade to pro for unlimited validations",
                limit: freeLimit,
                used: validationCount,
            },
            {status: 429}
        );        
     }
    }

    // Parse request body data
    const body = await req.json();
    const { niche,keyword } = body;

    if (!niche || !keyword) {
        return NextResponse.json(
            { error: "Niche and keyword are required" },
            {status: 400 }
        );
    }
    
    /// Create report in pending status 
    const report = await prisma.report.create({
        data: {
            userId,
            niche,
            keyword,
            status: ReportStatus.PENDING
        },
    });

    // Process asynchronously
    processValidation(report.id,niche,keyword,isPro);

    return NextResponse.json(
        {
            message: "Validation Started",
            reportId: report.id,
            status: "pending",
        },
        {status: 202}
    );        
    } catch (error) {
        console.error("Valiadtion api error", error);
    }
}


/// Process validation asynchronously 
async function processValidation(
    reportId: string,
    niche: string,
    keyword: string,
    isPro: boolean
){

    try {
        /// update status to PROCESSING
        await prisma.report.update({
            where: {id: reportId },
            data: { status: ReportStatus.PROCESSING },
        });

    // Initialize services 
    const trendsService = new GoogleTrendsService();
    const openaiService = new OpenAIService();

    // Collect data from google trends 
    console.log(`[Report ${reportId} ] Starting google trends analysis..`);
    const trendsData = await trendsService.analyzeKeyword(keyword, isPro);

    console.log(`[Report ${reportId} ] Generating ai insights`);
    const aiInsights = await openaiService.generateMarketInsights(
        niche,
        keyword,
        trendsData,
        isPro
    );

    // Calculate overall score and viability 
    const overallScore = aiInsights.opportunityAssessment.score;
    let viabilityRating: string;
    if(overallScore >= 70 ) viabilityRating = "HIGH";
    else if (overallScore >= 40 ) viabilityRating = "MEDIUM";
    else viabilityRating = "LOW";

    /// Update report with results 
    


    } catch (error) {
        
    }





}