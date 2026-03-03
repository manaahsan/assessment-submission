import { useEffect, useState, useRef } from "react";
import "./RadarChartView.css";
import { CHART_COLORS } from "../../../../lib/helpers";
import { Layers } from "lucide-react";
import { ElementScore } from "../../../../lib/types/assessment";

interface RadarChartViewProps {
  elementScores: ElementScore[];
}

const RadarChartView = ({ elementScores }: RadarChartViewProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animatedData, setAnimatedData] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const data = elementScores
    .filter((e) => e.scores.max_score > 0)
    .map((e) => ({
      element: e.element,
      score: e.scores.percentage,
      fullMark: 100,
    }));

  // Intersection Observer for animation trigger
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

  // Animate data points
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedData(data.map((d) => d.score * easeOut));

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedData(data.map((d) => d.score));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, data.length]);

  if (data.length < 3) {
    return (
      <div className="radar-card empty" ref={cardRef}>
        <div className="radar-glow" />
        <div className="radar-header">
          <div className="radar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <h3 className="radar-title">Element Radar</h3>
        </div>
        <div className="radar-empty-state">
          <div className="empty-icon">📊</div>
          <p className="radar-empty">
            At least 3 scored elements needed for radar chart.
          </p>
          <span className="empty-hint">Current elements: {data.length}</span>
        </div>
      </div>
    );
  }

  // Chart configuration
  const size = 400;
  const center = size / 2;
  const radius = 140;
  const levels = 5;
  const angleStep = (2 * Math.PI) / data.length;

  // Calculate polygon points
  const getPoint = (
    index: number,
    value: number,
    maxRadius: number = radius,
  ) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const r = (value / 100) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = animatedData
    .map((score, i) => {
      const point = getPoint(i, score);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#6366f1";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const averageScore = data.reduce((acc, d) => acc + d.score, 0) / data.length;

  return (
    <div className="radar-card" ref={cardRef}>
      <div className="radar-glow" />

      {/* Header */}
      <div className="radar-header">
        <div
          className="radar-icon"
        >
          <Layers />
        </div>
        <div className="radar-title-group">
          <h3 className="radar-title">Element Radar</h3>
          <span className="radar-subtitle">
            {data.length} dimensions analyzed
          </span>
        </div>
        <div className="radar-average">
          <span
            className="avg-value"
            style={{ color: getScoreColor(averageScore) }}
          >
            {Math.round(averageScore)}%
          </span>
          <span className="avg-label">Avg</span>
        </div>
      </div>

      {/* Custom Radar Chart */}
      <div className="radar-wrapper">
        <svg
          className="radar-svg"
          viewBox={`0 0 ${size} ${size}`}
          style={{ maxWidth: "100%", height: "auto" }}
        >
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor={CHART_COLORS.elements[0]}
                stopOpacity="0.3"
              />
              <stop
                offset="100%"
                stopColor={CHART_COLORS.elements[0]}
                stopOpacity="0.05"
              />
            </radialGradient>
            <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={CHART_COLORS.elements[0]} />
              <stop offset="100%" stopColor={CHART_COLORS.elements[1]} />
            </linearGradient>
          </defs>

          {/* Grid circles */}
          {[...Array(levels)].map((_, i) => {
            const r = (radius / levels) * (i + 1);
            return (
              <g key={i} className="grid-circle">
                <circle
                  cx={center}
                  cy={center}
                  r={r}
                  fill="none"
                  stroke="rgba(229, 231, 235, 0.5)"
                  strokeWidth="1"
                  strokeDasharray={i === levels - 1 ? "" : "4 4"}
                />
                <text
                  x={center + 5}
                  y={center - r + 5}
                  className="grid-label"
                  fontSize="10"
                  fill="#9ca3af"
                >
                  {(i + 1) * 20}%
                </text>
              </g>
            );
          })}

          {/* Axis lines and labels */}
          {data.map((item, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const endX = center + radius * Math.cos(angle);
            const endY = center + radius * Math.sin(angle);
            const labelX = center + (radius + 30) * Math.cos(angle);
            const labelY = center + (radius + 30) * Math.sin(angle);
            const isHovered = hoveredIndex === index;

            return (
              <g
                key={index}
                className={`axis-group ${isHovered ? "hovered" : ""}`}
              >
                <line
                  x1={center}
                  y1={center}
                  x2={endX}
                  y2={endY}
                  stroke="rgba(229, 231, 235, 0.5)"
                  strokeWidth="1"
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="axis-label"
                  fontSize={isHovered ? "14" : "12"}
                  fontWeight={isHovered ? "700" : "500"}
                  fill={isHovered ? CHART_COLORS.elements[0] : "#6b7280"}
                  style={{ transition: "all 0.2s ease", cursor: "pointer" }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.element.length > 12
                    ? item.element.substring(0, 10) + "..."
                    : item.element}
                </text>
              </g>
            );
          })}

          {/* Data polygon */}
          <g className="data-polygon">
            <polygon
              points={polygonPoints}
              fill="url(#radarGradient)"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinejoin="round"
              filter="url(#radarGlow)"
              className={isVisible ? "visible" : ""}
              style={{
                transition: "all 0.3s ease",
                opacity: isVisible ? 1 : 0,
              }}
            />

            {/* Animated stroke overlay for drawing effect */}
            <polygon
              points={polygonPoints}
              fill="none"
              stroke={CHART_COLORS.elements[0]}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeDasharray={1000}
              strokeDashoffset={isVisible ? 0 : 1000}
              style={{
                transition: "stroke-dashoffset 2s ease-out",
              }}
            />
          </g>

          {/* Data points */}
          {animatedData.map((score, index) => {
            const point = getPoint(index, score);
            const isHovered = hoveredIndex === index;
            const color = getScoreColor(score);

            return (
              <g
                key={index}
                className={`data-point ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Outer ring */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 12 : 0}
                  fill={color}
                  opacity="0.2"
                  style={{ transition: "all 0.3s ease" }}
                />

                {/* Main point */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? 8 : 5}
                  fill={color}
                  stroke="white"
                  strokeWidth="2"
                  filter={isHovered ? "url(#radarGlow)" : undefined}
                  style={{ transition: "all 0.2s ease" }}
                />

                {/* Score label on hover */}
                {isHovered && (
                  <g className="point-tooltip">
                    <rect
                      x={point.x - 30}
                      y={point.y - 35}
                      width="60"
                      height="24"
                      rx="6"
                      fill="rgba(17, 24, 39, 0.9)"
                    />
                    <text
                      x={point.x}
                      y={point.y - 20}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="700"
                    >
                      {Math.round(score)}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Center point */}
          <circle
            cx={center}
            cy={center}
            r={4}
            fill={CHART_COLORS.elements[0]}
            opacity="0.5"
          />
        </svg>

        {/* Side stats panel */}
        <div className="radar-stats">
          <h4 className="stats-title">Top Performers</h4>
          <div className="stats-list">
            {[...data]
              .sort((a, b) => b.score - a.score)
              .slice(0, 3)
              .map((item, idx) => (
                <div key={idx} className="stat-row">
                  <span className="stat-rank">#{idx + 1}</span>
                  <span className="stat-name">{item.element}</span>
                  <div className="stat-bar-mini">
                    <div
                      className="stat-bar-fill-mini"
                      style={{
                        width: `${item.score}%`,
                        backgroundColor: getScoreColor(item.score),
                      }}
                    />
                  </div>
                  <span
                    className="stat-score"
                    style={{ color: getScoreColor(item.score) }}
                  >
                    {Math.round(item.score)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="radar-legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#10b981" }} />
          <span>Strong (80-100%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#6366f1" }} />
          <span>Good (60-79%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#f59e0b" }} />
          <span>Developing (40-59%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: "#ef4444" }} />
          <span>Critical (&lt;40%)</span>
        </div>
      </div>
    </div>
  );
};

export default RadarChartView;
