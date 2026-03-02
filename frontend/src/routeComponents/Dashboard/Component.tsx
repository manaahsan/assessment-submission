import React, { useCallback, useState } from "react";
import InstanceIdInput from "../../components/InstanceIdInput/InstanceIdInput";
import Loading from "../../components/shared/Loading/Loading";
import Error from "../../components/shared/Error/Error";
import { useAssessmentDetails } from "./hooks";

import CompletionRing from "./components/Completion/CompletionRing";
import OverallScore from "./components/Score/OverallScore";
import GaugeChart from "./components/charts/GaugeChart";
import ScoresByElement from "./components/ScoresByElement/ScoresByElement";
import NoResults from "../../components/shared/NoResult/NoResult";
import BarChartView from "./components/charts/BarChartView";
import RadarChartView from "./components/charts/RadarChartView";
import QuestionBreakdown from "./components/Question/QuestionBreakdown";
import InsightsSection from "./components/InsightsSection/InsightsSection";
import InfoCard from "./components/Card/InfoCard";

const Component = () => {
  const [instanceId, setInstanceId] = useState(
    "d1111111-1111-1111-1111-111111111111",
  );
  const { data, isLoading } = useAssessmentDetails(instanceId);

  const handleFetch = useCallback(async (id: string) => {
    console.log(id, 17);
    setInstanceId(id);
  }, []);

  if (isLoading) {
    <Loading />;
  }
  return (
    <main className="assessment-main-container">
      <InstanceIdInput onFetch={handleFetch} isLoading={isLoading} />

      {data && (
        <div className="assessment-content">
          <div className="top-row">
            <div className="info-section">
              <InfoCard data={data} />
            </div>
            <div className="completion-section">
              <CompletionRing
                answered={data?.answered_questions}
                total={data?.total_questions}
              />
            </div>
          </div>
          <div className="metrics-row">
            <OverallScore
              percentage={data?.scores.percentage}
              score={data?.scores.total_score}
              maxScore={data?.scores.max_score}
            />
            <GaugeChart percentage={data?.scores.percentage} />
          </div>
          <div className="middle-section">
            <ScoresByElement elementScores={data?.element_scores_array} />

            <div className="charts-row">
              <BarChartView questions={data?.element_scores_array} />
              <RadarChartView elementScores={data?.element_scores_array} />
            </div>
          </div>

          <div className="bottom-split">
            <QuestionBreakdown
              questions={data?.element_scores_array?.flatMap(
                (e) => e.question_answers,
              )}
            />
            <InsightsSection insights={data?.insights} />
          </div>
        </div>
      )}

      {!data && !isLoading && !error && <NoResults />}
    </main>
  );
};

export default Component;
