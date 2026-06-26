import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { QStruct } from '@app-types';
import { QuestionContentcardComponent } from '../../questioncontentcard/questioncontentcard.component';

@Component({
  selector: 'planportal-truefalse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [QuestionContentcardComponent],
  templateUrl: './truefalse.component.html',
})
export class TrueFalseComponent {
  readonly question = input.required<QStruct>();
  readonly questionChange = output<QStruct>();
}
