import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QStruct } from '@app-types';

@Component({
  selector: 'planportal-questionpreview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './questionpreview.planpreview.component.html',
})
export class QuestionpreviewComponent {
  readonly question = input.required<QStruct>();
}
