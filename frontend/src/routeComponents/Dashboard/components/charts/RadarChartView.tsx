import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import "./RadarChartView.css";
import { ElementScore } from "../../../../lib/types/assessment";
import { CHART_COLORS } from "../../../../lib/helpers/chart-colors";

interface RadarChartViewProps {
  elementScores: ElementScore[];
}

const RadarChartView = ({ elementScores }: RadarChartViewProps) => {
  const data = elementScores
    .filter((e) => e.max_score > 0)
    .map((e) => ({
      element: e.element,
      score: e.percentage,
      fullMark: 100,
    }));

  if (data.length < 3) {
    return (
      <div className="radar-card">
        <h3 className="radar-title">Element Radar</h3>
        <p className="radar-message">
          At least 3 scored elements needed for radar chart.
        </p>
      </div>
    );
  }

  return (
    <div className="radar-card">
      <h3 className="radar-title">Element Radar</h3>
      <div className="radar-container">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="hsl(210, 40%, 91%)" />
            <PolarAngleAxis dataKey="element" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Radar
              name="Score %"
              dataKey="score"
              stroke={CHART_COLORS.elements[0]}
              fill={CHART_COLORS.elements[0]}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartView;