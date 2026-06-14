export type QuestionType = 'multiple-choice' | 'true-false';

export type CalculationAlgorithm = 'standard' | 'timer-based';

export interface QuizConfigItem {
  componentRef: string;
  props: Record<string, any>;
}

export interface QuizQuestion {
  id: number;
  name: string;
  description?: string;
  points: number;
  calculationAlgorithm: CalculationAlgorithm;
  timeLimit: number;
  imageUrl?: string;
  type: QuestionType;
  quizConfig: QuizConfigItem[];
}

export interface Quiz {
  id: number;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}
