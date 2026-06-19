import { InjectionToken } from '@angular/core';
import { QuestionType } from '@app-types';

export type QuestionComponentEntry = {
  component: () => Promise<any>;
  questionConfigProps: string;
  type: QuestionType;
};

export type QuestionComponentRegistry = {
  [key in QuestionType]: QuestionComponentEntry;
};

export const QUESTION_COMPONENT_REF = new InjectionToken<QuestionComponentRegistry>(
  'QuestionComponentRef'
);

const defaultRegistry: QuestionComponentRegistry = {
  'true-false': {
    component: () =>
      import('../../shared/components/test/test.component').then((m) => m.TestComponent),
    questionConfigProps: 'quizConfig',
    type: 'true-false',
  },
  'multiple-choice': {
    component: () =>
      import('../../shared/components/test/test.component').then((m) => m.TestComponent),
    questionConfigProps: 'quizConfig',
    type: 'multiple-choice',
  },
};

export function provideQuestionComponents(
  registry: QuestionComponentRegistry = defaultRegistry
) {
  return { provide: QUESTION_COMPONENT_REF, useValue: registry };
}
