import { InjectionToken, InputSignal } from '@angular/core';
import { QType } from '@app-types';

export type QuestionComponentEntry = {
  componentName : string;
  component: () => Promise<any>;
  type: QType;
};
type ComponentInputs<T> = {
  [P in keyof T]: T[P] extends InputSignal<infer A> ? A : never;
};
export type QuestionComponentRegistry = {
  [key in QType]: QuestionComponentEntry;
};

export const QUESTION_COMPONENT_REF = new InjectionToken<QuestionComponentRegistry>(
  'QuestionComponentRef'
);

const defaultRegistry: QuestionComponentRegistry = {
  'true-false': {
    component: () =>
      import('../../pages/planportal/components/shared/components/questiontype/truefalse/truefalse.component').then(
        (m) => m.TrueFalseComponent
      ),
    type: 'true-false',
    componentName: 'True and False',
  },
  'multiple-choice': {
    component: () =>
      import('../../pages/planportal/components/shared/components/questiontype/multiplechoice/multiplechoice.component').then(
        (m) => m.MultipleChoiceComponent
      ),
    type: 'multiple-choice',
    componentName: 'Multiple Choice',
  },
};

export function provideQuestionComponents(
  registry: QuestionComponentRegistry = defaultRegistry
) {
  return { provide: QUESTION_COMPONENT_REF, useValue: registry };
}
