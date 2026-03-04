import { useEffect, useState } from "react";
import { CheckLine } from "lucide-react";

// css
import "./CompletionRing.css";

// helpers
import { CHART_COLORS } from "../../../../lib/helpers";

interface CompletionRingProps {
  answered: number;
  total: number;
}

const CompletionRing = ({ answered, total }: CompletionRingProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  // Animate percentage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // SVG calculations
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedPercentage / 100) * circumference;

  // Determine status color based on percentage
  const getStatusColor = () => {
    if (percentage >= 80) return "#10b981";
    if (percentage >= 50) return "#073c92";
    return "#f59e0b";
  };

  const statusColor = getStatusColor();

  return (
    <div
      className="completion-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div
        className="completion-glow"
        style={{ opacity: isHovered ? 0.6 : 0.3 }}
      />

      <div className="completion-header">
        <div className="completion-icon">
          <CheckLine />
        </div>
        <h3 className="completion-title">Completion Progress</h3>
      </div>

      <div className="completion-content">
        {/* Animated SVG Ring */}
        <div className="completion-chart-wrapper">
          <svg className="progress-ring" viewBox="0 0 120 120">
            {/* Definitions for gradients */}
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={statusColor} />
                <stop offset="100%" stopColor={CHART_COLORS.answered} />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background track */}
            <circle
              className="progress-ring-track"
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="hsl(210, 40%, 94%)"
              strokeWidth="10"
            />

            {/* Progress arc with animation */}
            <circle
              className="progress-ring-arc"
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
              filter={isHovered ? "url(#glow)" : undefined}
            />

            {/* Decorative dots at 0%, 25%, 50%, 75%, 100% */}
            {[0, 25, 50, 75, 100].map((pos, i) => {
              const angle = (pos / 100) * 360 - 90;
              const x = 60 + radius * Math.cos((angle * Math.PI) / 180);
              const y = 60 + radius * Math.sin((angle * Math.PI) / 180);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={pos <= animatedPercentage ? statusColor : "#d1d5db"}
                  className="progress-dot"
                />
              );
            })}
          </svg>

          {/* Center content */}
          <div className="completion-center">
            <div className="completion-center-content">
              <span className="completion-percentage">
                {animatedPercentage}%
              </span>
              <span className="completion-label">Complete</span>
            </div>
          </div>
        </div>
      </div>
      <div className="completion-footer">
        <div className="status-pill">
          {percentage === 100
            ? "All questions completed!"
            : percentage >= 80
              ? " Almost there!"
              : percentage >= 50
                ? " Good progress"
                : " Let's get started"}
        </div>
      </div>
    </div>
  );
};

export default CompletionRing;
