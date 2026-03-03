import { useEffect, useState, useRef } from "react";
import { ChartNoAxesColumnDecreasing } from "lucide-react";
// css
import "./BarChartView.css";

// helper
import { CHART_COLORS, getBarColor, getStatusIcon } from "../../../../lib/helpers";

// typees
import { ElementScore } from "../../../../lib/types/assessment";

interface BarChartViewProps {
  questions: ElementScore[];
}

const BarChartView = ({ questions }: BarChartViewProps) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [visibleBars, setVisibleBars] = useState<Set<number>>(new Set());
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    data: any;
    visible: boolean;
  }>({ x: 0, y: 0, data: null, visible: false });
  
  const chartRef = useRef<HTMLDivElement>(null);

  const scoredQuestions = questions
    .flatMap((element) => element.question_answers)
    .filter((q) => !q.is_reflection);

  const data = scoredQuestions.map((q, index) => ({
    id: index,
    name: `Q${q.question_sequence}`,
    element: q.element,
    score: q.answer_value ?? 0,
    maxScore: q.max_score,
    status: q.is_answered ? "answered" : "unanswered",
    text: q.question_title,
    percentage: q.max_score > 0 ? ((q.answer_value ?? 0) / q.max_score) * 100 : 0,
  }));

  // Animate bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      data.forEach((_, index) => {
        setTimeout(() => {
          setVisibleBars(prev => new Set([...prev, index]));
        }, index * 50);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [data.length]);

  // const getBarColor = (entry: typeof data[0]) => {
  //   if (!entry.is_answered) return STATUS_COLORS.unanswered || "#9ca3af";
  //   if (entry.percentage >= 80) return "#10b981";
  //   if (entry.percentage >= 60) return "#6366f1";
  //   if (entry.percentage >= 40) return "#f59e0b";
  //   return "#ef4444";
  // };

  // const getStatusIcon = (entry: typeof data[0]) => {
  //   if (!entry.is_answered) return "○";
  //   if (entry.percentage >= 80) return "★";
  //   if (entry.percentage >= 60) return "◆";
  //   if (entry.percentage >= 40) return "◇";
  //   return "!";
  // };

  const handleBarHover = (e: React.MouseEvent, entry: typeof data[0], index: number) => {
    const rect = chartRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipData({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 20,
        data: entry,
        visible: true,
      });
      setHoveredBar(index);
    }
  };

  const handleBarLeave = () => {
    setTooltipData(prev => ({ ...prev, visible: false }));
    setHoveredBar(null);
  };

  // Chart dimensions
  const chartHeight = 320;
  const barWidth = Math.max(24, Math.min(48, 600 / data.length));
  const gap = 8;
  const maxValue = Math.max(...data.map(d => d.maxScore), 5);
  const chartPadding = { top: 40, right: 20, bottom: 60, left: 50 };

  return (
    <div className="barchart-card" ref={chartRef}>
      {/* Ambient glow */}
      <div className="barchart-glow" />
      
      {/* Header */}
      <div className="barchart-header">
        <div className="barchart-title-group">
          <div className="barchart-icon">
             <ChartNoAxesColumnDecreasing />
          </div>
          <div className="title-content">
            <h3 className="barchart-title">Score per Question</h3>
            <span className="barchart-subtitle">{data.length} questions analyzed</span>
          </div>
        </div>
        
        <div className="barchart-stats">
          <div className="stat-mini">
            <span className="stat-value">
              {Math.round(data.filter(d => d.status === "answered").length / data.length * 100)}%
            </span>
            <span className="stat-label">Response</span>
          </div>
        </div>
      </div>

      {/* Custom Chart */}
      <div className="barchart-wrapper">
        <svg 
          className="custom-barchart" 
          viewBox={`0 0 ${Math.max(600, data.length * (barWidth + gap) + chartPadding.left + chartPadding.right)} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
            </linearGradient>
            <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((tick, i) => {
            const y = chartPadding.top + (chartHeight - chartPadding.top - chartPadding.bottom) * (1 - tick / 100);
            return (
              <g key={tick} className="grid-line">
                <line
                  x1={chartPadding.left}
                  y1={y}
                  x2={Math.max(600, data.length * (barWidth + gap) + chartPadding.left)}
                  y2={y}
                  stroke="rgba(229, 231, 235, 0.5)"
                  strokeDasharray={i === 0 ? "" : "4 4"}
                />
                <text
                  x={chartPadding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="axis-label"
                >
                  {Math.round(maxValue * tick / 100)}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((entry, index) => {
            const barHeight = (entry.score / maxValue) * (chartHeight - chartPadding.top - chartPadding.bottom);
            const maxBarHeight = (entry.maxScore / maxValue) * (chartHeight - chartPadding.top - chartPadding.bottom);
            const x = chartPadding.left + index * (barWidth + gap) + gap / 2;
            const y = chartHeight - chartPadding.bottom - barHeight;
            const isHovered = hoveredBar === index;
            const isVisible = visibleBars.has(index);
            const color = getBarColor(entry);

            return (
              <g 
                key={index} 
                className={`bar-group ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={(e) => handleBarHover(e, entry, index)}
                onMouseMove={(e) => handleBarHover(e, entry, index)}
                onMouseLeave={handleBarLeave}
                style={{ cursor: 'pointer' }}
              >
                {/* Background track (max score) */}
                <rect
                  x={x}
                  y={chartHeight - chartPadding.bottom - maxBarHeight}
                  width={barWidth}
                  height={maxBarHeight}
                  fill="rgba(243, 244, 246, 0.5)"
                  rx={6}
                  ry={6}
                />
                
                {/* Actual score bar */}
                <rect
                  x={x}
                  y={isVisible ? y : chartHeight - chartPadding.bottom}
                  width={barWidth}
                  height={isVisible ? barHeight : 0}
                  fill={color}
                  rx={6}
                  ry={6}
                  filter={isHovered ? "url(#barGlow)" : undefined}
                  className="bar-rect"
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transformOrigin: `${x + barWidth/2}px ${chartHeight - chartPadding.bottom}px`,
                    transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                  }}
                />

                {/* Score label on bar */}
                {entry.score > 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="bar-value-label"
                    opacity={isVisible ? 1 : 0}
                    style={{ transition: 'opacity 0.3s ease 0.3s' }}
                  >
                    {entry.score}
                  </text>
                )}

                {/* X-axis label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - chartPadding.bottom + 20}
                  textAnchor="middle"
                  className="x-label"
                >
                  {entry.name}
                </text>

                {/* Status indicator */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - chartPadding.bottom + 36}
                  textAnchor="middle"
                  className="status-icon"
                  fill={color}
                >
                  {getStatusIcon(entry)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Custom Tooltip */}
        {tooltipData.visible && tooltipData.data && (
          <div 
            className="custom-tooltip"
            style={{ 
              left: Math.min(tooltipData.x, (chartRef.current?.offsetWidth || 600) - 280), 
              top: Math.max(10, tooltipData.y - 100),
            }}
          >
            <div className="tooltip-header">
              <span 
                className="tooltip-badge"
                style={{ backgroundColor: getBarColor(tooltipData.data) + '20', color: getBarColor(tooltipData.data) }}
              >
                {tooltipData.data.element}
              </span>
              <span className="tooltip-sequence">{tooltipData.data.name}</span>
            </div>
            
            <div className="tooltip-body">
              <p className="tooltip-question">{tooltipData.data.text}</p>
              
              <div className="tooltip-score-grid">
                <div className="tooltip-score-item">
                  <span className="tooltip-label">Score</span>
                  <span className="tooltip-value" style={{ color: getBarColor(tooltipData.data) }}>
                    {tooltipData.data.score}/{tooltipData.data.maxScore}
                  </span>
                </div>
                <div className="tooltip-score-item">
                  <span className="tooltip-label">Percentage</span>
                  <span className="tooltip-value">{tooltipData.data.percentage.toFixed(1)}%</span>
                </div>
                <div className="tooltip-score-item">
                  <span className="tooltip-label">Status</span>
                  <span className="tooltip-value">
                    {tooltipData.data.status === "answered" ? "✓ Answered" : "○ Unanswered"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="tooltip-arrow" />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="barchart-legend">
        <div className="legend-section">
          <span className="legend-title">Status</span>
          <div className="legend-row">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: CHART_COLORS.answered }} />
              <span>Answered</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: CHART_COLORS.unanswered }} />
              <span>Unanswered</span>
            </div>
          </div>
        </div>
        
        {/* <div className="legend-section">
          <span className="legend-title">Performance</span>
          <div className="legend-row">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: "#10b981" }} />
              <span>Excellent (80%+)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: "#6366f1" }} />
              <span>Good (60-79%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: "#f59e0b" }} />
              <span>Fair (40-59%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: "#ef4444" }} />
              <span>Needs Work (&lt;40%)</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BarChartView;