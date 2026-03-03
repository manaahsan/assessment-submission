import { CheckCircle, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import "./InsightsSection.css";

interface Insight {
  type: string;
  message: string;
  positive: boolean;
  priority?: "high" | "medium" | "low";
}

interface InsightsSectionProps {
  insights?: Insight[];
}

const InsightsSection = ({ insights = [] }: InsightsSectionProps) => {
  if (!insights.length) return null;

  const positiveCount = insights.filter((i) => i.positive).length;
  const total = insights.length;
  const percentage = Math.round((positiveCount / total) * 100);

  const getPriorityConfig = (insight: Insight) => {
    if (insight.positive) {
      return {
        icon: CheckCircle,
        gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
        bg: "rgba(16, 185, 129, 0.1)",
        border: "rgba(16, 185, 129, 0.2)",
        color: "#059669",
      };
    }
    
    const priority = insight.priority || "medium";
    if (priority === "high") {
      return {
        icon: AlertTriangle,
        gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
        bg: "rgba(239, 68, 68, 0.1)",
        border: "rgba(239, 68, 68, 0.2)",
        color: "#dc2626",
      };
    }
    
    return {
      icon: AlertTriangle,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
      bg: "rgba(245, 158, 11, 0.1)",
      border: "rgba(245, 158, 11, 0.2)",
      color: "#d97706",
    };
  };

  return (
    <div className="insights-card">
      {/* Header with Progress Ring */}
      <div className="insights-header">
        <div className="insights-title-group">
          <div className="insights-icon">
            <Lightbulb size={20} />
          </div>
          <div>
            <h3 className="insights-title">Insights & Recommendations</h3>
            <p className="insights-subtitle">AI-powered analysis</p>
          </div>
        </div>
        
        <div className="insights-score">
          <div 
            className="score-ring"
            style={{
              background: `conic-gradient(var(--accent-success) ${percentage * 3.6}deg, var(--bg-tertiary) 0deg)`
            }}
          >
            <span>{percentage}%</span>
          </div>
          <span className="score-label">{positiveCount}/{total}</span>
        </div>
      </div>

      {/* Insights List */}
      <div className="insights-list">
        {insights.map((insight, index) => {
          const config = getPriorityConfig(insight);
          const Icon = config.icon;

          return (
            <div
              key={index}
              className="insight-item"
              style={{
                "--insight-bg": config.bg,
                "--insight-border": config.border,
                "--insight-color": config.color,
                "--insight-gradient": config.gradient,
              } as React.CSSProperties}
            >
              <div className="insight-accent" />
              
              <div className="insight-icon-wrapper" style={{ background: config.bg }}>
                <Icon size={18} style={{ color: config.color }} />
              </div>
              
              <div className="insight-content">
                <p className="insight-message">{insight.message}</p>
                <div className="insight-meta">
                  <span 
                    className="insight-badge"
                    style={{ color: config.color, background: config.bg }}
                  >
                    {insight.positive ? "Strength" : insight.priority === "high" ? "Critical" : "Improvement"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsSection;