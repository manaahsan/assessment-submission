import { useCallback, useState } from "react";

// components
import InstanceIdInput from "../../components/InstanceIdInput/InstanceIdInput";
import { Loading } from "../../components/shared/Loading/Loading";

// route-components
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

// hoooks
import { useAssessmentDetails } from "./hooks";


const Component = () => {
  const [instanceId, setInstanceId] = useState("");
  const { data, isLoading } = useAssessmentDetails(instanceId);

  const handleFetch = useCallback(async (id: string) => {
    setInstanceId(id);
  }, []);
  
  return (
    <main className="assessment-main-container">
      <InstanceIdInput onFetch={handleFetch} isLoading={isLoading} />
      {isLoading && (
        <div className="section-loading">
          <Loading />
        </div>
      )}
      {data && !isLoading && (
        <div className="assessment-content">
          {/* InfoCard + CompletionRing */}
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

          {/* Overall + Gauge */}
          <div className="metrics-row">
            <OverallScore
              percentage={data?.scores.percentage}
              score={data?.scores.total_score}
              maxScore={data?.scores.max_score}
            />
            <GaugeChart percentage={data?.scores.percentage} />
          </div>

          {/* ScoresByElement + BarChart + RadarChart */}
          <div className="analytics-row">
            <div className="analytics-scores">
              <ScoresByElement elementScores={data?.element_scores_array} />
            </div>
            <div className="analytics-charts">
              <BarChartView questions={data?.element_scores_array} />
            </div>
            <div className="analytics-radar">
              <RadarChartView elementScores={data?.element_scores_array} />
            </div>
          </div>

          {/* QuestionBreakdown + InsightsSection */}
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

      {!data && !isLoading && <NoResults />}
    </main>
  );
};

export default Component;
