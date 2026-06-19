export type QuestionType = 'multiple-choice' | 'true-false';

export type CalculationAlgorithm = 'standard' | 'timer-based';


export type QuestionOption = {
  id: string;
  title: string;
  config: {
    cssClass: string;
  }
  isCorrect?: boolean;
};


export type QuestionItemConfig = {
  id: string;
  title: string;
  options: QuestionOption[];
}

export type QuizQuestion = {
  id: number;
  name: string;
  description?: string;
  points: number;
  calculationAlgorithm: CalculationAlgorithm;
  timeLimit: number;
  imageUrl?: string;
  type: QuestionType;
  quizConfig: QuestionItemConfig[];
  answers?: string[]
}

export type Quiz = {
  id: number;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}


