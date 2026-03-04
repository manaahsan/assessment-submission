import { useEffect, useState, useRef } from "react";
import { Layers } from "lucide-react";

// css
import "./ScoresByElement.css";

// types
import { ElementScore } from "../../../../lib/types/assessment";

// helper
import { CHART_COLORS, getBarGradient, getScoreStatus } from "../../../../lib/helpers";

interface ScoresByElementProps {
  elementScores: ElementScore[];
}

const ScoresByElement = ({ elementScores }: ScoresByElementProps) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sortedScores = [...elementScores].sort((a, b) => b.scores.percentage - a.scores.percentage);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
            }, index * 100);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const items = listRef.current?.querySelectorAll('.scores-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [sortedScores.length]);

  return (
    <div className="scores-card">
      {/* Ambient background */}
      <div className="scores-ambient" />
      
      {/* Header with stats */}
      <div className="scores-header-section">
        <div className="scores-title-wrapper">
          <div className="scores-icon">
           <Layers/>
          </div>
          <div className="scores-title-group">
            <h3 className="scores-title">Scores by Element</h3>
            <span className="scores-subtitle">
              {sortedScores.length} elements assessed
            </span>
          </div>
        </div>
        
        <div className="scores-summary">
          <div className="summary-pill">
            <span className="summary-value">
              {Math.round(sortedScores.reduce((acc, item) => acc + item.scores.percentage, 0) / sortedScores.length)}%
            </span>
            <span className="summary-label">Avg</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="scores-list" ref={listRef}>
        {sortedScores.map((item, index) => {
          const status = getScoreStatus(item.scores.percentage);
          const baseColor = CHART_COLORS.elements[index % CHART_COLORS.elements.length];
          const isVisible = visibleItems.has(index);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.element}
              data-index={index}
              className={`scores-item ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ '--item-index': index } as React.CSSProperties}
            >
              {/* Rank badge */}
              <div className="item-rank" style={{ backgroundColor: baseColor + '20', color: baseColor }}>
                #{index + 1}
              </div>

              <div className="item-content">
                {/* Header row */}
                <div className="scores-header">
                  <div className="element-info">
                    <span className="element-name">{item.element}</span>
                    <span 
                      className="element-status"
                      style={{ color: status.color, backgroundColor: status.color + '15' }}
                    >
                      <span className="status-icon">{status.icon}</span>
                      {status.label}
                    </span>
                  </div>
                  
                  <div className="element-metrics">
                    <span className="element-percentage" style={{ color: baseColor }}>
                      {item.scores.percentage}%
                    </span>
                    <span className="element-fraction">
                      {item.scores.total_score}/{item.scores.max_score}
                    </span>
                  </div>
                </div>

                {/* Progress bar with segments */}
                <div className="scores-bar-container">
                  <div className="scores-bar-bg">
                    <div
                      className="scores-bar-fill"
                      style={{
                        width: isVisible ? `${item.scores.max_score > 0 ? item.scores.percentage : 0}%` : '0%',
                        background: getBarGradient(item.scores.percentage, baseColor),
                        boxShadow: `0 0 20px ${baseColor}40`
                      }}
                    />
                    {/* Shine effect */}
                    <div className="bar-shine" />
                  </div>
                  
                  {/* Milestone markers */}
                  <div className="milestones">
                    <div className="milestone" style={{ left: '25%' }} />
                    <div className="milestone" style={{ left: '50%' }} />
                    <div className="milestone" style={{ left: '75%' }} />
                  </div>
                </div>

                {/* Expanded details on hover */}
                <div className={`item-details ${isHovered ? 'expanded' : ''}`}>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Points</span>
                      <span className="detail-value">{item.scores.total_score}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Max</span>
                      <span className="detail-value">{item.scores.max_score}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Gap</span>
                      <span className="detail-value" style={{ color: '#ef4444' }}>
                        -{item.scores.max_score - item.scores.total_score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer legend */}
      <div className="scores-footer">
        <div className="legend-grid">
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#10b981' }} />
            <span>Excellent (80-100%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#6366f1' }} />
            <span>Good (60-79%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }} />
            <span>Fair (40-59%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#ef4444' }} />
            <span>Needs Work (0-39%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoresByElement;