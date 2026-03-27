import { API } from "@/lib/axios";
import { StatisticsResponse } from "@/types/statistic";

export const fetchAlumniStatistics = async (): Promise<StatisticsResponse> => {
    const res = await API.get<StatisticsResponse>("/statistics/alumni");
    return res.data;
};
