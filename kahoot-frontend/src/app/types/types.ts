export type QType = 'multiple-choice' | 'true-false';

export type CalculationAlgorithm = 'standard' | 'timer-based';

export type QOptionsStruct = {
  id: string;
  title: string;
  config: {
    cssClass: string;
  };
  isCorrect?: boolean;
};

export type QStruct = {
  id: string;
  name: string;
  title?: string;
  description?: string;
  points: number;
  calculationAlgorithm: CalculationAlgorithm;
  timeLimit: number;
  imageUrl?: string;
  type: QType;
  options?: QOptionsStruct[];
  answers?: string[];
};

export type PlanStruct = {
  id: string;
  title: string;
  description?: string;
  questions: QStruct[];
};
