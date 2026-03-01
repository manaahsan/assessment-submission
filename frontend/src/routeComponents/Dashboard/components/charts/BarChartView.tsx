import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./BarChartView.css";
import { Question } from "../../../../lib/types/assessment";
import { STATUS_COLORS } from "../../../../lib/helpers/chart-colors";

interface BarChartViewProps {
  questions: Question[];
}

const BarChartView = ({ questions }: BarChartViewProps) => {
  const data = questions.map((q, i) => ({
    name: `Q${i + 1}`,
    element: q.element,
    score: q.score,
    maxScore: q.max_score,
    status: q.status,
    type: q.question_type,
    text: q.question_text,
  }));

  return (
    <div className="barchart-card">
      <h3 className="barchart-title">Score per Question</h3>
      <div className="barchart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 40%, 93%)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(210, 40%, 91%)",
                boxShadow: "var(--shadow-card-hover)",
                fontSize: "0.875rem",
              }}
              formatter={(value: number, _name: string, props: any) => [
                `${value} / ${props.payload.maxScore} pts`,
                `Score (${props.payload.status})`,
              ]}
              labelFormatter={(label: string) => {
                const q = data.find((d) => d.name === label);
                return q ? `${q.element}: ${q.text?.substring(0, 50)}...` : label;
              }}
            />
            <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={STATUS_COLORS[entry.status] || STATUS_COLORS.answered}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="barchart-legend">
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: color }}
            />
            <span className="legend-label">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartView;