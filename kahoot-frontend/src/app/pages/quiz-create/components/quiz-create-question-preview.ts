import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuizQuestion } from '@app-types';

@Component({
  selector: 'quiz-create-question-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})
export class QuizCreateQuestionPreviewComponent {
  readonly question = input.required<QuizQuestion>();
}
