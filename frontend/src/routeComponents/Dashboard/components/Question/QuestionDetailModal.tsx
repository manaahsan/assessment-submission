import { useEffect } from "react";
import { Question } from "../../../../lib/types/assessment";

interface QuestionDetailModalProps {
  question: Question | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_COLORS: Record<string, string> = {
  answered: "#22c55e",
  unanswered: "#ef4444",
  partial: "#facc15",
  // add more status as needed
};

const QuestionDetailModal = ({ question, open, onOpenChange }: QuestionDetailModalProps) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onOpenChange]);

  if (!question || !open) return null;

  return (
    <div className="modal-overlay" onClick={() => onOpenChange(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{question.question_text}</h2>

        <div className="modal-badges">
          <span className="badge outline">{question.element}</span>
          <span className="badge status" style={{ backgroundColor: STATUS_COLORS[question.status] }}>
            {question.status}
          </span>
          <span className="badge secondary">{question.question_type}</span>
        </div>

        {question.question_type === "reflection" ? (
          <div className="reflection-box">
            <p className="reflection-title">Reflection Question</p>
            <p>This question is for self-reflection and is not scored.</p>
          </div>
        ) : (
          <div className="score-section">
            <div className="score-row">
              <span className="label">Score</span>
              <span className="value">{question.score} / {question.max_score}</span>
            </div>

            {question.selected_options.length > 0 ? (
              <div className="selected-answers">
                <p className="answers-title">Selected Answer</p>
                {question.selected_options.map((opt) => (
                  <div key={opt.option_id} className="answer-box">
                    <p className="answer-text">{opt.option_text}</p>
                    <p className="answer-value">Value: {opt.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-answer">No answer provided</div>
            )}
          </div>
        )}

        <button className="modal-close" onClick={() => onOpenChange(false)}>×</button>
      </div>
    </div>
  );
};

export default QuestionDetailModal;