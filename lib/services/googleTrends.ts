const googleTrends = require("google-trends-api");

export interface TrendsDataPoint {
    time: string;
    value: number;
}

export interface RelatedQuery {
    query: string;
    value: number;
}

export interface TrendsAnalysisResult {
    keyword: string;
    timelineData: TrendsDataPoint[];
    averageInterest: number;
    growthRate: number;
    trend: "rising" | "declining" | "stable";
    relatedQueries: {
        top: RelatedQuery[];
        rising: RelatedQuery[];
    };
    regionalInterest: { geo: string; value: number }[];
    insights?: string[];

}


/// Google trends service for analyzing search trends.

export class GoogleTrendsService {
    
}