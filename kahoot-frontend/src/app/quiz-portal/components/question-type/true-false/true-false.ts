import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuizQuestion } from '@app-types';

@Component({
  selector: 'app-true-false',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './true-false.html',
  styleUrl: './true-false.scss',
})
export class TrueFalseComponent {
  readonly question = input.required<QuizQuestion>();
}
