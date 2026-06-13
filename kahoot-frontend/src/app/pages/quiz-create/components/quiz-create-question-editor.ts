import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmInputImports } from '@ui-lib/input';
import { HlmLabelImports } from '@ui-lib/label';
import { HlmSelectImports } from '@ui-lib/select';
import { HlmSeparatorImports } from '@ui-lib/separator';
import { QuizQuestion } from '../quiz-create';

@Component({
  selector: 'quiz-create-question-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmInputImports, HlmLabelImports, HlmSelectImports, HlmSeparatorImports],
  template: `
    <div class="flex h-full flex-col gap-5 overflow-y-auto bg-background p-4">

      <h3 class="text-sm font-semibold">Question Settings</h3>

      <!-- Type -->
      <div class="flex flex-col gap-1.5">
        <label hlmLabel>Type</label>
        <hlm-select [value]="question().type" [itemToString]="questionTypeLabel">
          <hlm-select-trigger class="w-full">
            <hlm-select-value placeholder="Select type…" />
          </hlm-select-trigger>
          <ng-template hlmSelectPortal>
            <hlm-select-content>
              <hlm-select-item value="multiple-choice">Multiple Choice</hlm-select-item>
              <hlm-select-item value="true-false">True / False</hlm-select-item>
            </hlm-select-content>
          </ng-template>
        </hlm-select>
      </div>

      <!-- Question text -->
      <div class="flex flex-col gap-1.5">
        <label hlmLabel for="q-text">Question</label>
        <textarea
          hlmInput
          id="q-text"
          rows="3"
          placeholder="Enter question text…"
          [value]="question().title"
          class="resize-none"
        ></textarea>
      </div>

      <!-- Points + Time -->
      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-1.5">
          <label hlmLabel for="q-points">Points</label>
          <input hlmInput id="q-points" type="number" [value]="question().points" min="0" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label hlmLabel for="q-time">Time (s)</label>
          <input hlmInput id="q-time" type="number" [value]="question().timeLimit" min="5" />
        </div>
      </div>

      <hlm-separator />

      <!-- Options -->
      <div class="flex flex-col gap-2">
        <label hlmLabel>Options</label>
        @for (option of question().options; track option; let i = $index) {
          <div class="flex items-center gap-2">
            <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
              {{ 'ABCD'[i] }}
            </span>
            <input hlmInput [value]="option" [placeholder]="'Option ' + (i + 1)" />
          </div>
        }
      </div>

    </div>
  `,
})
export class QuizCreateQuestionEditorComponent {
  readonly question = input.required<QuizQuestion>();

  readonly questionTypeLabel = (value: string): string =>
    ({ 'multiple-choice': 'Multiple Choice', 'true-false': 'True / False' })[value] ?? value;
}
