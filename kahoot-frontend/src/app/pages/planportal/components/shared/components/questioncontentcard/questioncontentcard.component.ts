import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { QStruct } from '@app-types';
import { HlmInputImports } from '@ui-lib/input/src';

@Component({
  selector: 'planportal-questioncontentcard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './questioncontentcard.component.html',
  imports: [HlmInputImports, FormField],
})
export class QuestionContentcardComponent {
  readonly field = input.required<any>();
}
