import { useEffect, useState, useRef } from "react";
import { 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Shield, 
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import "./InsightsSection.css";

interface Insight {
  message: string;
  positive: boolean;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
  action?: string;
}

interface InsightsSectionProps {
  insights: Insight[];
}

const InsightsSection = ({ insights }: InsightsSectionProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for staggered animations
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
      { threshold: 0.2 }
    );

    const items = listRef.current?.querySelectorAll('.insight-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [insights.length]);

  const getInsightConfig = (insight: Insight, index: number) => {
    const isPositive = insight.positive;
    const priority = insight.priority || (isPositive ? 'medium' : 'high');
    
    // Dynamic color schemes
    const colorSchemes = {
      positive: {
        bg: 'rgba(16, 185, 129, 0.08)',
        border: 'rgba(16, 185, 129, 0.2)',
        text: '#059669',
        glow: 'rgba(16, 185, 129, 0.3)',
        gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        icon: CheckCircle,
        iconBg: 'rgba(16, 185, 129, 0.15)'
      },
      warning: {
        bg: 'rgba(245, 158, 11, 0.08)',
        border: 'rgba(245, 158, 11, 0.2)',
        text: '#d97706',
        glow: 'rgba(245, 158, 11, 0.3)',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        icon: AlertTriangle,
        iconBg: 'rgba(245, 158, 11, 0.15)'
      },
      critical: {
        bg: 'rgba(239, 68, 68, 0.08)',
        border: 'rgba(239, 68, 68, 0.2)',
        text: '#dc2626',
        glow: 'rgba(239, 68, 68, 0.3)',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
        icon: AlertTriangle,
        iconBg: 'rgba(239, 68, 68, 0.15)'
      },
      info: {
        bg: 'rgba(99, 102, 241, 0.08)',
        border: 'rgba(99, 102, 241, 0.2)',
        text: '#4f46e5',
        glow: 'rgba(99, 102, 241, 0.3)',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        icon: Lightbulb,
        iconBg: 'rgba(99, 102, 241, 0.15)'
      }
    };

    // Determine type based on content analysis
    let type: keyof typeof colorSchemes = isPositive ? 'positive' : 'warning';
    if (!isPositive && priority === 'high') type = 'critical';
    if (insight.category === 'suggestion') type = 'info';

    return {
      ...colorSchemes[type],
      priority,
      type
    };
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'security': return Shield;
      case 'performance': return TrendingUp;
      case 'optimization': return Zap;
      case 'goal': return Target;
      default: return Lightbulb;
    }
  };

  // Calculate statistics
  const stats = {
    total: insights.length,
    positive: insights.filter(i => i.positive).length,
    warnings: insights.filter(i => !i.positive && i.priority !== 'high').length,
    critical: insights.filter(i => !i.positive && i.priority === 'high').length
  };

  return (
    <div className="insights-card">
      {/* Ambient Background */}
      <div className="insights-ambient" />
      
      {/* Header */}
      <div className="insights-header">
        <div className="insights-title-group">
          <div className="insights-icon-wrapper">
            <Lightbulb className="insights-icon" size={24} />
          </div>
          <div className="insights-title-content">
            <h3 className="insights-title">Insights & Recommendations</h3>
            <p className="insights-subtitle">
              AI-powered analysis of your assessment results
            </p>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="insights-stats">
          <div className="stat-pill positive">
            <CheckCircle size={14} />
            <span>{stats.positive}</span>
          </div>
          <div className="stat-pill warning">
            <AlertTriangle size={14} />
            <span>{stats.warnings}</span>
          </div>
          {stats.critical > 0 && (
            <div className="stat-pill critical">
              <AlertTriangle size={14} />
              <span>{stats.critical}</span>
            </div>
          )}
        </div>
      </div>

      {/* Insights List */}
      <div className="insights-list" ref={listRef}>
        {insights.map((insight, index) => {
          const config = getInsightConfig(insight, index);
          const Icon = config.icon;
          const CategoryIcon = getCategoryIcon(insight.category);
          const isExpanded = expandedIndex === index;
          const isVisible = visibleItems.has(index);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              data-index={index}
              className={`insight-item ${isVisible ? 'visible' : ''} ${isExpanded ? 'expanded' : ''} ${isHovered ? 'hovered' : ''}`}
              style={{
                '--insight-bg': config.bg,
                '--insight-border': config.border,
                '--insight-text': config.text,
                '--insight-glow': config.glow,
                '--insight-gradient': config.gradient,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow Effect */}
              <div className="insight-glow" />

              {/* Main Content */}
              <div className="insight-main" onClick={() => setExpandedIndex(isExpanded ? null : index)}>
                {/* Left Accent */}
                <div className="insight-accent" />

                {/* Icon */}
                <div className="insight-icon-wrapper" style={{ background: config.iconBg }}>
                  <Icon className="insight-icon-main" size={20} style={{ color: config.text }} />
                </div>

                {/* Content */}
                <div className="insight-content">
                  <div className="insight-header-row">
                    <span 
                      className="insight-category"
                      style={{ color: config.text, background: config.iconBg }}
                    >
                      <CategoryIcon size={12} />
                      {insight.category || (insight.positive ? 'Strength' : 'Improvement')}
                    </span>
                    
                    {insight.priority && (
                      <span className={`insight-priority ${insight.priority}`}>
                        {insight.priority}
                      </span>
                    )}
                  </div>

                  <p className="insight-message">
                    {insight.message}
                  </p>

                  {/* Progress Bar for visual interest */}
                  {!insight.positive && (
                    <div className="insight-progress">
                      <div 
                        className="insight-progress-fill"
                        style={{ 
                          width: insight.priority === 'high' ? '30%' : insight.priority === 'medium' ? '60%' : '85%',
                          background: config.gradient
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Expand/Chevron */}
                <div className="insight-expand">
                  {insight.action && (
                    isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />
                  )}
                </div>
              </div>

              {/* Expanded Action Section */}
              {insight.action && (
                <div className={`insight-action ${isExpanded ? 'visible' : ''}`}>
                  <div className="action-divider" />
                  <div className="action-content">
                    <div className="action-header">
                      <Target size={16} className="action-icon" />
                      <span className="action-label">Recommended Action</span>
                    </div>
                    <p className="action-text">{insight.action}</p>
                    <button className="action-button" style={{ background: config.gradient }}>
                      <span>Get Started</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Summary */}
      <div className="insights-footer">
        <div className="footer-summary">
          <div className="summary-item">
            <div className="summary-ring" style={{ background: `conic-gradient(#10b981 ${stats.positive / stats.total * 360}deg, #e5e7eb 0deg)` }}>
              <span>{Math.round(stats.positive / stats.total * 100)}%</span>
            </div>
            <span className="summary-label">Positive</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-text">
            <strong>{stats.positive}</strong> of <strong>{stats.total}</strong> insights are positive trends
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;