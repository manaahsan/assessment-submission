import { useEffect, useState, useRef } from "react";
import "./OverallScore.css";

interface OverallScoreProps {
  percentage: number;
  score: number;
  maxScore: number;
}

const OverallScore = ({ percentage, score, maxScore }: OverallScoreProps) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate numbers when visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      setDisplayPercentage(Number((percentage * easeOut).toFixed(2)));
      setDisplayScore(Number((score * easeOut).toFixed(1)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayPercentage(percentage);
        setDisplayScore(score);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, percentage, score]);

const getScoreConfig = (pct: number) => {
  if (pct >= 80)
    return {
      color: "#0B3C8A", 
      gradient: "linear-gradient(135deg, #073C92 0%, #2563eb 100%)",
      label: "Excellent",
      icon: "🏆",
      bgGlow: "rgba(7, 60, 146, 0.35)",
    };

  if (pct >= 60)
    return {
      color: "#1E40AF",
      gradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
      label: "Good",
      icon: "⭐",
      bgGlow: "rgba(37, 99, 235, 0.30)",
    };

  if (pct >= 40)
    return {
      color: "#334155",
      gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      label: "Average",
      icon: "📊",
      bgGlow: "rgba(51, 65, 85, 0.30)",
    };

  return {
    color: "#0f172a",
    gradient: "linear-gradient(135deg, hsl(222 47% 11%) 0%, #1e293b 100%)",
    label: "Needs Work",
    icon: "🎯",
    bgGlow: "rgba(15, 23, 42, 0.35)",
  };
};
  const config = getScoreConfig(percentage);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset =
    circumference - (displayPercentage / 100) * circumference;

  return (
    <div
      ref={cardRef}
      className={`overall-card ${isVisible ? "visible" : ""}`}
      style={{ "--glow-color": config.bgGlow } as React.CSSProperties}
    >
      <div className="overall-glow" />
      <div className="particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`} />
        ))}
      </div>

      <div className="overall-header">
        <div className="overall-icon" style={{ background: config.gradient }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h3 className="overall-title">Overall Score</h3>
      </div>

      <div className="overall-body">
        {/* Circular Progress with Score */}
        <div className="score-visualization">
          <svg className="score-ring" viewBox="0 0 200 200">
            <defs>
              <linearGradient
                id="scoreGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={config.color} />
                <stop
                  offset="100%"
                  stopColor={config.color}
                  stopOpacity="0.6"
                />
              </linearGradient>
              <filter
                id="scoreGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer decorative ring */}
            <circle
              cx="100"
              cy="100"
              r="95"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="decorative-ring"
            />

            {/* Background track */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(229, 231, 235, 0.5)"
              strokeWidth="12"
            />

            {/* Progress arc */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 100 100)"
              filter="url(#scoreGlow)"
              className="progress-arc"
            />
          </svg>

          {/* Center content */}
          <div className="score-center">
            <span className="score-icon-display">{config.icon}</span>
            <span
              className="overall-percentage"
              style={{ color: config.color }}
            >
              {displayPercentage.toFixed(2)}%
            </span>
            <span className="score-label">{config.label}</span>
          </div>
        </div>

        {/* Score Details */}
        <div className="score-details">
          <div className="score-main">
            <div className="score-fraction">
              <span className="score-current" style={{ color: config.color }}>
                {displayScore.toFixed(1)}
              </span>
              <span className="score-divider">/</span>
              <span className="score-max">{maxScore}</span>
            </div>
            <span className="score-unit">points</span>
          </div>

          <div className="score-scale-badge">
            <div className="scale-bar">
              <div
                className="scale-fill"
                style={{
                  width: `${(percentage / 100) * 100}%`,
                  background: config.gradient,
                }}
              />
            </div>
            <span className="scale-text">Normalized from 1–5 scale</span>
          </div>

          {/* Performance indicators */}
          <div className="performance-bars">
            {[
              { label: "Exceeds", threshold: 80, active: percentage >= 80 },
              { label: "Meets", threshold: 60, active: percentage >= 60 },
              { label: "Approaches", threshold: 40, active: percentage >= 40 },
              { label: "Below", threshold: 0, active: percentage < 40 },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`perf-bar ${item.active ? "active" : ""}`}
                style={{
                  backgroundColor: item.active ? config.color : "#e5e7eb",
                  opacity: item.active ? 1 : 0.3,
                }}
              >
                <span className="perf-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with trend */}
      <div className="overall-footer">
        <div className="trend-indicator" style={{ color: config.color }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M23 6l-9.5 9.5-5-5L1 18" />
          </svg>
          <span>Performance Summary</span>
        </div>
      </div>
    </div>
  );
};

export default OverallScore;
