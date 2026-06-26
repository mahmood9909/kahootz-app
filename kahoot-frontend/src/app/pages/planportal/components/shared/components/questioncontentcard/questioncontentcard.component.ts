import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { QStruct } from '@app-types';
import { HlmInputImports } from '@ui-lib/input/src';

@Component({
  selector: 'planportal-questioncontentcard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './questioncontentcard.component.html',
  	imports: [HlmInputImports],
})
export class QuestionContentcardComponent {
  readonly question = input.required<QStruct>();
  readonly questionChange = output<QStruct>();

  onNameChange(name: string): void {
    this.questionChange.emit({ ...this.question(), name });
  }
}
