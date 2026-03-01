import { useCallback, useState } from "react";
import "./App.css";
import DashboardHeader from "./components/shared/Header/DashboardHeader";
import InstanceIdInput from "./components/InstanceIdInput/InstanceIdInput";
import { AssessmentResult } from "./lib/types/assessment";
import Loading from "./components/shared/Loading/Loading";
import Error from "./components/shared/Error/Error";
import ExportControls from "./routeComponents/Dashboard/components/Export/ExportControls";
import CompletionRing from "./routeComponents/Dashboard/components/Completion/CompletionRing";
import OverallScore from "./routeComponents/Dashboard/components/Score/OverallScore";
import GaugeChart from "./routeComponents/Dashboard/components/charts/GaugeChart";
import ScoresByElement from "./routeComponents/Dashboard/components/ScoresByElement/ScoresByElement";
import BarChartView from "./routeComponents/Dashboard/components/charts/BarChartView";
import RadarChartView from "./routeComponents/Dashboard/components/charts/RadarChartView";
import QuestionBreakdown from "./routeComponents/Dashboard/components/Question/QuestionBreakdown";
import InsightsSection from "./routeComponents/Dashboard/components/InsightsSection/InsightsSection";
import { ClipboardList } from "lucide-react";
import NoResults from "./components/shared/NoResult/NoResult";

function App() {
  const [instanceId, setInstanceId] = useState(
    "d1111111-1111-1111-1111-111111111111",
  );
  const [data, setData] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState("");

  const handleFetch = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    setLastId(id);
    try {
      // const result = []
      // await fetchAssessmentResults(id);
      // setData(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRetry = () => {
    if (lastId) handleFetch(lastId);
  };

  return (
    <div className="app">
      <DashboardHeader />

      {/* <main className="app-main">
        <div className="instance-selector">
          <label htmlFor="instance-id">Assessment Instance ID:</label>
          <input
            id="instance-id"
            type="text"
            value={instanceId}
            onChange={(e) => setInstanceId(e.target.value)}
            placeholder="Enter instance ID"
          />
        </div>

        <AssessmentResults instanceId={instanceId} />
      </main> */}

      <main className="main-container">
        <InstanceIdInput onFetch={handleFetch} isLoading={isLoading} />

        {isLoading && <Loading />}

        {error && !isLoading && <Error message={error} onRetry={handleRetry} />}

        {data && !isLoading && !error && (
          <div className="space-y-6">
            {/* <div
              className="bg-card rounded-xl border p-6 animate-fade-in transition-shadow duration-300 hover:shadow-md"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-card-foreground">
                    {data.assessment_title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {data.assessment_description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted inline-block px-2 py-1 rounded">
                    ID: {data.instance_id}
                  </p>
                </div>
                <ExportControls data={data} />
              </div>
            </div> */}
            <div className="results-card">
              <div className="results-header">
                <div className="results-info">
                  <h2 className="results-title">{data.assessment_title}</h2>

                  <p className="results-description">
                    {data.assessment_description}
                  </p>

                  <p className="results-id">ID: {data.instance_id}</p>
                </div>

                <div className="results-export">
                  <ExportControls data={data} />
                </div>
              </div>
            </div>

            {/* Score Overview Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CompletionRing
                answered={data.answered_questions}
                total={data.total_questions}
              />
              <OverallScore
                percentage={data.percentage}
                score={data.total_score}
                maxScore={data.max_total_score}
              />
            </div>

            {/* Gauge */}
            <GaugeChart percentage={data.percentage} />

            {/* Element Scores */}
            <ScoresByElement elementScores={data.element_scores} />

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BarChartView questions={data.questions} />
              <RadarChartView elementScores={data.element_scores} />
            </div>

            {/* Question Breakdown */}
            <QuestionBreakdown questions={data.questions} />

            {/* Insights */}
            <InsightsSection insights={data.insights} />
          </div>
        )}

        {!data && !isLoading && !error && (
          // <div
          //   className="bg-card rounded-xl border p-16 text-center animate-fade-in"
          //   style={{ boxShadow: "var(--shadow-card)" }}
          // >
          //   <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
          //     <ClipboardList className="h-8 w-8 text-muted-foreground" />
          //   </div>
          //   <h3 className="text-lg font-semibold text-card-foreground mb-2">
          //     No Results Loaded
          //   </h3>
          //   <p className="text-muted-foreground max-w-sm mx-auto">
          //     Enter an Assessment Instance ID above to load and visualize your
          //     results.
          //   </p>
          // </div>
          <NoResults />
        )}
      </main>
    </div>
  );
}

export default App;
