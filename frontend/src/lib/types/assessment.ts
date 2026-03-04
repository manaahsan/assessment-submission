export interface AssessmentInstance {
  id: string;
  element: string;
  responder_name: string;

  completed: boolean;
  completed_at: string | null;

  created_at: string;
  updated_at: string;
}
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
export interface Score {
  total_score: number;
  score: number;
  max_score: number;
  percentage: number;
}
export interface ElementScore {
    element: string;
  scores:{
  total_score: number;
  max_score: number;
  percentage: number;
  }
  question_answers:QuestionAnswer[]
}

export interface QuestionBreakdown {

}

export interface Insight {
  type: "warning" | "positive" | "info";
  message: string;
  positive: boolean
    priority?: "high" | "medium" | "low";
}

export interface AssessmentResult {
  instance_id: string;
  instance: AssessmentInstance;
  assessment_title: string;
  assessment_description: string;
  total_questions: number;
  answered_questions: number;
  completion_percentage:number;
  total_score: number;
  max_total_score: number;
  percentage: number;
  questions: Question[];
  scores: Score;
  element_scores: ElementScore[];
  element_scores_array:ElementScore[]
  insights: Insight[];
  completed_at: string | null;
  status: "in_progress" | "completed";
}

// Type for each individual question/answer
export interface QuestionAnswer {
  question_id: string;
  question_title: string;
  question_suite?: string | null;
  question_sequence: number;
  is_reflection: boolean;
  reflection_prompt?: string | null;
  element: string;
  max_score: number;
  is_answered: boolean;
  answer_id?: string | null;
  answer_value?: number | null;
  answer_text?: string | null;
  answer_option_id?: string | null;
  text_answer?: string | null;
  numeric_value?: number | null;
  answer_explanation?: string | null;
  option_number?: number | null;
}

// Type for the scores of an element
export interface ElementScores {
  total_score: number;
  max_score: number;
  percentage: number;
}

// Type for a single element in the assessment
export interface AssessmentElement {
  element: string; 
  total_questions: number;
  answered_questions: number;
  completion_percentage: number;
  scores: ElementScores;
  question_answers: QuestionAnswer[];
}

export type QuestionFilter = "all" | "answered" | "unanswered" | "reflection";
export type SortOption =
  | "default"
  | "score-asc"
  | "score-desc"
  | "status"
  | "element";