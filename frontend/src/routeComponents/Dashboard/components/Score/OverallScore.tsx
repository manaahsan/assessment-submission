import "./OverallScore.css";

interface OverallScoreProps {
  percentage: number;
  score: number;
  maxScore: number;
}

const OverallScore = ({ percentage, score, maxScore }: OverallScoreProps) => {
  const getScoreColorClass = (pct: number) => {
    if (pct >= 75) return "score-green";
    if (pct >= 50) return "score-amber";
    return "score-red";
  };

  return (
    <div className="overall-card">
      <h3 className="overall-title">Overall Score</h3>
      <div className="overall-body">
        <span className={`overall-percentage ${getScoreColorClass(percentage)}`}>
          {percentage.toFixed(2)}%
        </span>
        <p className="overall-score">
          {score} / {maxScore} points
        </p>
        <p className="overall-normalized">
          Normalized from 1–5 scale
        </p>
      </div>
    </div>
  );
};

export default OverallScore;