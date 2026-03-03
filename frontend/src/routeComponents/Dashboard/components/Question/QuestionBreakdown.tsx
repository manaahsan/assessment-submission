import { useMemo, useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  CheckLine,
} from "lucide-react";

// css
import "./QuestionBreakdown.css";

// types
import {
  QuestionAnswer,
  QuestionFilter,
  SortOption,
} from "../../../../lib/types/assessment";

// helper
import {
  CHART_COLORS,
  getScoreColor,
  getStatusConfig,
} from "../../../../lib/helpers";

interface QuestionBreakdownProps {
  questions: QuestionAnswer[];
}

const QuestionBreakdown = ({ questions }: QuestionBreakdownProps) => {
  const [filter, setFilter] = useState<QuestionFilter>("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionAnswer | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const listRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setTimeout(
              () => {
                setVisibleItems((prev) => new Set([...prev, index]));
              },
              (index % 10) * 50,
            );
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    const items = listRef.current?.querySelectorAll(".qb-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [questions, filter, sort, searchQuery]);

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.question_title?.toLowerCase().includes(query) ||
          q.element?.toLowerCase().includes(query) ||
          q.reflection_prompt?.toLowerCase().includes(query),
      );
    }

    // Status filter
    if (filter === "answered") result = result.filter((q) => q.is_answered);
    else if (filter === "unanswered")
      result = result.filter((q) => !q.is_answered && !q.is_reflection);
    else if (filter === "reflection")
      result = result.filter((q) => q.is_reflection);

    // Sorting
    switch (sort) {
      case "score-desc":
        result.sort((a, b) => (b.answer_value ?? 0) - (a.answer_value ?? 0));
        break;
      case "score-asc":
        result.sort((a, b) => (a.answer_value ?? 0) - (b.answer_value ?? 0));
        break;
      case "status":
        result.sort((a, b) => Number(b.is_answered) - Number(a.is_answered));
        break;
      case "element":
        result.sort((a, b) => a.element.localeCompare(b.element));
        break;
    }

    return result;
  }, [questions, filter, sort, searchQuery]);

  const getStatus = (q: QuestionAnswer) => {
    if (q.is_reflection) return "reflection";
    return q.is_answered ? "answered" : "unanswered";
  };

  const clearFilters = () => {
    setFilter("all");
    setSort("default");
    setSearchQuery("");
  };

  const hasActiveFilters =
    filter !== "all" || sort !== "default" || searchQuery;

  // Stats
  const stats = useMemo(
    () => ({
      total: questions.length,
      answered: questions.filter((q) => q.is_answered).length,
      unanswered: questions.filter((q) => !q.is_answered && !q.is_reflection)
        .length,
      reflection: questions.filter((q) => q.is_reflection).length,
      filtered: filteredQuestions.length,
    }),
    [questions, filteredQuestions.length],
  );

  return (
    <div className="qb-card">
      {/* Background Effects */}
      <div className="qb-glow" />

      {/* Header */}
      <div className="qb-header">
        <div className="qb-title-group">
          <div className="qb-icon">
            <CheckLine />
          </div>
          <div className="qb-title-content">
            <h3 className="qb-title">Question Breakdown</h3>
            <div className="qb-stats-row">
              <span className="qb-stat">{stats.total} total</span>
              <span className="qb-stat-dot" />
              <span className="qb-stat" style={{ color: "#10b981" }}>
                {stats.answered} answered
              </span>
              <span className="qb-stat-dot" />
              <span className="qb-stat" style={{ color: "#073c92" }}>
                {stats.reflection} reflections
              </span>
            </div>
          </div>
        </div>

        <button
          className={`qb-filter-toggle ${isFilterOpen ? "active" : ""}`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <SlidersHorizontal size={18} />
          <span>Filter & Sort</span>
          {hasActiveFilters && <span className="filter-badge" />}
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`qb-filter-panel ${isFilterOpen ? "open" : ""}`}>
        {/* Search */}
        <div className="qb-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search questions, elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="qb-search-input"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery("")}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="qb-filters-row">
          {/* Filter Tabs */}
          <div className="qb-filter-tabs">
            {[
              { key: "all", label: "All", count: stats.total },
              { key: "answered", label: "Answered", count: stats.answered },
              {
                key: "unanswered",
                label: "Unanswered",
                count: stats.unanswered,
              },
              {
                key: "reflection",
                label: "Reflections",
                count: stats.reflection,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`filter-tab ${filter === tab.key ? "active" : ""}`}
                onClick={() => setFilter(tab.key as QuestionFilter)}
              >
                {tab.label}
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="qb-sort">
            <ArrowUpDown size={14} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="sort-select"
            >
              <option value="default">Default Order</option>
              <option value="sequence">Question Sequence</option>
              <option value="score-desc">Score: High to Low</option>
              <option value="score-asc">Score: Low to High</option>
              <option value="element">Element Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="qb-active-filters">
            <span className="af-label">Active:</span>
            {filter !== "all" && (
              <span className="af-tag" onClick={() => setFilter("all")}>
                {filter} <X size={12} />
              </span>
            )}
            {sort !== "default" && (
              <span className="af-tag" onClick={() => setSort("default")}>
                {sort} <X size={12} />
              </span>
            )}
            {searchQuery && (
              <span className="af-tag" onClick={() => setSearchQuery("")}>
                "{searchQuery}" <X size={12} />
              </span>
            )}
            <button className="af-clear" onClick={clearFilters}>
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="qb-results-bar">
        <span className="results-text">
          Showing <strong>{stats.filtered}</strong> of{" "}
          <strong>{stats.total}</strong> questions
        </span>
        <div className="results-progress">
          <div
            className="results-progress-fill"
            style={{ width: `${(stats.filtered / stats.total) * 100}%` }}
          />
        </div>
      </div>

      {/* List */}
      {filteredQuestions.length === 0 ? (
        <div className="qb-empty-state">
          <div className="empty-illustration">🔍</div>
          <p className="qb-empty-title">No questions found</p>
          <p className="qb-empty-desc">
            Try adjusting your filters or search query
          </p>
          <button className="empty-reset" onClick={clearFilters}>
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="qb-list" ref={listRef}>
          {filteredQuestions.map((q, i) => {
            const status = getStatus(q);
            const statusConfig = getStatusConfig(status);
            const isVisible = visibleItems.has(i);
            const scoreColor = getScoreColor(q.answer_value ?? 0, q.max_score);

            return (
              <button
                key={q.question_id}
                data-index={i}
                onClick={() => setSelectedQuestion(q)}
                className={`qb-item ${isVisible ? "visible" : ""}`}
                style={{ "--item-index": i } as React.CSSProperties}
              >
                {/* Left accent bar */}
                <div
                  className="item-accent"
                  style={{ backgroundColor: statusConfig.color }}
                />

                <div className="qb-item-content">
                  <div className="qb-item-main">
                    {/* Sequence number */}
                    <div className="qb-sequence">
                      <span className="seq-num">{q.question_sequence}</span>
                      <span className="seq-label">Q{q.question_sequence}</span>
                    </div>

                    <div className="qb-item-info">
                      <p className="qb-question-title">
                        {q.is_reflection
                          ? q.reflection_prompt || q.question_title
                          : q.question_title}
                      </p>

                      <div className="qb-badges">
                        <span className="qb-badge element-badge">
                          <span
                            className="badge-dot"
                            style={{
                              backgroundColor:
                                CHART_COLORS.elements[
                                  i % CHART_COLORS.elements.length
                                ],
                            }}
                          />
                          {q.element}
                        </span>

                        <span
                          className="qb-badge status-badge"
                          style={{
                            backgroundColor: statusConfig.bg,
                            color: statusConfig.color,
                            borderColor: statusConfig.color + "30",
                          }}
                        >
                          <span className="status-icon">
                            {statusConfig.icon}
                          </span>
                          {statusConfig.label}
                        </span>

                        {q.is_reflection && (
                          <span className="qb-badge reflection-badge">
                            <span>💭</span>
                            Reflection
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="qb-item-meta">
                    {!q.is_reflection && (
                      <div className="qb-score-block">
                        <div className="score-visual">
                          <div
                            className="score-ring"
                            style={{
                              background: `conic-gradient(${scoreColor} ${((q.answer_value || 0) / q.max_score) * 360}deg, #e5e7eb 0deg)`,
                            }}
                          >
                            <span className="score-inner">
                              {q.answer_value ?? 0}
                            </span>
                          </div>
                          <span className="score-divider">/</span>
                          <span className="score-max">{q.max_score}</span>
                        </div>
                        <span
                          className="score-pct"
                          style={{ color: scoreColor }}
                        >
                          {q.max_score > 0
                            ? Math.round(
                                ((q.answer_value || 0) / q.max_score) * 100,
                              )
                            : 0}
                          %
                        </span>
                      </div>
                    )}

                    <div className="qb-chevron-wrapper">
                      <ChevronRight className="qb-chevron" size={20} />
                    </div>
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className="item-hover-gradient" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionBreakdown;
