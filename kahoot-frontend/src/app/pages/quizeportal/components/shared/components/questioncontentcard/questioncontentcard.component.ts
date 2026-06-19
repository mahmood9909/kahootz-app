import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { QuizQuestion } from '@app-types';

@Component({
  selector: 'quizeportal-questioncontentcard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './questioncontentcard.component.html',
})
export class QuestionContentcardComponent {
  readonly question = input.required<QuizQuestion>();
  readonly questionChange = output<QuizQuestion>();

  onNameChange(name: string): void {
    this.questionChange.emit({ ...this.question(), name });
  }
}
