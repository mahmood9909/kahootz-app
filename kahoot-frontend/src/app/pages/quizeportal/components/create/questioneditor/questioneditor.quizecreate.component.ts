import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideAlignLeft,
  lucideCalculator,
  lucideLayoutList,
  lucidePencilLine,
  lucideStar,
  lucideTimer,
} from '@ng-icons/lucide';
import { CalculationAlgorithm, QuestionType } from '@app-types';
import { HlmInputImports } from '@ui-lib/input';
import { HlmLabelImports } from '@ui-lib/label';
import { HlmSelectImports } from '@ui-lib/select';
import { HlmSeparatorImports } from '@ui-lib/separator';
import { HlmTextareaImports } from '@ui-lib/textarea';
import { QuestionStateManagementService } from '@core/services/question.statemanagment.service';

@Component({
  selector: 'quizeportal-questioneditor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, HlmInputImports, HlmLabelImports, HlmSelectImports, HlmSeparatorImports, HlmTextareaImports],
  providers: [
    provideIcons({ lucidePencilLine, lucideLayoutList, lucideAlignLeft, lucideStar, lucideCalculator, lucideTimer }),
  ],
  templateUrl: './questioneditor.quizecreate.component.html',
})
export class QuestioneditorComponent {
  private readonly stateService = inject(QuestionStateManagementService);

  readonly question = computed(() => this.stateService.activeQuestion()!);

  readonly timerOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  readonly questionTypeLabel = (value: string): string =>
    ({ 'multiple-choice': 'Multiple Choice', 'true-false': 'True / False' })[value] ?? value;

  readonly calcAlgorithmLabel = (value: string): string =>
    ({ standard: 'Standard', 'timer-based': 'Timer Based' })[value] ?? value;

  readonly timerLabel = (value: string): string => (value ? `${value} seconds` : '');

  onNameChange(name: string): void {
    this.stateService.updateQuestion({ ...this.question(), name });
  }

  onDescriptionChange(description: string): void {
    this.stateService.updateQuestion({ ...this.question(), description: description || undefined });
  }

  onTypeChange(type: QuestionType): void {
    this.stateService.updateQuestion({ ...this.question(), type });
  }

  onPointsChange(points: number): void {
    if (!isNaN(points)) this.stateService.updateQuestion({ ...this.question(), points });
  }

  onCalcAlgorithmChange(calculationAlgorithm: CalculationAlgorithm): void {
    this.stateService.updateQuestion({ ...this.question(), calculationAlgorithm });
  }

  onTimeLimitChange(timeLimit: number): void {
    if (!isNaN(timeLimit)) this.stateService.updateQuestion({ ...this.question(), timeLimit });
  }
}
