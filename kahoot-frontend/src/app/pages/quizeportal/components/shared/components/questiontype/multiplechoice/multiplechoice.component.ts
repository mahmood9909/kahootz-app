import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuizQuestion } from '@app-types';

@Component({
  selector: 'quizeportal-multiplechoice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multiplechoice.component.html',
})
export class MultipleChoiceComponent {
  readonly question = input.required<QuizQuestion>();
}
