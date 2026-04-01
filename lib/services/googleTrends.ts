import { sleep } from "../utils";
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

    // Get interest over time for a keyword 

    async getInterestOverTime(
        keyword: string,
        startTime: Date = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // last 1 year ago
        endTime: Date = new Date(),
        geo: string = ""
    ) : Promise<TrendsDataPoint[]> {
        try {
            const result = await googleTrends.interestOverTime({
                keyword,
                startTime,
                endTime,
                geo,
            });

        const data = JSON.parse(result);
        const timelineData: TrendsDataPoint[] = [];

        if (data?.default?.timelineData) {
            data.default.timelineData.forEach((point: any) => {
                timelineData.push({
                    time: point.formattedTime,
                    value: point.value[0]
                });
            });
        }

        await sleep(2000) ; // Rate limiting 

         return timelineData;
        } catch (error) {
            console.error("Error fetching google trends data", error);
            return [];
        }
    }


    /**
   * Get related queries for a keyword
   */
  async getRelatedQueries(
    keyword: string,
    startTime: Date = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    endTime: Date = new Date(),
    geo: string = ""
  ): Promise<{ top: RelatedQuery[]; rising: RelatedQuery[] }> {
    try {
      const result = await googleTrends.relatedQueries({
        keyword,
        startTime,
        endTime,
        geo,
      });

      const data = JSON.parse(result);
      const relatedQueries: { top: RelatedQuery[]; rising: RelatedQuery[] } = {
        top: [],
        rising: [],
      };

      // Top queries
      if (data?.default?.rankedList?.[0]?.rankedKeyword) {
        relatedQueries.top = data.default.rankedList[0].rankedKeyword.map((item: any) => ({
          query: item.query,
          value: item.value,
        }));
      }

      // Rising queries
      if (data?.default?.rankedList?.[1]?.rankedKeyword) {
        relatedQueries.rising = data.default.rankedList[1].rankedKeyword.map((item: any) => ({
          query: item.query,
          value: item.value,
        }));
      }

      await sleep(2000); // Rate limiting

      return relatedQueries;
    } catch (error) {
      console.error("Error fetching related queries:", error);
      return { top: [], rising: [] };
    }
  }


 /**
   * Get interest by region
   */
  async getInterestByRegion(
    keyword: string,
    startTime: Date = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    endTime: Date = new Date(),
    geo: string = ""
  ): Promise<{ geo: string; value: number }[]> {
    try {
      const result = await googleTrends.interestByRegion({
        keyword,
        startTime,
        endTime,
        geo,
      });

      const data = JSON.parse(result);
      const regionalData: { geo: string; value: number }[] = [];

      if (data?.default?.geoMapData) {
        data.default.geoMapData.forEach((region: any) => {
          regionalData.push({
            geo: region.geoName,
            value: region.value[0],
          });
        });
      }

      await sleep(2000); // Rate limiting

      return regionalData.sort((a, b) => b.value - a.value).slice(0, 10);
    } catch (error) {
      console.error("Error fetching regional interest:", error);
      return [];
    }
  }









}