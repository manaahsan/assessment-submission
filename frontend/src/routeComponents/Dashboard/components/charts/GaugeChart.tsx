import { useEffect, useState, useRef } from "react";
import { Loader } from "lucide-react";

// css
import "./GaugeChart.css";

// helper
import { getScoreConfig } from "../../../../lib/helpers";


interface GaugeChartProps {
  percentage: number;
}

const GaugeChart = ({ percentage }: GaugeChartProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
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

  // Animate percentage
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

      setAnimatedPercentage(Number((percentage * easeOut).toFixed(1)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedPercentage(percentage);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, percentage]);

  const config = getScoreConfig(percentage);

  // SVG calculations for gauge arc
  const radius = 80;
  const strokeWidth = 12;
  const normalizedPercentage = Math.min(Math.max(animatedPercentage, 0), 100);
  const angle = (normalizedPercentage / 100) * 180;
  const circumference = Math.PI * radius;
  const strokeDashoffset =
    circumference - (normalizedPercentage / 100) * circumference;

  // Generate tick marks
  const ticks = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <div ref={cardRef} className={`gauge-card ${isVisible ? "visible" : ""}`}>
      {/* Background glow */}
      <div
        className="gauge-glow"
        style={{
          background: `radial-gradient(circle at 50% 80%, ${config.color}20 0%, transparent 70%)`,
        }}
      />

      <div className="gauge-header">
        <div className="gauge-icon">
          <Loader />
        </div>
        <h3 className="gauge-title">Score Gauge</h3>
      </div>

      <div className="gauge-chart-container">
        <svg className="gauge-svg" viewBox="0 0 200 140">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={config.gradient[0]} />
              <stop offset="100%" stopColor={config.gradient[1]} />
            </linearGradient>
            <filter id="gaugeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient
              id="trackGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>

          {/* Background track */}
          <path
            d={`M 20 120 A ${radius} ${radius} 0 0 1 180 120`}
            fill="none"
            stroke="url(#trackGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Tick marks */}
          {ticks.map((tick, i) => {
            const tickAngle = (tick / 100) * 180;
            const rad = (tickAngle * Math.PI) / 180;
            const innerR = radius - 20;
            const outerR = radius - 8;
            const x1 = 100 - Math.cos(rad) * innerR;
            const y1 = 120 - Math.sin(rad) * innerR;
            const x2 = 100 - Math.cos(rad) * outerR;
            const y2 = 120 - Math.sin(rad) * outerR;
            const isActive = tick <= normalizedPercentage;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActive ? config.color : "#d1d5db"}
                strokeWidth="2"
                strokeLinecap="round"
                className={`tick-mark ${isActive ? "active" : ""}`}
              />
            );
          })}

          {/* Progress arc */}
          <path
            d={`M 20 120 A ${radius} ${radius} 0 0 1 180 120`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            filter="url(#gaugeGlow)"
            className="gauge-arc"
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Decorative needle base */}
          <circle
            cx="100"
            cy="120"
            r="8"
            fill={config.color}
            className="needle-base"
          />

          {/* Animated needle */}
          <g
            className="gauge-needle"
            style={{
              transformOrigin: "100px 120px",
              transform: `rotate(${angle - 90}deg)`,
              transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <line
              x1="100"
              y1="120"
              x2="100"
              y2="45"
              stroke={config.color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="45" r="5" fill={config.color} />
          </g>

          {/* Value labels */}
          <text x="15" y="135" className="gauge-label-text" textAnchor="middle">
            0%
          </text>
          <text x="100" y="25" className="gauge-label-text" textAnchor="middle">
            50%
          </text>
          <text
            x="185"
            y="135"
            className="gauge-label-text"
            textAnchor="middle"
          >
            100%
          </text>
        </svg>

        {/* Center display */}
        <div className="gauge-center">
          <span className="gauge-icon-display">{config.icon}</span>
          <span className="gauge-percentage" style={{ color: config.color }}>
            {animatedPercentage.toFixed(1)}%
          </span>
          <span className="gauge-sublabel">{config.label}</span>
        </div>
      </div>

      {/* Scale indicators */}
      <div className="gauge-scale">
        <div
          className="scale-segment"
          style={{ "--segment-color": "#ef4444" } as React.CSSProperties}
        >
          <span className="segment-dot" />
          <span className="segment-label">0-40%</span>
        </div>
        <div
          className="scale-segment"
          style={{ "--segment-color": "#f59e0b" } as React.CSSProperties}
        >
          <span className="segment-dot" />
          <span className="segment-label">40-60%</span>
        </div>
        <div
          className="scale-segment"
          style={{ "--segment-color": "#6366f1" } as React.CSSProperties}
        >
          <span className="segment-dot" />
          <span className="segment-label">60-80%</span>
        </div>
        <div
          className="scale-segment"
          style={{ "--segment-color": "#10b981" } as React.CSSProperties}
        >
          <span className="segment-dot" />
          <span className="segment-label">80-100%</span>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
