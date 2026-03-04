import { Lightbulb } from "lucide-react";

// css
import "./InsightsSection.css";

// helper
import { getPriorityConfig } from "../../../../lib/helpers";

// types
import { Insight } from "../../../../lib/types/assessment";

interface InsightsSectionProps {
  insights?: Insight[];
}

const InsightsSection = ({ insights = [] }: InsightsSectionProps) => {
  if (!insights.length) return null;

  const positiveCount = insights.filter((i) => i.positive).length;
  const total = insights.length;
  const percentage = Math.round((positiveCount / total) * 100);



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