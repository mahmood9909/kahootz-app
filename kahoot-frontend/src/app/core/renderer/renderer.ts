import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuizConfigItem } from '@app-types';

@Component({
  selector: 'app-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})
export class RendererComponent {
  readonly configs = input.required<QuizConfigItem[]>();
}
