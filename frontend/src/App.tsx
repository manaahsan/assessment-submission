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
import Component from "./routeComponents/Dashboard/Component";

function App() {
  const [instanceId, setInstanceId] = useState(
    "d1111111-1111-1111-1111-111111111111",
  );
  const [data, setData] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState("");

  const handleFetch = useCallback(async (id: string) => {
    console.log(id, 30);
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
      <Component />
    </div>
  );
}

export default App;
