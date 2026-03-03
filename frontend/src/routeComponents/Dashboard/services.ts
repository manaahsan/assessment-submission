import { api } from "../../lib/api"
import { AssessmentResult } from "../../lib/types/assessment"


export const fetchAssessmentDetails = (
  instanceId: string
): Promise<AssessmentResult> => {
  return api.get(`/assessment/results/${instanceId}`)
}