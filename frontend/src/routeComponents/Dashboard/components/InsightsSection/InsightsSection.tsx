import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Insight } from "../../../../lib/types/assessment";

interface InsightsSectionProps {
  insights: Insight[];
}

const iconMap = {
  warning: AlertTriangle,
  positive: CheckCircle,
  info: Info,
};

// Example colors; you can adjust or import your own
const INSIGHT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  warning: { bg: "#fef3f2", border: "#fca5a5", text: "#b91c1c" },
  positive: { bg: "#ecfdf5", border: "#6ee7b7", text: "#047857" },
  info: { bg: "#f0f9ff", border: "#60a5fa", text: "#1d4ed8" },
};

const InsightsSection = ({ insights }: InsightsSectionProps) => {
  return (
    <div className="insights-section">
      <h3 className="insights-title">Insights & Recommendations</h3>
      <div className="insights-list">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.type];
          const colors = INSIGHT_COLORS[insight.type];
          return (
            <div
              key={index}
              className="insight-item"
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              <Icon className="insight-icon" style={{ color: colors.text }} />
              <p className="insight-message">{insight.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsSection;