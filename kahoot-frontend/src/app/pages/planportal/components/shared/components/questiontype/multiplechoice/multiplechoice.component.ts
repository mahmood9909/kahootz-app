import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QStruct } from '@app-types';

@Component({
  selector: 'planportal-multiplechoice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multiplechoice.component.html',
})
export class MultipleChoiceComponent {
  readonly question = input.required<QStruct>();
}
