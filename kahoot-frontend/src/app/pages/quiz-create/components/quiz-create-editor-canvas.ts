import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { QuizQuestion } from '@app-types';

@Component({
  selector: 'quiz-create-editor-canvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex h-full items-center justify-center bg-muted/10">
      <p class="text-sm text-muted-foreground">Canvas coming soon</p>
    </div>
  `,
})
export class QuizCreateEditorCanvasComponent {
  readonly question = input.required<QuizQuestion>();
}
