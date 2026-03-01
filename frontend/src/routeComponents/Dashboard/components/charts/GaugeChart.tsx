import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./GaugeChart.css";
import { CHART_COLORS } from "../../../../lib/helpers/chart-colors";

interface GaugeChartProps {
  percentage: number;
}

const GaugeChart = ({ percentage }: GaugeChartProps) => {
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  const getColor = (pct: number) => {
    if (pct >= 75) return CHART_COLORS.answered;
    if (pct >= 50) return CHART_COLORS.skipped;
    return CHART_COLORS.unanswered;
  };

  return (
    <div className="gauge-card">
      <h3 className="gauge-title">Score Gauge</h3>
      <div className="gauge-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={85}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={getColor(percentage)} />
              <Cell fill={CHART_COLORS.gauge.empty} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="gauge-center">
          <span className="gauge-percentage">{percentage.toFixed(1)}%</span>
          <span className="gauge-label">Overall</span>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;