import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { QuizQuestion } from '@app-types';
import { QuestionContentcardComponent } from '../../questioncontentcard/questioncontentcard.component';

@Component({
  selector: 'quizeportal-truefalse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuestionContentcardComponent],
  templateUrl: './truefalse.component.html',
})
export class TrueFalseComponent {
  readonly question = input.required<QuizQuestion>();
  readonly questionChange = output<QuizQuestion>();
}
