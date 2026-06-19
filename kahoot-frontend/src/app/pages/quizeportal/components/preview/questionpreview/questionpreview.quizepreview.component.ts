import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuizQuestion } from '@app-types';

@Component({
  selector: 'quizeportal-questionpreview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './questionpreview.quizepreview.component.html',
})
export class QuestionpreviewComponent {
  readonly question = input.required<QuizQuestion>();
}
