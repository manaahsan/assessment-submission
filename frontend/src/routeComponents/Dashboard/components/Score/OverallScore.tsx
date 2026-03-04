import { useEffect, useState, useRef } from "react";
import { Layers } from "lucide-react";
import "./OverallScore.css";

interface OverallScoreProps {
  percentage: number;
  score: number;
  maxScore: number;
}

const PRIMARY_COLOR = "#000000";

const OverallScore = ({ percentage, score, maxScore }: OverallScoreProps) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll animation trigger
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

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate numbers
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1200;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setDisplayPercentage(Number((percentage * easeOut).toFixed(1)));
      setDisplayScore(Number((score * easeOut).toFixed(1)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayPercentage(percentage);
        setDisplayScore(score);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, percentage, score]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset =
    circumference - (displayPercentage / 100) * circumference;

  return (
    <div ref={cardRef} className={`overall-card ${isVisible ? "visible" : ""}`}>
      <div className="overall-header">
        <div className="overall-icon">
          <Layers size={20} />
        </div>
        <h3 className="overall-title">Overall Score</h3>
      </div>

      <div className="overall-body">
        {/* Circular Progress */}
        <div className="score-visualization">
          <svg className="score-ring" viewBox="0 0 200 200">
            {/* Background track */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="12"
            />

            {/* Progress */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={"var(--text-primary)"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 100 100)"
              className="progress-arc"
            />
          </svg>

          {/* Center Text */}
          <div className="score-center">
            <span
              className="overall-percentage"
              style={{ color: "var(--text-primary)" }}
            >
              {displayPercentage.toFixed(1)}%
            </span>
            <p className="avg-label">AVG</p>
          </div>
        </div>

        {/* Score Details */}
        <div className="score-details">
          <div className="score-fraction">
            <span className="score-current" style={{ color: "var(--text-primary)" }}>
              {displayScore.toFixed(1)}
            </span>
            <span className="score-divider">/</span>
            <span className="score-max">{maxScore}</span>
          </div>
          <span className="score-unit">points</span>

          {/* Progress bar */}
          <div className="scale-bar">
            <div
              className="scale-fill"
              style={{
                width: `${percentage}%`,
                backgroundColor: "var(--text-primary)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallScore;
