import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Question, QuestionFilter, SortOption } from "../../../../lib/types/assessment";
import QuestionDetailModal from "./QuestionDetailModal";
import { STATUS_COLORS } from "../../../../lib/helpers/chart-colors";
import FilterControls from "../Filter/FilterControls";

interface QuestionBreakdownProps {
  questions: Question[];
}

const QuestionBreakdown = ({ questions }: QuestionBreakdownProps) => {
  const [filter, setFilter] = useState<QuestionFilter>("all");
  const [sort, setSort] = useState<SortOption>("default");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    if (filter === "answered") result = result.filter((q) => q.status === "answered");
    else if (filter === "unanswered") result = result.filter((q) => q.status === "unanswered");
    else if (filter === "reflection") result = result.filter((q) => q.question_type === "reflection");

    switch (sort) {
      case "score-desc": result.sort((a, b) => b.score - a.score); break;
      case "score-asc": result.sort((a, b) => a.score - b.score); break;
      case "status": result.sort((a, b) => a.status.localeCompare(b.status)); break;
      case "element": result.sort((a, b) => a.element.localeCompare(b.element)); break;
    }

    return result;
  }, [questions, filter, sort]);

  return (
    <div className="question-breakdown-card">
      <div className="header">
        <h3>Question Breakdown</h3>
        <FilterControls filter={filter} sort={sort} onFilterChange={setFilter} onSortChange={setSort} />
      </div>

      {filteredQuestions.length === 0 ? (
        <p className="no-questions">No questions match the selected filter.</p>
      ) : (
        <div className="questions-list">
          {filteredQuestions.map((q, i) => (
            <button
              key={q.question_id}
              onClick={() => setSelectedQuestion(q)}
              className="question-item"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="question-content">
                <div className="question-main">
                  <p className="question-text">{q.question_text}</p>
                  <div className="badges">
                    <span className="badge outline">{q.element}</span>
                    <span className="badge status" style={{ backgroundColor: STATUS_COLORS[q.status] }}>
                      {q.status}
                    </span>
                    {q.question_type !== "scored" && (
                      <span className="badge secondary">{q.question_type}</span>
                    )}
                  </div>
                </div>
                <div className="question-meta">
                  {q.question_type !== "reflection" && (
                    <span className="score">{q.score}/{q.max_score}</span>
                  )}
                  <ChevronRight className="chevron" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <QuestionDetailModal
        question={selectedQuestion}
        open={!!selectedQuestion}
        onOpenChange={(open) => !open && setSelectedQuestion(null)}
      />
    </div>
  );
};

export default QuestionBreakdown;