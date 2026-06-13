import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmCardImports } from '@ui-lib/card';
import { QuizQuestion } from '../quiz-create';

@Component({
  selector: 'quiz-create-question-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmCardImports],
  template: `
    <div class="flex h-full items-center justify-center bg-muted/10 p-8">
      <div hlmCard class="w-full max-w-lg">

        <!-- Image placeholder -->
        <div class="flex h-36 cursor-pointer items-center justify-center bg-muted text-sm text-muted-foreground hover:bg-muted/80 transition-colors">
          Click to add image
        </div>

        <!-- Question + options -->
        <div class="p-6">
          <p class="text-base font-semibold leading-snug">{{ question().title }}</p>

          <div class="mt-5 grid grid-cols-2 gap-2.5">
            @for (option of question().options; track option; let i = $index) {
              <div class="flex items-center gap-2.5 rounded-lg border border-border bg-background p-3 text-sm">
                <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                  {{ 'ABCD'[i] }}
                </span>
                <span class="truncate">{{ option }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between border-t border-border px-6 py-3 text-xs text-muted-foreground">
          <span>{{ question().points }} points</span>
          <span>{{ question().timeLimit }}s</span>
        </div>

      </div>
    </div>
  `,
})
export class QuizCreateQuestionPreviewComponent {
  readonly question = input.required<QuizQuestion>();
}
