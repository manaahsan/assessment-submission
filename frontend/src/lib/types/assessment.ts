export interface SelectedOption {
  option_id: string;
  option_text: string;
  value: number;
}

export interface Question {
  question_id: string;
  question_text: string;
  question_type: "scored" | "reflection" | "multiple_choice";
  element: string;
  status: "answered" | "unanswered" | "skipped";
  selected_options: SelectedOption[];
  max_score: number;
  score: number;
}

export interface ElementScore {
  element: string;
  score: number;
  max_score: number;
  percentage: number;
}

export interface Insight {
  type: "warning" | "positive" | "info";
  message: string;
}

export interface AssessmentResult {
  instance_id: string;
  assessment_title: string;
  assessment_description: string;
  total_questions: number;
  answered_questions: number;
  total_score: number;
  max_total_score: number;
  percentage: number;
  questions: Question[];
  element_scores: ElementScore[];
  insights: Insight[];
  completed_at: string | null;
  status: "in_progress" | "completed";
}

export type QuestionFilter = "all" | "answered" | "unanswered" | "reflection";
export type SortOption = "default" | "score-asc" | "score-desc" | "status" | "element";
