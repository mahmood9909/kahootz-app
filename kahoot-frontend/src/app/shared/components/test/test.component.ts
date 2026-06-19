import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuizQuestion } from '@app-types';

@Component({
  selector: 'app-test',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex h-full items-center justify-center">
      <p class="text-sm text-muted-foreground"> coming soon rfge</p>
    </div>
  `,
})
export class TestComponent {
}
