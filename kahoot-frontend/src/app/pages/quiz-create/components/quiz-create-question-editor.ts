import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAlignLeft,
  lucideCalculator,
  lucideLayoutList,
  lucidePencilLine,
  lucideStar,
  lucideTimer,
} from '@ng-icons/lucide';
import { CalculationAlgorithm, QuestionType, QuizQuestion } from '@app-types';
import { HlmInputImports } from '@ui-lib/input';
import { HlmLabelImports } from '@ui-lib/label';
import { HlmSelectImports } from '@ui-lib/select';
import { HlmSeparatorImports } from '@ui-lib/separator';
import { HlmTextareaImports } from '@ui-lib/textarea';

@Component({
  selector: 'quiz-create-question-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, HlmInputImports, HlmLabelImports, HlmSelectImports, HlmSeparatorImports, HlmTextareaImports],
  providers: [
    provideIcons({ lucidePencilLine, lucideLayoutList, lucideAlignLeft, lucideStar, lucideCalculator, lucideTimer }),
  ],
  template: `
    <div class="flex h-full flex-col gap-5 overflow-y-auto bg-background p-4">

      <h3 class="text-sm font-semibold">Question Settings</h3>

      <!-- Name -->
      <div class="flex flex-col gap-1.5">
        <label hlmLabel class="flex items-center gap-1.5">
          <ng-icon name="lucidePencilLine" class="size-3.5 text-muted-foreground" />
          Name <span class="font-normal text-destructive">*</span>
        </label>
        <input
          hlmInput
          type="text"
          placeholder="Question name…"
          [value]="question().name"
          (input)="onNameChange($any($event.target).value)"
        />
      </div>

      <!-- Type -->
      <div class="flex flex-col gap-1.5">
        <label hlmLabel class="flex items-center gap-1.5">
          <ng-icon name="lucideLayoutList" class="size-3.5 text-muted-foreground" />
          Type <span class="font-normal text-destructive">*</span>
        </label>
        <hlm-select [value]="question().type" [itemToString]="questionTypeLabel" (valueChange)="onTypeChange($any($event))">
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

      <!-- Description -->
      <div class="flex flex-col gap-1.5">
        <label hlmLabel class="flex items-center gap-1.5">
          <ng-icon name="lucideAlignLeft" class="size-3.5 text-muted-foreground" />
          Description <span class="font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          hlmTextarea
          rows="3"
          placeholder="Add context or notes…"
          [value]="question().description ?? ''"
          class="resize-none max-h-32 overflow-y-auto"
          (input)="onDescriptionChange($any($event.target).value)"
        ></textarea>
      </div>

      <hlm-separator />

      <!-- Points -->
      <div class="flex flex-col gap-1.5">
        <label hlmLabel class="flex items-center gap-1.5">
          <ng-icon name="lucideStar" class="size-3.5 text-muted-foreground" />
          Points <span class="font-normal text-destructive">*</span>
        </label>
        <input
          hlmInput
          type="number"
          min="1"
          max="100"
          [value]="question().points"
          (change)="onPointsChange($any($event.target).valueAsNumber)"
        />
      </div>

      <!-- Timer -->
      <div class="flex flex-col gap-1.5">
        <label hlmLabel class="flex items-center gap-1.5">
          <ng-icon name="lucideTimer" class="size-3.5 text-muted-foreground" />
          Timer
        </label>
        <hlm-select [value]="question().timeLimit.toString()" [itemToString]="timerLabel" (valueChange)="onTimeLimitChange(+$any($event))">
          <hlm-select-trigger class="w-full">
            <hlm-select-value placeholder="Select time…" />
          </hlm-select-trigger>
          <ng-template hlmSelectPortal>
            <hlm-select-content>
              @for (t of timerOptions; track t) {
                <hlm-select-item [value]="t.toString()">{{ t }} seconds</hlm-select-item>
              }
            </hlm-select-content>
          </ng-template>
        </hlm-select>
      </div>

      <hlm-separator />

      <!-- Calculation Algorithm -->
      <div class="flex flex-col gap-1.5">
        <label hlmLabel class="flex items-center gap-1.5">
          <ng-icon name="lucideCalculator" class="size-3.5 text-muted-foreground" />
          Calculation Algorithm
        </label>
        <hlm-select [value]="question().calculationAlgorithm" [itemToString]="calcAlgorithmLabel" (valueChange)="onCalcAlgorithmChange($any($event))">
          <hlm-select-trigger class="w-full">
            <hlm-select-value placeholder="Select algorithm…" />
          </hlm-select-trigger>
          <ng-template hlmSelectPortal>
            <hlm-select-content>
              <hlm-select-item value="standard">Standard</hlm-select-item>
              <hlm-select-item value="timer-based">Timer Based</hlm-select-item>
            </hlm-select-content>
          </ng-template>
        </hlm-select>
      </div>

    </div>
  `,
})
export class QuizCreateQuestionEditorComponent {
  readonly question = input.required<QuizQuestion>();
  readonly questionChange = output<QuizQuestion>();

  readonly timerOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  readonly questionTypeLabel = (value: string): string =>
    ({ 'multiple-choice': 'Multiple Choice', 'true-false': 'True / False' })[value] ?? value;

  readonly calcAlgorithmLabel = (value: string): string =>
    ({ standard: 'Standard', 'timer-based': 'Timer Based' })[value] ?? value;

  readonly timerLabel = (value: string): string => (value ? `${value} seconds` : '');

  onNameChange(name: string): void {
    this.questionChange.emit({ ...this.question(), name });
  }

  onDescriptionChange(description: string): void {
    this.questionChange.emit({ ...this.question(), description: description || undefined });
  }

  onTypeChange(type: QuestionType): void {
    this.questionChange.emit({ ...this.question(), type });
  }

  onPointsChange(points: number): void {
    if (!isNaN(points)) this.questionChange.emit({ ...this.question(), points });
  }

  onCalcAlgorithmChange(calculationAlgorithm: CalculationAlgorithm): void {
    this.questionChange.emit({ ...this.question(), calculationAlgorithm });
  }

  onTimeLimitChange(timeLimit: number): void {
    if (!isNaN(timeLimit)) this.questionChange.emit({ ...this.question(), timeLimit });
  }
}
