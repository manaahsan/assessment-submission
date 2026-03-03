import { useQuery } from "@tanstack/react-query";
import { fetchAssessmentDetails } from "./services";

export const useAssessmentDetails = (instanceId: string) => {
  return useQuery({
    queryKey: ["assessment-details", instanceId],
    queryFn: () => fetchAssessmentDetails(instanceId),
    enabled: !!instanceId,
    select: (data) => {
      return {
        ...data,
        element_scores_array: Object.values(data.element_scores),
      };
    },
  });
};
