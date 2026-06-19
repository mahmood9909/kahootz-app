import { InjectionToken, InputSignal } from '@angular/core';
import { QuestionType } from '@app-types';

export type QuestionComponentEntry = {
  component: () => Promise<any>;
  input: { [key: string]: any };
  type: QuestionType;
};
type ComponentInputs<T> = {
  [P in keyof T]: T[P] extends InputSignal<infer A> ? A : never;
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
      import('../../pages/quizeportal/components/shared/components/questiontype/truefalse/truefalse.component').then(
        (m) => m.TrueFalseComponent
      ),
    input: { question: 'question' },
    type: 'true-false',
  },
  'multiple-choice': {
    component: () =>
      import('../../pages/quizeportal/components/shared/components/questiontype/multiplechoice/multiplechoice.component').then(
        (m) => m.MultipleChoiceComponent
      ),
    input: { question: 'question' },
    type: 'multiple-choice',
  },
};

export function provideQuestionComponents(
  registry: QuestionComponentRegistry = defaultRegistry
) {
  return { provide: QUESTION_COMPONENT_REF, useValue: registry };
}
