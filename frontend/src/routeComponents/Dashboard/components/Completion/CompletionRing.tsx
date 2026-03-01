import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { CHART_COLORS } from "../../../../lib/helpers/chart-colors";

interface CompletionRingProps {
  answered: number;
  total: number;
}

const CompletionRing = ({ answered, total }: CompletionRingProps) => {
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;
  const data = [
    { name: "Answered", value: answered },
    { name: "Remaining", value: total - answered },
  ];

  return (
    <div className="bg-card rounded-xl border p-6 animate-slide-up transition-shadow duration-300 hover:shadow-md" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Completion Progress</h3>
      <div className="flex items-center justify-center gap-6">
        <div className="w-40 h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={CHART_COLORS.answered} />
                <Cell fill="hsl(210, 40%, 94%)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-card-foreground">{percentage}%</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><span className="font-semibold text-card-foreground">{answered}</span> of <span className="font-semibold text-card-foreground">{total}</span> questions answered</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: CHART_COLORS.answered }} />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full inline-block bg-muted" />
            <span>Remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionRing;
