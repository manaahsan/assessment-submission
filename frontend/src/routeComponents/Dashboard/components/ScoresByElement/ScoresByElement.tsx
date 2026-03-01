import "./ScoresByElement.css";
import { CHART_COLORS } from "../../../../lib/helpers/chart-colors";
import { ElementScore } from "../../../../lib/types/assessment";

interface ScoresByElementProps {
  elementScores: ElementScore[];
}

const ScoresByElement = ({ elementScores }: ScoresByElementProps) => {
  return (
    <div className="scores-card">
      <h3 className="scores-title">Scores by Element</h3>
      <div className="scores-list">
        {elementScores.map((item, index) => (
          <div key={item.element} className="scores-item">
            <div className="scores-header">
              <span className="element-name">{item.element}</span>
              <span className="element-score">
                {item.percentage}% ({item.score}/{item.max_score} pts)
              </span>
            </div>
            <div className="scores-bar-bg">
              <div
                className="scores-bar-fill"
                style={{
                  width: `${item.max_score > 0 ? item.percentage : 0}%`,
                  backgroundColor: CHART_COLORS.elements[index % CHART_COLORS.elements.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoresByElement;